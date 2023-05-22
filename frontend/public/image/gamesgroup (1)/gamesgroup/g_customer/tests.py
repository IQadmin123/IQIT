from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from g_admin.models import User
from g_admin.models import Token_Store
from rest_framework.test import APIRequestFactory
from django.conf import settings

# Create your tests here.
class TestCases(APITestCase):
    def setUp(self):        
        self.username='Shashank'
        self.password='admin'
        usr=User.objects.create_user(username=self.username,password=self.password,email="admin@admin.com")
        usr.save()
        req=self.client.post(reverse('Login User'),{'username':self.username,'password':self.password})
        self.token=req.json().get('access_token')
        self.client=APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(self.token))
        self.client_unauth=APIClient()
        self.data=self.get_data()
        # To ignore runtime warning
        settings.USE_TZ=False

    
    def show_data(self,req,para={'data':True,"code":True}):
        if para.get('data'):print(req.json())
        if para.get('code'):print(req.status_code)
    
    def get_data(self):
        data={"name":"demo_customer",
        "email":"democustomer@gmail.com",
        "phone_number":"+917878956554",
        "location":"IND"}
        return data
        
    def test_A(self):
        # To check create customer api.[test_customer_post]
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        self.assertEqual(req.status_code,200)
        self.assertEqual(req.json().get('status'),True)
        
    def test_B(self):
        # To check get api of customer.[test_customer_get]
        test_url=reverse('customer')
        req=self.client.get(test_url)
        self.assertEqual(req.status_code,200)
        self.assertEqual(req.json().get('status'),True)
    
    def test_C(self):
        # test_customer_get_unauth
        test_url=reverse('customer')
        req=self.client_unauth.get(test_url)
        # self.show_data(req)
        self.assertEqual(req.status_code,403)
        self.assertEqual(req.json().get('status'),False)
    
    def test_D(self):
        # test_customer_post_empty
        test_url=reverse('customer')
        req=self.client.post(test_url,{})
        self.assertEqual(req.status_code,400)
        self.assertEqual(req.json().get('status'),False)
        
    def test_E(self):
        # test_customer_post_duplicate_email
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        data=self.data.copy()
        data.update({'name':'Shashank','phone_number':'+919099918110'})
        req=self.client.post(test_url,self.data)
        self.assertEqual(req.status_code,400)
        self.assertEqual(req.json().get('status'),False)
    
    def test_F(self):
        # test_customer_post_unauth
        test_url=reverse('customer')
        req=self.client_unauth.post(test_url,self.data)
        self.assertEqual(req.status_code,403)
        self.assertEqual(req.json().get('status'),False)
        
    def test_G(self):
        # test_customer_delete
        req=self.client.post(reverse('customer'),self.data)
        id=self.client.get(reverse('customer')).json().get('data')[-1].get('id')
        req=self.client.delete(reverse('single_customer',kwargs={'id':id}))
        self.assertEqual(req.status_code,204)
        # self.assertEqual(req.json().get('status'),True)
    
    def test_H(self):
        # test_customer_delete_unauth
        req=self.client.post(reverse('customer'),self.data)
        id=self.client.get(reverse('customer')).json().get('data')[-1].get('id')
        # print(">"*10,id,"<"*10)
        test_url=reverse('single_customer',kwargs={'id':id})
        req=self.client_unauth.delete(test_url)
        self.assertEqual(req.status_code,403)
        # self.assertEqual(req.json().get('status'),True)
    
    def test_I(self):
        # test_customer_delete_not_found
        req=self.client.post(reverse('customer'),data=self.data)
        test_url=reverse('single_customer',kwargs={'id':1245})
        req=self.client.delete(test_url)
        self.assertEqual(req.status_code,400)
        self.assertEqual(req.json().get('status'),False)
    
    def test_J(self):
        # test_customer_put
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        req=self.client.get(test_url)
        self.data.update({"location":"JAP"})
        test_url=reverse('single_customer',kwargs={'id':req.json().get('data')[-1].get('id')})
        req=self.client.put(test_url,self.data)
        self.assertEqual(req.status_code,200)
        self.assertEqual(req.json().get('status'),True)
    
    def test_K(self):
        # test_customer_put_not_found
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        req=self.client.get(test_url)
        self.data.update({"location":"JAP"})
        test_url=reverse('single_customer',kwargs={'id':124545})
        req=self.client.put(test_url,self.data)
        self.assertEqual(req.status_code,400)
        self.assertEqual(req.json().get('status'),False)
     
    def test_L(self):
        # test_customer_put_duplicate_email
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        data=self.data.copy()
        data.update({'email':'shashank.jain@iqinifinte.in'})
        req=self.client.post(test_url,data)
        test_url=reverse('single_customer',kwargs={'id':8})
        req=self.client.put(test_url,{'email':'shashank.jain@iqinifinte.in'})  
        self.assertEqual(req.status_code,400)
        self.assertEqual(req.json().get('status'),False)
    
    def test_M(self):
        # test_customer_put_unauth
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        req=self.client.get(test_url)
        self.data.update({"location":"JAP"})
        test_url=reverse('single_customer',kwargs={'id':124545})
        req=self.client_unauth.put(test_url,self.data)
        self.assertEqual(req.status_code,403)
        self.assertEqual(req.json().get('status'),False)
        
    def test_N(self):
        # test_customer_put_email
        test_url=reverse('customer')
        req=self.client.post(test_url,self.data)
        req=self.client.get(test_url)
        self.data.update({"location":"JAP"})
        test_url=reverse('single_customer',kwargs={'id':124545})
        req=self.client_unauth.put(test_url,self.data)
        self.assertEqual(req.status_code,403)
        self.assertEqual(req.json().get('status'),False)

    def test_O(self):
        # test_customer_game_detail
        req=self.client.post(reverse('customer'),self.data)
        test_url=reverse('single_customer_detail',kwargs={'id':1})
        req=self.client.get(test_url)
        self.assertEqual(req.status_code,200)
        self.assertEqual(req.json().get('status'),True)