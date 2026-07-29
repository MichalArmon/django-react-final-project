from rest_framework.permissions import BasePermission


class IsArticleOwner(BasePermission):
    message = "You can only edit or delete your own articles."

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
