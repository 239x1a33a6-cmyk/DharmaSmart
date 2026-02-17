import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleDownloadData = () => {
        alert('Preparing your data for download... A secure link will be sent to your registered mobile number.');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('WARNING: This will permanently delete your account and all submission history. This action cannot be undone. Are you sure?')) {
            alert('Account deletion request submitted. Process will complete in 24 hours.');
            logout();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-100 py-6 px-8 flex items-center space-x-4 sticky top-0 z-10">
                <button onClick={() => navigate('/community/dashboard')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <i className="ri-arrow-left-line text-navy text-xl"></i>
                </button>
                <h1 className="text-navy font-bold text-xl">My Profile</h1>
            </header>

            <div className="p-8 max-w-3xl mx-auto w-full space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-center space-x-6 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user?.profile?.fullName?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-navy">{user?.profile?.fullName}</h2>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                                {user?.role?.replace('_', ' ')} • ID: {user?.id}
                            </p>
                            <div className="flex items-center space-x-2 mt-3">
                                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                    Verified Account
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">• Joined Feb 2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Sections */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Personal Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mobile / Email</label>
                                <p className="text-sm font-bold text-navy">{user?.mobile || user?.email}</p>
                            </div>
                            <div>
                                <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Age Group</label>
                                <p className="text-sm font-bold text-navy">{user?.profile?.ageGroup} Years</p>
                            </div>
                            <div>
                                <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gender</label>
                                <p className="text-sm font-bold text-navy">{user?.profile?.gender || 'Not specified'}</p>
                            </div>
                            <button
                                onClick={() => navigate('/community/setup')}
                                className="w-full mt-4 py-3 bg-gray-50 text-primary text-xs font-bold rounded-xl hover:bg-primary/5 transition-all text-center"
                            >
                                Edit Personal Info
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Location & Resources</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <i className="ri-map-pin-line text-primary mt-1"></i>
                                <div>
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</label>
                                    <p className="text-sm font-bold text-navy">{user?.profile?.village}, {user?.profile?.district}, {user?.profile?.state}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <i className="ri-drop-line text-primary mt-1"></i>
                                <div>
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Water Source</label>
                                    <p className="text-sm font-bold text-navy">{user?.profile?.waterSource}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <i className="ri-translate-2 text-primary mt-1"></i>
                                <div>
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Language</label>
                                    <p className="text-sm font-bold text-navy">{user?.profile?.language}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data & Privacy */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h3 className="text-navy font-bold">Data & Privacy Control</h3>
                        <p className="text-gray-400 text-xs mt-1">Manage how your health and location data is handled</p>
                    </div>

                    <div className="divide-y divide-gray-50">
                        <button
                            onClick={handleDownloadData}
                            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <i className="ri-download-cloud-line text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-navy">Download My Data</p>
                                    <p className="text-[10px] text-gray-400 font-medium">Get a copy of all your submissions and profile info</p>
                                </div>
                            </div>
                            <i className="ri-arrow-right-s-line text-gray-300 text-xl"></i>
                        </button>

                        <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                                    <i className="ri-shield-user-line text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-navy">Privacy Statement</p>
                                    <p className="text-[10px] text-gray-400 font-medium">How we safeguard your health information</p>
                                </div>
                            </div>
                            <i className="ri-arrow-right-s-line text-gray-300 text-xl"></i>
                        </button>

                        <button
                            onClick={handleDeleteAccount}
                            className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors text-left group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                    <i className="ri-delete-bin-line text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-navy group-hover:text-red-700">Delete Account</p>
                                    <p className="text-[10px] text-gray-400 font-medium">Permanently remove all your data from the system</p>
                                </div>
                            </div>
                            <i className="ri-arrow-right-s-line text-gray-300 text-xl group-hover:text-red-300"></i>
                        </button>
                    </div>
                </div>

                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10">
                    <div className="flex items-start space-x-4">
                        <i className="ri-information-line text-primary text-xl mt-1"></i>
                        <p className="text-xs text-primary/80 font-semibold leading-relaxed">
                            All personal data is encrypted and used only for public health monitoring. We do not share individual identities with third parties. Your location is used only to provide relevant early warning alerts for your specific village and district.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
