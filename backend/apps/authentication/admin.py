from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, UserRegistration


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_approved')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_approved', 'roles')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    filter_horizontal = ('roles', 'groups', 'user_permissions')
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('roles', 'is_approved', 'approved_by', 'approved_at')}),
    )


@admin.register(UserRegistration)
class UserRegistrationAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'requested_role', 'status', 'created_at')
    list_filter = ('status', 'requested_role', 'created_at')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('User Information', {
            'fields': ('username', 'email', 'first_name', 'last_name', 'phone_number')
        }),
        ('Role Request', {
            'fields': ('requested_role', 'reason')
        }),
        ('Status', {
            'fields': ('status', 'reviewed_by', 'reviewed_at', 'admin_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
