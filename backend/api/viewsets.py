from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer, CompanySerializer
from .models import User, Company
from rest_framework.response import Response


class IsSuperUser(IsAdminUser):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


class UserViewSet(viewsets.ModelViewSet):
    search_fields = ['cpf', 'name']
    filter_backends = (filters.SearchFilter, )
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    # TODO: Implements Backend pagination

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


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = (IsAuthenticated, IsSuperUser)

