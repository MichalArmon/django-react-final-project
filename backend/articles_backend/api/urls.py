from django.urls import path
from . import views

urlpatterns = [
    path("predict-views/", views.predict_views, name="predict-views"),
]
