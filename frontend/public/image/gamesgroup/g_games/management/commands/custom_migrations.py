from django.core.management.base import BaseCommand
from django.core.management import call_command
import django.conf as conf
from decouple import config
from g_games.serializers import Game_API
from g_games.models import Game_Detail

class Command(BaseCommand):
    help = 'Insert Missing Refid'
    
    def add_arguments(self, parser):
        parser.add_argument('-s', '--schema_name', type=str, help='schema name to migrate app')
        parser.add_argument('-a', '--app_name', type=str, help='app name to get table of particular app')
        
    def set_schema(self,schema_name,key_name):
        if key_name not in conf.settings.DATABASES.keys():
            conf.settings.DATABASES[key_name]={
            'ENGINE':config('APP_DB_ENGINE'),
            'NAME':config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD':config('DB_PASSWORD'),
            'HOST': config('DB_HOST'),
            'OPTIONS' : {'options': f'-c search_path={schema_name}'},
            'PORT':config('DB_PORT'),
            }
        
    def call_migration(self,s,a,key_name,fake=False):
        self.set_schema(s,key_name)
        try:
            if fake:
                call_command('migrate','--database',key_name,a,'--fake')
            else:
                call_command('migrate','--database',key_name,a)
        except Exception as e:
            if "refstats_sums" in str(e) and 'already exists' in str(e):
                self.call_migration(s,a,key_name,True)
            print('error',':',str(e))

    def handle(self, *args, **kwargs):
        s=kwargs['schema_name']
        a=kwargs['app_name']
        if not s:
            s=input('Please enter schema name:')
        
        if not a:
            a=input('Please enter app name:')
    
        if s=='all':
            game_data=Game_API(Game_Detail.objects.all(),many=True)
            for game in game_data.data:
                if game.get('short_name')=='public':
                    continue
                self.call_migration(game.get('short_name'),a,s)
        else:
            if s=='public':
                ask=input("You are trying change default migration settings in db are you sure you want to migrate press y to execute:")
                if ask!='y' or ask!='Y':
                    quit()
            self.call_migration(s,a,s)