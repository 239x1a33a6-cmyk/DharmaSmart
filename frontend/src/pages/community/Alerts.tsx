import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CommunityLayout from '../../components/layout/CommunityLayout';

interface Alert {
    id: string;
    title: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    issueType: string;
    advisory: string;
    startDate: string;
    endDate: string;
    location: string;
}

export default function AlertsPage() {
    const { user } = useAuth();

    // Mock alerts filtered by user location
    const allAlerts: Alert[] = [
        {
            id: 'a1',
            title: 'Water Turbidity Warning',
            riskLevel: 'Medium',
            issueType: 'Water Quality',
            advisory: 'Community well #2 shows high turbidity. PLEASE BOIL WATER for at least 5 minutes before drinking or cooking.',
            startDate: '2026-02-10',
            endDate: '2026-02-15',
            location: 'Majuli'
        },
        {
            id: 'a2',
            title: 'Seasonal Fever Spike',
            riskLevel: 'Low',
            issueType: 'Disease Outbreak',
            advisory: 'Small increase in fever cases in neighboring village. Use mosquito nets and maintain hand hygiene.',
            startDate: '2026-02-08',
            endDate: '2026-02-22',
            location: 'Majuli'
        },
        {
            id: 'a3',
            title: 'Monsoon Alert',
            riskLevel: 'High',
            issueType: 'Environmental',
            advisory: 'Heavy rainfall predicted. Potential for drainage overflow. Avoid contact with stagnant water.',
            startDate: '2026-02-12',
            endDate: '2026-02-14',
            location: 'Jorhat'
        }
    ];

    const filteredAlerts = allAlerts.filter(a => a.location === user?.profile?.village || a.location === user?.profile?.district);

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'High': return 'bg-red-500 text-white shadow-red-100';
            case 'Medium': return 'bg-orange-500 text-white shadow-orange-100';
            case 'Low': return 'bg-teal-500 text-white shadow-teal-100';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <CommunityLayout>
            <div className="space-y-6">
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                        <div key={alert.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${getRiskColor(alert.riskLevel)}`}>
                                            <i className={`${alert.issueType === 'Water Quality' ? 'ri-drop-fill' : alert.issueType === 'Disease Outbreak' ? 'ri-virus-fill' : 'ri-thunderstorms-fill'} text-2xl`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-navy">{alert.title}</h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${getRiskColor(alert.riskLevel)} shadow-none`}>
                                                    {alert.riskLevel} Risk
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">• {alert.issueType}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Duration</span>
                                        <span className="text-xs font-bold text-navy bg-gray-50 px-2 py-1 rounded-lg">
                                            {alert.startDate} <i className="ri-arrow-right-line mx-1"></i> {alert.endDate}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl mb-6">
                                    <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-2 flex items-center">
                                        <i className="ri-shield-check-line mr-2"></i> Health Advisory
                                    </h4>
                                    <p className="text-sm text-navy font-medium leading-relaxed">{alert.advisory}</p>
                                </div>

                                <div className="flex space-x-3">
                                    <button className="flex-1 py-3 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-dark transition-all">
                                        Complete Preventive Steps
                                    </button>
                                    <button className="px-6 py-3 border border-gray-100 text-navy text-xs font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center">
                                        <i className="ri-share-line mr-2"></i> Share with Family
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 p-20 text-center">
                        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-teal-500">
                            <i className="ri-shield-check-line text-4xl"></i>
                        </div>
                        <h3 className="text-navy font-bold text-xl">Area is Safe</h3>
                        <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">No active health alerts or warnings found for your current location.</p>
                    </div>
                )}

                <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-navy/20">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 text-primary mb-4">
                            <i className="ri-broadcast-line text-2xl"></i>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Early Warning System</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">How alerts are generated?</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6"> Our AI analyzes thousands of community reports and water quality data daily. When patterns indicate a potential risk, we issue verified alerts to help you stay safe.</p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2"><i className="ri-database-line"></i></div>
                                <p className="text-[8px] font-bold uppercase">Data Input</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2"><i className="ri-magic-line text-primary"></i></div>
                                <p className="text-[8px] font-bold uppercase">AI Pattern</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2"><i className="ri-shield-user-line"></i></div>
                                <p className="text-[8px] font-bold uppercase">Expert Check</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}
