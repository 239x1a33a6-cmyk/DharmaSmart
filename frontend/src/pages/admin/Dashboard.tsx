// System Command Center - Super Admin Dashboard
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSystemMetrics, mockAuditLogs, mockAIModels, mockSecurityMetrics, mockDistricts, mockUsers, mockPHCs } from '../../mocks/admin-mock-data';
import StatCard from '../../components/admin/StatCard';

interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
}

const AI_RESPONSES: Record<string, string> = {
    'inactive asha': `Found 12 inactive ASHA workers (no login >30 days):\n• Sunita Devi (Majuli) – 45 days\n• Meera Chandra (Jorhat) – 38 days\n• Priya Gogoi (Nagaon) – 33 days\n…and 9 more.\n\n⚡ Recommendation: Send re-engagement SMS or schedule supervisor follow-up.`,
    'malaria': `District-level Malaria Spike Analysis:\n🔴 Nagaon: +42% (7-day trend rising)\n🟠 Cachar: +18% (seasonal expected)\n🟢 Jorhat: -5% (stable)\n\n⚡ Nagaon requires immediate fogging campaign and ASHA mobilization.`,
    'export': `Generating export for last month's alert logs...\n✅ 847 alerts processed\n📄 File ready: alert_logs_jan2026.csv\n\nCategories: Outbreak (312), Water Quality (198), Compliance (337)`,
    'default': `I can help with:\n• "Show inactive ASHA workers in last 30 days"\n• "Which district has highest malaria spike?"\n• "Export last month alert logs"\n• "System health summary"\n• "Top 5 high-risk clusters"`,
};

export default function SuperAdminDashboard() {
    const navigate = useNavigate();
    const [riskThreshold, setRiskThreshold] = useState(75);
    const [selectedModel, setSelectedModel] = useState(mockAIModels[0].id);
    const selectedAI = mockAIModels.find((m) => m.id === selectedModel);
    const [aiChatOpen, setAiChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { role: 'assistant', text: 'Hello, Super Admin. I am your AI governance assistant. Ask me anything about the system.' },
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const recentAnomalies = mockAuditLogs
        .filter((log) => log.isAnomalous || log.riskLevel === 'high')
        .slice(0, 5);

    const handleMetricClick = (path?: string) => {
        if (path) navigate(path);
    };

    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        const userMsg = chatInput.trim();
        setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput('');

        setTimeout(() => {
            const lc = userMsg.toLowerCase();
            let response = AI_RESPONSES['default'];
            if (lc.includes('inactive') || lc.includes('asha')) response = AI_RESPONSES['inactive asha'];
            else if (lc.includes('malaria') || lc.includes('spike') || lc.includes('district')) response = AI_RESPONSES['malaria'];
            else if (lc.includes('export') || lc.includes('log')) response = AI_RESPONSES['export'];
            setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 800);
    };

    const totalAshaWorkers = mockUsers.filter(u => u.role === 'ASHA_WORKER').length;
    const activeToday = mockUsers.filter(u => {
        const last = new Date(u.lastLogin).getTime();
        return Date.now() - last < 86400000;
    }).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        System Command Center
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">
                        Global Surveillance Overview • Real-time Stream Active
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
                        <button className="px-4 py-2 bg-slate-100 text-slate-900 text-sm font-bold rounded-lg shadow-sm">
                            Real-time
                        </button>
                        <button className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-slate-900 transition-colors">
                            Historical
                        </button>
                    </div>
                    <button className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-200 transition-all flex items-center space-x-2">
                        <i className="ri-download-cloud-2-line"></i>
                        <span>Master Report</span>
                    </button>
                </div>
            </div>

            {/* Global Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockSystemMetrics.map((metric, i) => (
                    <StatCard
                        key={i}
                        label={metric.label}
                        value={metric.value}
                        trend={metric.trend}
                        icon={metric.icon}
                        color={metric.color}
                        onClick={() => handleMetricClick(metric.drillDownPath)}
                    />
                ))}
            </div>

            {/* Extended Stat Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Total Districts', value: mockDistricts.length, icon: 'ri-building-4-fill', color: 'bg-indigo-50 text-indigo-700' },
                    { label: 'Total PHCs', value: mockPHCs.length, icon: 'ri-hospital-fill', color: 'bg-blue-50 text-blue-700' },
                    { label: 'ASHA Workers', value: totalAshaWorkers, icon: 'ri-nurse-fill', color: 'bg-purple-50 text-purple-700' },
                    { label: 'Active Today', value: activeToday, icon: 'ri-user-follow-fill', color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'System Health', value: 'Optimal', icon: 'ri-heart-pulse-fill', color: 'bg-teal-50 text-teal-700' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} rounded-2xl p-4 flex items-center gap-3`}>
                        <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                            <i className={`${s.icon} text-lg`}></i>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{s.label}</p>
                            <p className="text-lg font-black">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* District Risk Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <i className="ri-map-pin-2-fill text-red-500"></i>
                            District Risk Heatmap
                        </h3>
                        <p className="text-sm text-slate-500">Click any district to drill-down</p>
                    </div>
                    <button onClick={() => navigate('/admin/districts')} className="text-sm text-primary font-bold hover:underline">
                        Manage Districts →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockDistricts.map(d => (
                        <button key={d.id} onClick={() => navigate('/admin/districts')}
                            className="bg-slate-50 hover:bg-slate-100 rounded-2xl p-4 text-left transition-all group border border-transparent hover:border-slate-200">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{d.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-mono uppercase">{d.code}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase
                                    ${d.riskIndex > 70 ? 'bg-red-100 text-red-600' : d.riskIndex > 40 ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    Risk {d.riskIndex}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="text-center">
                                    <p className="text-sm font-black text-slate-800">{d.phcCount}</p>
                                    <p className="text-[9px] text-slate-400 uppercase">PHCs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-slate-800">{d.ashaCount}</p>
                                    <p className="text-[9px] text-slate-400 uppercase">ASHAs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-slate-800">{d.alertFrequency}</p>
                                    <p className="text-[9px] text-slate-400 uppercase">Alerts/Wk</p>
                                </div>
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${d.complianceScore > 85 ? 'bg-emerald-400' : d.complianceScore > 70 ? 'bg-amber-400' : 'bg-red-400'}`}
                                    style={{ width: `${d.complianceScore}%` }}></div>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-1">Compliance: {d.complianceScore}%</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* AI Insights Panel */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                                <i className="ri-robot-line text-primary"></i>
                                <span>AI Insights & Predictions</span>
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Machine learning powered early warnings</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/ai-config')}
                            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors"
                        >
                            Configure AI
                        </button>
                    </div>

                    {/* AI Model Selector */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                            Active Model
                        </label>
                        <select
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {mockAIModels.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name} (v{model.version}) - {model.accuracy}% accuracy
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Model Details */}
                    {selectedAI && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-emerald-50 p-4 rounded-xl">
                                <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Accuracy</p>
                                <p className="text-2xl font-black text-emerald-700">{selectedAI.accuracy}%</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Status</p>
                                <p className="text-sm font-bold text-blue-700 mt-2">
                                    {selectedAI.enabled ? 'Active' : 'Disabled'}
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl">
                                <p className="text-xs text-purple-600 font-bold uppercase mb-1">Type</p>
                                <p className="text-sm font-bold text-purple-700 mt-2 capitalize">
                                    {selectedAI.type.replace('_', ' ')}
                                </p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-xl">
                                <p className="text-xs text-orange-600 font-bold uppercase mb-1">Last Trained</p>
                                <p className="text-xs font-mono text-orange-700 mt-2">
                                    {new Date(selectedAI.lastTrained).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* AI District Predictions */}
                    <div className="mb-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">🔮 Predicted Outbreak Probability</h4>
                        <div className="space-y-2">
                            {mockDistricts.slice(0, 4).map(d => {
                                const prob = d.riskIndex + Math.floor(Math.random() * 15);
                                return (
                                    <div key={d.id} className="flex items-center gap-3">
                                        <span className="text-xs font-bold w-20 text-slate-300">{d.name}</span>
                                        <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${prob > 70 ? 'bg-red-500' : prob > 45 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(prob, 100)}%` }}></div>
                                        </div>
                                        <span className={`text-xs font-black w-10 text-right ${prob > 70 ? 'text-red-400' : prob > 45 ? 'text-amber-400' : 'text-emerald-400'}`}>{Math.min(prob, 100)}%</span>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-3 italic">
                            ⚡ AI Recommendation: "High dengue probability in Nagaon – Consider fogging & awareness campaign"
                        </p>
                    </div>

                    {/* Risk Threshold Control */}
                    <div className="mb-6 bg-slate-50 p-4 rounded-xl">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                            Risk Alert Threshold: {riskThreshold}%
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="100"
                            value={riskThreshold}
                            onChange={(e) => setRiskThreshold(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                            <span>Conservative</span>
                            <span>Balanced</span>
                            <span>Aggressive</span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors">
                            <i className="ri-refresh-line mr-2"></i>
                            Re-train Model
                        </button>
                        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                            <i className="ri-file-chart-line mr-2"></i>
                            View Predictions
                        </button>
                        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                            <i className="ri-history-line mr-2"></i>
                            Model History
                        </button>
                    </div>
                </div>

                {/* Security & System Health */}
                <div className="space-y-6">
                    {/* Security Score */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Security Health</h3>
                            <button
                                onClick={() => navigate('/admin/security')}
                                className="text-sm text-primary font-bold hover:underline"
                            >
                                View Details
                            </button>
                        </div>

                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="transform -rotate-90 w-32 h-32">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={`${(mockSecurityMetrics.securityScore / 100) * 351.68} 351.68`}
                                    className={`${mockSecurityMetrics.securityScore >= 80 ? 'text-emerald-500' : mockSecurityMetrics.securityScore >= 60 ? 'text-orange-500' : 'text-red-500'}`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-900">{mockSecurityMetrics.securityScore}</p>
                                    <p className="text-xs text-slate-400 font-bold">Score</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="bg-emerald-50 p-3 rounded-lg">
                                <p className="text-2xl font-black text-emerald-700">{mockSecurityMetrics.activeAdmins}</p>
                                <p className="text-[10px] text-emerald-600 font-bold uppercase">Active Admins</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                                <p className="text-2xl font-black text-red-700">
                                    {mockSecurityMetrics.vulnerabilities.critical + mockSecurityMetrics.vulnerabilities.high}
                                </p>
                                <p className="text-[10px] text-red-600 font-bold uppercase">Critical Issues</p>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">MFA Adoption</span>
                                <span className="font-bold text-slate-900">{mockSecurityMetrics.mfaAdoptionRate}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Failed Logins (24h)</span>
                                <span className="font-bold text-orange-600">{mockSecurityMetrics.failedLoginAttempts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Suspicious Activities</span>
                                <span className="font-bold text-red-600">{mockSecurityMetrics.suspiciousActivities}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Last Backup</span>
                                <span className="font-mono text-xs text-slate-900">
                                    {new Date(mockSecurityMetrics.lastBackup).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-sm font-bold text-slate-900 mb-3">Activity Feed</h3>
                        <div className="space-y-3">
                            {[
                                { time: '2m ago', action: 'Dr. Anita reviewed Case #case-101', icon: 'ri-stethoscope-line', color: 'text-blue-500' },
                                { time: '15m ago', action: 'ASHA Lakshmi broadcast advisory adv-201', icon: 'ri-broadcast-line', color: 'text-teal-500' },
                                { time: '1h ago', action: 'System backup completed successfully', icon: 'ri-database-2-line', color: 'text-emerald-500' },
                                { time: '2h ago', action: 'New ASHA worker registered (Nagaon)', icon: 'ri-user-add-line', color: 'text-purple-500' },
                            ].map((a, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <i className={`${a.icon} ${a.color} mt-0.5`}></i>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-700 leading-relaxed">{a.action}</p>
                                        <p className="text-[10px] text-slate-400">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Priority Alerts & Anomalies */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Priority Alerts & Anomalies</h3>
                        <p className="text-sm text-slate-500 mt-1">AI-detected suspicious activities and high-risk events</p>
                    </div>
                    <button onClick={() => navigate('/admin/logs')}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors text-sm">
                        View All Logs
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentAnomalies.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">
                                        {new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900">{log.userName}</p>
                                        <p className="text-xs text-slate-400">{log.userRole}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-700">{log.details}</p>
                                        <p className="text-xs text-slate-400 capitalize mt-0.5">{log.category.replace('_', ' ')}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase
                                            ${log.riskLevel === 'high' ? 'bg-red-50 text-red-600' : log.riskLevel === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {log.riskLevel} {log.isAnomalous ? '⚠️' : ''}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating AI Assistant */}
            <div className="fixed bottom-6 right-6 z-50">
                {aiChatOpen ? (
                    <div className="w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
                        <div className="bg-slate-900 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                                    <i className="ri-robot-fill text-white"></i>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">AI Admin Assistant</p>
                                    <p className="text-[9px] text-slate-400">Super Admin Only • End-to-End Encrypted</p>
                                </div>
                            </div>
                            <button onClick={() => setAiChatOpen(false)} className="w-7 h-7 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/60 transition-colors">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 bg-slate-50">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>
                        <div className="p-3 border-t border-slate-100 flex gap-2">
                            <input type="text" placeholder="Ask AI anything..."
                                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-teal-300"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleChatSend()} />
                            <button onClick={handleChatSend} className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-700 transition-colors">
                                <i className="ri-send-plane-fill"></i>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setAiChatOpen(true)}
                        className="w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-xl shadow-teal-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
                        <i className="ri-robot-fill text-2xl"></i>
                    </button>
                )}
            </div>
        </div>
    );
}
