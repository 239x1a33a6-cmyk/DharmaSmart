from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point, Polygon
from apps.authentication.models import User, Role
from apps.district.models import DistrictBoundary, VillageBoundary
from apps.asha_reports.models import AshaReport, WaterQualityReading
from apps.clinical_reports.models import ClinicalReport
from apps.alerts.models import DistrictAlert
from apps.state.models import StateAdvisory
from apps.analytics.models import RiskScore, AuditLog
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populates the database with sample data for testing'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data population...'))

        # 1. Create Roles
        self.stdout.write('Creating roles...')
        roles_data = [
            {'name': 'Community', 'description': 'Community Member'},
            {'name': 'ASHA', 'description': 'ASHA Worker'},
            {'name': 'Doctor', 'description': 'Medical Doctor'},
            {'name': 'District Admin', 'description': 'District Administrator'},
            {'name': 'State Admin', 'description': 'State Administrator'},
            {'name': 'Super Admin', 'description': 'Super Administrator'},
        ]
        
        roles = {}
        for role_data in roles_data:
            role, created = Role.objects.get_or_create(
                name=role_data['name'],
                defaults={'description': role_data['description']}
            )
            roles[role_data['name']] = role
            if created:
                self.stdout.write(f'  ✓ Created role: {role.name}')

        # 2. Create Users
        self.stdout.write('\nCreating users...')
        users_data = [
            {'username': 'asha_worker1', 'email': 'asha1@example.com', 'first_name': 'Lakshmi', 'last_name': 'Devi', 'role': 'ASHA'},
            {'username': 'asha_worker2', 'email': 'asha2@example.com', 'first_name': 'Radha', 'last_name': 'Kumari', 'role': 'ASHA'},
            {'username': 'doctor1', 'email': 'doctor1@example.com', 'first_name': 'Dr. Rajesh', 'last_name': 'Kumar', 'role': 'Doctor'},
            {'username': 'district_admin1', 'email': 'district1@example.com', 'first_name': 'Ravi', 'last_name': 'Shankar', 'role': 'District Admin'},
            {'username': 'state_admin1', 'email': 'state1@example.com', 'first_name': 'Vijay', 'last_name': 'Singh', 'role': 'State Admin'},
            {'username': 'community1', 'email': 'community1@example.com', 'first_name': 'Sunita', 'last_name': 'Sharma', 'role': 'Community'},
        ]

        users = {}
        for user_data in users_data:
            role_name = user_data.pop('role')
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                user.roles.add(roles[role_name])
                self.stdout.write(f'  ✓ Created user: {user.username} ({role_name})')
            users[user_data['username']] = user

        # 3. Create Districts
        self.stdout.write('\nCreating districts...')
        from django.contrib.gis.geos import MultiPolygon
        
        districts_data = [
            {'district_name': 'Tirupati', 'state_name': 'Andhra Pradesh', 'center': (13.6288, 79.4192)},
            {'district_name': 'Chittoor', 'state_name': 'Andhra Pradesh', 'center': (13.2172, 79.1003)},
            {'district_name': 'Anantapur', 'state_name': 'Andhra Pradesh', 'center': (14.6819, 77.6006)},
        ]

        districts = {}
        for dist_data in districts_data:
            lat, lon = dist_data['center']
            # Create a simple square polygon around the center
            boundary = Polygon((
                (lon - 0.5, lat - 0.5),
                (lon + 0.5, lat - 0.5),
                (lon + 0.5, lat + 0.5),
                (lon - 0.5, lat + 0.5),
                (lon - 0.5, lat - 0.5),
            ))
            multi_poly = MultiPolygon(boundary)
            
            district, created = DistrictBoundary.objects.get_or_create(
                district_name=dist_data['district_name'],
                defaults={
                    'state_name': dist_data['state_name'],
                    'geom': multi_poly,
                }
            )
            districts[dist_data['district_name']] = district
            if created:
                self.stdout.write(f'  ✓ Created district: {district.district_name}')

        # 4. Create Villages
        self.stdout.write('\nCreating villages...')
        villages_data = [
            {'village_name': 'Gangavaram', 'district': 'Tirupati', 'offset': (0.1, 0.1)},
            {'village_name': 'Renigunta', 'district': 'Tirupati', 'offset': (-0.1, 0.1)},
            {'village_name': 'Chandragiri', 'district': 'Tirupati', 'offset': (0.1, -0.1)},
            {'village_name': 'Puttur', 'district': 'Chittoor', 'offset': (0.1, 0.1)},
            {'village_name': 'Madanapalle', 'district': 'Chittoor', 'offset': (-0.1, -0.1)},
        ]

        villages = {}
        for village_data in villages_data:
            district = districts[village_data['district']]
            # Get center from the district's geometry centroid
            center = district.geom.centroid
            offset_lon, offset_lat = village_data['offset']
            
            village_center = Point(center.x + offset_lon, center.y + offset_lat)
            boundary = Polygon((
                (village_center.x - 0.05, village_center.y - 0.05),
                (village_center.x + 0.05, village_center.y - 0.05),
                (village_center.x + 0.05, village_center.y + 0.05),
                (village_center.x - 0.05, village_center.y + 0.05),
                (village_center.x - 0.05, village_center.y - 0.05),
            ))
            multi_poly = MultiPolygon(boundary)
            
            village, created = VillageBoundary.objects.get_or_create(
                village_name=village_data['village_name'],
                district=district,
                defaults={
                    'geom': multi_poly,
                }
            )
            villages[village_data['village_name']] = village
            if created:
                self.stdout.write(f'  ✓ Created village: {village.village_name}')

        # 5. Create ASHA Reports
        self.stdout.write('\nCreating ASHA reports...')
        symptoms_options = [
            {'fever': True, 'cough': False, 'diarrhea': False, 'rash': False},
            {'fever': True, 'cough': True, 'diarrhea': False, 'rash': False},
            {'fever': False, 'cough': False, 'diarrhea': True, 'rash': False},
            {'fever': True, 'cough': False, 'diarrhea': True, 'rash': True},
        ]

        for i in range(20):
            village = random.choice(list(villages.values()))
            asha_user = users['asha_worker1'] if i % 2 == 0 else users['asha_worker2']
            
            report = AshaReport.objects.create(
                user=asha_user,
                district=village.district,
                village=village,
                symptoms_json=random.choice(symptoms_options),
                geo_point=village.geom.centroid,
            )
            self.stdout.write(f'  ✓ Created ASHA report #{i+1} in {village.village_name}')

        # 6. Create Water Quality Readings
        self.stdout.write('\nCreating water quality readings...')
        from datetime import datetime
        for i in range(10):
            village = random.choice(list(villages.values()))
            asha_user = random.choice([users['asha_worker1'], users['asha_worker2']])
            
            reading = WaterQualityReading.objects.create(
                user=asha_user,
                tds=round(random.uniform(50, 500), 2),
                ph=round(random.uniform(6.5, 8.5), 2),
                turbidity=round(random.uniform(0.5, 5.0), 2),
                timestamp=datetime.now(),
                geo_point=village.geom.centroid,
            )
            self.stdout.write(f'  ✓ Created water quality reading in {village.village_name}')

        # 7. Create Clinical Reports
        self.stdout.write('\nCreating clinical reports...')
        asha_reports = AshaReport.objects.all()[:10]
        for asha_report in asha_reports:
            clinical_report = ClinicalReport.objects.create(
                asha_report=asha_report,
                doctor=users['doctor1'],
                diagnosis=random.choice(['Viral Fever', 'Gastroenteritis', 'Common Cold', 'Dengue Suspected']),
                advisory_text='Rest, hydration, and follow-up in 3 days',
                priority=random.choice(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
            )
            self.stdout.write(f'  ✓ Created clinical report for ASHA report #{asha_report.id}')

        self.stdout.write(self.style.SUCCESS('\n✅ Sample data population completed!'))
        self.stdout.write(self.style.SUCCESS('\nData Summary:'))
        self.stdout.write(f'  - {len(roles_data)} Roles created')
        self.stdout.write(f'  - {len(users_data)} Users created')
        self.stdout.write(f'  - {len(districts_data)} Districts created')
        self.stdout.write(f'  - {len(villages_data)} Villages created')
        self.stdout.write(f' - 20 ASHA Reports created')
        self.stdout.write(f'  - 10 Water Quality Readings created')
        self.stdout.write(f'  - {len(asha_reports)} Clinical Reports created')
        
        self.stdout.write(self.style.SUCCESS('\n📱 You can now:'))
        self.stdout.write('  1. Login to admin panel: http://localhost:8000/admin/')
        self.stdout.write('  2. Explore API: http://localhost:8000/api/docs/')
        self.stdout.write('  3. Test with these users:')
        self.stdout.write('     - ASHA Worker: asha_worker1 / password123')
        self.stdout.write('     - Doctor: doctor1 / password123')
        self.stdout.write('     - District Admin: district_admin1 / password123')
        self.stdout.write('     - Admin: admin / admin123')
