import logging

import jwt
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import (api_view, authentication_classes,
                                       parser_classes, permission_classes)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from g_admin.models import Token_Store, User
from g_partners.all_views.core_view import BaseViewSet, CustomAutoSchema
from g_partners.helper import return_response

from .serializers import *

log = logging.getLogger(__name__)


def index(request):
    if 'username' in request.session:
        return HttpResponse('Authenticated')
    else:
        return render(request, 'users/user_login.html')

class UserRegister(APIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    serializer = RegisterSerializer
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    my_tags = ["User"]

    # To create user.
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data_send = {'message': 'User has been created successfully.'}
            return return_response(data_send, status.HTTP_200_OK)
        else:
            errors = [serializer.errors[data][0] for data in serializer.errors]
            data_send = {'error': errors}
            log.error(','.join(data_send.get("error")),extra={'className': "",'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

class UserOperations(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    log = log  # To use log in BaseViiewSet.
    serializer = UserSerializerData
    my_tags = ["User"]
    # To update user details.

    def update(self, request, id=None):
        try:
            user_detail = User.objects.filter(id=id).first()
            if user_detail is None:
                error_msg = f"User record {id} not found."
                data_send = {"error": [error_msg]}
                log.error(','.join(data_send.get("error")), extra={'className': self.__class__.__name__,'url_request': request.path})
                return return_response(data_send, status.HTTP_404_NOT_FOUND)
            user_data = UserSerializerData(user_detail,data=request.data, partial=True)
            if user_data.is_valid(raise_exception=True):
                user_data.save()
                data_send = {'message': "User has been updated successfully",
                             'user_details': user_data.data}
                return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # To get user details.
    def list(self, request, id=None):
        try:
            User_obj = User.objects.filter(id=id).first()
            if User_obj is None:
                data_send = {"error": ["User not found"]}
                log.error(','.join(data_send.get("error")),
                          extra={'className': self.__class__.__name__,'url_request': request.path})
                return return_response(data_send, status.HTTP_404_NOT_FOUND)
            user_data = ReadUser(User_obj)
            data_send = {'user_details': user_data.data}
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    # To delete user details.
    def destroy(self, request, id=None):
        try:
            if request.user.id==id:
                user_data = User.objects.filter(id=id).first()
                if user_data is None:
                    data_send = {"error": ["User not found"]}
                    log.error(','.join(data_send.get("error")),
                              extra={'url_request': request.path})
                    return return_response(data_send, status.HTTP_404_NOT_FOUND)
                user_data.delete()
                data_send = {"message": "Username has been deleted succesfully"}
                return return_response(data_send, status.HTTP_204_NO_CONTENT)
            else:
                data_send={"error":'Unable to delete user.'}
                return return_response(data_send, 400)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)


class Userlogin(APIView):
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    permission_classes = [AllowAny]
    my_tags = ["User"]
    
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        try:
            user_auth = authenticate(
                username=request.data['username'], password=request.data['password'])
            tokens = RefreshToken.for_user(user_auth)
        except:
            data_send = {'error': ['Invalid username or password.']}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        try:
            # To check if user credential are valid or not
            if user_auth is not None:
                request.session['username'] = request.data['username']
                request.session['password'] = request.data['password']
                request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                user_data = ReadUser(User.objects.filter(username=user_auth).first())
                tk=str(tokens.access_token)
                token=Token_Store.objects.create(token=tk,user_id_id=user_data.data['id'])
                token.save()
                data_send = {'user_details': user_data.data,'access_token': tk}
                return return_response(data_send, status.HTTP_200_OK)
            else:
                data_send = {'error': ['Invalid username or password.']}
                log.error(','.join(data_send.get("error")),
                          extra={'className': self.__class__.__name__,'url_request': request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": [str(e)]}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)


class Userlogout(APIView):
    authentication_classes = [
        JWTAuthentication, SessionAuthentication]
    permission_classes = [AllowAny]
    my_tags = ["User"]

    # To logout user.
    def get(self, request):
        token_delete=Token_Store.objects.filter(token=request.headers.get('Authorization').replace('Bearer ','')).first()
        if token_delete:
            token_delete.delete() 
        request.session.flush()
        data_send = {'message': 'User has been logout successfully'}
        return return_response(data_send, status.HTTP_200_OK)

class ForgetPassword(APIView):
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    my_tags = ["User"]

    @swagger_auto_schema(request_body=InputEmailSerializer)
    def post(self, request):
        # for unit testing purposes
        if request.META['SERVER_NAME'] == 'testserver':
            request.META['HTTP_HOST'] = request.META['REMOTE_ADDR']+ ':' + request.META['SERVER_PORT']
            request.META['SERVER_PROTOCOL'] = request.META['wsgi.url_scheme']

        email_verify = User.objects.filter(email=request.data['email']).first()
        # To check email address exist or not.
        if email_verify:
            AuthToken = RefreshToken.for_user(email_verify)
            try:
                # To send reset password link to user.
                send_mail(
                    'Reset Password',  # Tittle.
                    f'''Click on this link to reset password\n
                    {str(request.META['SERVER_PROTOCOL']).lower().split('/')[0]}://{request.META['HTTP_HOST']}/api/forget_password/{email_verify.id}/{AuthToken}''',  # body of email.
                    settings.DEFAULT_FROM_EMAIL,  # Load email address of our.
                    # Load email address of user to reset password.
                    [request.data['email']],
                    fail_silently=True  # Not Show error.
                )
                data_send = {
                    'message': 'please check your mail to reset password.'}
                return return_response(data_send, status.HTTP_200_OK)
            except Exception as e:
                data_send = {"error": [str(e)]}
                log.error(','.join(data_send.get("error")),
                          extra={'className': self.__class__.__name__,'url_request': request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        else:
            data_send = {'error': ['email address does not exist']}
            log.error(','.join(data_send.get("error")),
                      extra={'className': self.__class__.__name__,'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
         

class AllUserDetails(BaseViewSet):
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    permission_classes = [IsAuthenticated]
    my_tags = ["User"]
    serializer = ReadUser
    
    def list(self, request, *args, **kwargs):
        try:
            UserObject = User.objects.all().exclude(is_superuser=True).order_by('-id')
            if UserObject is None:
                data_send = {"error": ["User not found"]}
                log.error(','.join(data_send.get("error")),extra={'url_request': request.path})
                return return_response(data_send, status.HTTP_404_NOT_FOUND)
            user = ReadUser(UserObject, many=True)
            data_send = {"user_detail": user.data}
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": [str(e)]}
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            
class ResetEmailPassword(BaseViewSet):
    api_view = ['GET', 'POST']
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    permission_classes = [AllowAny]
    my_tags = ["User"]
    serializer = InputPasswordSerializer
    
    # reset password after clicking on urls sended on email.
    def create(self,request,*args,**kwargs):
        try:
            AuthToken = jwt.decode(jwt=kwargs['token'], key=settings.SECRET_KEY, algorithms=['HS256'])
        except Exception as e:
            data_send = {'error': ['Token is invalid.']}
            log.error(','.join(data_send.get("error")),
                        extra={"className":"",'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        if int(AuthToken['user_id']) != int(kwargs['id']):
            data_send = {'error': ['You don\'t have permission to change password.']}
            log.error(','.join(data_send.get("error")),
                        extra={"className":"",'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
    
        try:
            # if request.method == 'POST':
            if request.data['new_password'] == request.data['confirm_password']:
                user = User.objects.filter(id=kwargs['id']).first()
                user.set_password(request.data['new_password'])
                user.save()
                data_send = {'message': 'Password has been reset successfully'}
                return return_response(data_send, status.HTTP_202_ACCEPTED)
            else:
                data_send = {'error': [
                    '''new password does not matched with confirm password please check and retry again.''']}
                log.error(','.join(data_send.get("error")),
                            extra={"className":"",'url_request': request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
            # else:
                # data_send = {'message': 'valid url'}
                # return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {'error': [str(e)]}
            log.error(','.join(data_send.get("error")),
                        extra={"className":"",'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        
    def list(self,request,*args,**kwargs):
        try:
            AuthToken = jwt.decode(jwt=kwargs['token'], key=settings.SECRET_KEY, algorithms=['HS256'])
        except Exception as e:
            data_send = {'error': ['Token is invalid.']}
            log.error(','.join(data_send.get("error")),
                        extra={'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

        if int(AuthToken['user_id']) != int(kwargs['id']):
            data_send = {'error': ['You don\'t have permission to change password.']}
            log.error(','.join(data_send.get("error")),
                        extra={"className":"",'url_request': request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        data_send = {'message': 'valid url'}
        return return_response(data_send, status.HTTP_200_OK)

class ResetPassword(BaseViewSet):
    api_view = ['POST']
    parser_classes = [FormParser, MultiPartParser]
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    my_tags = ['User']
    serializer = InputPasswordSerializerAuth
    
    def create(self,request,*args,**kwargs):
        try:
            # To validate user entered password is not same.
            if request.data['old_password'] == request.data['new_password']:
                send_data = {'error': [
                    '''Please enter valid password new password can not be same as old password.''']}
                log.error(''.join(send_data["error"]), extra={'className': '','url_request': request.path})
                return return_response(send_data, status.HTTP_400_BAD_REQUEST)
            if request.data['new_password'] != request.data['confirm_password']:
                send_data = {
                    'error': ['''New password and confirm password has to be same.''']}
                log.error(''.join(send_data["error"]), extra={'className': '','url_request': request.path})
                return return_response(send_data, status.HTTP_400_BAD_REQUEST)
            # To check user credentials if user enter wrong password exception error will occured.
            check_user_password = authenticate(
                username=request.user, password=request.data['old_password'])
            # Check old password is correct or not.
            if check_user_password is not None:
                user = User.objects.get(username=request.user)
                user.set_password(request.data['new_password'])
                user.save()
                data_send = {
                    "message": "password has been updated successfully."}
                return return_response(data_send, status.HTTP_200_OK)
            else:
                data_send = {"error": ["Invalid username or password."]}
                log.error(','.join(data_send.get("error")),extra={'className': "",'url_request': request.path})
                return return_response(data_send, status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            data_send = {"error": ["Invalid username or password."]}
            log.error(','.join(data_send.get("error")),extra={'className': "",'url_request': request.path})
            return return_response(data_send, status.HTTP_406_NOT_ACCEPTABLE)
