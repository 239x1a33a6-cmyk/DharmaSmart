from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DistrictAlertViewSet

router = DefaultRouter()
router.register(r'app-alerts', DistrictAlertViewSet) # 'alerts' might conflict if not careful, but okay in app namespace

urlpatterns = [
    path('', include(router.urls)),
]
