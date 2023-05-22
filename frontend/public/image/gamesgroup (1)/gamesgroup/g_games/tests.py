import base64
import json

import requests
from django.conf import settings
from django.test import TestCase
from django.urls import resolve, reverse
from rest_framework.test import APIClient, APIRequestFactory, APITestCase

from g_admin.models import Token_Store, User
from g_customer.models import customer_details
from g_games.models import Game_Detail
from g_partners.models import *
from g_partners.helper import set_schema

# Create your tests here.
class TestCases(APITestCase):
    databases = {'default','public'}
    def setUp(self):        
        self.username = 'Shashank'
        self.password = 'admin'
        usr = User.objects.create_user(username = self.username,password = self.password,email = "admin@admin.com")
        usr.save()
        self.cus = customer_details.objects.create(name = "Shashank",email = "admin@admin.in",phone_number = "+91909191515",location = "IND")
        self.cus.save()
        req = self.client.post(reverse('Login User'),{'username':self.username,'password':self.password})
        self.token = req.json().get('access_token')
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION = 'Bearer {0}'.format(self.token))
        self.client_unauth = APIClient()
        self.data = self.get_data()
        # To ignore runtime warning
        settings.USE_TZ = False
    
    @classmethod
    def tearDownClass(cls):
        set_schema("public","public")
        models = [Partner,PartnerCountry,PartnerPlatform,child_refid]
        for model in models:
            obj = model.objects.using('public').all().delete()

    
    def show_data(self,req,para = {'data':True,"code":True}):
        if 'data' in para.keys() and para.get('data'):print(req.json())
        if 'code' in para.keys() and para.get('code'):print(req.status_code)
    
    def get_data(self,keys = ''):
        data = {
                "game_name": "Test_new_structure",
                "short_name": "public",
                "category": "Actions",
                "details": "Games Group game",
                "customer_id": self.cus.id,
                "image": base64.b64encode(requests.get('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg').content).decode('utf-8')
                }    
        if keys == 'game_empty_image':
          data.update({'image':""})
        if keys == 'game':
          data = data
        if keys == 'game_invalid_customer':
            data.update({"customer_id": 144545})
        if keys == 'game_invalid_image':
            data.update({"image": 'sfsdsbjui21i23h12323enjk'})
        if keys == 'default':
            data.update({"short_name": "default"})
        if keys == 'change_schema':
            data.update({"short_name": "test"})
        if keys == 'game_update':
            data = {"category": "Default"}
        if keys == 'partner_data':
            data = {"refid":"abcd","start_date":"2022-01-01","end_date":"2022-06-01"}
        data = json.dumps(data)
        return data
    
    def test_A(self):
        url = reverse('game')
        request = self.client.post(url,data = self.get_data('game'),content_type = 'application/json')
        self.assertEqual(request.status_code,200)   

    def test_B(self):
        url = reverse('game')
        request = self.client_unauth.post(url,self.get_data('game'),content_type = 'application/json')
        self.assertEqual(request.status_code,403)

    def test_C(self):
        url = reverse('game')    
        request_invalid_customer = self.client.post(url,self.get_data('game_invalid_customer'),content_type = 'application/json')
        self.assertEqual(request_invalid_customer.status_code,400)

    def test_D(self):
        url = reverse('game')    
        request_invalid_image = self.client.post(url,self.get_data('game_invalid_image'),content_type = 'application/json')
        self.assertEqual(request_invalid_image.status_code,400)

    def test_E(self):
        url = reverse('game')    
        request = self.client.post(url,self.get_data('game'),content_type = 'application/json')
        request_duplicate = self.client.post(url,self.get_data('game'),content_type = 'application/json')
        self.assertEqual(request_duplicate.status_code,400)
        
    def test_F(self):
        url = reverse('game')    
        request_empty_image = self.client.post(url,self.get_data('game_empty_image'),content_type = 'application/json')
        self.assertEqual(request_empty_image.status_code,200)
        
    def test_G(self):
        url = reverse('game')    
        request = self.client.post(url,self.get_data('game'),content_type = 'application/json')
        request = self.client.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,200)
        
    def test_H(self):
        url = reverse('game')    
        request = self.client.post(url,self.get_data('game'),content_type = 'application/json')
        request = self.client_unauth.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,403)
        
    def test_I(self):
        url = reverse('game')
        invalid_token = APIClient()
        invalid_token.credentials(HTTP_AUTHORIZATION = 'Bearer {0}23'.format(self.token))
        request = invalid_token.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_J(self):
        # Game not found
        url = reverse('game_detail',kwargs = {"game_name":"sample"})
        request = self.client.get(url)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False) 
    
    def test_K(self):
        # Partner not found.
        request = self.client.post(reverse('game'),data = self.get_data(''),content_type = "application/json")
        url = reverse('game_detail',kwargs = {"game_name":"public"})
        request = self.client.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_L(self):
        request = self.client.post(reverse('all_partners',kwargs = {"game_name":"public"}),data = self.get_data('partner_data'),content_type = "application/json")
        request = self.client.post(reverse('game'),data = self.get_data(''),content_type = "application/json")
        url = reverse('game_detail',kwargs = {"game_name":"public"})
        request = self.client.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_M(self):
        request = self.client.post(reverse('all_partners',kwargs = {"game_name":"public"}),data = self.get_data('partner_data'),content_type = "application/json")
        request = self.client.post(reverse('game'),data = self.get_data(''),content_type = "application/json")
        url = reverse('game_detail',kwargs = {"game_name":"public"})
        request = self.client.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_N(self):
        # Unauthorized api URL.
        request = self.client.post(reverse('all_partners',kwargs = {"game_name":"public"}),data = self.get_data('partner_data'),content_type = "application/json")
        request = self.client.post(reverse('game'),data = self.get_data(''),content_type = "application/json")
        url = reverse('game_detail',kwargs = {"game_name":"public"})
        request = self.client_unauth.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_O(self):
        url = reverse('game_single',kwargs = {"game_name":"public2"})
        request = self.client.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
        
        request = self.client_unauth.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_P(self):
        # To view game by name.
        url = reverse('game_single',kwargs = {"game_name":"public2"})
        request = self.client.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
        
        request = self.client_unauth.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_Q(self):
        # To update game.
        url  =  reverse("game_single",kwargs = {"game_name":"public"})
        request = self.client.post(reverse("game"),data=self.get_data(''),content_type = "application/json")
        request = self.client.put(url,data=self.get_data(''),content_type = "application/json")
        request_unauth = self.client_unauth.put(url,data=self.get_data(''),content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
        self.assertEqual(request_unauth.status_code,403)
        self.assertEqual(request_unauth.json().get('status'),False)
    
    def test_R(self):
        # To get game details.
        url  =  reverse("game_single",kwargs = {"game_name":"public"})
        request = self.client.post(reverse("game"),data=self.get_data(''),content_type = "application/json")
        request = self.client.get(url,content_type = "application/json")
        request_unauth = self.client_unauth.get(url,content_type = "application/json")
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
        self.assertEqual(request_unauth.status_code,403)
        self.assertEqual(request_unauth.json().get('status'),False)
    
    def test_S(self):
        # To delete game details.
        url  =  reverse("game_single",kwargs = {"game_name":"public"})
        request = self.client.post(reverse("game"),data=self.get_data(''),content_type = "application/json")
        request = self.client.delete(url,content_type = "application/json")
        request_unauth = self.client_unauth.delete(url,content_type = "application/json")
        self.assertEqual(request.status_code,204)
        self.assertEqual(request_unauth.status_code,403)
        self.assertEqual(request_unauth.json().get('status'),False)
        