from rest_framework.permissions import BasePermission


def is_manager(user):

    return user.is_authenticated and (
        user.is_superuser
        or user.is_staff
        or user.groups.filter(name="Managers").exists()
    )


class IsManager(BasePermission):

    message = "Only managers can perform this action."

    def has_permission(self, request, view):
        return is_manager(request.user)


class IsArticleOwnerOrAdmin(BasePermission):

    message = "Only the article owner or a manager can edit this article."

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or is_manager(request.user)


class IsCommentOwnerOrAdmin(BasePermission):

    message = "Only the comment owner or a manager can modify this comment."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or is_manager(request.user)
