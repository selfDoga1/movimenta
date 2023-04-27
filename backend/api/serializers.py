from rest_framework import serializers
from .models import User, Company, Workout, Routine, WorkoutRoutine
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'cpf', 'name', 'phone', 'email', 'company', 'avatar', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'is_staff', 'is_superuser']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['cnpj', 'name']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']


class RoutineSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", default=timezone.now())

    class Meta:
        model = Routine
        fields = ['id', 'name', 'user', 'date_created']
        read_only_fields = ['id']


class WorkoutRoutineSerializer(serializers.ModelSerializer):
    workout = WorkoutSerializer()
    routine = RoutineSerializer()
    
    class Meta:
        model = WorkoutRoutine
        fields = ['workout', 'routine', 'series', 'repetitions']


class WorkoutRoutineSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutRoutine
        fields = ['workout', 'routine', 'series', 'repetitions']