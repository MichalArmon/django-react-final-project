import json
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile, Tag, Article, Comment

with open("articals.json", "r", encoding="utf-8") as file:
    data = json.load(file)


# יצירת משתמשים ופרופילים
for user_data in data["users"]:
    user, created = User.objects.get_or_create(
        username=user_data["username"],
        defaults={
            "email": user_data["email"],
            "first_name": user_data["first_name"],
            "last_name": user_data["last_name"],
        },
    )

    if created:
        user.set_password("User1234!")
        user.save()

    profile_data = user_data["profile"]

    UserProfile.objects.get_or_create(
        user=user,
        defaults={
            "bio": profile_data["bio"],
            "city": profile_data["city"],
            "age": profile_data["age"],
            "experience_years": profile_data["experience_years"],
            "role": profile_data["role"],
        },
    )


# יצירת תגיות
for tag_name in data["tags"]:
    Tag.objects.get_or_create(name=tag_name)


# יצירת כתבות
for article_data in data["articles"]:
    author_username = article_data["author"]["username"]
    author = User.objects.get(username=author_username)

    article, created = Article.objects.get_or_create(
        id=article_data["id"],
        defaults={
            "title": article_data["title"],
            "content": article_data["content"],
            "author": author,
            "published_at": article_data["published_at"],
            "views": article_data["views"],
            "likes": article_data["likes"],
            "word_count": article_data["word_count"],
            "is_breaking_news": article_data["is_breaking_news"],
        },
    )

    if created:
        for tag_name in article_data["tags"]:
            tag = Tag.objects.get(name=tag_name)
            article.tags.add(tag)

        for comment_data in article_data["comments"]:
            comment_user = User.objects.get(username=comment_data["user"]["username"])

            Comment.objects.create(
                article=article,
                user=comment_user,
                content=comment_data["content"],
            )


print("Import completed successfully")
print("Users:", User.objects.count())
print("Articles:", Article.objects.count())
print("Comments:", Comment.objects.count())
print("Tags:", Tag.objects.count())
