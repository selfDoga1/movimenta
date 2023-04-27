from django.urls import path, include
from rest_framework import routers
from .viewsets import UserViewSet, CompanyViewSet, WorkoutViewSet, RoutineViewSet, WorkoutRoutineViewSet, WorkoutRoutineSimpleViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .view import MyTokenObtainPairView


router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('companies', CompanyViewSet, basename='company')
router.register('workouts', WorkoutViewSet, basename='workout')
router.register('routines', RoutineViewSet, basename='routine')
router.register('workout-routines', WorkoutRoutineViewSet, basename='workout-routine')
router.register('workout-routines-simple', WorkoutRoutineSimpleViewSet, basename='workout-routine-simple')


urlpatterns = [
    path('', include(router.urls)),
    path('workout-routines/routine/<int:routine_id>/', WorkoutRoutineViewSet.as_view({'get':'filter_by_routine'}), name='workout-routines'),
    path('routines/user/<int:user_id>/', RoutineViewSet.as_view({'get':'filter_by_user'}), name='routines'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]