// State Layout — Clean governance-focused sidebar layout for State Admin
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface StateLayoutProps {
    children: React.ReactNode;
}

export default function StateLayout({ children }: StateLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { label: 'State Overview', icon: 'ri-dashboard-3-fill', path: '/state/dashboard' },
        { label: 'District Performance', icon: 'ri-building-4-fill', path: '/state/district-performance' },
        { label: 'Risk Intelligence', icon: 'ri-shield-flash-fill', path: '/state/risk-intelligence' },
        { label: 'State Map View', icon: 'ri-map-2-fill', path: '/state/map' },
        { label: 'Advisory Generator', icon: 'ri-mail-send-fill', path: '/state/advisory-generator', highlight: true },
        { label: 'Compliance Tracker', icon: 'ri-checkbox-circle-fill', path: '/state/compliance' },
        { label: 'Health Camps', icon: 'ri-heart-pulse-fill', path: '/state/health-camps' },
        { label: 'State Reports', icon: 'ri-file-chart-fill', path: '/state/reports' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Header */}
            <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white h-16 flex items-center justify-between px-6 shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <i className={`ri-menu-${isSidebarOpen ? 'fold' : 'unfold'}-line text-xl`}></i>
                    </button>
                    <div className="flex items-center space-x-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Gov" className="h-8 invert opacity-90" />
                        <div>
                            <h1 className="font-bold text-sm tracking-wide uppercase leading-none">State Health Authority</h1>
                            <p className="text-[10px] text-indigo-300 uppercase tracking-widest mt-0.5">Telangana — Central Governance</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-emerald-900/40 border border-emerald-500/30 rounded-full">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Live Governance</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                            <i className="ri-notification-3-fill text-xl"></i>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-indigo-900"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">{user?.profile?.fullName || 'State Commissioner'}</p>
                                <p className="text-[10px] text-indigo-300">State Authority</p>
                            </div>
                            <button onClick={logout} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors" title="Logout">
                                <i className="ri-logout-box-r-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-indigo-900 to-indigo-950 text-indigo-200 flex flex-col transition-all duration-300 ease-in-out shadow-2xl z-40`}>
                    <div className="flex-1 overflow-y-auto py-6 space-y-1">
                        {navItems.map(item => (
                            <button key={item.path} onClick={() => navigate(item.path)}
                                className={`w-full flex items-center px-6 py-3 transition-all relative group
                                    ${location.pathname === item.path
                                        ? 'bg-white/15 text-white shadow-lg'
                                        : (item as any).highlight
                                            ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border-r-2 border-amber-400'
                                            : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <i className={`${item.icon} text-xl ${isSidebarOpen ? 'mr-4' : 'mx-auto'}`}></i>
                                {isSidebarOpen && <span className="text-sm font-medium tracking-wide">{item.label}</span>}
                                {location.pathname === item.path && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></div>}
                            </button>
                        ))}
                    </div>

                    {isSidebarOpen && (
                        <div className="p-6 border-t border-indigo-800">
                            <div className="bg-indigo-950 rounded-xl p-4 border border-indigo-800">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Governance Status</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs"><span>Districts Active</span><span className="text-emerald-400 font-mono">10/10</span></div>
                                    <div className="flex justify-between text-xs"><span>Advisory Compliance</span><span className="text-amber-400 font-mono">87%</span></div>
                                    <div className="flex justify-between text-xs"><span>State Risk Score</span><span className="text-orange-400 font-mono">58</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    <div className="max-w-[1600px] mx-auto min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
