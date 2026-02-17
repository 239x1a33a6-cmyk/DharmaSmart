from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DistrictBoundaryViewSet, VillageBoundaryViewSet, DirectiveViewSet

router = DefaultRouter()
router.register(r'boundaries', DistrictBoundaryViewSet)
router.register(r'villages', VillageBoundaryViewSet)
router.register(r'directives', DirectiveViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
