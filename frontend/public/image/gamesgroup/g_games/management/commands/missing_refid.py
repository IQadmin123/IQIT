from datetime import date, datetime, timedelta
from django.core.management.base import BaseCommand
from g_games.models import Game_Detail
from g_games.serializers import Game_API
from g_partners.helper import db_cursor, fetch_data,set_schema
from g_partners.serializers import PartnersQuery_API, Partners_API, Partners_API_Class
from g_partners.models import *


class Command(BaseCommand):
    help = 'Insert Missing Refid'
    
    def handle(self, *args, **kwargs):
        # games=Game_API(Game_Detail.objects.all(),many=True)
        games = Game_API(Game_Detail.objects.filter(short_name = 'test_spendings'),many = True)
        print('Total games are ',len(games.data),'\n','-'*20)
        for game in games.data:
            print('Running for ',game.get('short_name'))
            set_schema(game.get('short_name'),game.get('short_name'))
            kwargs['game_name'] = game.get('short_name')
            partner_list = list(set(Partner.objects.using(kwargs.get('game_name')).values_list('refid',flat = True)))
            child_list = list(set(child_refid.objects.using(kwargs.get('game_name')).all().values_list('child',flat = True)))
            partner_list.extend(child_list)
            ref_refid = list(set(PartnersRefstatSums.objects.using(kwargs.get('game_name')).all().values_list('referral',flat = True).exclude(referral__in = partner_list)))
            if len(ref_refid)==0:
                print("Refid are sync with refstats sums.")
            for ids in ref_refid:
                data_ins = {'refid':ids,'is_organic':1,'start_date':date.today()-timedelta(1),'end_date':date.today()+timedelta(365*100)}
                serialize = Partners_API(data=data_ins,context={"using":kwargs.get('game_name')})
                # serialize = Partners_API_Class(data=data_ins,context={"using":kwargs.get('game_name')})
                if serialize.is_valid(raise_exception=True):
                    serialize.save()
                    print(serialize.data.get('id'))
                    print(f"{ids} added to partners auto successfully.")
                else:
                    print(serialize.errors)