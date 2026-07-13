from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("articles/", views.ArticlesListCreate.as_view(), name="articles"),
    path("users/", views.users, name="users"),
    path(
        "users/login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("predict-views/", views.predict_views, name="predict-views"),
    path(
        "products/",
        views.ProductListCreate.as_view(),
        name="products",
    ),
]
