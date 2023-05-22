from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField

class User(AbstractUser):
    email=models.EmailField(max_length=254,unique=True)
    mobile_number=PhoneField(null = True,blank=True, help_text='Contact phone number')
    location=models.CharField(default='India',max_length=50)
    name=models.CharField(default=' ',max_length=200)

    class Meta:
        db_table = 'users'

class Token_Store(models.Model):
    token=models.TextField(null=False,blank=False)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True,default=None)
    class Meta:
        db_table = 'is_token'