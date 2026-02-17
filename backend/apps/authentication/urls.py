from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserProfileView,
    RoleListView,
    register_user,
    list_pending_registrations,
    list_all_registrations,
    approve_registration,
    reject_registration,
)

urlpatterns = [
    # Authentication
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    
    # User Registration
    path('register/', register_user, name='register'),
    path('roles/', RoleListView.as_view(), name='role-list'),
    
    # Admin - Registration Management
    path('registrations/pending/', list_pending_registrations, name='pending-registrations'),
    path('registrations/', list_all_registrations, name='all-registrations'),
    path('registrations/<int:registration_id>/approve/', approve_registration, name='approve-registration'),
    path('registrations/<int:registration_id>/reject/', reject_registration, name='reject-registration'),
]
