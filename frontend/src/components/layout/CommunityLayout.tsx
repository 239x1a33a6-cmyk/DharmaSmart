import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface CommunityLayoutProps {
    children: React.ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-64 bg-navy flex-col text-white">
                <div className="p-8">
                    <div className="flex items-center space-x-3 text-primary mb-12">
                        <i className="ri-heart-pulse-fill text-3xl"></i>
                        <span className="font-heading font-bold text-xl tracking-tight text-white">SMART HEALTH</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/community/dashboard' },
                            { icon: 'ri-capsule-line', label: 'Report Symptoms', path: '/report-symptoms' },
                            { icon: 'ri-drop-line', label: 'Report Water Issue', path: '/water-report' },
                            { icon: 'ri-history-line', label: 'My Submissions', path: '/community/submissions' },
                            { icon: 'ri-notification-3-line', label: 'Local Alerts', path: '/community/alerts' },
                            { icon: 'ri-book-open-line', label: 'Learn & Prevent', path: '/community/education' },
                            { icon: 'ri-user-line', label: 'Profile', path: '/community/profile' },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${window.location.pathname === item.path ? 'bg-primary text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                                <i className={`${item.icon} text-xl`}></i>
                                <span className="text-sm font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-white/5">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 text-white/60 hover:text-red-400 transition-colors w-full"
                    >
                        <i className="ri-logout-box-r-line text-xl"></i>
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-navy font-bold text-lg leading-tight">Welcome, {user?.profile?.fullName}</h1>
                                <div className="flex items-center space-x-2 mt-0.5">
                                    <div className="flex items-center text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                        <i className="ri-map-pin-line mr-1"></i>
                                        {user?.profile?.village}, {user?.profile?.district}
                                    </div>
                                    <div className="flex items-center text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                        Risk: Low
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select className="text-[10px] font-bold bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 outline-none text-navy">
                                <option>English</option>
                                <option>हिंदी</option>
                                <option>Assamese</option>
                            </select>
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {user?.profile?.fullName?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full space-y-8 flex-1">
                    {children}
                </div>

                {/* Footer */}
                <footer className="mt-auto py-8 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Smart Community Health Surveillance System</p>
                    <p className="text-[10px] text-gray-400 mt-2">v1.2.0 • Data is handled per GOI Public Health Privacy Standards</p>
                </footer>
            </main>

            {/* Floating Action Button (Mobile Only) */}
            <button className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 text-2xl">
                <i className="ri-add-line"></i>
            </button>
        </div>
    );
}
