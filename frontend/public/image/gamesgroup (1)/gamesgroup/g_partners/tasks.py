from asyncio.log import logger
from datetime import datetime
import pandas as pd
# from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage
from g_partners.helper import check_in_db, db_cursor, fetch_data,set_schema
from g_partners.serializers import *
from g_partners.models import *
import json
from django.db.models import Count,Sum,Q
from django.db.models.functions import Upper
import logging

log=logging.getLogger(__name__)
# from django.core import serializers
def store_csv(*args, **kwargs):
    try:
        reader=pd.read_json(kwargs.get("data_df"))
        set_schema(kwargs["game_name"],kwargs["game_name"])
        set_schema("public","public")
        error_id=[]
        print(reader.shape)
        reader.fillna('-',inplace=True)
        if 'id' not in reader.columns.to_list() or 'refid' not in reader.columns.to_list():
            subject_send=f'CSV information for {kwargs["game_name"]}'
            mail = EmailMessage(subject=subject_send, 
                                # body=message_send, 
                                from_email=settings.DEFAULT_FROM_EMAIL,
                                to=[kwargs['user_email_send']])
            mail.body="""please try again column id and refid are required."""
            mail.send()
            return False
        ins=0
        upd=0
        for id_data,data in reader.iterrows():
            data = data.to_dict()
            # print("Working on :",id_data)
            data_country = data.pop('country') 
            data_platform = data.pop('platform') 
            data_child = data.pop('childs') 
            data_organic = data.pop('is_organic')
            if 'start_date' in data and '/' in data.get('start_date'):
                data['start_date'] = datetime.strftime(datetime.strptime(data.get('start_date'),'%d/%m/%Y'),'%Y-%m-%d')
                
            if 'end_date' in data and '/' in data.get('end_date'):
                data['end_date'] = datetime.strftime(datetime.strptime(data.get('end_date'),'%d/%m/%Y'),'%Y-%m-%d')
            validation_error=validate_data(kwargs.get('game_name'),data)
            # print(validation_error,"\t:validation error")
            if data_organic:
                partner_record = Partner.objects.using(kwargs.get('game_name')).filter(id=data.get('id'),refid=data.get('refid')).first()
                if partner_record:
                    data['is_organic']=False
                    existing_record = Partner.objects.using(kwargs.get('game_name')).filter(refid=partner_record.refid).filter(
                                    Q(start_date__lte=data['start_date']) & Q(end_date__gte=data['start_date']) | 
                                    Q(start_date__lte=data['end_date']) & Q(end_date__gte=data['end_date']) | 
                                    Q(start_date__gte=data['start_date']) & Q(end_date__lte=data['end_date'])
                                    ).exclude(id=data.get('id')).exists() # this is condition for checking date range available. if range is available for same partner with same range then it will throw an error.
                    if existing_record:
                        error_id.append(id_data)
                        print(error_id,"Error Date conflict")
                    else:
                        serial=Partners_API(partner_record,data=data,partial=True,context={'using':kwargs["game_name"]})
                        if serial.is_valid():
                            data_save = serial.save()
                            upd+=1
                            print(id_data)
                            if data_country:
                                obj=PartnerCountry.objects.using(kwargs.get('game_name')).filter(partner_id=data_save.id)
                                obj.delete()
                            if data_platform:
                                obj=PartnerPlatform.objects.using(kwargs.get('game_name')).filter(partner_id=data_save.id)
                                obj.delete()
                        else:
                            print(serial.errors)
                            error_id.append(id_data)   
                            print(error_id,"Error update")
                            continue
            else:
                if isinstance(validation_error,str) and validation_error!='':
                    error_id.append(id_data)
                    print(error_id,)
                    continue    
                else:
                    serial = Partners_API(data = data,context={'using':kwargs["game_name"]})
                    if serial.is_valid():
                        ins+=1
                        data_save = serial.save()
                        print(id_data,"Save")
                        if isinstance(data_child,str) and len(data_child)>0:
                            bulk_child=[]
                            for child in data_child.split(','):
                                if '-'==child:continue
                                bulk_child.append(child_refid(parent_refid=data_save.refid,child=child))
                            obj=child_refid.objects.using(kwargs.get('game_name')).bulk_create(bulk_child)
                            # print(f"{len(obj)} child added.")
                        if isinstance(data_country,str) and len(data_country)>0:
                            data_country=country.objects.using(kwargs.get('game_name')).filter(iso_name__in=data_country.split(','))
                            bulk_country=[]
                            for country_id in data_country:
                                bulk_country.append(PartnerCountry(partner=data_save,country_id=country_id.id,country=country_id.iso_name))
                            obj=PartnerCountry.objects.using(kwargs.get('game_name')).bulk_create(bulk_country)
                            # print(f"{len(obj)} country added.")
                        if isinstance(data_platform,str) and len(data_platform)>0:
                            bulk_platform=[]
                            for platform in data_platform.split(','):
                                if platform=='-':continue
                                bulk_platform.append(PartnerPlatform(partner=data_save,platform=platform))
                            obj=PartnerPlatform.objects.using(kwargs.get('game_name')).bulk_create(bulk_platform)
                            # print(f"{len(obj)} platform added.")
                    else:
                        error_id.append(id_data)      
                        print(error_id,"Error create :\t",serial.errors)
                        continue    
            
        
        subject_send=f'CSV information for {kwargs["game_name"]}'
        mail = EmailMessage(subject=subject_send, 
                            # body=message_send, 
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[kwargs['user_email_send']])
        mail.body=f'''
        <h3>Statistics of the uploaded csv.</h3>
        <table cellspacing="3" border="1"  border-collapse="collapse">
        <tr>
            <th>Insert</th>
            <th>Update</th>
            <th>Error</th>
        </tr>
        <tr>
            <td>{ins}</td>
            <td>{upd}</td>
            <td>{len(error_id)}</td>
        </tr>
        </table> 
        '''        
        if len(error_id)>0:
                error_csv=reader.loc[reader.index.isin(error_id)]
                mail.attach('error.csv', error_csv.to_csv(index=False), 'text/csv')
                log.error("Error in email",extra={'className': kwargs.get('className'),'url_request':kwargs.get('url_request')})
        mail.content_subtype = "html"
        mail.send()
        return True
    except Exception as e:
        subject_send=f'CSV information for {kwargs["game_name"]}'
        message_send=f'''Error created while processing csv \nplease try again.\nError:\n\t{str(e)}.'''#body of email.
        mail = EmailMessage(subject=subject_send, 
                            body=message_send, 
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[kwargs['user_email_send']])
        mail.send()
        print(f"error: {str(e)}")
        log.error(str(e),extra={'className': kwargs.get('className'),'url_request':kwargs.get('url_request')})
        return False
    
def validate_data(game,validated_data):
        # print(validated_data.get('platform','').split(','))
        data=Partner.objects.using(game).filter(refid=validated_data.get('refid'))
        platform_list=list(filter(lambda e:e.strip(),validated_data.get('platform','').split(',')))
        check_platform=PartnerPlatform.objects.using(game).filter(partner_id__in=data.values_list('id',flat=True),platform__in=platform_list).exists()
                
        if check_platform or len(platform_list) == 0:
            if 'start_date' in validated_data.keys() and 'end_date' in validated_data.keys():    
                if validated_data.get('start_date')>validated_data.get('end_date'):
                    str_error = "Start date is need to be smaller to create range in partners table."
                    return str_error
            
            if 'start_date' in validated_data.keys():
                check_start = data.filter(Q(start_date__lte = validated_data.get('start_date'), end_date__gte = validated_data.get('start_date'))).exists()
                if check_start:
                    str_error = "Start date is creating conflict in partners table."
                    return str_error
            
            if 'end_date' in validated_data.keys():
                check_end = data.filter(Q(start_date__lte = validated_data.get('end_date'), end_date__gte = validated_data.get('end_date'))).exists()
                if check_end:
                    str_error = "End date is creating conflict in  partners table."
                    return str_error
        
        if 'refid' in validated_data.keys():
            check_child=child_refid.objects.using(game).filter(child=validated_data.get('refid')).exists()
            check_in_child=child_refid.objects.using(game).filter(child__in=validated_data.get('childs','').split(',')).exists()
            if check_child or check_in_child:
                str_error="Refid or multiple refid already exist in child table."
                return str_error
        return ''

def spendings(game, currdate, kwargs):
    try:
        partnersdata = Partners_API(Partner.objects.using(game).filter(id=kwargs.get('id')),many=True)
        partnersdata = json.loads(json.dumps(partnersdata.data))
        for row in partnersdata:
            row['childs'] = list(child_refid.objects.using(game).filter(parent_refid=row.get('refid')).values_list('child',flat=True))
        refid_lst = []
        for rec in partnersdata:
            refid_lst.append(rec.get('refid'))
            refid_lst.extend(rec.get('childs'))
        refid_lst = list(set(refid_lst))
        spendings = SpedingsAuto.objects.using(game).filter(date=currdate).filter(refid__in=refid_lst)
        spendings.delete()
        refstats = PartnersRefstatSums.objects.using(game).filter(current_date=currdate).values("current_date","country","referral","platform").annotate(regs=Sum('regs'),net_euro=Sum('net_euro'),country_upper=Upper('country'))
        lst=[]
        check_platform = list(refstats.values_list('platform',flat=True)).count('n/a')!=refstats.values_list('platform',flat=True).count()
        if len(partnersdata)>0:
            for data in partnersdata:
                filter_data = refstats.filter(Q(current_date__gte = data.get('start_date')) & Q(current_date__lte = data.get('end_date')))
                filter_data = filter_data.filter(Q(referral = data.get('refid')) | Q(referral__in = data.get('childs')))
                # filter_data=filter_data.filter(country__iregex=r'(' + '|'.join(data.get('country')) + ')')
                filter_data = filter_data.filter(country_upper__in=data.get('country'))
                if check_platform:
                    filter_data = filter_data.filter(platform__iregex=r'(' + '|'.join(data.get('platform')) + ')')
                if filter_data.count()>0:
                    lst.append(filter_data)
            onequery=filter_data.union(*lst)
            spendings_ins = []
            for data in onequery: 
                check_child = child_refid.objects.using(game).filter(child = data.get('referral'))
                if check_child.count()>0:
                    data['referral'] = check_child.first().parent_refid
                partner_data = Partner.objects.using(game).filter(refid=data.get('referral'))
                partner_data = partner_data.using(game).filter(Q(start_date__lte = data.get('current_date')) & Q(end_date__gte = data.get('current_date')))
                spendings_ins.append(SpedingsAuto(date=data.get("current_date"),
                                net_euro = data.get('net_euro'),
                                regs = data.get('regs'),
                                share_cost = data.get('net_euro')*partner_data.last().share_cost/100,
                                cpl_cost = data.get('regs')*partner_data.last().cpl_cost,
                                refid = data.get('referral'),
                                platform = data.get('platform'),
                                country = data.get('country')))        
            if len(spendings_ins)>0:
                ins = SpedingsAuto.objects.using(game).bulk_create(spendings_ins)
                print(f"{len(ins)} record inserted successfully.")
                return True
            else:
                return False
        else:
            return False
    except Exception as e:
        # print(str(e))
        log.error(str(e),extra={'className': kwargs.get('className'),'url_request':kwargs.get('url_request')})
        subject_send=f'Calculate spendings for {kwargs["game_name"]}'
        mail = EmailMessage(subject=subject_send, 
                            # body=message_send, 
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[kwargs['user_email_send']])
        mail.body=f"Error while calculating spending \n{str(e)}"
        mail.send()
        
def calculate_spendings(*args, **kwargs):
    try:
        set_schema(kwargs.get('game_name'),kwargs.get('game_name'))
        dates=pd.date_range(start=kwargs['start_date'],end=kwargs['end_date']).to_pydatetime().tolist()
        rec = []
        for date in dates:
            print(f"Running for {date}")
            res = spendings(kwargs.get("game_name"),date.strftime("%Y-%m-%d"),kwargs)
            rec.append(res)
        subject_send=f'Calculate spendings for {kwargs["game_name"]}'
        mail = EmailMessage(subject=subject_send, 
                            # body=message_send, 
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[kwargs['user_email_send']])
        mail.body=f"{rec.count(True)} record inserted successfully of id {kwargs.get('id')} from {kwargs.get('game_name')}.partners_auto."
        mail.send()
    except Exception as e:
        log.error(str(e),extra={'className': kwargs.get('className'),'url_request':kwargs.get('url_request')})
        subject_send=f'Calculate spendings for {kwargs["game_name"]}'
        mail = EmailMessage(subject=subject_send, 
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[kwargs['user_email_send']])
        mail.body=f"Error while calculating spendings \n{str(e)}"
        mail.send()
        print(str(e))
