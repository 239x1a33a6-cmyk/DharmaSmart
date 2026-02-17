import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function BroadcastTool() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [step, setStep] = useState(1);
    const [alertData, setAlertData] = useState({
        type: 'Health Advisory',
        title: '',
        reason: '',
        issue: '',
        action: '',
        prevention: '',
        helpline: '108 (Ambulance), 104 (Health Help)',
        validity: '7 Days'
    });

    const targetVillageName = location.state?.targetVillage?.name || user?.profile?.village || 'Unknown Village';

    const handleSend = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Community Broadcast Tool" showBack backPath="/asha/dashboard">
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="ri-broadcast-fill text-4xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Broadcast Sent</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Official alert "{alertData.title}" has been issued to {targetVillageName} under your verified identity.
                        </p>
                        <button
                            onClick={() => navigate('/asha/dashboard')}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </AshaLayout>
        );
    }

    return (
        <AshaLayout title="Community Broadcast Tool" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-3xl mx-auto w-full">

                {/* 1. Identity Block (Mandatory Display) */}
                <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden mb-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-primary"></div>
                    <div className="p-6 flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white shadow-md overflow-hidden shrink-0">
                            <i className="ri-user-smile-line text-3xl text-gray-400"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-navy text-lg">{user?.profile?.fullName || 'Smt. Lakshmi Devi'}</h3>
                                    <p className="text-xs text-gray-500 font-medium">ASHA ID: {user?.id || 'AP-ASH-1023'}</p>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md flex items-center space-x-1">
                                    <i className="ri-verified-badge-fill"></i>
                                    <span>Verified Worker</span>
                                </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                                <p><span className="font-bold text-navy">Village:</span> {targetVillageName}</p>
                                <p><span className="font-bold text-navy">PHC:</span> {user?.profile?.phc || 'Rural PHC Kothapeta'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50/50 px-6 py-2 text-[10px] text-blue-600 font-medium text-center border-t border-blue-50">
                        <i className="ri-shield-check-line mr-1"></i>
                        This verified identity badge will appear on every alert you send.
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {step === 1 && (
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-navy">Compose Official Alert</h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 1 of 2</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Alert Title</label>
                                    <input
                                        type="text"
                                        value={alertData.title}
                                        onChange={e => setAlertData({ ...alertData, title: e.target.value })}
                                        placeholder="e.g., Urgent Boil Water Advisory"
                                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-navy"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Reason for Alert</label>
                                        <select
                                            value={alertData.reason}
                                            onChange={e => setAlertData({ ...alertData, reason: e.target.value })}
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-blue-500 outline-none font-medium text-navy"
                                        >
                                            <option value="">Select Reason...</option>
                                            <option value="Water Contamination">Water Contamination Report</option>
                                            <option value="Disease Outbreak">Disease Outbreak (Dengue/Malaria)</option>
                                            <option value="Vaccination Drive">Vaccination Drive</option>
                                            <option value="Doctor Advisory">Doctor Advisory</option>
                                            <option value="District Instruction">District Instruction</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Validity Period</label>
                                        <select
                                            value={alertData.validity}
                                            onChange={e => setAlertData({ ...alertData, validity: e.target.value })}
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-blue-500 outline-none font-medium text-navy"
                                        >
                                            <option value="24 Hours">24 Hours</option>
                                            <option value="3 Days">3 Days</option>
                                            <option value="7 Days">7 Days</option>
                                            <option value="Until Further Notice">Until Further Notice</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Identified Issue</label>
                                    <textarea
                                        rows={2}
                                        value={alertData.issue}
                                        onChange={e => setAlertData({ ...alertData, issue: e.target.value })}
                                        placeholder="Briefly describe the problem..."
                                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-blue-500 outline-none font-medium text-navy resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Required Action (Mandatory)</label>
                                    <textarea
                                        rows={2}
                                        value={alertData.action}
                                        onChange={e => setAlertData({ ...alertData, action: e.target.value })}
                                        placeholder="What should villagers do immediately?"
                                        className="w-full p-4 bg-red-50 rounded-xl border border-red-100 focus:bg-white focus:border-red-500 outline-none font-medium text-navy resize-none placeholder-red-300"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Helpline Numbers</label>
                                    <input
                                        type="text"
                                        value={alertData.helpline}
                                        readOnly
                                        className="w-full p-4 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 font-mono text-sm"
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1">* Auto-attached based on PHC settings</p>
                                </div>
                            </div>

                            <button
                                disabled={!alertData.title || !alertData.action}
                                onClick={() => setStep(2)}
                                className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                Preview Official Alert
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-8 space-y-8">
                            <h2 className="text-lg font-bold text-navy text-center">Review Official Format</h2>

                            {/* PREVIEW CARD */}
                            <div className="bg-white border-2 border-navy rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-navy p-4 text-white flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <i className="ri-government-fill text-xl"></i>
                                        <div>
                                            <h3 className="font-bold text-sm uppercase tracking-wider">Health Advisory</h3>
                                            <p className="text-[10px] opacity-70">Govt. of India • NHM Initiative</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold opacity-80">Issued: {new Date().toLocaleDateString()}</p>
                                        <p className="text-[10px] font-bold opacity-80">Valid: {alertData.validity}</p>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-bold text-navy">Issued By: {user?.profile?.fullName || 'Smt. Lakshmi Devi'}</p>
                                            <p className="text-[10px] text-gray-500">ASHA ID: {user?.id || 'AP-ASH-1023'} • {user?.profile?.phc || 'Rural PHC Kothapeta'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-red-600 mb-1">{alertData.title}</h4>
                                        <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded inline-block">Reason: {alertData.reason}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                                            <p className="text-[10px] font-bold text-red-500 uppercase">Immediate Action Required</p>
                                            <p className="text-sm font-bold text-navy">{alertData.action}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Issue Identified</p>
                                            <p className="text-sm text-navy">{alertData.issue}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-3">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Emergency Helplines</p>
                                        <div className="flex space-x-2">
                                            {alertData.helpline.split(',').map((num, i) => (
                                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{num.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                                    <p className="text-[10px] text-gray-400">Official Health Communication • Verified via Dharma Platform</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start space-x-3">
                                    <i className="ri-error-warning-line text-orange-600 mt-0.5"></i>
                                    <p className="text-[10px] text-orange-700 font-medium leading-relaxed">
                                        You are about to issue an official government health advisory. This action is logged and tracked. Ensure all details are accurate.
                                    </p>
                                </div>

                                <div className="flex space-x-4">
                                    <button onClick={() => setStep(1)} className="px-6 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all">
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={loading}
                                        className="flex-1 py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                                    >
                                        <i className="ri-broadcast-fill"></i>
                                        <span>{loading ? 'Broadcasting...' : 'Confirm & Broadcast Alert'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AshaLayout>
    );
}
