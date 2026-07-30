from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group, User

from .models import Article, Tag, Comment, UserProfile, Product


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["name"] = user.get_full_name() or user.username
        token["role"] = user.profile.role

        return token


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "bio", "city", "age", "experience_years", "role"


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    password = serializers.CharField(
        write_only=True,
        required=False,
        min_length=8,
    )

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
            user = User.objects.create_user(
                password=password,
                **validated_data,
            )

            UserProfile.objects.create(
                user=user,
                **profile_data,
            )

            regular_users_group, created = Group.objects.get_or_create(
                name="Regular Users"
            )

            user.groups.add(regular_users_group)

        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password", None)

        with transaction.atomic():
            instance.username = validated_data.get(
                "username",
                instance.username,
            )

            instance.email = validated_data.get(
                "email",
                instance.email,
            )

            instance.first_name = validated_data.get(
                "first_name",
                instance.first_name,
            )

            instance.last_name = validated_data.get(
                "last_name",
                instance.last_name,
            )

            if password:
                instance.set_password(password)

            instance.save()

            profile = instance.profile

            profile.bio = profile_data.get(
                "bio",
                profile.bio,
            )

            profile.city = profile_data.get(
                "city",
                profile.city,
            )

            profile.age = profile_data.get(
                "age",
                profile.age,
            )

            profile.experience_years = profile_data.get(
                "experience_years",
                profile.experience_years,
            )

            profile.role = profile_data.get(
                "role",
                profile.role,
            )

            profile.save()

        return instance


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
    is_liked = serializers.SerializerMethodField()

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
            "is_liked",
        )
        read_only_fields = ("author",)

    def get_is_liked(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return obj.liked_by.filter(pk=request.user.pk).exists()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
