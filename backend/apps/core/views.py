from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from apps.authentication.models import Role
import os

User = get_user_model()

@api_view(['GET'])
@permission_classes([AllowAny])
def quick_setup(request):
    """One-time setup endpoint - creates superuser and loads data"""
    
    results = {
        'status': 'success',
        'actions': []
    }
    
    # Create superuser
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@dharma.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')
    
    if not User.objects.filter(username=username).exists():
        try:
            User.objects.create_superuser(username=username, email=email, password=password)
            results['actions'].append(f'✅ Superuser "{username}" created')
        except Exception as e:
            results['actions'].append(f'⚠️ Superuser creation failed: {str(e)}')
    else:
        results['actions'].append(f'ℹ️ Superuser "{username}" already exists')
    
    # Create roles
    roles = [
        ('Community', 'Community member - can report symptoms and view health info'),
        ('ASHA', 'ASHA Worker - community health worker'),
        ('Doctor', 'Medical professional at PHC/CHC'),
        ('District Admin', 'District health officer'),
        ('State Admin', 'State-level health authority'),
        ('Super Admin', 'System administrator'),
    ]
    
    for name, desc in roles:
        role, created = Role.objects.get_or_create(name=name, defaults={'description': desc})
        if created:
            results['actions'].append(f'✅ Created role: {name}')
        else:
            results['actions'].append(f'ℹ️ Role exists: {name}')
    
    results['message'] = 'Setup completed! You can now login to /admin/'
    results['credentials'] = {
        'url': '/admin/',
        'username': username,
        'note': 'Password is set via DJANGO_SUPERUSER_PASSWORD env variable'
    }
    
    return Response(results)

