from pathlib import Path

import joblib
import pandas as pd

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import F
from .models import Article, Product, Comment, Tag
from .permissions import (
    IsManager,
    IsCommentOwnerOrAdmin,
)
from .serializers import (
    UserSerializer,
    ArticleSerializer,
    ProductSerializer,
    CustomTokenObtainPairSerializer,
    CommentSerializer,
    UserSelfUpdateSerializer,
    TagSerializer,
)

# הנתיב לתיקייה שבה נמצאים קובצי המודל
MODELS_DIR = Path(__file__).resolve().parent / "ml_models"

# טעינת המודל שאימנו ב-Colab
model = joblib.load(MODELS_DIR / "article_views_model.pkl")

# טעינת רשימת העמודות ובדיוק הסדר שבו המודל אומן
feature_columns = joblib.load(MODELS_DIR / "article_views_features.pkl")


# 🔐 JWT Login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# 🤖 ML Prediction
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_views(request):
    try:
        word_count = request.data["word_count"]
        is_breaking_news = request.data["is_breaking_news"]
        author_experience_years = request.data["author_experience_years"]

        is_breaking_news = int(is_breaking_news)

        article_data = pd.DataFrame(
            [
                {
                    "word_count": word_count,
                    "is_breaking_news": is_breaking_news,
                    "author_experience_years": (author_experience_years),
                }
            ],
            columns=feature_columns,
        )

        prediction = model.predict(article_data)[0]

        predicted_views = max(0, round(prediction))

        return Response(
            {"predicted_views": predicted_views},
            status=status.HTTP_200_OK,
        )

    except KeyError as error:
        return Response(
            {"error": (f"Missing field: {error.args[0]}")},
            status=status.HTTP_400_BAD_REQUEST,
        )

    except (TypeError, ValueError):
        return Response(
            {"error": ("All input fields must contain " "valid values.")},
            status=status.HTTP_400_BAD_REQUEST,
        )


# 👤 Users / Register
@api_view(["GET", "POST"])
def users(request):
    if request.method == "GET":
        users_queryset = User.objects.select_related("profile").all()

        serializer = UserSerializer(
            users_queryset,
            many=True,
        )

        return Response(serializer.data)

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


# 👤 User Details / Update / Delete
class UserDetails(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.select_related("profile").all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [
                IsAuthenticated(),
                IsManager(),
            ]

        return [
            IsAuthenticated(),
            IsManager(),
        ]


# 👤 Current User Profile
class CurrentUserDetails(RetrieveUpdateAPIView):
    serializer_class = UserSelfUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# 📦 Products
class ProductListCreate(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "category",
        "price",
        "quantity",
    ]

    search_fields = [
        "name",
        "category",
    ]

    ordering_fields = [
        "price",
        "quantity",
    ]


class ProductDetails(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# 📰 Articles List / Create
class ArticlesListCreate(ListCreateAPIView):
    queryset = Article.objects.all().order_by("-published_at")
    serializer_class = ArticleSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "tags",
        "author__username",
        "author",
    ]

    search_fields = [
        "title",
        "content",
        "author__username",
        "tags__name",
    ]

    ordering_fields = [
        "views",
        "likes",
        "word_count",
        "published_at",
    ]

    ordering = ["-published_at"]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        # רק מנהל יכול ליצור כתבה
        return [
            IsAuthenticated(),
            IsManager(),
        ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# 📰 Article Details / Update / Delete
class ArticleDetails(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        # רק מנהל יכול לערוך ולמחוק כתבות
        return [
            IsAuthenticated(),
            IsManager(),
        ]

    def retrieve(self, request, *args, **kwargs):
        article = self.get_object()

        Article.objects.filter(pk=article.pk).update(views=F("views") + 1)

        article.refresh_from_db()

        serializer = self.get_serializer(article)

        return Response(serializer.data)


# 👍 Article Like Toggle
class ArticleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        article = get_object_or_404(
            Article,
            pk=pk,
        )

        user = request.user

        if article.liked_by.filter(pk=user.pk).exists():
            article.liked_by.remove(user)
            article.likes = max(
                0,
                article.likes - 1,
            )
            liked = False

        else:
            article.liked_by.add(user)
            article.likes += 1
            liked = True

        article.save(update_fields=["likes"])

        return Response(
            {
                "id": article.id,
                "liked": liked,
                "likes": article.likes,
            },
            status=status.HTTP_200_OK,
        )


# 💬 Comments List / Create
class CommentListCreate(ListCreateAPIView):
    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "article",
    ]

    ordering_fields = [
        "created_at",
    ]

    ordering = ["created_at"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# 💬 Comment Details / Update / Delete
class CommentDetails(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [
            IsAuthenticated(),
            IsCommentOwnerOrAdmin(),
        ]


class TagsList(ListAPIView):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
    permission_classes = [AllowAny]


# ❤️ Favorite Articles
class FavoriteArticlesList(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Article.objects.filter(liked_by=self.request.user).order_by(
            "-published_at"
        )
