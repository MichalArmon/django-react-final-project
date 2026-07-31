from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView

urlpatterns = [
    path("articles/", views.ArticlesListCreate.as_view(), name="articles"),
    path(
        "articles/favorites/",
        views.FavoriteArticlesList.as_view(),
        name="favorite-articles",
    ),
    path(
        "articles/<int:pk>/",
        views.ArticleDetails.as_view(),
        name="article-details",
    ),
    path("comments/", views.CommentListCreate.as_view(), name="comments"),
    path("users/", views.users, name="users"),
    path(
        "users/login/",
        CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "users/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("predict-views/", views.predict_views, name="predict-views"),
    path(
        "products/",
        views.ProductListCreate.as_view(),
        name="products",
    ),
    path(
        "articles/<int:pk>/like/",
        views.ArticleLikeView.as_view(),
        name="article-like",
    ),
    path(
        "comments/<int:pk>/",
        views.CommentDetails.as_view(),
        name="comment-details",
    ),
    path(
        "users/<int:pk>/",
        views.UserDetails.as_view(),
        name="user-details",
    ),
    path(
        "users/me/",
        views.CurrentUserDetails.as_view(),
        name="current-user-details",
    ),
    path(
        "tags/",
        views.TagsList.as_view(),
        name="tags",
    ),
]
