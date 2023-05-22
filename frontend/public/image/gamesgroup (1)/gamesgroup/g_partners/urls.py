from django.urls import path

from .views import *

urlpatterns = [
    path('partners/<str:game_name>',Parent_AllDetails.as_view({'post':'create','get':'list'}),name='all_partners'),
    path('partners/<str:game_name>/<int:id>',Partner_View.as_view({'get':'list','put':"update",'delete':'destroy'}),name="single_partner"),
    path('partners/child/<str:game_name>/<int:id>',Parent_Single_View.as_view({'post':'create','get':'list','delete':'destroy'}),name="child_partner"),
    path('country',Country_View.as_view({'get': 'list'}),name="country"),
    path('country/<int:pk>',Country_View.as_view({'get': 'get_single'}),name="single_country"),
    path('<str:game_name>/add_csv',Upload_Excel.as_view({'post': 'create'}),name="add_csv"),
    path('<str:game_name>/download_csv',Upload_Excel.as_view({'get': 'list'}),name="read_csv"),
    path('partners/spendings_auto/<str:game_name>',Spendings_Auto.as_view({'post': 'create'}),name="spendings"),
    path('partners/autosync/<str:game_name>/<int:id>',Spendings_Auto_Sync.as_view({"post":"create"}),name="cal_spendings"),
    path('applepayout/',Apple_payout_report.as_view({"get":'get'}),name='apple_payout')
]