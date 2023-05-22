import logging

from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from g_customer.models import customer_details
from g_customer.serializers import Customer
from g_games.models import Game_Detail
from g_games.serializers import Game_Details
from g_partners.all_views.core_view import BaseViewSet
from g_partners.helper import db_cursor, return_response

from .serializers import Show_Customer

log=logging.getLogger(__name__)

class CustomerOperations(BaseViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    serializer = Customer
    queryset = customer_details.objects.all().order_by('-id')
    lookup_field = 'id'
    log = log
    my_tags = ["Customer"]
    
    def get_single(self, request, *args, **kwargs):
        try:
            self.queryset = customer_details.objects.filter(id=kwargs['id'])
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            if len(serializer.data) == 0:
                data_send = {'error': ['No data found.']}
                log.error('No data found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                status_send = status.HTTP_400_BAD_REQUEST
            else:
                data_send = {"customer_data": serializer.data}
                status_send = status.HTTP_200_OK
            return return_response(data_send, status_send)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            CustomerObj = customer_details.objects.filter(id=kwargs['id']).first()
            if CustomerObj is None:
                data_send = {'error': ['No data found.']}
                log.error('No data found.',extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            CustomerObj.delete()
            games_data = Game_Detail.objects.filter(customer_id=kwargs['id'])
            for game in games_data:
                db_cursor().execute(
                    f'''drop schema IF EXISTS {game.short_name} cascade;''')
            data_send = {"message": 'customer has been deleted successfully.'}
            return return_response(data_send, status.HTTP_204_NO_CONTENT)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)


class CustomerDetails(BaseViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    log = log
    serializer = Show_Customer
    my_tags = ["Customer"]
    
    # To load paricular customer as well as game of particular customer.
    def list(self, request, *args, **kwargs):
        try:
            data = {}
            self.serializer = Show_Customer
            CustomerObj = customer_details.objects.filter(id=kwargs['id'])
            self.lookup_field = 'id'
            serializer = self.get_serializer(CustomerObj, many=True)
            data['basic_details'] = serializer.data
            data_send = {"customer_details": data}

            self.serializer = Game_Details
            GameObj = Game_Detail.objects.filter(customer_id=kwargs['id'])
            self.lookup_field = 'customer_id'
            serializer = self.get_serializer(GameObj, many=True)
            data['games'] = serializer.data
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
