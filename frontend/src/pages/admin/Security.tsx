import React, { useState } from 'react';

export default function SecurityCenter() {
    const [mfaEnforced, setMfaEnforced] = useState(true);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Compliance Center</h2>
                    <p className="text-sm text-slate-500 font-medium">Platform-wide encryption, access governance, and recovery protocols</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-200 hover:shadow-emerald-400 transition-all flex items-center">
                        <i className="ri-shield-flash-line mr-2"></i> Run Vulnerability Scan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Governance Toggles */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50">
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                    <i className="ri-key-2-fill text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Enforce MFA (Multi-Factor Auth)</h4>
                                    <p className="text-xs text-slate-500">Require all DHO and State Authority users to verify via SMS/Email OTP.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setMfaEnforced(!mfaEnforced)}
                                className={`w-12 h-6 rounded-full transition-all relative ${mfaEnforced ? 'bg-emerald-500' : 'bg-slate-200'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mfaEnforced ? 'left-7 shadow-sm' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                    <i className="ri-lock-password-fill text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Advanced Password Policy</h4>
                                    <p className="text-xs text-slate-500">Minimum 12 characters, special symbols, and 90-day rotation.</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200 uppercase tracking-widest">Configure</button>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                                    <i className="ri-history-line text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Data Retention Policy</h4>
                                    <p className="text-xs text-slate-500">Anonymize community health data older than 24 months.</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-tighter italic">GDPR Compliant</span>
                        </div>
                    </div>

                    {/* Backups Card */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8 z-10 relative">
                            <div>
                                <h3 className="text-xl font-bold">Encrypted Backups</h3>
                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">Daily Snapshot Cycle</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg border border-white/10 transition-all">RESTORE PREVIOUS</button>
                                <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all">MANUALLY BACKUP NOW</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 z-10 relative">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">Last Backup</p>
                                <p className="text-xs font-mono font-bold">04:00 AM</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">Storage Used</p>
                                <p className="text-xs font-mono font-bold">12.4 GB</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">Cloud Sync</p>
                                <p className="text-emerald-400 text-xs font-mono font-bold uppercase">Healthy</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">Enc. Type</p>
                                <p className="text-xs font-mono font-bold">AES-256</p>
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                            <i className="ri-hard-drive-3-fill text-9xl"></i>
                        </div>
                    </div>
                </div>

                {/* Security Health Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Security Health Score</h4>
                        <div className="relative w-40 h-40 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="44" className="text-emerald-500 transition-all duration-1000" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-slate-900">90</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Excellent</span>
                            </div>
                        </div>
                        <p className="mt-8 text-xs text-slate-500 font-medium leading-relaxed italic">"Infrastructure is hardened. 1 suggested improvement: Enable MFA for Community Volunteers."</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900 mb-4 flex items-center">
                            <i className="ri-radar-fill text-primary mr-2"></i> Active Security Scans
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: 'SQL Injection Guard', status: 'Optimal' },
                                { label: 'XSS Filter', status: 'Optimal' },
                                { label: 'API Rate Limiting', status: 'Warning' },
                                { label: 'TLS 1.3 Encryption', status: 'Optimal' }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                    <span className="text-slate-500">{s.label}</span>
                                    <span className={s.status === 'Optimal' ? 'text-emerald-500' : 'text-orange-500'}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase rounded-xl border border-slate-200 transition-all">Detailed Sec-Audit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
