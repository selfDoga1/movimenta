from rest_framework import serializers
from .models import User, Company


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'cpf', 'name', 'phone', 'email', 'company', 'avatar', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'is_staff', 'is_superuser']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['cnpj', 'name']