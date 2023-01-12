from django.urls import path, include
from rest_framework import routers
from .viewsets import UserViewSet, CompanyViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .view import MyTokenObtainPairView


router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('companies', CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
