#!/bin/bash

# Build script for Render deployment
set -o errexit  # Exit on error

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🗄️ Running database migrations..."
python manage.py migrate --noinput

echo "👤 Creating superuser..."
python manage.py create_admin

echo "📊 Loading initial data..."
python manage.py populate_data

echo "✅ Build completed successfully!"
