from pathlib import Path
from rest_framework.response import Response

import joblib
import pandas as pd

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserSerializer,
    ArticleSerializer,
    ProductSerializer,
    CustomTokenObtainPairSerializer,
    CommentSerializer,
)
from django.contrib.auth.models import User
from .models import Article, Product, Comment
from .permissions import IsArticleOwner
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

# הנתיב לתיקייה שבה נמצאים קובצי המודל
MODELS_DIR = Path(__file__).resolve().parent / "ml_models"

# טעינת המודל שאימנו ב-Colab
model = joblib.load(MODELS_DIR / "article_views_model.pkl")

# טעינת רשימת העמודות ובדיוק הסדר שבו המודל אומן
feature_columns = joblib.load(MODELS_DIR / "article_views_features.pkl")


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_views(request):
    try:
        # קבלת הנתונים שנשלחו ב-JSON
        word_count = request.data["word_count"]
        is_breaking_news = request.data["is_breaking_news"]
        author_experience_years = request.data["author_experience_years"]

        # המרת True/False ל-1/0
        is_breaking_news = int(is_breaking_news)

        # בניית שורה אחת באותו מבנה שבו המודל אומן
        article_data = pd.DataFrame(
            [
                {
                    "word_count": word_count,
                    "is_breaking_news": is_breaking_news,
                    "author_experience_years": author_experience_years,
                }
            ],
            columns=feature_columns,
        )

        # ביצוע החיזוי
        prediction = model.predict(article_data)[0]

        # לא הגיוני להחזיר מספר צפיות שלילי
        predicted_views = max(0, round(prediction))

        return Response(
            {"predicted_views": predicted_views},
            status=status.HTTP_200_OK,
        )

    except KeyError as error:
        return Response(
            {"error": f"Missing field: {error.args[0]}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    except (TypeError, ValueError):
        return Response(
            {"error": "All input fields must contain valid values."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET", "POST"])
def users(request):
    if request.method == "GET":
        users_queryset = User.objects.select_related("profile").all()

        serializer = UserSerializer(users_queryset, many=True)

        return Response(serializer.data)

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    search_fields = ["name", "category"]
    ordering_fields = ["price", "quantity"]


class ProductDetails(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ArticlesListCreate(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated()]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = ["tags", "author__username", "author"]

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

    ordering = ["likes"]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetails(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated(), IsArticleOwner()]


class ArticleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        article = get_object_or_404(Article, pk=pk)
        user = request.user

        if article.liked_by.filter(pk=user.pk).exists():
            article.liked_by.remove(user)
            article.likes = max(0, article.likes - 1)
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
            }
        )


class CommentListCreate(ListCreateAPIView):
    queryset = Comment.objects.all()
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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetails(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
