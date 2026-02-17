#!/bin/bash

# Entrypoint script for Render deployment
echo "🚀 Starting Dharma Backend..."

echo "🗄️ Running database migrations..."
python manage.py migrate --noinput

echo "👤 Creating/checking superuser..."
python manage.py create_admin

echo "📊 Loading initial data..."
python manage.py populate_data || echo "Data already loaded"

echo "✅ Starting Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
