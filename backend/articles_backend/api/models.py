from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("reader", "Reader"),
        ("manager", "Manager"),
        ("admin", "Admin"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(null=True, blank=True)
    experience_years = models.IntegerField(default=0)
    role = models.CharField(max_length=50, default="reader")

    def __str__(self):
        return self.user.username


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")

    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)

    published_at = models.DateField(auto_now_add=True)

    # Extra fields for ML / prediction
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(
        User,
        related_name="liked_articles",
        blank=True,
    )
    word_count = models.IntegerField(default=0)

    is_breaking_news = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="comments"
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:50]


class Product(models.Model):

    name = models.CharField(max_length=100)

    price = models.DecimalField(max_digits=6, decimal_places=2)

    description = models.TextField()

    quantity = models.IntegerField()

    category = models.CharField(max_length=100)

    def __str__(self):

        return self.name
