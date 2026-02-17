# Quick Commands - Run These in a NEW Terminal

## Step 1: Create Migration Files
```bash
cd /Users/vinaykumar/Desktop/Dharma/backend
docker compose exec web python manage.py makemigrations
```

## Step 2: Apply Migrations to Database
```bash
docker compose exec web python manage.py migrate
```

## Step 3: Create Admin User
```bash
docker compose exec web python manage.py createsuperuser
```

**What to enter:**
- Username: `admin`
- Email: `admin@example.com`
- Password: `admin123` (you won't see it as you type)
- Password (again): `admin123`
- Bypass password validation warning (y): `y`

## Step 4: Test the API
Open your browser and visit:
- http://localhost:8000/api/docs/ (Swagger API Documentation)
- http://localhost:8000/admin/ (Django Admin Panel)

Login with username `admin` and password `admin123`

---

**Note:** Keep the original terminal running with `docker compose up`. These commands run in a NEW terminal.
