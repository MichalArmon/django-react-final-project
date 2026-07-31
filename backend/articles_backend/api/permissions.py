from rest_framework.permissions import BasePermission


def is_manager(user):
    if not user or not user.is_authenticated:
        return False

    profile_role = getattr(
        getattr(user, "profile", None),
        "role",
        None,
    )

    return (
        user.is_superuser
        or user.is_staff
        or user.groups.filter(name="Managers").exists()
        or profile_role in ("manager", "admin")
    )


class IsManager(BasePermission):
    message = "Only managers can perform this action."

    def has_permission(self, request, view):
        return is_manager(request.user)


class IsArticleOwnerOrAdmin(BasePermission):
    message = "Only the article owner or a manager " "can edit this article."

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        return obj.author == request.user or is_manager(request.user)


class IsCommentOwnerOrAdmin(BasePermission):
    message = "Only the comment owner or a manager " "can modify this comment."

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        return obj.user == request.user or is_manager(request.user)
