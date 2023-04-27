from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import UserSerializer, CompanySerializer, WorkoutSerializer, RoutineSerializer, WorkoutRoutineSerializer, WorkoutRoutineSimpleSerializer
from .models import User, Company, Workout, Routine, WorkoutRoutine

class IsSuperUser(IsAdminUser):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


class UserViewSet(viewsets.ModelViewSet):
    search_fields = ['cpf', 'name']
    filter_backends = (filters.SearchFilter,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        staff = request.user
        queryset = self.filter_queryset(User.objects.filter(company = staff.company, is_staff=False, is_superuser=False))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        staff = request.user
        data = request.data
        new_user = User.objects.create_user(data['cpf'], data['password'], name=data['name'], phone=data['phone'], email=data['email'], company=staff.company)
        return Response(self.get_serializer(new_user).data)

    @action(detail=False, methods=['POST'], name='Change Avatar')
    def change_avatar(self, request, *args, **kwargs):
        '''
            Function to change User Avatar
        '''
        image = request.FILES.get('image')
        id = request.POST.get('id')
        try:
            instance = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'Model does not exist'}, status=404)
        instance.avatar = image
        instance.save()
        return Response({'message': 'User avatar changed!'})

    @action(detail=False, methods=['POST'], name='Change Password')
    def change_password(self, request, *args, **kwargs):
        id = request.POST.get('id')
        print(request.POST.get('password'))
        password = request.POST.get('password')
        try:
            instance = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'Model does not exist'}, status=404)
        instance.set_password(password)
        return Response({'message': 'User password changed!'})


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated, IsSuperUser)


class WorkoutViewSet(viewsets.ModelViewSet):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = (IsAuthenticated, )


class RoutineViewSet(viewsets.ModelViewSet):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer
    permission_classes = (IsAuthenticated,)

    def filter_by_user(self, request, user_id=None):
        if user_id:
            queryset = self.filter_queryset(self.get_queryset())
            queryset = queryset.filter(user__id=user_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)


class WorkoutRoutineViewSet(viewsets.ModelViewSet):
    queryset = WorkoutRoutine.objects.all()
    serializer_class = WorkoutRoutineSerializer
    permission_classes = (IsAuthenticated,)

    def filter_by_routine(self, request, routine_id=None):
        if routine_id:
            queryset = self.filter_queryset(self.get_queryset())
            queryset = queryset.filter(routine__id=routine_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        

class WorkoutRoutineSimpleViewSet(viewsets.ModelViewSet):
    queryset = WorkoutRoutine.objects.all()
    serializer_class = WorkoutRoutineSimpleSerializer
    permission_classes = (IsAuthenticated,)

        