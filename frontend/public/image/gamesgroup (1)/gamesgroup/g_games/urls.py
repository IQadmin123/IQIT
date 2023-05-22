from django.urls import path
from .views import *

urlpatterns = [
    path('game',Games_View.as_view({'get': 'list','post':'create'}),name='game'),
    path('game/details/<str:game_name>',Game_Details.as_view({'get': 'list'}),name='game_detail'),
    path('game/<str:game_name>',Game_View.as_view({'get': 'list','put': 'update','delete': 'destroy'}),name='game_single'),
]
