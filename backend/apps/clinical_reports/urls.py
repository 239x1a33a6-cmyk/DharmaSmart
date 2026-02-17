from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClinicalReportViewSet

router = DefaultRouter()
router.register(r'reports', ClinicalReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
