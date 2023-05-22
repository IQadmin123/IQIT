from rest_framework import serializers
from django.contrib.auth import get_user_model
User=get_user_model()
from g_games.models import Game_Detail
from drf_extra_fields.fields import Base64ImageField


class Game_Details_API(serializers.ModelSerializer):
    class Meta:
        model=Game_Detail
        exclude=('id', 'image', 'customer_id','created_at','updated_at')

class Game_API(serializers.ModelSerializer):
    image=Base64ImageField(required=False)
    class Meta:
        model=Game_Detail
        fields='__all__'
        # extra_kwargs = {"short_name": {"error_messages": {"required": "short_name is.","unique": "Custom message"}},"customer_id": {"error_messages": {"required": "customer_id is required"}}}
        
    def validate(self, attrs):
        if 'short_name' not in attrs:
            raise serializers.ValidationError({"error":["short_name is required"]})
        
        if 'customer_id' not in attrs:
            raise serializers.ValidationError({"error":["customer_id is required"]})
        
        return super().validate(attrs)

class Game_Details(serializers.ModelSerializer):
    class Meta:
        model=Game_Detail
        fields=['game_name','image','short_name']
        
class Game_API_Update(serializers.ModelSerializer):
    class Meta:
        model=Game_Detail
        exclude=['image']