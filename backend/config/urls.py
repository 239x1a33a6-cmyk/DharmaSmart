from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.core.views import quick_setup

@api_view(['GET'])
def api_root(request):
    """API root endpoint showing available endpoints"""
    return Response({
        'message': 'Dharma Surveillance API',
        'version': '1.0',
        'endpoints': {
            'authentication': '/api/auth/',
            'asha_reports': '/api/asha/',
            'district': '/api/district/',
            'clinical_reports': '/api/clinical/',
            'alerts': '/api/alerts/',
            'state': '/api/state/',
            'analytics': '/api/analytics/',
            'documentation': {
                'swagger': '/api/docs/',
                'redoc': '/api/redoc/',
                'schema': '/api/schema/',
            },
            'admin': '/admin/',
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Quick Setup (Temporary - for first-time deployment)
    path('setup/', quick_setup, name='quick-setup'),
    
    # API Root
    path('api/', api_root, name='api-root'),
    
    # API Endpoints
    path('api/auth/', include('apps.authentication.urls')),
    path('api/asha/', include('apps.asha_reports.urls')),
    path('api/district/', include('apps.district.urls')),
    path('api/clinical/', include('apps.clinical_reports.urls')),
    path('api/alerts/', include('apps.alerts.urls')),
    path('api/state/', include('apps.state.urls')),
    path('api/analytics/', include('apps.analytics.urls')),

    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
