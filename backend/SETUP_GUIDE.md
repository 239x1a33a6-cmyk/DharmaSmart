# Backend Setup & Deployment Guide

## 📋 Table of Contents
1. [What We Built](#what-we-built)
2. [Why Docker?](#why-docker)
3. [Architecture Overview](#architecture-overview)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Understanding Each Component](#understanding-each-component)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ What We Built

We created a **production-grade Django backend** for the Smart Community Health Surveillance System. This backend handles:

- **User Authentication** (Login, Tokens, Roles)
- **Health Reports** (ASHA workers submitting symptoms)
- **Clinical Reviews** (Doctors analyzing reports)
- **Geographic Data** (Districts, Villages with map coordinates)
- **Alerts System** (SMS/WhatsApp notifications)
- **Analytics** (AI-powered risk predictions)
- **State Advisories** (Government announcements)

---

## 🐳 Why Docker?

### What is Docker?
Docker is like a "shipping container" for software. Just like how physical shipping containers can be moved between ships, trucks, and trains without repacking, Docker containers package your application so it runs **exactly the same** on any computer.

### Why Do We Need It?
Our backend requires three separate services to work:

1. **Django** (Python web framework) - Your application code
2. **PostgreSQL with PostGIS** (Database) - Stores data + handles map coordinates
3. **Redis** (Cache/Queue system) - Manages background tasks

Without Docker, you'd have to:
- Install PostgreSQL manually
- Install the PostGIS extension (complicated!)
- Install Redis manually
- Configure all three to talk to each other
- Hope it works on your specific Mac version

**With Docker:** One command starts all three services, pre-configured and ready to go.

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           React Frontend (Port 3000)            │
│         Already running on your machine         │
└─────────────────┬───────────────────────────────┘
                  │
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────────────┐
│         Django Backend (Port 8000)              │
│  • REST API Endpoints                           │
│  • JWT Authentication                           │
│  • Business Logic                               │
└─────────────┬───────────────┬───────────────────┘
              │               │
              │               │
    ┌─────────▼─────┐   ┌────▼──────┐
    │  PostgreSQL   │   │   Redis   │
    │  (Port 5432)  │   │ (Port 6379)│
    │               │   │           │
    │  • User data  │   │ • Celery  │
    │  • Reports    │   │   tasks   │
    │  • Map data   │   │ • Cache   │
    └───────────────┘   └───────────┘
```

---

## 📖 Step-by-Step Setup

### Step 1: Install Docker Desktop

**What it does:** Installs the Docker engine that runs containers on your Mac.

**How to do it:**
1. Go to https://www.docker.com/products/docker-desktop
2. Download "Docker Desktop for Mac"
3. Open the `.dmg` file and drag Docker to Applications
4. Launch Docker Desktop from Applications
5. Wait for the whale icon to appear in your menu bar (means it's running)

**Verify it worked:**
```bash
docker --version
# Should show: Docker version 25.x.x or similar
```

---

### Step 2: Start All Services

**What it does:** 
- Downloads the PostgreSQL and Redis images (first time only)
- Creates three containers (Django, PostgreSQL, Redis)
- Connects them in a private network
- Starts all three services

**How to do it:**
```bash
cd /Users/vinaykumar/Desktop/Dharma/backend
docker compose up --build
```

**What you'll see:**
```
[+] Building...
[+] Running 3/3
✔ Container backend-db-1     Started
✔ Container backend-redis-1  Started
✔ Container backend-web-1    Started
```

**What's happening:**
- `db-1`: PostgreSQL database is starting
- `redis-1`: Redis cache is starting
- `web-1`: Django app is loading your Python code

**When it's ready:**
You'll see: `Quit the server with CONTROL-C.`

---

### Step 3: Create Database Tables

**What it does:** Converts your Python model classes (User, Role, AshaReport, etc.) into actual database tables.

**Why we need this:** 
- Django doesn't create tables automatically
- We need to tell it: "Look at all the models we defined, and create the matching tables"

**How to do it** (open a NEW terminal tab while Step 2 is running):
```bash
cd /Users/vinaykumar/Desktop/Dharma/backend

# Step 3a: Generate migration files
docker compose exec web python manage.py makemigrations

# Step 3b: Apply migrations to database
docker compose exec web python manage.py migrate
```

**What you'll see:**
```
Applying authentication.0001_initial... OK
Applying asha_reports.0001_initial... OK
Applying district.0001_initial... OK
...
```

**What happened:**
- Django created 10+ tables in PostgreSQL
- Tables have columns matching your model fields
- Relationships (foreign keys) are set up

---

### Step 4: Create an Admin User

**What it does:** Creates your first user account with full admin privileges.

**Why we need this:**
- You need an account to login
- This account can access the admin panel
- You'll use this to test API endpoints

**How to do it:**
```bash
docker compose exec web python manage.py createsuperuser
```

**What you'll be asked:**
```
Username: admin
Email: admin@example.com
Password: ********
Password (again): ********
```

**Pro tip:** Use a simple password like `admin123` for local development.

---

### Step 5: Access the API

**What it does:** Opens the auto-generated API documentation in your browser.

**How to do it:**
1. Make sure Docker is still running (from Step 2)
2. Open your browser
3. Visit: http://localhost:8000/api/docs/

**What you'll see:**
- Interactive API documentation (Swagger UI)
- List of all your endpoints
- "Try it out" buttons to test each endpoint

**Try this:**
1. Click on `POST /api/auth/login/`
2. Click "Try it out"
3. Enter:
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```
4. Click "Execute"
5. You'll get back a JWT token (this proves authentication works!)

---

## 🔍 Understanding Each Component

### Django (The Application Server)

**What it is:** A Python framework that receives HTTP requests and returns responses.

**What it does in our project:**
- Validates incoming data (e.g., "Is this a valid email?")
- Checks permissions (e.g., "Is this user an ASHA worker?")
- Saves data to the database
- Returns JSON responses

**Example Flow:**
1. Frontend sends: `POST /api/asha/reports/ {"symptoms": "fever"}`
2. Django receives it
3. Django checks: "Is user logged in? Is user an ASHA worker?"
4. Django saves report to database
5. Django returns: `{"id": 123, "status": "created"}`

---

### PostgreSQL + PostGIS (The Database)

**What it is:** A database that stores all your data permanently.

**Why PostGIS?** 
- Regular PostgreSQL stores text, numbers, dates
- **PostGIS adds** the ability to store geographic coordinates
- Example: You can ask "Find all reports within 5km of this point"

**What it stores:**
```
users table:
| id | username | email           | password_hash |
|----|----------|-----------------|---------------|
| 1  | admin    | admin@test.com  | $2b$12$...   |

asha_reports table:
| id | user_id | symptoms     | geo_point         |
|----|---------|--------------|-------------------|
| 1  | 5       | {"fever": 1} | POINT(78.4 17.4)  |
```

---

### Redis (The Task Queue)

**What it is:** A super-fast in-memory database used for:
1. **Caching** (storing temporary data)
2. **Task Queue** (managing background jobs)

**Why we need it:**
- Sending SMS takes 2-3 seconds
- We don't want the API to wait (slow response)
- Instead: Django says "Hey Redis, send this SMS later"
- Redis + Celery handle it in the background

**Example:**
```python
# In your Django view
alert = DistrictAlert.objects.create(...)
send_alert_notification.delay(alert.id)  # ← Happens in background
return Response({"status": "created"})   # ← Returns immediately
```

---

### Celery (The Background Worker)

**What it is:** A Python library that processes tasks from the Redis queue.

**What it does:**
- Listens to Redis
- When a new task appears, it executes it
- Reports success/failure

**Our tasks:**
1. `send_alert_notification` - Sends SMS via Twilio
2. `run_risk_prediction` - Runs AI model

---

## 🌐 API Endpoints

### Authentication
```http
POST /api/auth/login/
Body: {"username": "admin", "password": "admin123"}
Returns: {"access": "eyJ0eXAi...", "refresh": "eyJ0eXAi..."}

POST /api/auth/refresh/
Body: {"refresh": "eyJ0eXAi..."}
Returns: {"access": "eyJ0eXAi..."}

GET /api/auth/profile/
Headers: Authorization: Bearer eyJ0eXAi...
Returns: {"id": 1, "username": "admin", "roles": [...]}
```

### ASHA Reports
```http
GET /api/asha/reports/
Returns: List of all ASHA reports

POST /api/asha/reports/
Body: {"district": 1, "symptoms_json": {"fever": true}, "geo_point": {"type": "Point", "coordinates": [78.4, 17.4]}}
```

### Analytics
```http
GET /api/analytics/predict/?district_id=1
Triggers AI risk prediction
```

---

## 🐛 Troubleshooting

### "docker: command not found"
**Problem:** Docker is not installed or not in your PATH.
**Solution:** Install Docker Desktop from Step 1.

---

### "Port 8000 is already in use"
**Problem:** Another app is using port 8000.
**Solution:** 
```bash
# Find what's using the port
lsof -ti:8000

# Kill it
kill -9 <PID>
```

---

### "Cannot connect to database"
**Problem:** PostgreSQL container is not running.
**Solution:**
```bash
# Check if containers are running
docker compose ps

# Restart everything
docker compose down
docker compose up --build
```

---

### "No migrations to apply"
**Problem:** You already ran migrations.
**Solution:** This is fine! It means your database is up to date.

---

## 🚀 Next Steps

1. **Test the API** using the Swagger UI
2. **Create sample data** (districts, users, reports)
3. **Connect the frontend** (update API URLs in React)
4. **Deploy to production** (Render.com or Railway)

---

## 📚 Additional Resources

- Django Documentation: https://docs.djangoproject.com/
- Docker Tutorial: https://docs.docker.com/get-started/
- Django REST Framework: https://www.django-rest-framework.org/
- PostGIS Guide: https://postgis.net/documentation/

---

**Questions?** Review this guide step-by-step. Each step builds on the previous one.
