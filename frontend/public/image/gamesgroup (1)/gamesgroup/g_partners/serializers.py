from django.contrib.auth import get_user_model
from rest_framework import serializers

from g_partners.models import (PartnerCountry, PartnerPlatform,
                               PartnersRefstatSums, country)

from .models import Partner, SpedingsAuto, child_refid

User=get_user_model()
class PartnerCountry_API(serializers.ModelSerializer):
    class Meta:
        model=PartnerCountry
        fields='__all__'

class PartnerPlatformSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = PartnerPlatform
        fields = '__all__'

class PartnersQuery_API(serializers.ModelSerializer):
    country = serializers.StringRelatedField(read_only=False,many=True,required=False)
    platform = serializers.StringRelatedField(read_only=False,many=True,required=False)
    class Meta:
        model=Partner
        fields='__all__'

class SwaggerPostPartners_API(serializers.ModelSerializer):
    country = serializers.CharField(required=False,help_text="country iso_code with comma seprated value.")
    platform = serializers.CharField(required=False,help_text="platform name with comma seprated value.")
    multiple_refid = serializers.CharField(required=False,help_text="child refid name with comma seprated value.")
    class Meta:
        model=Partner
        exclude=('created_at','updated_at',"is_organic")
        extra_kwargs = {'refid': {'required': True},'start_date': {'required': True},'end_date': {'required': True}}
    
class SwaggerUpdatePartners_API(serializers.ModelSerializer):
    country = serializers.CharField(required=False,help_text="country iso_code with comma seprated value.")
    platform = serializers.CharField(required=False,help_text="platform name with comma seprated value.")
    multiple_refid = serializers.CharField(required=False,help_text="child refid name with comma seprated value.")
    class Meta:
        model=Partner
        exclude=('created_at','updated_at',"is_organic")
        
class Partners_API(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(read_only=True,many=True)
    country = serializers.StringRelatedField(read_only=True,many=True)
    platform = serializers.PrimaryKeyRelatedField(read_only=True,many=True)
    platform = serializers.StringRelatedField(read_only=True,many=True)
    class Meta:
        model=Partner
        # fields='__all__'
        exclude=('updated_at',)
        
    # def validate_start_date(self, attrs):
    #     print(attrs)
    #     input("Press ")
        # if bool(datetime.strptime(attrs, "%Y-%m-%d"))==False:
        #     raise serializers.ValidationError({'error':"start"})
    def to_representation(self, instance):
        instance.created_at = instance.created_at.strftime("%Y-%m-%d")
        primitive_repr = super(Partners_API, self).to_representation(instance)
        primitive_repr['date'] = primitive_repr['created_at']
        # print(instance.created_at.date())
        return primitive_repr
    
    def create(self,validate_data):
        partner_create = Partner.objects.using(self.context.get('using')).create(**validate_data)
        return partner_create

class Country(serializers.ModelSerializer):

    class Meta:
        model=country
        fields=('iso_name', 'country_name')

class FileUploadSerializer(serializers.Serializer):
    csv_file = serializers.FileField()

    class Meta:
        fields = ('csv_file',)
class ChildRefid(serializers.ModelSerializer):
    child = serializers.StringRelatedField(read_only=True)
    class Meta:
        model=child_refid
        # fields='__all__'
        exclude=['parent_refid']

class RefId_API(serializers.ModelSerializer):
    class Meta:
        unique_together = ('child')
        model=child_refid
        fields='__all__'

class RefStats_Sums(serializers.ModelSerializer):
    class Meta:
        model=PartnersRefstatSums
        fields='__all__'
        
class Spending(serializers.ModelSerializer):
    class Meta:
        model=SpedingsAuto
        fields='__all__'
        
    def validate(self, data):
        if data.get('regs',None) is None:
            data['regs']=0
        return data
        
class Spending_AutoSync(serializers.Serializer):
    start_date = serializers.DateField()    
    end_date = serializers.DateField()    
    