# 🏥 Dharma Surveillance Platform

<div align="center">

**AI-Powered Public Health Surveillance System for India**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?logo=django)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Overview

Dharma is a real-time public health surveillance platform designed for India's National Health Mission (NHM). It enables health workers (ASHAs, doctors, district admins) to report, track, and respond to disease outbreaks with AI-powered insights and geospatial analytics.

---

## ✨ Features

- **Real-time Disease Reporting** - ASHA workers submit cases via mobile-optimized forms
- **Geospatial Analytics** - District-level visualization with cluster detection
- **Multi-Role Dashboards** - Custom interfaces for ASHAs, doctors, district admins, state authorities
- **User Registration with Admin Approval** - Secure onboarding workflow
- **Role-Based Access Control** - Granular permissions system

---

## 🛠️ Tech Stack

**Frontend:** React 18 + TypeScript + Vite + TailwindCSS + Leaflet

**Backend:** Django 6.0 + Django REST Framework + PostgreSQL (PostGIS) + Celery + Redis

**DevOps:** Docker + Docker Compose + Nginx

---

## 📁 Project Structure

```
Dharma/
├── frontend/              # React application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   ├── Dockerfile        # Frontend container
│   └── nginx.conf        # Nginx config for SPA
├── backend/              # Django application
│   ├── apps/            # Django apps (authentication, asha_reports, etc.)
│   ├── config/          # Django settings
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile       # Backend container
├── docker-compose.yml   # Local development orchestration
└── README.md           # This file
```

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/yourusername/dharma-surveillance.git
cd dharma-surveillance

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration
nano backend/.env

# Start all services
docker-compose up -d --build

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Load initial data
docker-compose exec backend python manage.py populate_data
```

**Access:**
- Frontend: http://localhost
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

### Option 2: Local Development

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🌐 Deployment

### Render.com (Backend) + Vercel (Frontend)

**Recommended for production deployment:**

1. **Backend (Render):**
   - Create PostgreSQL database (with PostGIS)
   - Create Redis instance
   - Deploy Django app from `backend/` directory
   - Set environment variables from `backend/.env.example`

2. **Frontend (Vercel):**
   - Import repository
   - Set root directory to `frontend/`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

**See `render_deployment_guide.md` for detailed step-by-step instructions.**

### Docker Production

```bash
docker-compose -f docker-compose.yml up -d --build
```

---

## 🔐 Environment Variables

**Backend** (`backend/.env`):
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (False in production)
- `DATABASE_URL` - PostgreSQL connection string
- `ALLOWED_HOSTS` - Comma-separated allowed hosts
- `CORS_ALLOWED_ORIGINS` - Frontend URLs

**Frontend** (`frontend/.env`):
- `VITE_API_URL` - Backend API URL

See `.env.example` files for complete lists.

---

## 📚 API Documentation

- **Authentication**: `/api/auth/login/`, `/api/auth/register/`, `/api/auth/registrations/`
- **ASHA Reports**: `/api/asha/reports/`
- **Districts**: `/api/district/boundaries/`
- **Clinical Reports**: `/api/clinical/reports/`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ for India's Public Health**

</div>
