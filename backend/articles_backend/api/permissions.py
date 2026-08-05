from rest_framework.permissions import BasePermission


def get_profile_role(user):
    if not user or not user.is_authenticated:
        return None

    return getattr(
        getattr(user, "profile", None),
        "role",
        None,
    )


def is_admin(user):
    if not user or not user.is_authenticated:
        return False

    profile_role = get_profile_role(user)

    return (
        user.is_superuser
        or user.is_staff
        or user.groups.filter(name="Admins").exists()
        or profile_role == "admin"
    )


def is_manager(user):
    if not user or not user.is_authenticated:
        return False

    profile_role = get_profile_role(user)

    return (
        is_admin(user)
        or user.groups.filter(name="Managers").exists()
        or profile_role == "manager"
    )


class IsAdmin(BasePermission):
    message = "Only administrators can manage users."

    def has_permission(self, request, view):
        return is_admin(request.user)


class IsManager(BasePermission):
    message = "Only managers can perform this action."

    def has_permission(self, request, view):
        return is_manager(request.user)


class IsArticleOwnerOrAdmin(BasePermission):
    message = "Only the article owner or a manager can edit this article."

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        return obj.author == request.user or is_manager(request.user)


class IsCommentOwnerOrAdmin(BasePermission):
    message = "Only the comment owner or a manager can modify this comment."

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        return obj.user == request.user or is_manager(request.user)
