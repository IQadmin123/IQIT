import json

from django.urls import reverse, resolve
from rest_framework.test import APITestCase,APIClient
from django.test.utils import override_settings
from g_admin.models import User
from g_games.models import Game_Detail
from g_customer.models import customer_details
from g_partners.models import *
from g_partners.helper import set_schema
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile


class PartnerAPITestCase(APITestCase):
    # Note: Not covered test cases of country added in partner.
    databases = {'default','public'}

    def setUp(self):
        # print(request.json(),request.status_code)
        self.username = 'Shashank'
        self.password = 'admin'
        usr = User.objects.create_user(username = self.username,password = self.password,email = "admin@admin.com")
        usr.save()
        self.cus = customer_details.objects.create(name = "Shashank",email = "admin@admin.in",phone_number = "+91909191515",location = "IND")
        self.cus.save()
        self.game = Game_Detail.objects.create(game_name="Test_new_structure",short_name="public",category="testing",customer_id=self.cus)
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
        # pass
        
    def clear_down(self):
        """
        To delete public schema records in between test case.
        """
        set_schema("public","public")
        models = [Partner,PartnerCountry,PartnerPlatform,child_refid]
        for model in models:
            obj = model.objects.using('public').all().delete()
    
    def check_record(self,multiple=False,return_field=''):
        """
        To check if partner exists in partner table or not.
        if partner exists return id.
        else create and enter id.

        Returns:
            int: returns public last record id.
        """
        try:
            set_schema("public","public")
            if Partner.objects.using('public').all().count()==0:
                data=self.get_data("dict")
                extra={}
                for x in ['country','multiple_refid','platform']:
                    extra[x]=data.pop(x)
                obj=Partner.objects.using("public").create(**data)
                obj.save()
                if multiple:
                    lst=list(set(extra.get('multiple_refid').split(',')))
                    child=child_refid.objects.using("public").bulk_create(list(map(lambda e:child_refid(child=e,parent_refid=obj.refid),lst)))
                    lst=list(set(extra.get('platform').split(',')))
                    platform=PartnerPlatform.objects.using("public").bulk_create(list(map(lambda e:PartnerPlatform(partner=obj,platform=e),lst)))
                if return_field=="child":
                    return child[0].id
                else:
                    return obj.id
            else:
                id=Partner.objects.using('public').last().id
                if return_field=="child":
                    child=child_refid.objects.using('public').filter(parent_refid=Partner.objects.using('public').last().refid).last()
                    return child.id
                return id
        except Exception as e:
            print(str(e))

    def convert_data(self,data):
        converted_data = json.dumps(data)
        return converted_data
    
    def get_data(self,key=''):
        data = {
            "refid": "7878-565-574",
            "start_date": "2022-01-03",
            "end_date": "2022-01-10",
            "share_cost": 50,
            "cpl_cost": 3.75,
            "partner_name": "SelfMedia",
            "department": "SelfDepart",
            "platform": "web,android,iphone",
            "country": "ET,FJ,GF,IND",
            "multiple_refid": "1234,1245,1246,12349"
        }
        if key!="dict":
            data=self.convert_data(data)
        return data
    
    def test_A(self):
        # To check create partner api.
        url = reverse('all_partners',kwargs={"game_name":"public"})    
        request = self.client.post(url,data=self.get_data(),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_B(self):
        # To check create partner api without authentication.
        url = reverse('all_partners',kwargs={"game_name":"public"})    
        request_unauth = self.client_unauth.post(url,data=self.get_data(),content_type = 'application/json')
        self.assertEqual(request_unauth.status_code,403)
        self.assertEqual(request_unauth.json().get('status'),False)
    
    def test_C(self):
        # To check date validation.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        # To check validation of start_date greater than end_date validation
        data=self.get_data("dict")
        data.update({'start_date':'2023-11-12'})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_D(self):
        # To check validation of start_date creating confilct with old data. 
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        data.update({'start_date':'2022-01-08'})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_E(self):
        # To check validation of end_date creating confilct with old data.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        data.update({'start_date':'2020-01-08','end_date':'2022-01-08'})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_F(self):
        # To verify, user can't send refid as empty string.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        data.update({'refid':''})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_G(self):
        # To verify, user can't send start_date as empty string.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        data.update({'start_date':''})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_H(self):
        # To verify, user can't send end_date as empty string.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        data.update({'end_date':''})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_I(self):
        # To check validation of refid and multiple refid.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        data.update({'multiple_refid':','.join([data.get('refid',''),data.get('multiple_refid')])})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_J(self):
        # To verify, user can't insert refid again within same daterange.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        data.update({"refid":data.get("multiple_refid").split(',')[0],'multiple_refid':','.join(data.get("multiple_refid").split(',')[1:])})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_K(self):
        # To verify, user can insert refid again with diffrent date range.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        data.pop("multiple_refid")
        data.update({"start_date":"1998-01-01","end_date":"2001-12-31"})
        request = self.client.post(url,data=self.convert_data(data),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_L(self):
        # To check validation of get api.
        request=self.client.get(reverse('all_partners',kwargs={"game_name":"public2"}),content_type = 'application/json')
        self.assertEqual(request.json().get('status'),False)
        self.assertEqual(request.status_code,400)
    
    def test_M(self):
        self.clear_down()
        url = reverse('all_partners',kwargs={"game_name":"public"})
        request=self.client.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_N(self):
        # No game found.
        url = reverse("single_partner",kwargs={"game_name":"public","id":1})
        request=self.client.get(reverse("single_partner",kwargs={"game_name":"public2","id":1}),content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_O(self):
        id=self.check_record()
        url = reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_P(self):
        # To check delete of partner.
        url = reverse("single_partner",kwargs={"game_name":"public2","id":0})
        request = self.client.delete(url,content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_Q(self):
        url = reverse("single_partner",kwargs={"game_name":"public","id":0})
        request = self.client.delete(url,content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_R(self):
        id=self.check_record()
        url = reverse("single_partner",kwargs={"game_name":"public","id":id})
        request = self.client.delete(url,content_type = 'application/json')
        self.assertEqual(request.status_code,204)
    
    def test_S(self):
        # To check delete of partner.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.put(url,data={"share_cost":80})
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
        
    def test_T(self):
        # To validate date range from start_date.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.put(url,data={"start_date":"2022-05-05"})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_U(self):    
        # To validate date range from end_date.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.put(url,data={"end_date":"2020-12-05"})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
        # request=self.client.get(reverse("all_partners",kwargs={"game_name":"public"}),content_type = 'application/json')
        # print('After','\n',request.json(),'\n')
    
    def test_V(self):
        # To validate if id is not available
        url=reverse("single_partner",kwargs={"game_name":"public","id":0})
        request=self.client.put(url,data={"share_cost":50})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_W(self):
        # To verify, the user cannot change the refid.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.put(url,data={"refid":"ABCD"})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_X(self):
        # To verify, the user input value enter valid date range.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client.put(url,data={"start_date":"2022-01-05","end_date":"2022-01-03"})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_Y(self):
        # To create child of partner.
        id=self.check_record()
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.post(url,data={"child":"ABCD,EFGH,IJSK"})
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)        
    
    def test_Z(self):
        # To verify, user added child parameter.
        id=self.check_record()
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.post(url,data={"childs":"ABCD,EFGH,IJSK"})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)        
    
    def test_ZA(self):
        # To verify, user added child data.
        id=self.check_record()
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.post(url,data={"child":""})
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)        
    
    def test_ZB(self):
        # To verify, duplicate refid of partner table not inserted in child table.
        id=self.check_record()
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.post(url,data={"child":self.get_data("dict").get('refid')})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZC(self):
        # To verify, duplicate child not created.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.post(url,data={"child":"1234"})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZD(self):
        # To verify, game exists while checking child of particular partner.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public2","id":id})
        request=self.client.get(url)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZE(self):
        # To verify, game exists while checking child of particular partner.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":0})
        request=self.client.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZF(self):
        # To verify, getting child records of partner.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_ZG(self):
        # To validate game first to destroy child.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public2","id":id})
        request=self.client.delete(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZH(self):
        # To verify, partner game to destroy child.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":0})
        request=self.client.delete(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZI(self):
        # To verify, partner game to destroy child.
        id=self.check_record(True,"child")
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client.delete(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,204)
    
    def test_ZJ(self):
        # To verify, partner game to destroy child.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":0})
        request=self.client.delete(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZK(self):
        # To verify, getting all country details.
        url=reverse("country")
        request=self.client.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_ZL(self):
        # To verify, getting all country details.
        url=reverse("single_country",kwargs={"pk":1})
        request=self.client.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_ZM(self):
        # To verify, getting all country details.
        url=reverse("add_csv",kwargs={"game_name":"public"})
        request=self.client.post(url,data={"csv_file":"/home/shashank/Downloads/SJ/tt.csv"})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZN(self):
        # To verify, csv file is needed to upload file.
        url=reverse("add_csv",kwargs={"game_name":"public"})
        request=self.client.post(url,data={"csv_file":"/home/shashank/Downloads/SJ/tt.csv"})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZO(self):
        # To verify, csv file is needed to upload file.
        url=reverse("add_csv",kwargs={"game_name":"public"})
        request=self.client.post(url,data={"csv_file":SimpleUploadedFile("file.csv", b"file_content", content_type="text/csv")})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_ZP(self):
        # To verify, partner's csv file.
        url=reverse("read_csv",kwargs={"game_name":"public"})
        request=self.client.get(url,content_type="text/csv")
        print(request.status_code)
        self.assertEqual(request.status_code,200)
        
    def test_ZQ(self):
        # To verify, response of invalid game partner's csv file genrate error.
        url=reverse("read_csv",kwargs={"game_name":"public2"})
        request=self.client.get(url,content_type="text/csv")
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZR(self):
        # To verify, response of insert spendings.
        url=reverse("spendings",kwargs={"game_name":"public"})
        data={
            "date":"2022-01-01","net_euro":7,"regs":8,"share_cost":8,"cpl_cost":8,"refid":"ABCS","platform":"","country":""}
        request=self.client.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)
    
    def test_ZS(self):
        # To verify, response of invalid game at time of inserting record.
        url=reverse("spendings",kwargs={"game_name":"public2"})
        data={
            "date":"2022-01-01","net_euro":7,"regs":8,"share_cost":8,"cpl_cost":8,"refid":"ABCS","platform":"","country":""}
        request=self.client.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZT(self):
        # To verify, response of invalid game at time of inserting record.
        url=reverse("spendings",kwargs={"game_name":"public2"})
        data={
            "net_euro":7,"regs":8,"share_cost":8,"cpl_cost":8,"platform":"","country":""}
        request=self.client.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZT(self):
        # To verify, response of scheduling spendings of particular partner.
        url=reverse("cal_spendings",kwargs={"game_name":"public","id":12})
        data={"start_date":"2022-01-01","end_date":"2022-06-30"}
        request=self.client.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,200)
        self.assertEqual(request.json().get('status'),True)

    def test_ZU(self):
        # To verify, response of empty input paramet in calculate spendings.
        url=reverse("cal_spendings",kwargs={"game_name":"public","id":12})
        data={"start_date":"","end_date":""}
        request=self.client.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)

    def test_ZV(self):
        # To verify, response of invalid date format input paramet in calculate spendings.
        url=reverse("cal_spendings",kwargs={"game_name":"public","id":12})
        data={"start_date":"2022/01/01","end_date":"2022-01-01"}
        request=self.client.post(url,data=data)
        # print('\n',request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
        
        data={"start_date":"01/01/2022","end_date":"01-01-01"}
        request=self.client.post(url,data=data)
        # print('\n',request.json(),request.status_code)
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)

    # To validate request with unauth.
    def test_ZW(self):
        # To check create partner api [test_A].
        url = reverse('all_partners',kwargs={"game_name":"public"})    
        request = self.client_unauth.post(url,data=self.get_data(),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZX(self):
        # To verify, user can insert refid again with diffrent date range.
        url = reverse('all_partners',kwargs={"game_name":"public"})
        data=self.get_data("dict")
        request = self.client_unauth.post(url,data=self.convert_data(data),content_type = 'application/json')
        data.pop("multiple_refid")
        data.update({"start_date":"1998-01-01","end_date":"2001-12-31"})
        request = self.client_unauth.post(url,data=self.convert_data(data),content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZY(self):
        # No partner found.
        url = reverse("single_partner",kwargs={"game_name":"public","id":0})
        request=self.client.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,400)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZ(self):
        id=self.check_record()
        url = reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZA(self):
        id=self.check_record()
        url = reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.get(url,content_type = 'application/json')
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZZB(self):
        # To check delete of partner.
        id=self.check_record()
        url=reverse("single_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.put(url,data={"share_cost":80})
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZZC(self):
        id=self.check_record()
        url = reverse("single_partner",kwargs={"game_name":"public","id":id})
        request = self.client_unauth.delete(url,content_type = 'application/json')
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZD(self):
        # To create child of partner.
        id=self.check_record()
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.post(url,data={"child":"ABCD,EFGH,IJSK"})
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZZE(self):
        # To verify, getting child records of partner.
        id=self.check_record(True)
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZZF(self):
        # To verify, partner game to destroy child.
        id=self.check_record(True,"child")
        url=reverse("child_partner",kwargs={"game_name":"public","id":id})
        request=self.client_unauth.delete(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
    
    def test_ZZG(self):
        # To verify, getting all country details.
        url=reverse("country")
        request=self.client_unauth.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZH(self):
        # To verify, getting all country details.
        url=reverse("single_country",kwargs={"pk":1})
        request=self.client_unauth.get(url,content_type = 'application/json')
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZZI(self):
        # To verify, csv file is needed to upload file.
        url=reverse("add_csv",kwargs={"game_name":"public"})
        request=self.client_unauth.post(url,data={"csv_file":SimpleUploadedFile("file.csv", b"file_content", content_type="text/csv")})
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZJ(self):
        # To verify, partner's csv file.
        url=reverse("read_csv",kwargs={"game_name":"public"})
        request=self.client_unauth.get(url,content_type="text/csv")
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
    
    def test_ZZK(self):
        # To verify, response of insert spendings.
        url=reverse("spendings",kwargs={"game_name":"public"})
        data={
            "date":"2022-01-01","net_euro":7,"regs":8,"share_cost":8,"cpl_cost":8,"refid":"ABCS","platform":"","country":""}
        request=self.client_unauth.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)
        
    def test_ZT(self):
        # To verify, response of scheduling spendings of particular partner.
        url=reverse("cal_spendings",kwargs={"game_name":"public","id":12})
        data={"start_date":"2022-01-01","end_date":"2022-06-30"}
        request=self.client_unauth.post(url,data=data)
        # print(request.json(),request.status_code)
        self.assertEqual(request.status_code,403)
        self.assertEqual(request.json().get('status'),False)