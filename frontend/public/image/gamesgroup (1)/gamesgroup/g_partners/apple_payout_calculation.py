
from datetime import date, datetime, timedelta

import numpy as np
import pandas as pd
from django.conf import settings
from django.core.mail import EmailMessage

from g_partners.helper import fetch_data


def get_first_date(year,month):
    return datetime(year, month, 1)

def get_end_date(year,month):
    if month==12:
        return datetime(year, month, 31)
    return datetime(year, month + 1, 1) + timedelta(days=-1)
    
def get_total_days(start_date,first_date,second_date):
    return (start_date-first_date).days,(second_date-start_date).days

def payout_calculator(start_date,end_date,payout,account,user):
    try:
        start_date =  datetime.strptime(str(start_date)[:10],'%Y-%m-%d')
        end_date = datetime.strptime(str(end_date)[:10],'%Y-%m-%d')
        # return True
        start_date_start_month_date = get_first_date(start_date.year,start_date.month)
        start_date_end_month_date = get_end_date(start_date.year,start_date.month)
        end_date_start_month_date = get_first_date(end_date.year,end_date.month)
        end_date_end_month_date = get_end_date(end_date.year,end_date.month)
        start_first,start_second = get_total_days(start_date,start_date_start_month_date,start_date_end_month_date)
        end_first,end_second = get_total_days(end_date,end_date_start_month_date,end_date_end_month_date)
        
        cal_modal ="BS" if start_first > start_second and end_first > end_second else "SB"
        if cal_modal == "BS":
            starting_date = str(end_date_start_month_date).split(' ')[0]
            ending_date = str(end_date).split(' ')[0]
            month_ending_date = str(end_date_end_month_date).split(' ')[0]
        else:
            starting_date = str(start_date).split(' ')[0]
            ending_date = str(start_date_end_month_date).split(' ')[0]
            month_ending_date = str(end_date).split(' ')[0]
        query =f'''select apid.game,apid.account,slp.begin_date as date,sum(slp.developer_proceeds_eur) as developer_proceeds_eur,sum(slp.total_developer_proceeds_with_unit) as total_developer_proceeds_with_unit,sum(slp.vat) as vat,sum(slp.netrevenue) as netrevenue,sum(slp.fee) as fee,slp.country_code as country_code,slp.apple_identifier,sum(slp.developer_proceeds) as developer_proceeds,sum(slp.customer_price) as customer_price,sum(slp.units) as units from applepayout.apple_sales_report_grouped as slp inner join applepayout.apple_ids as apid on slp.apple_identifier=apid.apple_identifier where slp.begin_date between '{str(start_date).split(' ')[0]}' and '{month_ending_date}' group by apid.game,apid.account,date,slp.country_code,slp.apple_identifier;'''
        df=fetch_data(None,query,'applepayout') 
        df = df.groupby(['game','account','country_code','date'],as_index=False).agg({'developer_proceeds_eur':'sum','vat':'sum','netrevenue':'sum','fee':'sum','developer_proceeds':'sum','customer_price':'sum','units':'sum','total_developer_proceeds_with_unit':'sum'})
        df['m-y'] = df['date'].apply(lambda x:"-".join(x.split('-')[:2]))
        df['provider'] = "Apple"
        df['apple_month_start'] = str(start_date).split(' ')[0]
        df['apple_month_end'] = str(end_date).split(' ')[0]
        
        mail_df = pd.DataFrame()        
        
        df = df.loc[df['account'] == account]
        games_df = df.groupby('game')
        games_list = [game for game,grp in games_df]
        for game in games_list:
            by_game = df.loc[df['game'] == game]
            country_df = by_game.groupby('country_code')
            country_list = [country for country,grp in country_df]
            for country in country_list:
                by_country = by_game.loc[df['country_code'] == country]
                by_country['date'] = pd.to_datetime(by_country['date'],format='%Y-%m-%d')
        
                calculation_df = (by_country.loc[(by_country['date']>=datetime.strptime(starting_date,'%Y-%m-%d')) & (by_country['date']<=datetime.strptime(ending_date,'%Y-%m-%d'))]).sort_values(['date'])
                without_calculation_df_before = (by_country.loc[(by_country['date']<datetime.strptime(starting_date,'%Y-%m-%d'))]).sort_values(['date'])
                without_calculation_df_after = (by_country.loc[(by_country['date']>datetime.strptime(ending_date,'%Y-%m-%d'))]).sort_values(['date'])
                without_calculation_df_before['daily_weight'] = ''
                without_calculation_df_before['daily_weight_with_unit'] = ''
                without_calculation_df_before['daily_paytout'] = without_calculation_df_before['developer_proceeds_eur']
                without_calculation_df_before['daily_paytout_with_unit'] = without_calculation_df_before['total_developer_proceeds_with_unit']
                without_calculation_df_before['estimation'] = 1
                
                
                without_calculation_df_after['daily_weight'] = ''
                without_calculation_df_after['daily_weight_with_unit'] = ''
                without_calculation_df_after['daily_paytout'] = without_calculation_df_after['developer_proceeds_eur']
                without_calculation_df_after['daily_paytout_with_unit'] = without_calculation_df_after['total_developer_proceeds_with_unit']
                without_calculation_df_after['estimation'] = 1
                
                total_proceeds = calculation_df['developer_proceeds_eur'].sum()
                total_proceeds_unit = calculation_df['total_developer_proceeds_with_unit'].sum()

                calculation_df['daily_weight'] = calculation_df['developer_proceeds_eur']/(np.nan if abs(total_proceeds) < 1e-6 else total_proceeds)
                calculation_df['daily_weight_with_unit'] = calculation_df['total_developer_proceeds_with_unit']/(np.nan if abs(total_proceeds_unit) < 1e-6 else total_proceeds_unit)
                
                last_month_revenue = without_calculation_df_before['daily_paytout'].sum()
                last_month_revenue_unit = without_calculation_df_before['daily_paytout_with_unit'].sum()
                
                distributed_revenue = payout - last_month_revenue
                distributed_revenue_unit = payout - last_month_revenue_unit
                
                calculation_df['daily_paytout'] = calculation_df['daily_weight']*distributed_revenue
                calculation_df['daily_paytout_with_unit'] = calculation_df['daily_weight_with_unit']*distributed_revenue_unit
                calculation_df['estimation'] = 0
                
                
                concatenated_df = pd.concat([without_calculation_df_before, calculation_df, without_calculation_df_after], axis=0)
                
                mail_df = pd.concat([mail_df,concatenated_df])
        try:
            subject_send=f'Apple Payout Report'
            mail = EmailMessage(subject=subject_send, 
                                # body=message_send, 
                                from_email=settings.DEFAULT_FROM_EMAIL,
                                to=[user])
            mail.body=f'''
            <h3>Hello Greetings,
            below attachment is your requested apple payout report.</h3> 
            '''        
            mail.attach('apple_payout_report.csv', mail_df.to_csv(index=False), 'text/csv')
            mail.content_subtype = "html"
            mail.send()
        except Exception as e:
            print(str(e),"EROROROROROORORORORO")
        
    except Exception as e:
        print(str(e))
        return False,str(e)
    return True,"Success"

# if __name__=="__main__":
#     try:
#         date_range = "2022-09-25 2022-10-29"
#         # date_range = "2022-01-01 2022-02-04"
#         # date_range = "2022-02-05 2022-03-04"
#         # date_range = "2022-03-05 2022-04-01"
#         # date_range = input("Please Input Date range (E.G: 2023-01-01 2023-01-31) :")
#         apple_payout = 1200
#         account = 'playata'
#         # apple_payout = int(input("Please enter apple payout amount :"))
#         redshift_engine=connect_db_redshift()
#         # redshift_engine=''
#         # logs.info("Trying to connect redshift")
#         con = rs_connection(True)
#         cur = con.cursor()
#         status,message = payout_calculator(date_range,apple_payout,account,redshift_engine)
#         if status:
#             print(message,'SUCESSSSS')
#         else:
#             print(message,'ERRORRRRRRR')
#         cur.close()
#         con.close()
#         # logs.info("Done, script executed successfully.")
#         print("Done, script executed successfully.")
#     except Exception as e:
#         print("Error in main function of scripts: "+str(e))