from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers

from .models import Article, Tag, Comment, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "bio", "city", "age", "experience_years", "role"


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "profile",
        )

        read_only_fields = ("id",)

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        password = validated_data.pop("password")

        with transaction.atomic():
            user = User.objects.create_user(password=password, **validated_data)

            UserProfile.objects.create(user=user, **profile_data)

        return user


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Comment
        fields = (
            "id",
            "article",
            "user",
            "username",
            "content",
            "created_at",
        )
        read_only_fields = ("user", "created_at")


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "content",
            "author",
            "author_username",
            "tags",
            "published_at",
            "views",
            "likes",
            "word_count",
            "is_breaking_news",
            "comments",
        )
        read_only_fields = ("author",)
