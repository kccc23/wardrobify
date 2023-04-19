from django.urls import path
from .views import api_shoes


urlpatterns = [
    path("shoes/", api_shoes, name="shoes"),
    path(
    "bins/<int:bin_id>/shoes/",
    api_shoes,
    name="list_shoes",
    ),
    # path("shoes/<int:id>/", api_shoe, name="api_location"),
]
