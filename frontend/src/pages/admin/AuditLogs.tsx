import React, { useState } from 'react';

export default function AuditLogs() {
    const logs = [
        { id: '1', user: 'superadmin@dharma.gov.in', role: 'SUPER_ADMIN', action: 'ROLE_PERMISSION_CHANGE', target: 'DHO_PERMISSIONS', time: '12:45 PM', status: 'Secured', type: 'System' },
        { id: '2', user: 'dho.jorhat@gov.in', role: 'DHO', action: 'FORCE_LOGOUT_SUCCESS', target: 'PHC_MONITOR_12', time: '11:20 AM', status: 'Verified', type: 'Security' },
        { id: '3', user: 'SYSTEM_BOT', role: 'AI_AGENT', action: 'ANOMALY_LOGPOINT_CREATED', target: 'MAJULI_CLUSTER', time: '10:05 AM', status: 'Alert', type: 'AI' },
        { id: '4', user: 'dr.sharma@gov.in', role: 'DHO', action: 'DATABASE_EXPORT_REQUEST', target: 'QUARTERLY_REPORT', time: '09:30 AM', status: 'Secured', type: 'Data' },
        { id: '5', user: 'admin_test_01', role: 'SUPER_ADMIN', action: 'LOGIN_ATTEMPT_FAILED', target: 'ROOT_CONSOLE', time: '08:15 AM', status: 'FLAGGED', type: 'Security' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit & Forensic Trails</h2>
                    <p className="text-sm text-slate-500 font-medium">Tamper-proof logs of every administrative action platform-level</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all shadow-sm">
                        <i className="ri-shield-check-line mr-2"></i> Verify Block-Integrity
                    </button>
                    <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs shadow-lg hover:shadow-slate-200 transition-all flex items-center">
                        <i className="ri-file-download-line mr-2 text-primary"></i> Download Audit PDF
                    </button>
                </div>
            </div>

            {/* AI Anomaly Monitor */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="z-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
                        <span>AI Anomaly Guard Active</span>
                    </div>
                    <h3 className="text-2xl font-black mb-2">Behavioral Identity Verified</h3>
                    <p className="text-slate-400 text-sm max-w-lg italic">"No suspicious administrative patterns detected in the last 24 hours. Security score remains at 100."</p>
                </div>
                <div className="flex-1 flex justify-center md:justify-end gap-4 z-10 w-full md:w-auto">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center flex-1 md:flex-none md:w-32">
                        <p className="text-primary font-black text-2xl">0</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Violations</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center flex-1 md:flex-none md:w-32">
                        <p className="text-emerald-500 font-black text-2xl">100</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Trust Score</p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <i className="ri-fingerprint-fill text-9xl"></i>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex space-x-1">
                        {['All Logs', 'Security', 'Data Edits', 'Auth Events'].map((t, i) => (
                            <button key={i} className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all ${i === 0 ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs w-64 focus:ring-1 focus:ring-primary/40" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin User</th>
                                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action Performed</th>
                                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Resource</th>
                                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification</th>
                                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {logs.map((l) => (
                                <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 text-xs font-mono font-bold text-slate-500">{l.time}</td>
                                    <td className="px-8 py-5">
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 tracking-tight">{l.user}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{l.role}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <code className="bg-slate-100 text-[10px] text-slate-600 px-2 py-0.5 rounded font-mono font-bold border border-slate-200">
                                            {l.action}
                                        </code>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-medium text-slate-600 uppercase tracking-tighter">{l.target}</td>
                                    <td className="px-8 py-5">
                                        <div className={`flex items-center space-x-1 text-[10px] font-black uppercase tracking-tighter
                                            ${l.status === 'Secured' || l.status === 'Verified' ? 'text-emerald-500' :
                                                l.status === 'Alert' ? 'text-orange-500' : 'text-red-500'}`}>
                                            <i className={l.status === 'FLAGGED' ? "ri-error-warning-fill" : "ri-checkbox-circle-fill"}></i>
                                            <span>{l.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border
                                            ${l.type === 'Security' ? 'bg-red-50 text-red-500 border-red-100' :
                                                l.type === 'AI' ? 'bg-primary/10 text-primary border-primary/20' :
                                                    l.type === 'Data' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                                                        'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                            {l.type}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
