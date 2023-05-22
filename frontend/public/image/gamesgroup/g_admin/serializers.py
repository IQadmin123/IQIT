from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User=get_user_model()

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
      
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class InputPasswordSerializerAuth(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

class InputPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
class InputEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = User
        fields = ["username","password"]

    # def validate(self, data):
    #     print(data)
    #     user = authenticate(**data)
    #     if user and user.is_active:
    #         return user
    #     raise serializers.ValidationError('Invalid username or password. Please try again.')
    
      
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields='__all__'

class UserSerializerData(serializers.ModelSerializer):
    email=serializers.EmailField(required=False)
    class Meta:
        model = User
        fields=['username','name','mobile_number','email','location']
        read_only_fields = ('username',)
    
    def update(self, instance, validated_data):
        instance.name=validated_data.get('name',instance.name)
        instance.mobile_number=validated_data.get('mobile_number',instance.mobile_number)
        instance.email=validated_data.get('email',instance.email)
        instance.location=validated_data.get('location',instance.location)
        instance.save()
        return instance
        

class ReadUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','email']


class validate_user(serializers.Serializer):
    username=serializers.CharField(max_length=100)
    def validate_username(self,username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("You can not create this username because it already exist")
        return username