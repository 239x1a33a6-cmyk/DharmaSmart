#!/bin/bash

# Entrypoint script for Render deployment
echo "🚀 Starting Dharma Backend..."

echo "🗄️ Running database migrations..."
python manage.py makemigrations --noinput || true
python manage.py migrate --noinput || true

echo "👤 Creating/checking superuser..."
python manage.py create_admin || echo "⚠️ Superuser creation skipped (will create via admin panel)"

echo "📊 Loading initial data..."
python manage.py populate_data || echo "⚠️ Data loading skipped"

echo "✅ Starting Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
