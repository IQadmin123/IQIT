import logging

from django.contrib.auth import get_user_model
from django.core.management import call_command
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from g_games.models import Game_Detail
from g_games.serializers import Game_API, Game_Details_API
from g_partners.all_views.core_view import BaseViewSet
from g_partners.helper import check_in_db, db_cursor, return_response
from g_partners.models import Partner, child_refid
from g_partners.serializers import Partners_API
import sys

log=logging.getLogger(__name__)
User = get_user_model()


class Games_View(BaseViewSet):
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [JSONParser]
    queryset = Game_Detail.objects.all().order_by('-id')
    serializer = Game_API
    log = log
    my_tags = ["Game"]

    # Create Game in database.
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.serializer(data=request.data)
            # Query to load schema of current database.
            # To check if schema is available or not.
            if serializer.is_valid():
                load_schema = f'''SELECT schema_name FROM information_schema.schemata where schema_name=
                                '{request.data['short_name']}' '''
                if check_in_db(load_schema):
                    serializer.save()
                else:
                    if 'test' not in sys.argv:
                        db_cursor().execute(
                            f'''create schema {request.data['short_name']};''')
                        call_command('custom_migrations', '-s',
                                    f"{request.data['short_name']}", '-a' 'g_partners')
                    serializer.save()
                data_send = {'message': 'Game has been added successfully.'}
                status_send = status.HTTP_200_OK
            else:
                errors = [serializer.errors[data][0]
                        for data in serializer.errors]
                data_send = {'error': errors}
                log.error(','.join(errors),extra={'className': self.__class__.__name__,'url_request':request.path})
                status_send = status.HTTP_400_BAD_REQUEST
            return return_response(data_send, status_send)
        except Exception as e:
            data_send = {'error': [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)


class Game_View(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    serializer = Game_API
    queryset = Game_Detail.objects.all()
    lookup_field = 'short_name'
    log = log
    my_tags = ["Game"]

    # Update Particular game.
    def update(self, request, *args, **kwargs):
        try:
            instance = Game_Detail.objects.get(
                short_name=kwargs.get('game_name'))
            serializer = self.get_serializer(
                instance, data=request.data, partial=True)
            if serializer.is_valid():
                # Check if user requested to change image or not
                if 'image' in request.data.keys():
                    if isinstance(request.data['image'], str) == False:
                        instance.image.delete()
                serializer.save()
                data_send = {
                    "data": 'Game data has been updated successfully.'}
                return return_response(data_send, status.HTTP_200_OK)
            else:
                errors = [serializer.errors[data][0] for data in serializer.errors]
                data_send = {'error': errors}
                log.error(','.join(errors),extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # Read Particular game.
    def list(self, request, *args, **kwargs):
        try:
            serializers = Game_API(Game_Detail.objects.filter(
                short_name=kwargs['game_name']), many=True)
            # To add request url path to image
            if len(serializers.data) > 0:
                serializers.data[0]['image'] = request.build_absolute_uri(
                    serializers.data[0].get('image'))
            data_send = {"game_detail": serializers.data}
            status_send = status.HTTP_200_OK
            return return_response(data_send, status_send)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # Delete Particular game.
    def destroy(self, request, *args, **kwargs):
        try:
            serializer=Game_Detail.objects.filter(short_name=kwargs["game_name"])
            if len(serializer) > 0:
                if 'test' not in sys.argv:
                    query = f'''SELECT schema_name FROM information_schema.schemata where schema_name='{kwargs['game_name']}' '''
                    if check_in_db(query):
                        db_cursor().execute(
                            f'''drop schema IF EXISTS {kwargs['game_name']} cascade;''')
                serializer = serializer[0]
                instance = Game_Detail.objects.get(short_name=kwargs["game_name"])
                instance.delete()
                data_send = {"message": "Game has been deleted successfully."}
                return return_response(data_send, status.HTTP_204_NO_CONTENT)
            else:
                data_send = {"error": ["No game found."]}
                log.error("No game found.",extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)


class Game_Details(BaseViewSet):
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    Game_Detail_Data = Game_Detail.objects.all()
    serializer = Game_API
    log = log
    my_tags = ["Game"]

    # To read game details of particular partner from database.
    def list(self, request, *args, **kwargs):
        try:
            all_data = {}
            serializers = Game_Details_API(Game_Detail.objects.filter(
                short_name=kwargs['game_name']), many=True)
            if len(serializers.data) <= 0:
                log.error('no data found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response({'error': ['no data found.']})
            all_data['basic_details'] = serializers.data
            
            if request.GET.get('type'):
                if 'organic' == request.GET.get('type'):
                    partnerObj = Partner.objects.using(kwargs.get('game_name')).filter(is_organic=True).order_by('-id')
                else:
                    partnerObj = Partner.objects.using(kwargs.get('game_name')).filter(is_organic=False).order_by('-id')
            else:
                partnerObj = Partner.objects.using(kwargs.get('game_name')).all().order_by('-id')
            if not partnerObj:
                data_send = {"error": 'No partner found.'}
                log.error('No partner found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)

            serializer = Partners_API(partnerObj,many=True)
            serializer_data = serializer.data
            for record in serializer_data:
                childObj = child_refid.objects.using(kwargs.get('game_name')).filter(parent_refid=record.get('refid')).values_list('child', flat=True)
                listchild = list(set(childObj))
                record['child']=listchild
            all_data['partners'] = serializer.data
            return return_response(all_data, status.HTTP_200_OK)
        except Exception as e:
            all_data = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(all_data, status.HTTP_400_BAD_REQUEST)
