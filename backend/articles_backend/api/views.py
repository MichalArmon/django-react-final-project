from pathlib import Path

import joblib
import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User

# הנתיב לתיקייה שבה נמצאים קובצי המודל
MODELS_DIR = Path(__file__).resolve().parent / "ml_models"

# טעינת המודל שאימנו ב-Colab
model = joblib.load(MODELS_DIR / "article_views_model.pkl")

# טעינת רשימת העמודות ובדיוק הסדר שבו המודל אומן
feature_columns = joblib.load(MODELS_DIR / "article_views_features.pkl")


@api_view(["POST"])
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
