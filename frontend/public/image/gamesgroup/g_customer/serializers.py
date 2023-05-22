from datetime import datetime
from rest_framework import serializers
from .models import customer_details


class Customer(serializers.ModelSerializer):
    # created_by=serializers.DateTimeField(source='created_at',format='%d %b,%Y',default=datetime.now)
    class Meta:
        model=customer_details
        fields=['id','name','email','phone_number','location']


class Show_Customer(serializers.ModelSerializer):
    class Meta:
        model=customer_details
        fields=['name','email','phone_number','location']