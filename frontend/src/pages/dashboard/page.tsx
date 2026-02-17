import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import CommunityDashboard from './components/CommunityDashboard';
import AshaWorkerDashboard from './components/AshaWorkerDashboard';
import ClinicStaffDashboard from './components/ClinicStaffDashboard';
import DistrictOfficerDashboard from './components/DistrictOfficerDashboard';
import StateAuthorityDashboard from './components/StateAuthorityDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-teal-500 animate-spin"></i>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'community_member':
        return <CommunityDashboard user={user} />;
      case 'asha_worker':
        return <AshaWorkerDashboard user={user} />;
      case 'clinic_staff':
        return <ClinicStaffDashboard user={user} />;
      case 'district_officer':
        return <DistrictOfficerDashboard user={user} />;
      case 'state_authority':
        return <StateAuthorityDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return <CommunityDashboard user={user} />;
    }
  };

  return (
    <DashboardLayout user={user}>
      {renderDashboard()}
    </DashboardLayout>
  );
}
