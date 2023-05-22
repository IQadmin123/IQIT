from datetime import datetime
from django.db import models
from phone_field import PhoneField


# Create your models here.
class customer_details(models.Model):
    name = models.CharField(max_length=200, default='')
    email = models.EmailField(max_length=254, unique=True)
    phone_number = PhoneField(null=True, blank=True,
                              help_text='Contact phone number')
    location = models.CharField(default='India', max_length=50)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table='customer_detail'

    def __str__(self):
        return f'{self.id}'
