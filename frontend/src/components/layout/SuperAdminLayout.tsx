import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SuperAdminLayoutProps {
    children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { label: 'System Command Center', icon: 'ri-dashboard-3-fill', path: '/admin/dashboard' },
        { label: 'User & Role Management', icon: 'ri-group-fill', path: '/admin/users' },
        { label: 'District / Tenant Control', icon: 'ri-building-4-fill', path: '/admin/districts' },
        { label: 'Audit & Activity Logs', icon: 'ri-list-check-2', path: '/admin/logs' },
        { label: 'Security & Compliance', icon: 'ri-shield-check-fill', path: '/admin/security' },
        { label: 'AI & Analytics Config', icon: 'ri-brain-fill', path: '/admin/ai-config' },
        { label: 'Automation Engine', icon: 'ri-robot-fill', path: '/admin/automation' },
        { label: 'Global Settings', icon: 'ri-settings-4-fill', path: '/admin/settings' },
        { label: 'Emergency Mode', icon: 'ri-error-warning-fill', path: '/admin/emergency', highlight: true },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            {/* Top Admin Bar */}
            <header className="bg-slate-900 text-white h-16 flex items-center justify-between px-6 shadow-xl sticky top-0 z-50 border-b border-white/5">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <i className={`ri-menu-${isSidebarOpen ? 'fold' : 'unfold'}-line text-xl`}></i>
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="bg-primary p-1.5 rounded-lg shadow-inner">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Gov" className="h-6 invert" />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm tracking-wide uppercase leading-none text-white">Super Admin <span className="text-primary-light">Portal</span></h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">Root Governance Console</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden lg:flex items-center space-x-4 mr-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">System Status</span>
                            <div className="flex items-center space-x-1.5 text-emerald-400">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                                <span className="text-[10px] font-mono font-bold uppercase">Optimal Performance</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-white/10 shadow-lg">
                                <i className="ri-notification-3-line text-lg"></i>
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-[10px] font-bold rounded-full border-2 border-slate-900 flex items-center justify-center">3</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-white">{user?.profile?.fullName || 'Super Admin'}</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none mt-1">Root Privileges</p>
                            </div>
                            <button onClick={logout} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all border border-red-500/20 group cursor-pointer" title="Logout">
                                <i className="ri-logout-box-r-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Admin Sidebar */}
                <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-slate-900 border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out shadow-2xl z-40 relative`}>
                    <div className="flex-1 overflow-y-auto pt-8 px-3 space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center px-4 py-3.5 transition-all rounded-xl relative group mb-0.5
                                    ${location.pathname === item.path
                                        ? 'bg-primary text-white shadow-[0_8px_20px_-6px_rgba(20,184,166,0.4)] ring-1 ring-white/20'
                                        : item.highlight
                                            ? 'bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/20'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <i className={`${item.icon} text-xl ${isSidebarOpen ? 'mr-4' : 'mx-auto'} ${location.pathname === item.path ? 'scale-110' : ''} transition-transform`}></i>
                                {isSidebarOpen && <span className={`text-sm tracking-wide ${location.pathname === item.path ? 'font-bold' : 'font-medium'}`}>{item.label}</span>}
                                {location.pathname === item.path && isSidebarOpen && (
                                    <div className="ml-auto">
                                        <i className="ri-arrow-right-s-line opacity-50"></i>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {isSidebarOpen && (
                        <div className="p-6">
                            <div className="bg-slate-800/50 rounded-2xl p-5 border border-white/5 shadow-inner">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Auth</h4>
                                    <span className="text-[9px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono uppercase">Secure</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400">Control Nodes</span>
                                        <span className="text-white font-bold">1,248</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-4/5 shadow-[0_0_8px_#14b8a6]"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic">Syncing with 28 District Hubs...</p>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Admin Workspace */}
                <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
                    <div className="p-8 max-w-[1600px] mx-auto min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
