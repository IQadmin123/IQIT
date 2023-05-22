import csv
import itertools
import logging
import sys
from datetime import datetime

import pandas as pd
from django.core.management import call_command
from django.db.models import Q
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from django_q.tasks import AsyncTask, Schedule, async_task, result, schedule
from g_games.models import Game_Detail
from g_games.serializers import Game_Details_API
from g_partners.all_views.core_view import BaseViewSet
from g_partners.helper import fetch_data, return_response, set_schema
from g_partners.models import (Partner, PartnerCountry, PartnerPlatform,
                               SpedingsAuto, child_refid, country)
from g_partners.serializers import (ChildRefid, Country, FileUploadSerializer,
                                    Partners_API, Spending, Spending_AutoSync,
                                    SwaggerPostPartners_API,
                                    SwaggerUpdatePartners_API)

log = logging.getLogger(__name__)

class Partner_View(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    authentication_classes = [
        SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    log = log
    serializer = Partners_API
    my_tags = ["Partner"]

    # To read particular partner detail from partner table and child table to get multiple refid.
    def list(self, request, *args, **kwargs):
        check_game = Game_Detail.objects.filter(short_name=kwargs['game_name']).exists()
        if not check_game:
            data_send = {"error": ['No game found.']}
            log.error('No game found.',extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        partnerObj = Partner.objects.using(kwargs.get('game_name')).filter(id=kwargs.get('id')).first()
        if not partnerObj:
            data_send = {"error": ['No partner found.']}
            log.error('No partner found.',extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        childObj = child_refid.objects.using(kwargs.get('game_name')).filter(parent_refid=partnerObj.refid).values_list('child',flat=True)
        listchild = list(set(childObj))
        serializer = Partners_API(partnerObj)
        serializer_data = serializer.data
        # serializer_data['child'] = listchild
        data_send = {"partners_details": serializer_data}
        return return_response(data_send, status.HTTP_200_OK)

    # To delete data from partner table.
    def destroy(self, request, *args, **kwargs):
        check_game = Game_Detail.objects.filter(short_name=kwargs['game_name']).exists()
        if not check_game:
            data_send = {"error": ['No game found.']}
            log.error(data_send['error'],extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        
        partnerObj = Partner.objects.using(kwargs.get('game_name')).filter(id=kwargs.get('id')).first()
        if not partnerObj:
            data_send = {"error": ["No Data Found"]}
            log.error("No Data Found",extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        else:
            partnerchilds=child_refid.objects.using(kwargs.get('game_name')).filter(parent_refid=partnerObj.refid)
            partnerchilds.delete()
            partnerObj.delete()
            data_send = {"message": "Partner Deleted Successfully"}
            return return_response(data_send, status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(request_body=SwaggerUpdatePartners_API)
    # To update partners detail in partner table of particular schema.
    def update(self, request, *args, **kwargs):
        try:
            # val=datetime.strptime(request.data['start_date'], "%Y-%m-%d")
            # input("Press enter")
            request.data._mutable = True
            game_name = kwargs.get('game_name')
            set_schema("public","public")
            partnerObj = Partner.objects.using(game_name).filter(id=kwargs.get('id')).first()
            if not partnerObj:
                data_send = {'error': ["No record found."]}
                log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)

            if 'refid' in request.data and partnerObj.refid != request.data['refid']:
                data_send = {'error': ["You can't update your refid."]}
                log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            
            if 'start_date' in request.data and '/' in request.data.get('start_date'):
                request.data['start_date'] = datetime.strftime(datetime.strptime(request.data.get('start_date'),'%d/%m/%Y'),'%Y-%m-%d')
                
            if 'end_date' in request.data and '/' in request.data.get('end_date'):
                request.data['end_date'] = datetime.strftime(datetime.strptime(request.data.get('end_date'),'%d/%m/%Y'),'%Y-%m-%d')
                
            if 'start_date' not in request.data:
                request.data['start_date'] = datetime.strftime(partnerObj.start_date,'%Y-%m-%d')
            
            if 'end_date' not in request.data:
                request.data['end_date'] = datetime.strftime(partnerObj.end_date,'%Y-%m-%d')
                
            # if 'start_date' in request.data and '-' not in request.data.get('start_date'):
            #     log.error("Please enter date in valid format.",extra={'className': self.__class__.__name__,'url_request':request.path})
            #     raise ValidationError({"error":["Please enter date in valid format."]})
            
            if 'start_date' in request.data and 'end_date' in request.data and request.data['start_date'] > request.data['end_date']: # check the start date is not greater thans the end date.
                data_send = {'error': ["Please enter valid date range. end_date must be greater than start_date"]}
                log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            
            existing_record = Partner.objects.using(kwargs.get('game_name')).filter(refid=partnerObj.refid).filter(
                Q(start_date__lte=request.data['start_date']) & Q(end_date__gte=request.data['start_date']) | 
                Q(start_date__lte=request.data['end_date']) & Q(end_date__gte=request.data['end_date']) | 
                Q(start_date__gte=request.data['start_date']) & Q(end_date__lte=request.data['end_date'])
                ).exclude(id=kwargs.get('id')).first() # this is condition for checking date range available. if range is available for same partner with same range then it will throw an error.
            if existing_record:
                data_send = {'error': ["Please enter valid date range. date range already exists."]}
                log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)

            if 'country' in request.data:
                countrylist = request.data.pop('country')[0].split(',')
                DelCountry = PartnerCountry.objects.using(game_name).filter(partner=partnerObj.id).delete() # delete all the country of this(partner id which is passed from url) partner
                CountryId = {nm:country.objects.using('public').filter(iso_name=str(nm).upper()).first().id for nm in countrylist if country.objects.using("public").filter(iso_name=str(nm).upper()).exists()} # get all the ids of contry from public table for inserting new countries to partner
                BulkInsertCountry = list(filter(lambda countryname: PartnerCountry.objects.using(game_name).create(partner_id=partnerObj.id, country=str(countryname).upper(),country_id=CountryId[str(countryname).upper()]),CountryId.keys())) # inserting the countries for the partner.
            if 'platform' in request.data:
                platformlist = request.data.pop('platform')[0].split(',')
                DelPlatform = PartnerPlatform.objects.using(game_name).filter(partner=partnerObj.id).delete() # delete all the platfrom of this(partner id which is passed from url) partner
                BulkInsertPlatform = list(filter(lambda platformname: PartnerPlatform.objects.using(game_name).create(partner_id=partnerObj.id, platform=str(platformname).lower()),platformlist)) # inserting the countries for the partner.

            serializer = Partners_API(partnerObj,data=request.data,partial=True)

            if serializer.is_valid(raise_exception=True):
                serializer.save()

            data_send = {'message': 'Record has been updated successfully.'}
            return return_response(data_send, status.HTTP_200_OK)

        except Exception as e:
            data_send = {'error': [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

class Parent_AllDetails(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,JWTAuthentication]
    serializer = Partners_API
    queryset = Partner.objects.all()
    log = log
    my_tags = ["Partner"]


    # Get detail of all partners.
    def list(self, request, *args, **kwargs):
        check_game = Game_Detail.objects.filter(short_name=kwargs['game_name']).exists()
        if not check_game:
            data_send = {"error": ['No game found.']}
            log.error('No game found.',extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        partnerObj = Partner.objects.using(kwargs.get('game_name')).all().order_by('-id')
        if not partnerObj:
            data_send = {"error": ['No partner found.']}
            log.error('No partner found.',extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        serializer = Partners_API(partnerObj,many=True)
        serializer_data = serializer.data
        for record in serializer_data:
            childObj = child_refid.objects.using(kwargs.get('game_name')).filter(parent_refid=record.get('refid')).values_list('child', flat=True)
            listchild = list(set(childObj))
            record['child']=listchild

        data_send = {'partners_data':serializer_data}
        return return_response(data_send, status.HTTP_200_OK)

    def validate_data(self,validated_data):
        # print(validated_data.get('platform','').split(','))
        data=Partner.objects.using(self.kwargs.get('game_name')).filter(refid=validated_data.get('refid'))
        platform_list=list(filter(lambda e:e.strip(),validated_data.get('platform','').split(',')))
        check_platform=PartnerPlatform.objects.using(self.kwargs.get('game_name')).filter(partner_id__in=data.values_list('id',flat=True),platform__in=platform_list).exists()
        
        if check_platform or len(platform_list) == 0 or data.exists()==False:
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
            
            if 'refid' not in validated_data.keys():
                str_error = "Refid not exist in requested data."
                return str_error
        else:
            # check_data_platform = data.filter(share_cost=validated_data.get('share_cost')).filter(cpl_cost=validated_data.get('cpl_cost')).exists()
            partner_data=Partner.objects.using(self.kwargs.get('game_name')).filter(refid=validated_data.get('refid')).filter(share_cost=validated_data.get('share_cost')).filter(cpl_cost=validated_data.get('cpl_cost'))
            if partner_data.count()>0:
                return partner_data.first()
            
        if 'refid' in validated_data.keys():
            check_child=child_refid.objects.using(self.kwargs.get('game_name')).filter(child=validated_data.get('refid')).exists()
            check_in_child=child_refid.objects.using(self.kwargs.get('game_name')).filter(child__in=validated_data.get('multiple_refid','').split(',')).exists()
            if check_child or check_in_child:
                str_error="Refid or multiple refid already exist in child table."
                return str_error
        if 'multiple_refid' in validated_data.keys():
            data_filter=list(set(filter(lambda e:e.strip(),validated_data.get('multiple_refid').split(','))))
            if validated_data.get('refid') in data_filter:
                str_error="Please enter valid refid and multiple refid."
                return str_error
        return ''
    
    
    @swagger_auto_schema(request_body=SwaggerPostPartners_API)
    def create(self, request, *args, **kwargs):
        try:
            set_schema("public","public")
            data_copy=request.data.copy()
            if 'start_date' in data_copy and '/' in data_copy.get('start_date'):
                data = datetime.strftime(datetime.strptime(data_copy.get('start_date'),'%d/%m/%Y'),'%Y-%m-%d')
                data_copy.update({'start_date':data})
                    
            if 'end_date' in data_copy and '/' in data_copy.get('end_date'):
                data = datetime.strftime(datetime.strptime(data_copy.get('end_date'),'%d/%m/%Y'),'%Y-%m-%d')
                data_copy.update({'end_date':data})
                
            validation_error=self.validate_data(data_copy)
            
            if isinstance(validation_error,str) and validation_error!='':
                log.error(validation_error,extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response({"error":[validation_error]},400)
                    
            if validation_error is not None and isinstance(validation_error,str)==False:
                raw_data=data_copy.get('platform')
                raw_data=raw_data.split(',')
                data_filter=list(filter(lambda e:e.strip(),raw_data))
                data=list(map(lambda platform:PartnerPlatform(partner_id=validation_error.id,platform=platform),data_filter))
                if len(data)>0:PartnerPlatform.objects.using(kwargs.get('game_name')).bulk_create(data)
                data_send = {"message": "Added data Successfully"}
                return return_response(data_send, status.HTTP_200_OK)
            else:      
                serializer = self.serializer(data=data_copy,context={"using":kwargs.get('game_name')})
                if serializer.is_valid():
                    data_send = {"message": "Added data Successfully"}
                    partner_data=serializer.save()
                    if "test" not in sys.argv:                    
                        if 'country' in data_copy:
                            raw_data=data_copy.get('country')
                            raw_data=list(set(raw_data.split(',')))
                            data_filter=list(filter(lambda e:country.objects.using('public').filter(iso_name=e).exists(),raw_data))
                            data=list(map(lambda e:PartnerCountry(partner=partner_data,country_id=country.objects.using('public').get(iso_name=e).id,country=country.objects.using('public').get(iso_name=e).iso_name.upper()),data_filter))
                            if len(data)>0:PartnerCountry.objects.using(kwargs.get('game_name')).bulk_create(data)
                    if 'platform' in data_copy:
                        raw_data=data_copy.get('platform')
                        raw_data=list(set(raw_data.split(',')))
                        data_filter=list(filter(lambda e:e.strip(),raw_data))
                        data=list(map(lambda platform:PartnerPlatform(partner=partner_data,platform=platform),data_filter))
                        if len(data)>0:PartnerPlatform.objects.using(kwargs.get('game_name')).bulk_create(data)
                    if 'multiple_refid' in data_copy:
                        raw_data=list(set(data_copy.get('multiple_refid').split(',')))
                        data_filter=list(filter(lambda e:e.strip(),raw_data))
                        data=list(map(lambda child:child_refid(child=child,parent_refid=partner_data.refid),raw_data))
                        if len(data)>0:child_refid.objects.using(kwargs.get('game_name')).bulk_create(data)
                    return return_response(data_send, status.HTTP_200_OK)
                else:
                    errors = [serializer.errors[data][0] for data in serializer.errors]
                    data_send = {"error": errors}
                    log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                    return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": ["Something went wrong while creating partner."]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        
class Parent_Single_View(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [
        SessionAuthentication,JWTAuthentication]
    log = log
    serializer = ChildRefid
    my_tags = ["Partner"]
    
    # To get list of refid of particular partner in games.
    def list(self, request, *args, **kwargs):
        try:
            game_name = kwargs.get('game_name')
            Partnerobj = Partner.objects.using(game_name).filter(id=kwargs.get('id')).first()
            if not Partnerobj:
                data_send = {"error": ["No partner found"]}
                log.error("No partner found",extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            Childobj = child_refid.objects.using(game_name).filter(parent_refid=Partnerobj.refid)
            serializer = ChildRefid(Childobj,many=True)
            data_send = {"child_data": serializer.data}
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": ["Something went wrong while fetching child of particular partner records."]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # To delete refid from child table of partner in games.
    def destroy(self, request, *args, **kwargs):
        try:
            ChildObj = child_refid.objects.using(kwargs.get('game_name')).filter(id=kwargs.get('id')).first()
            if not ChildObj:
                data_send = {"error": "Child data not found."}
                log.error("Child data not found.",extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            ChildObj.delete()
            data_send = {"message": "Data deleted successfully"}
            return return_response(data_send, status.HTTP_204_NO_CONTENT)
        except Exception as e:
            data_send = {"error": ["Something went wrong while deleting child of partner."]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # To create refid of particular partner in game.
    def create(self, request, *args, **kwargs):
        try:
            partnerId = kwargs.get('id')
            game_name = kwargs.get('game_name')
            childata = request.data.get('child',None)
            if childata is None or len(childata)==0:
                data_send = {'error': ['Please enter child.']}
                log.error('Refid not found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            childlist = childata.split(',')
            PartnerObj = Partner.objects.using(game_name).filter(id=partnerId).first()
            child_filter=list(filter(lambda e: child_refid.objects.using(game_name).filter(child=e).exists() or Partner.objects.using(game_name).filter(refid=e).exists(),childlist))
            if len(child_filter)>0:
                data_send = {'error': ['Refid already exists.']}
                log.error('Refid already exists.',extra={'className': self.__class__.__name__,'url_request':request.path})
            else:
                CreatingChild = [child_refid.objects.using(game_name).create(child=childnm,parent_refid=PartnerObj.refid) for childnm in childlist]
                data_send = {'message': 'Refid has been added successfully.'}
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {'error': ['Something went wrong while creating child of partner.']}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            



class Country_View(BaseViewSet):
    set_schema("public","public")
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    serializer = Country
    queryset = country.objects.using('public').all().order_by('-id')
    log = log
    my_tags = ["Partner"]

    def get_single(self, request, *args, **kwargs):
        queryset = country.objects.using('public').filter(id=kwargs['pk'])
        serializer = self.get_serializer(queryset, many=True)
        data_send = {"data": serializer.data}
        return return_response(data_send, status.HTTP_200_OK)

class Upload_Excel(BaseViewSet):
    serializer = FileUploadSerializer
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [
        SessionAuthentication, JWTAuthentication]
    log = log
    my_tags = ["Partner"]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                file = serializer.validated_data['csv_file']
                reader = pd.read_csv(file)
                kwargs['user_email_send'] = request.user.email
                kwargs['data_df'] = reader.to_json()
                async_task("g_partners.tasks.store_csv",
                        *args, **kwargs)
                data_msg = f'Thank you for sending csv after processing csv we will send status update on:{request.user.email}'
                return return_response({'message': data_msg}, status.HTTP_200_OK)
            else:
                errors = [serializer.errors[data][0] for data in serializer.errors]
                data_send = {"error": errors}
                log.error(','.join(data_send['error']),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
    
    def list(self,request, *args, **kwargs):
        try:
            response = HttpResponse(content_type='text/csv')  
            response['Content-Disposition'] = 'attachment; filename="partners.csv"'  
            all_data = {}
            serializers = Game_Details_API(Game_Detail.objects.filter(
                short_name=kwargs['game_name']), many=True)
            if len(serializers.data) <= 0:
                log.error('no data found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response({'error': ['no data found.']})
            
            if request.GET.get('type'):
                PartnerData = Partner.objects.using(kwargs.get('game_name')).filter(is_organic='organic'==request.GET.get('type')).values().order_by('id')
            else:
                PartnerData = Partner.objects.using(kwargs.get('game_name')).all().values().order_by('id')
            
            if len(PartnerData)>0:
                column_list=list(PartnerData[0].keys())
                column_list.extend(['childs','platform','country'])
                writer = csv.DictWriter(response,column_list)
                writer.writeheader()
                for data in PartnerData:
                    data.update(
                        {
                            'childs':','.join(list(child_refid.objects.using(kwargs.get('game_name')).filter(parent_refid=data.get('refid')).values_list('child',flat=True).distinct())),
                            'platform':','.join(list(PartnerPlatform.objects.using(kwargs.get('game_name')).filter(partner_id=data.get('id')).values_list('platform',flat=True).distinct())),
                            'country':','.join(list(PartnerCountry.objects.using(kwargs.get('game_name')).filter(partner_id=data.get('id')).values_list('country',flat=True).distinct())),
                        }
                    )
                writer.writerows(list(PartnerData))
            return response    
        except Exception as e:
            all_data = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(all_data, status.HTTP_400_BAD_REQUEST)

class Spendings_Auto_Sync(BaseViewSet):
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    log = log
    serializer = Spending_AutoSync
    my_tags = ["Partner"]

    def create(self, request, *args, **kwargs):
        try:
            kwargs['start_date'] = request.data.get('start_date')
            kwargs['end_date'] = request.data.get('end_date')
            kwargs['user_email_send'] = request.user.email
            # async_task("g_partners.tasks.cal_spendings_new",
            #           *args, **kwargs)
            if len(request.data.get('start_date',''))==0 or len(request.data.get('end_date',''))==0:
                data_send = {"error":["Please enter valid date."]}
                status_code = status.HTTP_400_BAD_REQUEST
            else:
                if '/' in request.data.get('start_date',''):
                    data = datetime.strftime(datetime.strptime(request.data.get('start_date',''),'%d/%m/%Y'),'%Y-%m-%d')
                    kwargs.update({'start_date':data})
                    
                if '/' in request.data.get('end_date',''):
                    data = datetime.strftime(datetime.strptime(request.data.get('end_date',''),'%d/%m/%Y'),'%Y-%m-%d')
                    kwargs.update({'end_date':data})
                    
                
                kwargs['start_date'] = datetime.strftime(datetime.strptime(kwargs.get('start_date',''),'%Y-%m-%d'),'%Y-%m-%d')
                kwargs['end_date'] = datetime.strftime(datetime.strptime(kwargs.get('end_date',''),'%Y-%m-%d'),'%Y-%m-%d')
                # async_task("g_partners.tasks.calculate_spendings",
                #         *args, **kwargs)
            
                # call_command('missing_country', '-s',f"{kwargs.get('game_name')}")
                schedule('g_partners.tasks.calculate_spendings',
                    *args, **kwargs,
                    schedule_type=Schedule.ONCE,
                    cron = '0 1 * * *')
                
                data_send = {
                    "message": f"Request has been scheduled successfully for calculating spendings from refstat_sum to spendings_auto and sending status on {request.user.email}."
                    }
                status_code = status.HTTP_200_OK
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            status_code = status.HTTP_400_BAD_REQUEST
        return return_response(data_send, status_code)

class Spendings_Auto(BaseViewSet):
    authentication_classes = [
        SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    log = log
    serializer = Spending
    my_tags = ["Partner"]
    
    def create(self, request, *args, **kwargs):
        try:
            data=request.data.copy()
            if 'regs' not in data:
                data['regs']='0'
            lst_all=list(itertools.product(data.get('platform','').split(','), data.get('country','').split(',')))
            lst_all=list(map(list,lst_all))
            remove_lst=list(filter(lambda e:e in data.keys(),['platform','country']))
            list(map(data.pop, remove_lst))
            val=list(map(lambda st: str.replace(st, st, f"'{st}'"), list(data.values())))
            all_lst=[]
            for lst in lst_all:
                SpendObj = SpedingsAuto(date=data.get('date'),
                net_euro=data.get('net_euro','0'),
                regs=data.get('regs','0'),
                share_cost=data.get('share_cost','0'),
                cpl_cost=data.get('cpl_cost','0'),
                refid=data.get('refid'),
                platform=lst[0],
                country=lst[-1])
                all_lst.append(SpendObj)
            if len(all_lst)>0:
                SpendBulk=SpedingsAuto.objects.using(kwargs.get('game_name')).bulk_create(all_lst)
            return return_response(data, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        

class Apple_payout_report(ViewSet):
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    # log = log
    # my_tags = ["Apple_payout"]
    
    def get(self, request, *args, **kwargs):
        try:
            data = request.GET
            user = request.user.email
            start_date,end_date,payout,account = datetime.strptime(request.GET['start_date'],'%Y-%m-%d'), datetime.strptime(request.GET['end_date'],'%Y-%m-%d'),float(request.GET['payout']),data['account']
            kwargs['start_date'] = start_date,end_date,payout,account
            kwargs['end_date'] = end_date
            kwargs['payout'] = payout
            kwargs['account'] = account
            applepayout = async_task('g_partners.apple_payout_calculation.payout_calculator',start_date,end_date,payout,account,user)
            
            # task_result = result(applepayout)
            data_send = {
                "messages":f"Please check your mail id {user}. Apple payout report successfully send to your mail."
            }
            status_code = status.HTTP_200_OK
            # return return_response({"status":"Success","message"},)
        except Exception as e:
            data_send = {
                "messages":f"Error Occured: {str(e)}"
            }
            status_code = status.HTTP_400_BAD_REQUEST

        return return_response(data_send, status_code)