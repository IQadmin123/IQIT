from django.test.utils import override_settings
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase

from g_admin.models import User


class GetAllUserTests(APITestCase):
    client = APIClient()
    usernm = 'testingadmin'
    passwd = 'testingpassword'
    def setUp(self):
        self.user = User.objects.create_user(username=self.usernm, password=self.passwd)
        resp_login = self.client.post(reverse('Login User'), data={"username": self.usernm, "password": self.passwd})
        resp_login_wrongcred = self.client.post(reverse('Login User'), data={"username": self.usernm+'wrong', "password": self.passwd+'wrong'})
        self.token = resp_login.json()['access_token']
        self.assertEqual(resp_login.status_code, 200)
        self.assertEqual(resp_login_wrongcred.status_code, 400)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(self.token))

    def tearDown(self):
        pass
        
    def test_A(self):
        #test_get_all_users_list 1
        resp_users_all = self.client.get(reverse('all_user_details'))
        self.assertEqual(resp_users_all.status_code, 200)
    def test_B(self):
        #test_get_all_users_list_unauthenticated 2
        self.client.force_authenticate(user=None,token=None)
        resp_users_all = self.client.get(reverse('all_user_details'))
        self.assertEqual(resp_users_all.status_code, 403)

    def test_C(self):
        #edit_user_info 3
        resp_edit_user = self.client.put(reverse('edit user',args=[3]),data={"email":"nishit.makwana@iqinfinite.in"})
        self.assertEqual(resp_edit_user.status_code, 200)
        self.assertEqual(resp_edit_user.json()['user_details']['email'],"nishit.makwana@iqinfinite.in")

    def test_D(self):
        #edit_user_info_unauthenticated 4
        self.client.force_authenticate(user=None,token=None)
        resp_edit_user = self.client.put(reverse('edit user', args=[2]), data={"email": "nishit.makwana@iqinfinite.in"})
        self.assertEqual(resp_edit_user.status_code, 403)


    def test_E(self):
        #register_new_user 5
        resp_register_user = self.client.post(reverse('Register'),data={"email":"test2@gmail.info","username":"test2","password":"test@123"})
        resp_register_user_duplicate = self.client.post(reverse('Register'),data={"email":"test2@gmail.info","username":"test2","password":"test@123"})
        self.assertEqual(resp_register_user.status_code,200)
        self.assertEqual(resp_register_user.json()['status'], True)
        self.assertEqual(resp_register_user_duplicate.json()['status'], False)

    def test_F(self):
        #register_new_user_unauthenticated 6
        self.client.force_authenticate(user=None, token=None)
        resp_register_user = self.client.post(reverse('Register'),data={"email":"test2@gmail.info","username":"test2","password":"test@123"})
        self.assertEqual(resp_register_user.status_code,403)

    def test_G(self):
        #get_perticular_user_data 7
        resp_get_per_user = self.client.get(reverse('get_user_details',args=[8]))
        self.assertEqual(resp_get_per_user.status_code, 200)

    def test_H(self):
        #get_perticular_user_data_unauthenticated 8
        self.client.force_authenticate(user=None, token=None)
        resp_get_per_user = self.client.get(reverse('get_user_details',args=[7]))
        self.assertEqual(resp_get_per_user.status_code, 403)


    def test_I(self):
        #delete_perticular_user_data 9
        resp_delete_user = self.client.delete(reverse('get_user_details',args=[10]))
        self.assertEqual(resp_delete_user.status_code, 204)

    def test_J(self):
        #delete_perticular_user_data_unauthenticate 10
        self.client.force_authenticate(user=None, token=None)
        resp_delete_user = self.client.delete(reverse('get_user_details',args=[10]))
        self.assertEqual(resp_delete_user.status_code, 403)

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend')
    def test_K(self):
        #forgot password send mail 11
        resp_edit_user = self.client.put(reverse('edit user', args=[12]), data={"email": "nishit1.makwana@iqinfinite.in"})
        resp_send_forgot_mail = self.client.post(reverse('Send_forgot_mail'),data={"email":'nishit1.makwana@iqinfinite.in'})
        self.assertEqual(resp_send_forgot_mail.status_code,200)

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend')
    def test_L(self):
        # forgot password send mail unauthenticated 12
        resp_edit_user = self.client.put(reverse('edit user', args=[13]),
                                         data={"email": "nishit1.makwana@iqinfinite.in"})
        resp_send_forgot_mail = self.client.post(reverse('Send_forgot_mail'),
                                                 data={"email": 'nishit1.makwana@iqinfinite.in'})
        resp_varify_forgot_mail = self.client.get(reverse('Forget_Password',args=[13,self.token]))
        resp_varify_forgot_mail_other_user = self.client.get(reverse('Forget_Password',args=[12,self.token]))
        self.assertEqual(resp_send_forgot_mail.status_code, 200)
        self.assertEqual(resp_varify_forgot_mail_other_user.status_code, 400)

    def test_M(self):
        # change password authentication 13
        resp_change_password = self.client.post(reverse('Forget_Password',args=[14,self.token]),data={"new_password":"Nishit@031","confirm_password":"Nishit@031"})
        resp_change_password_different = self.client.post(reverse('Forget_Password',args=[14,self.token]),data={"new_password":"Nishit@031","confirm_password":"Nishit@123"})
        resp_change_password_unknownuser = self.client.post(reverse('Forget_Password',args=[14,self.token]))
        self.assertEqual(resp_change_password.status_code, 202)
        self.assertEqual(resp_change_password_different.status_code, 400)
        self.assertEqual(resp_change_password_unknownuser.status_code, 400)

    def test_N(self):
        #reset password from old password 14
        resp_reset_password = self.client.post(reverse('Change_Password'), data={"old_password":self.passwd,"new_password": "Nishit@031", "confirm_password": "Nishit@031"})
        resp_reset_password_wrong_old = self.client.post(reverse('Change_Password'), data={"old_password":self.passwd+'wrong',"new_password": "Nishit@031", "confirm_password": "Nishit@031"})
        resp_reset_password_wrong_diffrent = self.client.post(reverse('Change_Password'), data={"old_password":self.passwd,"new_password": "Nishit@031", "confirm_password": "Nishit@123"})
        self.assertEqual(resp_reset_password.status_code, 200)
        self.assertEqual(resp_reset_password_wrong_old.status_code, 406)
        self.assertEqual(resp_reset_password_wrong_diffrent.status_code, 400)