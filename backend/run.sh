#!/bin/bash

# Quick Backend Setup & Run Script
# This script sets up and runs the Django backend locally

cd "$(dirname "$0")"

echo "🚀 Starting Dharma Backend Setup..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit backend/.env and set your SECRET_KEY!"
    echo "   Generate one with: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/Update dependencies
echo "📦 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Check if superuser exists (simple check)
echo "👤 Checking for superuser..."
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print('Superuser exists!' if User.objects.filter(is_superuser=True).exists() else 'No superuser found')" 2>/dev/null

# Start server
echo ""
echo "✅ Backend is ready!"
echo "🌐 Starting development server on http://localhost:8000"
echo ""
echo "📍 Important URLs:"
echo "   - API: http://localhost:8000/api/"
echo "   - Admin: http://localhost:8000/admin/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python manage.py runserver
