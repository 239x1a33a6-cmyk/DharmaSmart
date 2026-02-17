import React, { useState } from 'react';

export default function EmergencyMode() {
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-red-600 tracking-tight flex items-center">
                        <i className="ri-error-warning-fill mr-3 text-3xl animate-pulse"></i>
                        Emergency & Crisis Control Center
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">High-authority override for system locking, maintenance, and mass communication</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-slate-900/5 text-slate-500 font-bold text-[10px] rounded-lg border border-slate-200 uppercase tracking-widest">
                        Status: <span className={isEmergencyActive ? "text-red-600" : "text-emerald-600"}>{isEmergencyActive ? "CRISIS MODE" : "STABLE"}</span>
                    </span>
                </div>
            </div>

            {/* Core Emergency Control */}
            <div className={`p-10 rounded-[2.5rem] shadow-2xl transition-all duration-700 border-4 ${isEmergencyActive ? 'bg-red-600 border-red-500 text-white' : 'bg-white border-slate-100 text-slate-900 group'}`}>
                <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                    <div className={`w-36 h-36 rounded-full flex items-center justify-center transition-all shadow-2xl ${isEmergencyActive ? 'bg-white text-red-600 scale-110' : 'bg-red-50 group-hover:bg-red-100 text-red-500'}`}>
                        <i className={`ri-shut-down-line text-7xl ${isEmergencyActive ? 'animate-spin-slow' : ''}`}></i>
                    </div>
                    <div className="flex-1 space-y-4">
                        <h3 className="text-3xl font-black uppercase tracking-tighter">System-Wide Lockdown</h3>
                        <p className={`text-sm font-medium leading-relaxed max-w-xl ${isEmergencyActive ? 'text-white/80' : 'text-slate-500'}`}>
                            Instantly suspend all public and authority logins across India. Force terminate all active sessions and display a custom maintenance/emergency portal. Use ONLY in case of verified cyber-attack or statewide data integrity failure.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            {!isEmergencyActive ? (
                                <button
                                    onClick={() => setIsEmergencyActive(true)}
                                    className="px-10 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-200 hover:shadow-red-400 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
                                >
                                    ACTIVATE EMERGENCY LOCKDOWN
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEmergencyActive(false)}
                                    className="px-10 py-4 bg-white text-red-600 font-black rounded-2xl shadow-xl hover:shadow-white/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs border-b-4 border-red-700"
                                >
                                    DEACTIVATE CRISIS MODE
                                </button>
                            )}
                            <button className={`px-8 py-4 font-bold rounded-2xl transition-all text-xs border-2 ${isEmergencyActive ? 'bg-red-700 border-red-800 text-white hover:bg-red-800' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'}`}>
                                DOWNLOAD PRE-INCIDENT DUMP
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Broadcast Tool */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
                    <h3 className="font-bold text-slate-900 flex items-center">
                        <span className="w-1.5 h-6 bg-red-500 rounded-full mr-3"></span>
                        Emergency Mass Broadcast
                    </h3>
                    <div className="space-y-4">
                        <textarea
                            placeholder="Enter emergency message to be sent to all active ASHA & PHC workers..."
                            className="w-full h-32 p-5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-slate-800"
                        ></textarea>
                        <div className="flex items-center space-x-6 px-2">
                            <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 cursor-pointer uppercase tracking-widest">
                                <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
                                <span>Voice Call Override</span>
                            </label>
                            <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 cursor-pointer uppercase tracking-widest">
                                <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500" defaultChecked />
                                <span>Priority SMS</span>
                            </label>
                        </div>
                        <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-slate-200 transition-all flex items-center justify-center uppercase tracking-widest text-xs">
                            <i className="ri-broadcast-line mr-2"></i> Trigger Global Alert
                        </button>
                    </div>
                </div>

                {/* Audit Guard Quick View */}
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
                    <h3 className="font-bold flex items-center z-10 relative">
                        <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                        Behavioral Lock Queue
                    </h3>
                    <div className="space-y-4 z-10 relative">
                        {[
                            { user: 'admin_beta_01', reason: 'Unusual IP Range Access', risk: 'High' },
                            { user: 'phc_temp_user', reason: 'Multiple Failed Root Login', risk: 'Critical' },
                            { user: 'dho_assam_ext', reason: 'Mass Data Export Attempt', risk: 'Medium' }
                        ].map((q, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div>
                                    <p className="text-xs font-bold text-white">{q.user}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{q.reason}</p>
                                </div>
                                <button className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg border
                                    ${q.risk === 'Critical' ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/30' : 'bg-white/10 text-white border-white/20'}`}>
                                    {q.risk === 'Critical' ? 'KILL ACCOUNT' : 'SUSPEND'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-5 pointer-events-none">
                        <i className="ri-shield-user-fill text-9xl"></i>
                    </div>
                </div>
            </div>

            {/* Crisis Documentation */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center space-x-4">
                <i className="ri-questionnaire-fill text-slate-300 text-2xl"></i>
                <div className="flex-1">
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic uppercase tracking-tight">"In case of a state-wide emergency, trigger the lockdown first, then download the Pre-Incident Dump to share with the Ministry CERT-In team. All emergency actions are broadcasted to the Primary Super Admin via secondary satellite link."</p>
                </div>
            </div>
        </div>
    );
}
