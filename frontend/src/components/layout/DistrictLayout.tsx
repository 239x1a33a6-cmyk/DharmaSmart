import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DistrictLayoutProps {
    children: React.ReactNode;
}

export default function DistrictLayout({ children }: DistrictLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open for desktop "Command Center" feel

    const navItems = [
        { label: 'Overview Dashboard', icon: 'ri-dashboard-3-fill', path: '/district/dashboard' },
        { label: 'Live Risk Map', icon: 'ri-map-pin-2-fill', path: '/district/risk-map' },
        { label: 'Risk Analytics', icon: 'ri-bar-chart-box-fill', path: '/district/risk-analytics' },
        { label: 'Alert Management', icon: 'ri-alarm-warning-fill', path: '/district/alerts', highlight: true },
        { label: 'Alert History', icon: 'ri-history-line', path: '/district/alert-history' },
        { label: 'ASHA Reports', icon: 'ri-user-heart-fill', path: '/district/asha-reports' },
        { label: 'Clinical Reports', icon: 'ri-stethoscope-fill', path: '/district/clinical-reports' },
        { label: 'Intervention Mgmt', icon: 'ri-first-aid-kit-line', path: '/district/interventions' },
        { label: 'PHC & ASHA Monitor', icon: 'ri-hospital-line', path: '/district/phcs' },
        { label: 'Budget & Resources', icon: 'ri-money-rupee-circle-fill', path: '/district/budget' },
        { label: 'State Advisories', icon: 'ri-mail-star-fill', path: '/district/advisories' },
        { label: 'Reports & Downloads', icon: 'ri-file-download-line', path: '/district/reports' },
        { label: 'Settings', icon: 'ri-settings-4-line', path: '/district/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Top Command Bar */}
            <header className="bg-navy-dark text-white h-16 flex items-center justify-between px-6 shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <i className={`ri-menu-${isSidebarOpen ? 'fold' : 'unfold'}-line text-xl`}></i>
                    </button>
                    <div className="flex items-center space-x-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Gov" className="h-8 invert opacity-90" />
                        <div>
                            <h1 className="font-bold text-sm tracking-wide uppercase leading-none">District Health Authority</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Telangana Surveillance Unit</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-red-900/40 border border-red-500/30 rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-xs font-bold text-red-200 uppercase tracking-wider">Live System Active</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                            <i className="ri-notification-3-fill text-xl"></i>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-navy-dark"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">{user?.profile?.fullName || 'Dist. Magistrate'}</p>
                                <p className="text-[10px] text-gray-400">Administrator</p>
                            </div>
                            <button onClick={logout} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors" title="Logout">
                                <i className="ri-logout-box-r-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-navy text-gray-300 flex flex-col transition-all duration-300 ease-in-out shadow-2xl z-40`}>
                    <div className="flex-1 overflow-y-auto py-6 space-y-2">
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center px-6 py-3 transition-all relative group
                                    ${location.pathname === item.path
                                        ? 'bg-primary text-white shadow-lg'
                                        : (item as any).highlight
                                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border-r-2 border-red-500'
                                            : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <i className={`${item.icon} text-xl ${isSidebarOpen ? 'mr-4' : 'mx-auto'} ${(item as any).highlight ? 'text-red-500 group-hover:text-red-400' : ''}`}></i>
                                {isSidebarOpen && <span className={`text-sm font-medium tracking-wide ${(item as any).highlight ? 'font-bold' : ''}`}>{item.label}</span>}
                                {location.pathname === item.path && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>}
                            </button>
                        ))}
                    </div>

                    {isSidebarOpen && (
                        <div className="p-6 border-t border-white/10">
                            <div className="bg-navy-dark rounded-xl p-4 border border-white/5">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">System Status</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>Server</span>
                                        <span className="text-green-400 font-mono">ONLINE</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Sync Delay</span>
                                        <span className="text-blue-400 font-mono">12ms</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Last Backup</span>
                                        <span className="text-gray-500 font-mono">04:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                    <div className="max-w-[1600px] mx-auto min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
