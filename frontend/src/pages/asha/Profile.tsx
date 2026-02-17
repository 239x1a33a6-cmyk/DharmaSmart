import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function Profile() {
    const { user } = useAuth();

    return (
        <AshaLayout title="My Profile" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary border-4 border-white shadow-lg">
                            <i className="ri-user-line text-4xl"></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-navy">{user?.profile?.fullName || 'ASHA Worker'}</h2>
                            <p className="text-sm text-gray-500 font-medium">ID: {user?.profile?.ashaId || 'ASHA-MJL-001'}</p>
                            <div className="flex items-center mt-2 space-x-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">{user?.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Village</p>
                                <p className="text-sm font-bold text-navy">{user?.profile?.village || 'Not Assigned'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sub-Center</p>
                                <p className="text-sm font-bold text-navy">{user?.profile?.subCenter || 'Not Assigned'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">District</p>
                                <p className="text-sm font-bold text-navy">{user?.profile?.district || 'Not Assigned'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                                <p className="text-sm font-bold text-navy">{user?.profile?.yearsOfExperience || '0'} Years</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <h3 className="text-sm font-bold text-navy mb-4">Account Settings</h3>
                            <button className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-navy text-sm mb-3 flex justify-between items-center group">
                                <span>Change Language</span>
                                <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-primary transition-colors"></i>
                            </button>
                            <button className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-navy text-sm flex justify-between items-center group">
                                <span>Sync Settings</span>
                                <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-primary transition-colors"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AshaLayout>
    );
}
