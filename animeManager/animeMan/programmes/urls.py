from django.urls import path
from django.conf.urls import url, include 
from . import views
from .views import list_programmes, add_programmes, RecordView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', list_programmes),
    path('add', add_programmes),
    path('records', RecordView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls))
]