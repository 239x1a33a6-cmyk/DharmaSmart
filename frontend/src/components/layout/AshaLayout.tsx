import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AshaLayoutProps {
    children: React.ReactNode;
    title: string;
    showBack?: boolean;
    backPath?: string;
    actions?: React.ReactNode;
}

export default function AshaLayout({ children, title, showBack = false, backPath = '/asha/dashboard', actions }: AshaLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const navItems = [
        { label: 'Dashboard', icon: 'ri-dashboard-line', path: '/asha/dashboard' },
        { label: 'New Case Entry', icon: 'ri-add-circle-line', path: '/asha/new-case' },
        { label: 'Verify Reports', icon: 'ri-file-search-line', path: '/asha/verify-reports' },
        { label: 'Household Visits', icon: 'ri-home-smile-line', path: '/asha/household-visits' },
        { label: 'Water Monitoring', icon: 'ri-drop-line', path: '/asha/water-monitoring' },
        { label: 'Weekly Report', icon: 'ri-file-list-3-line', path: '/asha/weekly-report' },
        { label: 'Escalations', icon: 'ri-alarm-warning-line', path: '/asha/escalations' },
        { label: 'Follow-Up Tracker', icon: 'ri-task-line', path: '/asha/follow-ups' },
        { label: 'District Instructions', icon: 'ri-file-text-line', path: '/asha/district-instructions' },
        { label: 'Awareness Sessions', icon: 'ri-group-line', path: '/asha/awareness-sessions' },
        { label: 'Health Camps', icon: 'ri-hospital-line', path: '/asha/health-camps' },
        { label: 'Community Broadcast', icon: 'ri-broadcast-line', path: '/asha/broadcast' },
        { label: 'Doctor Advisories', icon: 'ri-stethoscope-line', path: '/asha/doctor-advisories' },
        { label: 'Comm. Archive', icon: 'ri-archive-line', path: '/asha/communication-archive' },
        { label: 'Decision Support', icon: 'ri-brain-line', path: '/asha/decision-support' },
        { label: 'Offline Manager', icon: 'ri-wifi-off-line', path: '/asha/offline' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">

            {/* Top Header Bar */}
            <header className="bg-navy text-white px-4 py-3 shadow-lg flex items-center justify-between sticky top-0 z-40 h-16">
                <div className="flex items-center space-x-3">
                    {showBack ? (
                        <button
                            onClick={() => navigate(backPath)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <i className="ri-arrow-left-line text-xl"></i>
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <i className="ri-menu-line text-xl"></i>
                        </button>
                    )}

                    <div>
                        <h1 className="font-bold text-lg leading-tight truncate max-w-[150px] sm:max-w-xs">{title}</h1>
                        {!showBack && (
                            <div className="flex items-center space-x-1.5 opacity-80">
                                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`}></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[100px]">{user?.profile?.village}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsNotificationsOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-full relative transition-colors"
                    >
                        <i className="ri-notification-3-line text-xl"></i>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-navy"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-9 h-9 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-bold border-2 border-white/20 hover:border-white transition-all shadow-md"
                        >
                            {user?.profile?.fullName?.charAt(0)}
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn origin-top-right text-navy">
                                    <div className="px-4 py-3 border-b border-gray-50">
                                        <p className="text-sm font-bold text-navy truncate">{user?.profile?.fullName}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{user?.id}</p>
                                    </div>
                                    <button onClick={() => navigate('/asha/profile')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <i className="ri-user-settings-line text-gray-400"></i>
                                        <span>My Profile</span>
                                    </button>
                                    <button onClick={() => navigate('/asha/offline')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <i className={`ri-${isOnline ? 'wifi' : 'wifi-off'}-line ${isOnline ? 'text-green-500' : 'text-red-500'}`}></i>
                                        <span>{isOnline ? 'Sync Status: OK' : 'Offline Mode'}</span>
                                    </button>
                                    <div className="border-t border-gray-50 my-1"></div>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center space-x-2 font-bold">
                                        <i className="ri-logout-box-r-line"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Side Drawer Menu */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
                    <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
                        <div className="p-6 bg-navy text-white flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                    <i className="ri-shield-user-line text-xl"></i>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">ASHA Panel</h2>
                                    <p className="text-[10px] opacity-70 uppercase tracking-widest">{user?.profile?.phc}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            <div className="px-4 mb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Main Navigation</p>
                            </div>
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => { navigate(item.path); setIsSidebarOpen(false); }}
                                    className={`w-full text-left flex items-center space-x-3 px-6 py-3 border-l-4 transition-all ${location.pathname === item.path ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-navy'}`}
                                >
                                    <i className={`${item.icon} text-xl`}></i>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ))}

                            <div className="px-4 mt-6 mb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Support</p>
                            </div>
                            <button className="w-full text-left flex items-center space-x-3 px-6 py-3 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:text-navy transition-all">
                                <i className="ri-question-line text-xl"></i>
                                <span className="text-sm">Help & Training</span>
                            </button>
                        </div>

                        <div className="p-4 border-t border-gray-100">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center space-x-2"
                            >
                                <i className="ri-logout-box-r-line"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Panel */}
            {isNotificationsOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm transition-opacity" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className="relative w-80 sm:w-96 bg-white h-full shadow-2xl flex flex-col animate-slideInLeft">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-bold text-navy text-lg">Notifications</h2>
                            <button onClick={() => setIsNotificationsOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer">
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded">New Report</span>
                                        <span className="text-[10px] text-gray-400">2m ago</span>
                                    </div>
                                    <p className="text-sm font-bold text-navy mb-1">Symptom Cluster Detected</p>
                                    <p className="text-xs text-gray-500">High fever reports in Ward 4 exceed threshold. Verify immediately.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 relative z-0 pb-20 md:pb-8">
                {actions && (
                    <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-30 flex items-center space-x-3 overflow-x-auto no-scrollbar">
                        {actions}
                    </div>
                )}
                {children}
            </main>

        </div>
    );
}
