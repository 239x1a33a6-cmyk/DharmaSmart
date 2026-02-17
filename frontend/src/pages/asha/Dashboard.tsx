import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { backendApi, API_ENDPOINTS } from '../../services/backend-api';
import AshaLayout from '../../components/layout/AshaLayout';

export default function AshaDashboard() {
    const navigate = useNavigate();
    const { user: _user } = useAuth();

    const [stats, setStats] = useState({
        totalReports: 0,
        pendingSync: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch reports to get count
                const reports: any[] = await backendApi.get(API_ENDPOINTS.ashaReports);
                setStats(prev => ({ ...prev, totalReports: reports.length }));
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Poll every 10 seconds for real-time updates
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);

    const tiles = [
        { label: 'New Case Entry', icon: 'ri-add-circle-fill', path: '/asha/new-case', color: 'bg-blue-600', sub: 'Log Symptoms' },
        { label: 'Verify Reports', icon: 'ri-checkbox-circle-fill', path: '/asha/verify-reports', color: 'bg-teal-600', sub: 'Community Data' },
        { label: 'Visits Log', icon: 'ri-home-smile-fill', path: '/asha/household-visits', color: 'bg-indigo-600', sub: 'Daily Routine' },

        { label: 'Water Monitor', icon: 'ri-drop-fill', path: '/asha/water-monitoring', color: 'bg-cyan-600', sub: 'Testing Kit' },
        { label: 'Weekly Report', icon: 'ri-file-list-3-fill', path: '/asha/weekly-report', color: 'bg-violet-600', sub: 'Submission' },
        { label: 'Escalate Case', icon: 'ri-alarm-warning-fill', path: '/asha/escalations', color: 'bg-red-600', sub: 'Critical !' },

        { label: 'Dist. Orders', icon: 'ri-file-text-fill', path: '/asha/district-instructions', color: 'bg-orange-500', sub: 'Instructions' },
        { label: 'Awareness', icon: 'ri-group-fill', path: '/asha/awareness-sessions', color: 'bg-pink-600', sub: 'Sessions' },
        { label: 'Health Camps', icon: 'ri-hospital-fill', path: '/asha/health-camps', color: 'bg-teal-600', sub: 'Coordination' },

        { label: 'Tracker', icon: 'ri-task-fill', path: '/asha/follow-ups', color: 'bg-amber-500', sub: 'Follow-ups' },
        { label: 'Broadcast', icon: 'ri-broadcast-fill', path: '/asha/broadcast', color: 'bg-blue-600', sub: 'Public Alerts' },
        { label: 'AI Assistant', icon: 'ri-brain-fill', path: '/asha/decision-support', color: 'bg-emerald-600', sub: 'Advisory' },
    ];

    return (
        <AshaLayout title="Dashboard">
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

                {/* 2. Top Section: Alert & Quick Action */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <i className="ri-database-2-fill text-blue-500 text-2xl"></i>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded-md tracking-wider">Live Data</span>
                                <span className="text-[10px] text-gray-400 font-medium">Updated Just Now</span>
                            </div>
                            <h2 className="text-navy font-bold text-sm leading-tight">
                                {loading ? 'Loading...' : `${stats.totalReports} Total Reports Submitted`}
                            </h2>
                            <p className="text-xs text-gray-500 mt-0.5">Synced with District Database</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/asha/new-case')}
                        className="w-full md:w-auto px-6 py-4 bg-navy text-white rounded-xl font-bold text-sm shadow-lg shadow-navy/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
                    >
                        <i className="ri-add-line text-xl"></i>
                        <span>Report New Case</span>
                    </button>
                </div>

                {/* 3. Main Tiles Grid (3x3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tiles.map((tile, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(tile.path)}
                            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all flex flex-col items-center text-center group h-40 justify-center relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 ${tile.color} rounded-2xl flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                                <i className={`${tile.icon} text-2xl`}></i>
                            </div>
                            <span className="text-navy font-bold text-sm leading-tight">{tile.label}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 opacity-60">{tile.sub}</span>

                            {/* Decorative background circle */}
                            <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${tile.color} opacity-5 rounded-full pointer-events-none`}></div>
                        </button>
                    ))}
                </div>

                {/* 4. Footer Utils */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate('/asha/offline')}
                        className="p-4 bg-gray-100 rounded-2xl flex items-center justify-center space-x-2 text-gray-500 font-bold text-xs"
                    >
                        <i className="ri-wifi-off-line"></i>
                        <span>Offline Manager</span>
                    </button>
                    <button
                        onClick={() => navigate('/asha/heatmap')}
                        className="p-4 bg-gray-100 rounded-2xl flex items-center justify-center space-x-2 text-gray-500 font-bold text-xs"
                    >
                        <i className="ri-map-pin-line"></i>
                        <span>Surveillance Map</span>
                    </button>
                </div>
            </div>
        </AshaLayout>
    );
}
