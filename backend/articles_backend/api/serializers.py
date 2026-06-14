from rest_framework import serializers
from .models import Article, Tag, Comment


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
            "reading_time",
            "is_breaking_news",
            "comments",
        )
        read_only_fields = ("author",)
