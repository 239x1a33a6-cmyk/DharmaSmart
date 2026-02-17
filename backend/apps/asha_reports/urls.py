from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AshaReportViewSet, WaterQualityReadingViewSet

router = DefaultRouter()
router.register(r'reports', AshaReportViewSet)
router.register(r'water-quality', WaterQualityReadingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
