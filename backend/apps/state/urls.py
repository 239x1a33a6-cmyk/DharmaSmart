from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StateAdvisoryViewSet

router = DefaultRouter()
router.register(r'advisories', StateAdvisoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
