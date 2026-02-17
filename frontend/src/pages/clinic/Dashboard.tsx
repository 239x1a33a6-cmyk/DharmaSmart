
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { backendApi, API_ENDPOINTS, AshaReport } from '../../services/backend-api';
import { mockClinicalCases, mockMedicalAdvisories, diseasePatternsDB } from '../../mocks/clinical-mock-data';
import { ClinicalCase, SeverityLevel } from '../../types/clinical-types';

export default function ClinicDashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [cases, setCases] = useState<ClinicalCase[]>(mockClinicalCases);
    const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);

    // Fetch Real Data with Polling
    const fetchReports = async () => {
        try {
            const reports = await backendApi.get<AshaReport[]>(API_ENDPOINTS.ashaReports);
            // Filter pending reports (is_processed === false)
            // Note: The backend serializer field is check if clinical_report exists
            const pendingReports = reports.filter(r => !r.is_processed);

            // Map to ClinicalCase
            const newCases: ClinicalCase[] = pendingReports.map(r => {
                const severityStr = (r.symptoms_json.severity?.toLowerCase() || 'moderate') as string;
                // Map 'medium' or any other non-standard string to 'moderate' to satisfy the type
                const validSeverity = (['low', 'moderate', 'high', 'critical'].includes(severityStr) ? severityStr : 'moderate') as any;

                return {
                    id: `CASE-${r.id}`,
                    village: r.village_name || r.district_name || 'Unknown',
                    ashaId: r.username || 'unknown',
                    ashaName: r.symptoms_json.submitted_by || r.username || 'ASHA Worker',
                    totalPatients: 1,
                    status: 'pending',
                    priority: validSeverity,
                    symptomCluster: Array.isArray(r.symptoms_json.symptoms)
                        ? r.symptoms_json.symptoms.map((s: string) => ({
                            symptom: s,
                            count: 1,
                            severity: 'moderate', // Default to moderate to satisfy type
                            trend7d: 'stable',
                            percentage: 100
                        }))
                        : [],
                    reportedAt: r.created_at,
                    aiInsights: 'New incoming case requiring review.',
                    ageDistribution: { [r.symptoms_json.ageGroup || 'Adult']: 1 },
                    genderDistribution: { male: 0, female: 0, other: 1 },
                    durationDays: 1,
                    environmentalFactors: {
                        rainfall: 'moderate',
                        season: 'Monsoon',
                        waterSource: r.symptoms_json.waterSource || 'Unknown',
                        sanitationScore: 75
                    },
                    outbreakProbability: 45,
                    severityScore: r.symptoms_json.severity === 'Critical' ? 85 : r.symptoms_json.severity === 'High' ? 70 : 40
                };
            });

            // Prepend new cases to mock cases
            if (newCases.length > 0) {
                setCases(prev => {
                    // Avoid duplicates if strict mode runs twice
                    const existingIds = new Set(prev.map(c => c.id));
                    const uniqueNew = newCases.filter(c => !existingIds.has(c.id));
                    return [...uniqueNew, ...prev];
                });
            }
        } catch (err) {
            console.error("Failed to fetch clinical reports", err);
        }
    };

    useEffect(() => {
        fetchReports();
        const interval = setInterval(fetchReports, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'advisory' | 'history'>('overview');
    const [caseFilter, setCaseFilter] = useState<'all' | 'pending' | 'critical'>('all');

    const handleVerify = async (caseId: string) => {
        if (!caseId.startsWith('CASE-')) return;
        const reportId = caseId.replace('CASE-', '');
        try {
            // Call the custom verify action which also logs the audit
            await backendApi.post(`${API_ENDPOINTS.ashaReports}${reportId}/verify/`, {});

            // Remove from verify list and show success toast (simulated)
            setCases(prev => prev.filter(c => c.id !== caseId));
            setSelectedCase(null);
            // In a real app, we'd show a toast here: "Report Verified & Logged"
        } catch (err) {
            console.error("Failed to verify report", err);
            alert("Failed to verify report");
        }
    };

    const filteredCases = cases.filter(c => {
        if (caseFilter === 'pending') return c.status === 'pending';
        if (caseFilter === 'critical') return c.priority === 'critical' || c.priority === 'high';
        return true;
    });

    const getSeverityColor = (level: string) => {
        switch (level) {
            case 'red': case 'critical': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
            case 'orange': case 'high': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' };
            case 'yellow': case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
            default: return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
        }
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'rising') return <i className="ri-arrow-up-line text-red-500"></i>;
        if (trend === 'declining') return <i className="ri-arrow-down-line text-green-500"></i>;
        return <i className="ri-subtract-line text-gray-400"></i>;
    };

    const getMatchingDiseases = (c: ClinicalCase) => {
        const caseSymptoms = c.symptomCluster.map(s => s.symptom);
        return diseasePatternsDB.map(d => {
            const matchCount = d.symptoms.filter(s => caseSymptoms.includes(s)).length;
            const matchPct = Math.round((matchCount / d.symptoms.length) * 100);
            return { ...d, matchPct };
        }).filter(d => d.matchPct > 0).sort((a, b) => b.matchPct - a.matchPct);
    };

    const totalPatients = cases.reduce((s, c) => s + c.totalPatients, 0);
    const pendingCount = cases.filter(c => c.status === 'pending').length;
    const criticalCount = cases.filter(c => c.priority === 'critical' || c.priority === 'high').length;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Header Bar */}
            <header className="bg-white border-b border-slate-200 px-6 lg:px-8 py-4 sticky top-0 z-30">
                <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Analysis Center</h1>
                        <p className="text-xs text-slate-400 font-medium">ASHA → Clinical Review → Advisory Pipeline • PHC Command</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/clinic/advisory-history')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2">
                            <i className="ri-history-line"></i> Advisory History
                        </button>
                        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200">
                            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-200">
                                <i className="ri-stethoscope-fill text-xl"></i>
                            </div>
                            <div className="pr-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medical Officer</p>
                                <p className="text-sm font-bold text-slate-800">Dr. Ramesh Kumar</p>
                            </div>
                            <button
                                onClick={() => logout()}
                                className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Logout"
                            >
                                <i className="ri-logout-box-r-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Pending Reviews', value: pendingCount, icon: 'ri-file-search-line', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
                        { label: 'High/Critical Priority', value: criticalCount, icon: 'ri-alarm-warning-line', color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-100' },
                        { label: 'Total Patients Tracked', value: totalPatients, icon: 'ri-group-line', color: 'text-purple-600', bg: 'bg-purple-50', ring: 'ring-purple-100' },
                        { label: 'Advisories Issued', value: mockMedicalAdvisories.length, icon: 'ri-checkbox-circle-line', color: 'text-teal-600', bg: 'bg-teal-50', ring: 'ring-teal-100' },
                    ].map((stat, i) => (
                        <div key={i} className={`bg-white p-5 rounded-2xl border border-slate-100 ring-1 ${stat.ring} hover:shadow-md transition-shadow`}>
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl w-fit mb-3`}>
                                <i className={`${stat.icon} text-lg`}></i>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Layout: Sidebar + Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Sidebar: Case List */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-24">
                            <div className="p-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800 text-sm mb-3">Incoming Field Reports</h3>
                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    {(['all', 'pending', 'critical'] as const).map(f => (
                                        <button key={f} onClick={() => setCaseFilter(f)}
                                            className={`flex-1 px-2 py-1.5 text-[10px] font-bold rounded-md transition-all capitalize ${caseFilter === f ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'}`}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="max-h-[calc(100vh-300px)] overflow-y-auto divide-y divide-slate-50">
                                {filteredCases.map(c => {
                                    const sc = getSeverityColor(c.priority);
                                    return (
                                        <div key={c.id} onClick={() => { setSelectedCase(c); setActiveTab('overview'); }}
                                            className={`p-4 cursor-pointer transition-all hover:bg-slate-50 relative ${selectedCase?.id === c.id ? 'bg-teal-50/40' : ''}`}>
                                            {selectedCase?.id === c.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600"></div>}
                                            <div className="flex justify-between items-start mb-1.5">
                                                <span className="text-[10px] font-mono text-slate-400">{c.id}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${sc.bg} ${sc.text}`}>
                                                    {c.priority}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{c.village}</h4>
                                            <p className="text-[11px] text-slate-500 mt-0.5">{c.ashaName} • {c.totalPatients} patients</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-2 h-2 rounded-full ${sc.dot} animate-pulse`}></div>
                                                    <span className="text-[10px] font-bold text-slate-400">{c.severityScore}% risk</span>
                                                </div>
                                                <span className="text-[9px] text-slate-400">{new Date(c.reportedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Workspace */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        {selectedCase ? (
                            <div className="space-y-6">
                                {/* Case Header */}
                                <div className="bg-slate-900 rounded-2xl p-6 text-white flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-black">{selectedCase.village} — Cluster Analysis</h2>
                                            <span className="px-2 py-0.5 bg-white/15 rounded text-[10px] font-bold uppercase tracking-widest">{selectedCase.id}</span>
                                        </div>
                                        <p className="text-white/50 text-xs">ASHA: {selectedCase.ashaName} • Reported {new Date(selectedCase.reportedAt).toLocaleDateString()} • {selectedCase.totalPatients} patients • {selectedCase.durationDays} day(s)</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedCase.outbreakProbability && selectedCase.outbreakProbability > 60 && (
                                            <span className="px-3 py-1.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded-lg animate-pulse">
                                                ⚠ {selectedCase.outbreakProbability}% Outbreak Risk
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                                    {(['overview', 'analytics', 'advisory', 'history'] as const).map(tab => (
                                        <button key={tab} onClick={() => setActiveTab(tab)}
                                            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all capitalize ${activeTab === tab ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-slate-500 hover:text-slate-700'}`}>
                                            {tab === 'overview' ? '📊 Overview' : tab === 'analytics' ? '🔬 Analytics' : tab === 'advisory' ? '📋 Advisory' : '📁 History'}
                                        </button>
                                    ))}
                                </div>

                                {/* TAB: Overview */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Symptom Distribution */}
                                            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Symptom Severity & Trends</h4>
                                                <div className="space-y-4">
                                                    {selectedCase.symptomCluster.map((s, i) => (
                                                        <div key={i}>
                                                            <div className="flex justify-between items-center text-xs mb-1.5">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`w-2 h-2 rounded-full ${s.severity === 'high' ? 'bg-red-500' : s.severity === 'moderate' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                                                                    <span className="font-bold text-slate-700">{s.symptom}</span>
                                                                    <span className="text-slate-400">({s.count} cases)</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {getTrendIcon(s.trend7d)}
                                                                    <span className="font-black text-teal-600">{s.percentage}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className={`h-full rounded-full transition-all duration-1000 ${s.severity === 'high' ? 'bg-red-400' : s.severity === 'moderate' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                                                    style={{ width: `${s.percentage}%` }}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-4 text-[10px] font-bold text-slate-400">
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> High</span>
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate</span>
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Low</span>
                                                </div>
                                            </div>

                                            {/* AI Insight Card */}
                                            <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="p-1.5 bg-white/15 rounded-lg"><i className="ri-brain-line"></i></div>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Outbreak Engine</span>
                                                    </div>
                                                    <p className="text-sm font-medium leading-relaxed mb-4 text-white/90">{selectedCase.aiInsights}</p>
                                                    <div className="space-y-2 pt-4 border-t border-white/10">
                                                        <div className="flex justify-between text-[10px]">
                                                            <span className="text-white/50">Outbreak Probability</span>
                                                            <span className="font-black">{selectedCase.outbreakProbability || 'N/A'}%</span>
                                                        </div>
                                                        <div className="flex justify-between text-[10px]">
                                                            <span className="text-white/50">Severity Score</span>
                                                            <span className="font-black">{selectedCase.severityScore}/100</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Demographics Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Age Distribution */}
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Age Distribution</h4>
                                                <div className="flex items-end gap-2 h-28">
                                                    {Object.entries(selectedCase.ageDistribution).map(([age, count], i) => (
                                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                            <span className="text-[10px] font-black text-slate-700">{count}</span>
                                                            <div className="w-full bg-teal-100 hover:bg-teal-200 rounded-lg transition-all"
                                                                style={{ height: `${Math.max((count / selectedCase.totalPatients) * 100, 8)}%` }}></div>
                                                            <span className="text-[9px] font-bold text-slate-400">{age}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Gender Split */}
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Gender Split</h4>
                                                <div className="space-y-3">
                                                    {Object.entries(selectedCase.genderDistribution).filter(([, v]) => v > 0).map(([gender, count], i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <span className="text-xs font-bold text-slate-600 w-14 capitalize">{gender}</span>
                                                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${(count / selectedCase.totalPatients) * 100}%` }}></div>
                                                            </div>
                                                            <span className="text-xs font-black text-slate-700">{count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Environmental Factors */}
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Environmental</h4>
                                                {selectedCase.environmentalFactors ? (
                                                    <div className="space-y-3">
                                                        {[
                                                            { k: 'Rainfall', v: selectedCase.environmentalFactors.rainfall },
                                                            { k: 'Season', v: selectedCase.environmentalFactors.season },
                                                            { k: 'Water Src', v: selectedCase.environmentalFactors.waterSource },
                                                            { k: 'Sanitation', v: `${selectedCase.environmentalFactors.sanitationScore}/100` },
                                                        ].map((row, i) => (
                                                            <div key={i} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-xl">
                                                                <span className="font-medium text-slate-500">{row.k}</span>
                                                                <span className="font-black text-slate-700">{row.v}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : <p className="text-xs text-slate-400 italic">No data</p>}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleVerify(selectedCase.id);
                                                }}
                                                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                            >
                                                <i className="ri-checkbox-circle-line text-lg"></i>
                                                Verify & Archive
                                            </button>
                                            <button onClick={() => setActiveTab('advisory')}
                                                className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                                <i className="ri-file-add-line text-lg"></i>
                                                Advisory
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Analytics */}
                                {activeTab === 'analytics' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        {/* Disease Matching */}
                                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">AI Disease Pattern Matching</h4>
                                            <div className="space-y-3">
                                                {getMatchingDiseases(selectedCase).map((d, i) => (
                                                    <div key={i} className={`p-4 rounded-xl border ${i === 0 ? 'border-teal-200 bg-teal-50/50' : 'border-slate-100'} flex items-center justify-between`}>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                {i === 0 && <span className="px-2 py-0.5 bg-teal-600 text-white text-[9px] font-bold rounded uppercase">Best Match</span>}
                                                                <h5 className="font-bold text-slate-800">{d.disease}</h5>
                                                            </div>
                                                            <p className="text-[10px] text-slate-500 mt-1">Vector: {d.vector} • Season: {d.seasonality}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`text-xl font-black ${d.matchPct >= 60 ? 'text-red-600' : d.matchPct >= 40 ? 'text-amber-600' : 'text-slate-400'}`}>{d.matchPct}%</p>
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Match</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Priority Thresholds */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Symptom Priority Analysis</h4>
                                                <div className="space-y-2">
                                                    {selectedCase.symptomCluster.map((s, i) => (
                                                        <div key={i} className={`p-3 rounded-xl flex items-center justify-between ${s.severity === 'high' ? 'bg-red-50 border border-red-100' : s.severity === 'moderate' ? 'bg-amber-50 border border-amber-100' : 'bg-green-50 border border-green-100'}`}>
                                                            <span className="text-xs font-bold text-slate-700">{s.symptom}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-[10px] font-bold uppercase ${s.severity === 'high' ? 'text-red-600' : s.severity === 'moderate' ? 'text-amber-600' : 'text-green-600'}`}>{s.severity}</span>
                                                                <span className="text-[10px] text-slate-400">{s.trend7d}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Risk Assessment</h4>
                                                <div className="text-center py-4">
                                                    <div className="w-28 h-28 mx-auto rounded-full border-8 flex items-center justify-center mb-4"
                                                        style={{ borderColor: selectedCase.severityScore > 70 ? '#ef4444' : selectedCase.severityScore > 40 ? '#f59e0b' : '#22c55e' }}>
                                                        <span className="text-3xl font-black text-slate-900">{selectedCase.severityScore}</span>
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Severity Index</p>
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex justify-between text-xs bg-slate-50 p-2.5 rounded-lg">
                                                        <span className="text-slate-500">District Average</span>
                                                        <span className="font-bold text-slate-700">42</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs bg-slate-50 p-2.5 rounded-lg">
                                                        <span className="text-slate-500">This Case</span>
                                                        <span className={`font-bold ${selectedCase.severityScore > 42 ? 'text-red-600' : 'text-green-600'}`}>
                                                            {selectedCase.severityScore > 42 ? `+${selectedCase.severityScore - 42} above avg` : `${42 - selectedCase.severityScore} below avg`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Summary */}
                                        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <i className="ri-sparkling-2-fill text-indigo-300"></i>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">AI Generated Summary</span>
                                            </div>
                                            <p className="text-sm font-medium leading-relaxed text-white/90">
                                                Based on {selectedCase.totalPatients} cases with {selectedCase.symptomCluster[0]?.percentage}% {selectedCase.symptomCluster[0]?.symptom.toLowerCase()},
                                                {selectedCase.symptomCluster[1] && ` ${selectedCase.symptomCluster[1].percentage}% ${selectedCase.symptomCluster[1].symptom.toLowerCase()},`}
                                                {' '}likely {getMatchingDiseases(selectedCase)[0]?.disease || 'viral'} outbreak pattern.
                                                {selectedCase.outbreakProbability && selectedCase.outbreakProbability > 60 ? ' Immediate intervention recommended.' : ' Monitoring advised.'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Advisory (navigate to form) */}
                                {activeTab === 'advisory' && (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center animate-in fade-in duration-300">
                                        <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <i className="ri-file-text-line text-4xl text-teal-600"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">Generate Official Advisory</h3>
                                        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
                                            Create a structured Community Health Advisory Report for {selectedCase.village}. This will be sent to ASHA worker {selectedCase.ashaName} for community broadcast.
                                        </p>
                                        <button onClick={() => navigate(`/clinic/analysis/${selectedCase.id}`)}
                                            className="px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-200 transition-all active:scale-95">
                                            Open Advisory Editor →
                                        </button>
                                    </div>
                                )}

                                {/* TAB: History */}
                                {activeTab === 'history' && (
                                    <div className="space-y-4 animate-in fade-in duration-300">
                                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Advisory Pipeline for {selectedCase.id}</h4>
                                            {mockMedicalAdvisories.filter(a => a.caseId === selectedCase.id).length > 0 ? (
                                                mockMedicalAdvisories.filter(a => a.caseId === selectedCase.id).map(adv => (
                                                    <div key={adv.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                                                        <div className="p-5 bg-slate-50 flex justify-between items-center">
                                                            <div>
                                                                <h5 className="font-bold text-slate-800">{adv.identifiedDisease}</h5>
                                                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Trace: {adv.traceId}</p>
                                                            </div>
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getSeverityColor(adv.severity).bg} ${getSeverityColor(adv.severity).text}`}>{adv.severity}</span>
                                                        </div>
                                                        <div className="p-5 space-y-4">
                                                            <p className="text-sm text-slate-600">{adv.summary}</p>
                                                            {/* Pipeline Status */}
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                                {[
                                                                    { label: 'Issued', value: new Date(adv.issuedAt).toLocaleDateString(), done: true },
                                                                    { label: 'ASHA Ack.', value: adv.ashaAcknowledgedAt ? '✓' : 'Pending', done: !!adv.ashaAcknowledgedAt },
                                                                    { label: 'Delivery Rate', value: adv.communityDeliveryRate ? `${adv.communityDeliveryRate}%` : '—', done: !!adv.communityAlertSentAt },
                                                                    { label: 'Response', value: adv.communityResponseRate ? `${adv.communityResponseRate}%` : '—', done: (adv.communityResponseRate || 0) > 50 },
                                                                ].map((step, i) => (
                                                                    <div key={i} className={`p-3 rounded-xl text-center ${step.done ? 'bg-green-50 border border-green-100' : 'bg-slate-50 border border-slate-100'}`}>
                                                                        <p className="text-lg font-black text-slate-800">{step.value}</p>
                                                                        <p className="text-[9px] font-bold text-slate-400 uppercase">{step.label}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-12 text-slate-400">
                                                    <i className="ri-draft-line text-4xl mb-2"></i>
                                                    <p className="text-sm font-medium">No advisories issued for this case yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="h-[600px] bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                                <div className="w-24 h-24 bg-slate-50 rounded-full shadow-lg flex items-center justify-center mb-6">
                                    <i className="ri-stethoscope-line text-4xl text-slate-300"></i>
                                </div>
                                <h3 className="text-xl font-bold text-slate-700">Select a field report</h3>
                                <p className="text-slate-400 max-w-xs mt-2 font-medium">ASHA worker field data is automatically pushed here for clinical verification and advisory generation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
