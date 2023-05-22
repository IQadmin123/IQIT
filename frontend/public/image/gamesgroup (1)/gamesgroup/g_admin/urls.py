from django.urls import path
from rest_framework.authtoken import views as rest_view
from .views import *

urlpatterns = [
    path('api-token-auth/', rest_view.obtain_auth_token,name='jwt-token'),
    path('register_user', UserRegister.as_view(), name='Register'),
    path('login', Userlogin.as_view(), name='Login User'),
    path('logout', Userlogout.as_view(), name="logout user"),
    path('edit_user/<int:id>',
         UserOperations.as_view({'put': 'update'}), name='edit user'),
    path('user/<int:id>',
         UserOperations.as_view({'get': 'list', 'delete': 'destroy'}), name='get_user_details'),
#     path('user', UserOperations.as_view(
#         {'get': 'get_by_id'}), name='user details'),
    path('all_user', AllUserDetails.as_view({"get":"list"}), name='all_user_details'),
    path('forget', ForgetPassword.as_view(), name='Send_forgot_mail'),
    path('', index, name='home page'),
    path('forget_password/<int:id>/<str:token>',ResetEmailPassword.as_view({"post":"create","get":"list"}), name='Forget_Password'),
    path('change_password', ResetPassword.as_view({"post":"create"}), name='Change_Password')
]
