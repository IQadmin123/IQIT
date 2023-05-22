from django.urls import path
from .views import *

urlpatterns = [
    path('customer',CustomerOperations.as_view({'get':'list','post':'create'}),name='customer'),
    path('customer/<int:id>',CustomerOperations.as_view({'get':'get_single','put':'update','delete':'destroy'}),name='single_customer'),
    path('game_details/<int:id>',CustomerDetails.as_view({'get':'list'}),name='single_customer_detail'),
]
