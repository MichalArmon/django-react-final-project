from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create the project groups and assign permissions"

    def handle(self, *args, **options):
        regular_users, _ = Group.objects.get_or_create(name="Regular Users")

        editors, _ = Group.objects.get_or_create(name="Editors")

        managers, _ = Group.objects.get_or_create(name="Managers")

        regular_permissions = Permission.objects.filter(
            content_type__app_label="api",
            codename__in=[
                "view_article",
                "view_comment",
                "add_comment",
            ],
        )

        editor_permissions = Permission.objects.filter(
            content_type__app_label="api",
            codename__in=[
                "view_article",
                "add_article",
                "change_article",
                "view_comment",
                "add_comment",
                "change_comment",
                "delete_comment",
                "view_tag",
                "add_tag",
                "change_tag",
            ],
        )

        manager_permissions = Permission.objects.filter(content_type__app_label="api")

        regular_users.permissions.set(regular_permissions)
        editors.permissions.set(editor_permissions)
        managers.permissions.set(manager_permissions)

        self.stdout.write(
            self.style.SUCCESS("Groups and permissions created successfully.")
        )
