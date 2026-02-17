from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.utils import timezone
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer,
    UserRegistrationAdminSerializer,
    RoleSerializer
)
from .models import UserRegistration, Role

User = get_user_model()

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class RoleListView(generics.ListAPIView):
    """Public endpoint to list available roles for registration"""
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """
    Submit a new user registration request.
    Public endpoint - anyone can register.
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        registration = serializer.save()
        return Response({
            'message': 'Registration submitted successfully. Your request is pending admin approval.',
            'registration_id': registration.id,
            'username': registration.username,
            'status': registration.status
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_pending_registrations(request):
    """
    List all pending registration requests.
    Admin only endpoint.
    """
    if not request.user.is_staff and not request.user.is_superuser:
        return Response(
            {'error': 'Admin permission required'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    registrations = UserRegistration.objects.filter(status='PENDING')
    serializer = UserRegistrationAdminSerializer(registrations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_all_registrations(request):
    """
    List all registration requests (pending, approved, rejected).
    Admin only endpoint.
    """
    if not request.user.is_staff and not request.user.is_superuser:
        return Response(
            {'error': 'Admin permission required'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    registrations = UserRegistration.objects.all()
    serializer = UserRegistrationAdminSerializer(registrations, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def approve_registration(request, registration_id):
    """
    Approve a registration request and create the user account.
    Admin only endpoint.
    """
    if not request.user.is_staff and not request.user.is_superuser:
        return Response(
            {'error': 'Admin permission required'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        registration = UserRegistration.objects.get(id=registration_id)
    except UserRegistration.DoesNotExist:
        return Response(
            {'error': 'Registration not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if registration.status != 'PENDING':
        return Response(
            {'error': f'Registration is already {registration.status.lower()}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create the actual user account
    user = User.objects.create(
        username=registration.username,
        email=registration.email,
        first_name=registration.first_name,
        last_name=registration.last_name,
        is_approved=True,
        approved_by=request.user,
        approved_at=timezone.now()
    )
    user.set_password(registration.password)  # Password is already hashed
    user.password = registration.password  # Use the hashed password
    user.save()
    
    # Assign the requested role
    user.roles.add(registration.requested_role)
    
    # Update registration status
    registration.status = 'APPROVED'
    registration.reviewed_by = request.user
    registration.reviewed_at = timezone.now()
    registration.admin_notes = request.data.get('admin_notes', '')
    registration.save()
    
    return Response({
        'message': 'Registration approved and user account created',
        'user_id': user.id,
        'username': user.username
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def reject_registration(request, registration_id):
    """
    Reject a registration request.
    Admin only endpoint.
    """
    if not request.user.is_staff and not request.user.is_superuser:
        return Response(
            {'error': 'Admin permission required'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        registration = UserRegistration.objects.get(id=registration_id)
    except UserRegistration.DoesNotExist:
        return Response(
            {'error': 'Registration not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if registration.status != 'PENDING':
        return Response(
            {'error': f'Registration is already {registration.status.lower()}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Update registration status
    registration.status = 'REJECTED'
    registration.reviewed_by = request.user
    registration.reviewed_at = timezone.now()
    registration.admin_notes = request.data.get('admin_notes', 'Rejected by admin')
    registration.save()
    
    return Response({
        'message': 'Registration rejected',
        'registration_id': registration.id
    }, status=status.HTTP_200_OK)
