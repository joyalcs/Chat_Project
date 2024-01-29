from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import User

class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'id']
        extra_kwargs = {'id': {'read_only': True}}
