from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from .serializers import UserGetSerializer
from users.models import User
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes
# User = get_user_model()

# Create your views here.
class GetUserView(generics.ListAPIView):

    serializer_class = UserGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user is None:
            raise AuthenticationFailed("User authentication failed")
        return User.objects.exclude(id=user.id)


