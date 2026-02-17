from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
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
