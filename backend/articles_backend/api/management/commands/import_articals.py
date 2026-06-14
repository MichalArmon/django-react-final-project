import json
from pathlib import Path

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Article, Comment, Tag, UserProfile


class Command(BaseCommand):
    help = "Import users, profiles, tags, articles and comments from articals.json"

    def handle(self, *args, **kwargs):
        # הנתיב לקובץ articals.json שנמצא ליד manage.py
        file_path = Path("articals.json")

        # בדיקה שהקובץ באמת קיים
        if not file_path.exists():
            self.stderr.write(
                self.style.ERROR(f"File not found: {file_path.resolve()}")
            )
            return

        # קריאת קובץ ה-JSON
        with file_path.open("r", encoding="utf-8") as file:
            data = json.load(file)

        users_data = data["users"]
        tags_data = data["tags"]
        articles_data = data["articles"]

        # מילונים שיעזרו לנו למצוא משתמשים ותגיות בזמן יצירת הכתבות
        users_by_json_id = {}
        tags_by_name = {}

        # אם משהו נכשל באמצע, כל הייבוא מתבטל
        with transaction.atomic():

            # =========================================
            # 1. יצירת משתמשים ופרופילים
            # =========================================

            self.stdout.write("Importing users and profiles...")

            for user_data in users_data:
                profile_data = user_data["profile"]

                # יצירת User מובנה של Django
                user, created = User.objects.update_or_create(
                    username=user_data["username"],
                    defaults={
                        "email": user_data.get("email", ""),
                        "first_name": user_data.get("first_name", ""),
                        "last_name": user_data.get("last_name", ""),
                    },
                )

                # רק אם המשתמש חדש, נגדיר לו סיסמה
                if created:
                    user.set_password("12345678")
                    user.save()

                # יצירת UserProfile וחיבורו ל-User
                UserProfile.objects.update_or_create(
                    user=user,
                    defaults={
                        "bio": profile_data.get("bio", ""),
                        "city": profile_data.get("city", ""),
                        "age": profile_data.get("age"),
                        "experience_years": profile_data.get(
                            "experience_years",
                            0,
                        ),
                        "role": profile_data.get("role", "reader"),
                    },
                )

                # מחברים בין id מה-JSON לבין ה-User של Django
                users_by_json_id[user_data["id"]] = user

            # =========================================
            # 2. יצירת תגיות
            # =========================================

            self.stdout.write("Importing tags...")

            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                tags_by_name[tag_name] = tag

            # =========================================
            # 3. יצירת כתבות
            # =========================================

            self.stdout.write("Importing articles and comments...")

            for article_data in articles_data:
                author_json_id = article_data["author"]["id"]

                # מוצאים את ה-User המתאים לפי ה-id שהיה ב-JSON
                author = users_by_json_id[author_json_id]

                article, _ = Article.objects.update_or_create(
                    id=article_data["id"],
                    defaults={
                        "title": article_data["title"],
                        "content": article_data["content"],
                        "author": author,
                        "published_at": article_data["published_at"],
                        "views": article_data.get("views", 0),
                        "likes": article_data.get("likes", 0),
                        "word_count": article_data.get("word_count", 0),
                        "is_breaking_news": article_data.get(
                            "is_breaking_news",
                            False,
                        ),
                    },
                )

                # חיבור תגיות לכתבה
                article_tags = []

                for tag_name in article_data.get("tags", []):
                    tag = tags_by_name[tag_name]
                    article_tags.append(tag)

                article.tags.set(article_tags)

                # מוחקים תגובות קיימות כדי שלא יהיו כפילויות
                article.comments.all().delete()

                # =====================================
                # 4. יצירת תגובות
                # =====================================

                for comment_data in article_data.get("comments", []):
                    comment_user_id = comment_data["user"]["id"]
                    comment_user = users_by_json_id[comment_user_id]

                    Comment.objects.create(
                        article=article,
                        user=comment_user,
                        content=comment_data["content"],
                    )

        self.stdout.write(self.style.SUCCESS("Import completed successfully!"))

        self.stdout.write(f"Users: {User.objects.count()}")
        self.stdout.write(f"Profiles: {UserProfile.objects.count()}")
        self.stdout.write(f"Tags: {Tag.objects.count()}")
        self.stdout.write(f"Articles: {Article.objects.count()}")
        self.stdout.write(f"Comments: {Comment.objects.count()}")
