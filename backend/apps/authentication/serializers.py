from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Role, UserRegistration

User = get_user_model()

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

class UserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)
    role_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Role.objects.all(), source='roles'
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'roles', 'role_ids', 'password', 'created_at', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        roles = validated_data.pop('roles', [])
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.roles.set(roles)
        return user

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration requests"""
    password_confirm = serializers.CharField(write_only=True, required=True)
    requested_role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        source='requested_role',
        write_only=True
    )
    requested_role = RoleSerializer(read_only=True)

    class Meta:
        model = UserRegistration
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'requested_role_id', 'requested_role',
            'reason', 'password', 'password_confirm', 'status',
            'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'status': {'read_only': True}
        }

    def validate(self, data):
        """Validate password match and uniqueness"""
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({"password": "Passwords do not match"})
        
        # Check if username already exists in User model
        if User.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError({"username": "Username already exists"})
        
        # Check if email already exists
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({"email": "Email already registered"})
        
        return data

    def create(self, validated_data):
        """Create user registration request with hashed password"""
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        # Create registration with hashed password
        registration = UserRegistration(**validated_data)
        registration.password = User().set_password(password) or password
        registration.save()
        return registration

class UserRegistrationAdminSerializer(serializers.ModelSerializer):
    """Serializer for admin to view/manage registration requests"""
    requested_role = RoleSerializer(read_only=True)
    reviewed_by_username = serializers.CharField(source='reviewed_by.username', read_only=True)

    class Meta:
        model = UserRegistration
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'requested_role', 'reason', 'status',
            'reviewed_by', 'reviewed_by_username', 'reviewed_at',
            'admin_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
