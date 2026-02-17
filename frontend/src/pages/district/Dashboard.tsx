// District Admin Dashboard - Dedicated for District Health Officers
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendApi, API_ENDPOINTS } from '../../services/backend-api';
import { mockDistricts, mockPHCs, mockAuditLogs } from '../../mocks/admin-mock-data';
import DistrictRiskMap from '../../components/maps/DistrictRiskMap';
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

export default function DistrictDashboard() {
    const navigate = useNavigate();

    // State for Real Data
    const [stats, setStats] = useState<any>(null);
    const [realActivity, setRealActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // 1. Fetch Stats
            const statsData = await backendApi.get(API_ENDPOINTS.districtStats(1));
            setStats(statsData);

            // 2. Fetch Real-Time Activity (Reports + Audit Logs)
            const [reportsData, logsData] = await Promise.all([
                backendApi.get(API_ENDPOINTS.ashaReports),
                backendApi.get(API_ENDPOINTS.auditLogs)
            ]);

            const reports: any[] = (reportsData as any);
            const logs: any[] = (logsData as any).results || (logsData as any);

            // Access Control: District Admin sees specific logs (mocking filter for now)

            // Format Reports as Activity
            const reportActivities = reports.map(r => ({
                id: `rep-${r.id}`,
                type: 'REPORT',
                title: `New ${r.symptoms_json.severity || 'General'} Case`,
                details: `${r.symptoms_json.patientName || 'Patient'} - ${r.village_name || 'Village'}`,
                timestamp: r.created_at,
                icon: 'ri-file-add-line',
                color: r.symptoms_json.severity === 'High' ? 'text-red-500 bg-red-50' : 'text-blue-500 bg-blue-50'
            }));

            // Format Audit Logs as Activity
            const logActivities = logs.map(l => ({
                id: `log-${l.id}`,
                type: 'ACTION',
                title: l.action?.replace('_', ' '),
                details: `${l.user_name} - ${l.target}`,
                timestamp: l.timestamp,
                icon: 'ri-shield-check-line',
                color: 'text-purple-500 bg-purple-50'
            }));

            // Merge and Sort by Time Descending
            const allActivity = [...reportActivities, ...logActivities]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 7); // Show top 7

            setRealActivity(allActivity);
        } catch (err) {
            console.error("Failed to fetch district data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Poll every 10 seconds for "Live" feel
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fallback/Mock data for parts not yet connected
    const myDistrict = mockDistricts[0];
    const loggedInDistrict = stats?.district_name || myDistrict.name;
    const myPHCs = mockPHCs.filter(phc => phc.districtId === myDistrict.id);
    // Use real activity if available, otherwise mock
    const recentActivity = realActivity.length > 0 ? realActivity : mockAuditLogs.slice(0, 5);

    // Merge real stats into analytics display
    const baseAnalytics = districtAnalyticsData['Tirupati'] || districtAnalyticsData['Chittoor']; // Fallback
    const analytics = {
        ...baseAnalytics,
        riskScore: stats ? stats.risk_score : baseAnalytics.riskScore,
        activeCases: stats ? stats.active_alerts : baseAnalytics.activeCases, // Using alerts as proxy for active cases for now
    };

    // Use Real Data for Metrics where available
    const districtMetrics = [
        {
            label: 'Verified Reports',
            value: stats ? stats.total_reports.toString() : '...',
            icon: 'ri-file-search-fill',
            color: 'bg-teal-500',
            path: '/district/reports'
        },
        {
            label: 'ASHA Workers',
            value: stats ? stats.asha_worker_count.toString() : '...',
            icon: 'ri-user-heart-line',
            color: 'bg-purple-500'
        },
        {
            label: 'Population',
            value: stats ? (stats.population / 1000).toFixed(1) + 'K' : '...',
            icon: 'ri-team-line',
            color: 'bg-blue-500'
        },
        {
            label: 'Compliance Score',
            value: stats ? stats.compliance_score + '%' : '...',
            icon: 'ri-medal-line',
            color: 'bg-emerald-500'
        },
        {
            label: 'Risk Index',
            value: stats ? stats.risk_score.toString() : '...',
            icon: 'ri-alert-line',
            color: stats && stats.risk_score > 70 ? 'bg-red-500' : 'bg-orange-500',
            path: '/district/risk-map'
        },
        {
            label: 'Active Alerts',
            value: stats ? stats.active_alerts.toString() : '...',
            icon: 'ri-notification-3-line',
            color: 'bg-red-500',
            path: '/district/alerts'
        },
    ];

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-gray-500 font-bold">Loading District Data...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* District Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{loggedInDistrict} District</h2>
                        <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase">
                            District Admin
                        </span>
                    </div>
                    <p className="text-slate-500 font-medium">
                        {myDistrict.state} • District Command Center
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => navigate('/district/reports')}
                        className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-200 transition-all flex items-center space-x-2"
                    >
                        <i className="ri-file-text-line"></i>
                        <span>District Report</span>
                    </button>
                </div>
            </div>

            {/* District Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {districtMetrics.map((metric, i) => (
                    <div
                        key={i}
                        onClick={() => metric.path && navigate(metric.path)}
                        className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${metric.path ? 'cursor-pointer' : ''}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${metric.color} p-3 rounded-xl text-white shadow-lg`}>
                                <i className={`${metric.icon} text-2xl`}></i>
                            </div>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900">{metric.value}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {metric.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* District Risk Map — Auto-loaded on login */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <DistrictRiskMap
                    loggedInDistrict={loggedInDistrict}
                    userRole="district_collector"
                    onDistrictClick={(d) => navigate(`/district/risk-map?district=${d}`)}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* District Overview Panel */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">District Overview</h3>
                            <p className="text-sm text-slate-500 mt-1">Key information about {loggedInDistrict}</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                            View Full Details
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-2">District Code</p>
                            <p className="font-mono font-bold text-slate-900 text-lg">{myDistrict.code}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-2">Area</p>
                            <p className="font-bold text-slate-900 text-lg">{myDistrict.area} km²</p>
                        </div>
                        {myDistrict.districtCollector && (
                            <div className="bg-slate-50 p-4 rounded-xl col-span-2">
                                <p className="text-xs text-slate-400 uppercase font-bold mb-2">District Collector</p>
                                <p className="font-bold text-slate-900">{myDistrict.districtCollector}</p>
                            </div>
                        )}
                    </div>

                    {/* Risk Health Summary */}
                    {analytics && (
                        <div className="border-t border-slate-100 pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Health Risk Summary</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-red-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-red-700">{analytics.activeCases}</p>
                                    <p className="text-[10px] text-red-600 font-bold uppercase">Active Cases</p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-emerald-700">{analytics.recovered}</p>
                                    <p className="text-[10px] text-emerald-600 font-bold uppercase">Recovered</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-orange-700">{analytics.waterContaminationAlerts}</p>
                                    <p className="text-[10px] text-orange-600 font-bold uppercase">Water Alerts</p>
                                </div>
                                <div className="p-4 rounded-xl text-center" style={{ backgroundColor: getRiskColor(analytics.riskScore) + '20' }}>
                                    <p className="text-2xl font-black" style={{ color: getRiskColor(analytics.riskScore) }}>{analytics.riskScore}</p>
                                    <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(analytics.riskScore) }}>{getRiskLabel(analytics.riskScore)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHC Summary */}
                    <div className="border-t border-slate-100 pt-6 mt-6">
                        <h4 className="font-bold text-slate-900 mb-4">PHC Status Distribution</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                <p className="text-2xl font-black text-emerald-700">
                                    {myPHCs.filter(p => p.status === 'active').length}
                                </p>
                                <p className="text-xs text-emerald-600 font-bold uppercase mt-1">Active</p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-xl">
                                <p className="text-2xl font-black text-orange-700">
                                    {myPHCs.filter(p => p.status === 'maintenance').length}
                                </p>
                                <p className="text-xs text-orange-600 font-bold uppercase mt-1">Maintenance</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <p className="text-2xl font-black text-slate-700">
                                    {myPHCs.filter(p => p.status === 'inactive').length}
                                </p>
                                <p className="text-xs text-slate-600 font-bold uppercase mt-1">Inactive</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Module Navigation */}
                <div className="space-y-6">
                    {/* Module Navigation Grid */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">District Modules</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'ASHA Reports', desc: 'Field reports', icon: 'ri-user-heart-fill', path: '/district/asha-reports', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                                { label: 'Clinical Reports', desc: 'Doctor diagnoses', icon: 'ri-stethoscope-fill', path: '/district/clinical-reports', color: 'bg-teal-50 hover:bg-teal-100 text-teal-700' },
                                { label: 'Risk Analytics', desc: 'Score breakdown', icon: 'ri-bar-chart-box-fill', path: '/district/risk-analytics', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
                                { label: 'Manage Alerts', desc: 'Send alerts', icon: 'ri-alarm-warning-fill', path: '/district/alerts', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                                { label: 'Alert History', desc: 'Sent alerts log', icon: 'ri-history-line', path: '/district/alert-history', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
                                { label: 'Risk Clusters', desc: 'Cluster monitor', icon: 'ri-bubble-chart-fill', path: '/district/clusters', color: 'bg-rose-50 hover:bg-rose-100 text-rose-700' },
                                { label: 'Interventions', desc: 'Plan actions', icon: 'ri-first-aid-kit-fill', path: '/district/interventions', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                                { label: 'PHC Monitor', desc: 'PHC status', icon: 'ri-hospital-fill', path: '/district/phcs', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
                                { label: 'Budget', desc: 'Resource tracking', icon: 'ri-money-rupee-circle-fill', path: '/district/budget', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
                                { label: 'State Advisories', desc: 'Inbox', icon: 'ri-mail-star-fill', path: '/district/advisories', color: 'bg-sky-50 hover:bg-sky-100 text-sky-700' },
                            ].map((mod, i) => (
                                <button key={i} onClick={() => navigate(mod.path)}
                                    className={`${mod.color} p-3 rounded-xl transition-all text-left flex items-center gap-3 group`}>
                                    <i className={`${mod.icon} text-xl`}></i>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm truncate">{mod.label}</p>
                                        <p className="text-[10px] opacity-70">{mod.desc}</p>
                                    </div>
                                    <i className="ri-arrow-right-s-line ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Live Command Center */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <i className="ri-wireless-charging-line text-red-500 animate-pulse"></i>
                                Live Feed
                            </h3>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Real-time</span>
                        </div>

                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {recentActivity.map((item: any, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon */}
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.color || 'bg-slate-50 text-slate-500'}`}>
                                        <i className={item.icon || 'ri-checkbox-circle-line'}></i>
                                    </div>
                                    {/* Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-700 text-sm">
                                                {item.title || item.details}
                                            </div>
                                            <time className="font-mono text-xs text-slate-400">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </time>
                                        </div>
                                        <div className="text-slate-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                                            {item.details}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recentActivity.length === 0 && (
                                <div className="text-center py-8 text-slate-400 italic">No recent activity detected.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* District Scope Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                        <p className="font-bold text-blue-900">District Admin Access</p>
                        <p className="text-sm text-blue-700 mt-1">
                            You have administrative access to <strong>{myDistrict.name} District</strong> only.
                            The risk map automatically filters and highlights your assigned district boundary with analytics.
                            For system-wide administration, contact the Super Administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
