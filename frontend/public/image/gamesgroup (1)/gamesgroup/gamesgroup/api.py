# from django.contrib import auth
# from rest_framework import generics, permissions, serializers
# from rest_framework.response import Response
# from knox.models import AuthToken
# from django.shortcuts import redirect, render
# from google_login.serializers import LoginUserSerializer, RegisterSerializer, LoginSerializer

# class SignUpAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = AuthToken.objects.create(user)
#         return Response({
#             "users": LoginUserSerializer(user, context=self.get_serializer_context()).data,
#             "token": token[1]
#         })


# class SignInAPI(generics.GenericAPIView):
#     serializer_class = LoginSerializer

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response({
#                 "user": LoginUserSerializer(user, context=self.get_serializer_context()).data,
#                 "token": AuthToken.objects.create(user)[1]})


# class MainUser(generics.RetrieveAPIView):
#   permission_classes = [
#       permissions.IsAuthenticated
#   ]
#   serializer_class = LoginUserSerializer

#   def get_object(self):
#     return self.request.user