from rest_framework.permissions import BasePermission


class IsArticleOwnerOrAdmin(BasePermission):
    message = "Only the article owner or an admin can edit this article."

    def has_object_permission(self, request, view, obj):
        return (
            obj.author == request.user
            or request.user.is_staff
            or request.user.is_superuser
        )


class IsCommentOwnerOrAdmin(BasePermission):
    message = "Only the comment owner or an admin can modify this comment."

    def has_object_permission(self, request, view, obj):
        return (
            obj.user == request.user
            or request.user.is_staff
            or request.user.is_superuser
        )
