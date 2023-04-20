from django.urls import path
from .views import api_list_hats, api_hat

urlpatterns = [
    path("hats/", api_list_hats, name="api_list_hats"),
    path("hats/<int:pk>", api_hat, name="api_hat"),
]