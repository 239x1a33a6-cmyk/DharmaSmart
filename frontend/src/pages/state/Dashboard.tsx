import React, { useState, useEffect } from 'react';
import { backendApi, API_ENDPOINTS } from '../../services/backend-api';

const StateDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await backendApi.get(API_ENDPOINTS.stateStats);
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch state stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Poll every 30s
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-400">Loading State Intelligence...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8 font-inter text-slate-900">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        State Health <span className="text-indigo-600">Command Center</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time surveillance across all districts</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Feed</span>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Total Reports"
                    value={stats?.total_reports || 0}
                    icon="ri-file-list-3-line"
                    color="blue"
                    trend="+12% vs last week"
                />
                <MetricCard
                    label="Verified Cases"
                    value={stats?.verified_cases || 0}
                    icon="ri-checkbox-circle-line"
                    color="emerald"
                    trend="High Priority"
                />
                <MetricCard
                    label="Active Outbreaks"
                    value={stats?.active_alerts || 0}
                    icon="ri-alarm-warning-line"
                    color="amber"
                    trend="Requires Intervention"
                />
                <MetricCard
                    label="Avg Risk Score"
                    value="42"
                    icon="ri-pulse-line"
                    color="indigo"
                    trend="Moderate"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* District Performance Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">District Risk Monitor</h3>
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">District</th>
                                    <th className="px-6 py-4">Total Reports</th>
                                    <th className="px-6 py-4">High Risk Cases</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {(stats?.districts || []).map((d: any) => (
                                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-700">{d.district_name}</td>
                                        <td className="px-6 py-4 font-medium text-slate-600">{d.report_count}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${d.high_risk_count > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {d.high_risk_count} Critical
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${d.high_risk_count > 2 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                                <span className="text-xs font-medium text-slate-500">{d.high_risk_count > 2 ? 'Outbreak Risk' : 'Normal'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-wide">
                                                Directives
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!stats?.districts || stats.districts.length === 0) && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">No district data available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Directives & Alerts Panel */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h3 className="font-bold text-lg mb-1 relative z-10">Issued Directives</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">Active protocols across state</p>

                        <div className="space-y-4 relative z-10">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded uppercase border border-indigo-500/30">Protocol</span>
                                        <span className="text-[10px] text-slate-400">2h ago</span>
                                    </div>
                                    <p className="font-bold text-sm">Enhanced Surveillance Protocol: Vector Control</p>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">All DHOs to initiate immediate larva survey in high-risk verified zones.</p>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                            <i className="ri-add-circle-line text-lg"></i>
                            Issue New Directive
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-4">System Health</h3>
                        <div className="space-y-4">
                            <HealthMetric label="API Latency" value="45ms" status="good" />
                            <HealthMetric label="Data Sync" value="98.2%" status="good" />
                            <HealthMetric label="Active Users" value="24" status="neutral" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ label, value, icon, color, trend }: any) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center text-xl transition-transform group-hover:scale-110`}>
                    <i className={icon}></i>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tight">{value}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{label}</p>
        </div>
    );
};

const HealthMetric = ({ label, value, status }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{value}</span>
            <div className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
        </div>
    </div>
);

export default StateDashboard;
