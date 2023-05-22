from django.core.management.base import BaseCommand
import boto3
from configparser import ConfigParser
from g_games.serializers import Game_API
from g_games.models import Game_Detail
from g_admin.all_functions import fetch_data,connect_redshift
from datetime import datetime
from io import StringIO 
from decouple import config

class Command(BaseCommand):
    
    def add_arguments(self, parser):
        parser.add_argument('-s', '--schema_name', type=str, help='schema name to migrate app')
        parser.add_argument("-bt", "--backup_tables", help="names of backup tables with comma seprated values.")
        parser.add_argument("-buc", "--bucket",default='partners-backup', help="Name of bucket to enter data in s3.")
    
    def load_s3(self):
        s3_resource = boto3.resource('s3',aws_access_key_id=config('AWS_ACCESS_KEY_ID'),aws_secret_access_key=config('AWS_ACCESS_ACCESS_KEY'))
        return s3_resource
    
    # def _get_backup_(schema=None,tables=None,bucket=None):
    def handle(self, *args, **kwargs):
        schema=kwargs['schema_name']
        backup_tables=kwargs['backup_tables']
        bucket=kwargs['bucket']        
        if schema is None or schema == '':
            games=list(Game_Detail.objects.all().values_list('short_name',flat=True))
        else:
            games=schema.split(',')
                
        if backup_tables is None or backup_tables=='':
            tables=['partners_auto','partners_child_auto','partners_country_auto','partners_platform_auto']
        else:
            tables=backup_tables.split(',')

        dt=datetime.now().strftime('%Y-%m-%d')
        con=connect_redshift()
        s3_resource=self.load_s3()
        try:
            for uschema in games:
                query=f"""select lower(t.table_name) as table_name
                from information_schema.tables t
                where t.table_schema = '{uschema}'
                order by t.table_name;"""
                df=fetch_data(query,con,True)
                all_tables=df['table_name'].to_list()
                if len(all_tables)==0:
                    print("Look's like schema or tables does not exists.")
                    continue
                for table in tables:
                    if table.lower() not in all_tables:
                        continue
                    query=f'select * from {uschema}.{table} order by id;'
                    df=fetch_data(query,con,True)
                    csv_buffer = StringIO()
                    df.to_csv(csv_buffer,index=False)
                    s3_resource.Object(bucket,f"{uschema}/{table}/{dt}.csv").put(Body=csv_buffer.getvalue())
        except Exception as e:
            print(f"Error created while taking backup :{str(e)}")