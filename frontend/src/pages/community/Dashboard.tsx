import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CommunityLayout from '../../components/layout/CommunityLayout';

export default function CommunityDashboard() {
    const { logout: _logout } = useAuth();
    const navigate = useNavigate();
    const [activeAlert, _setActiveAlert] = useState<any>(null);

    // Mock data for My Submissions
    const submissions = [
        { id: '1', date: '2026-02-10', type: 'Symptom', status: 'Verified', details: 'Fever, Diarrhea' },
        { id: '2', date: '2026-02-11', type: 'Water', status: 'Submitted', details: 'High Turbidity in Well' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-100 text-blue-700';
            case 'Under Review': return 'bg-yellow-100 text-yellow-700';
            case 'Verified': return 'bg-green-100 text-green-700';
            case 'Closed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <CommunityLayout>
            <div className="space-y-8">
                {/* Active Alert Banner */}
                {activeAlert && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg shadow-red-200 flex items-center justify-between animate-fadeIn">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <i className="ri-error-warning-fill text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Local Health Warning</h3>
                                <p className="text-white/80 text-sm">Increased turbidity in community well. Please boil all water before use.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/community/alerts')}
                            className="px-6 py-2 bg-white text-red-600 rounded-xl font-bold text-sm hover:shadow-xl transition-all whitespace-nowrap"
                        >
                            View Instructions
                        </button>
                    </div>
                )}

                {/* Section 1: Quick Actions */}
                <section>
                    <h2 className="text-navy font-bold text-xl mb-6 flex items-center">
                        <i className="ri-flashlight-line text-secondary mr-2"></i>
                        Quick Actions
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Report Health Symptoms', subtext: 'If you or family feel unwell', icon: 'ri-capsule-line', color: 'bg-blue-500', path: '/report-symptoms' },
                            { label: 'Report Water Issue', subtext: 'Bad smell, color, or turbidity', icon: 'ri-drop-line', color: 'bg-teal-500', path: '/water-report' },
                            { label: 'View Local Alerts', subtext: 'Recent warnings for your area', icon: 'ri-notification-3-line', color: 'bg-orange-500', path: '/community/alerts' },
                            { label: 'Learn & Prevent', subtext: 'Prevention tips and resources', icon: 'ri-book-open-line', color: 'bg-purple-500', path: '/community/education' },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-primary/50 hover:shadow-2xl transition-all group text-left relative overflow-hidden active:scale-[0.98]"
                            >
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                    <i className={`${item.icon} text-2xl`}></i>
                                </div>
                                <h3 className="font-bold text-navy mb-1">{item.label}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.subtext}</p>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Section 2: My Submissions */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-navy font-bold text-xl">My Recent Submissions</h2>
                                <button onClick={() => navigate('/community/submissions')} className="text-xs font-bold text-primary hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-50 text-left">
                                            <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                            <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                            <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Details</th>
                                            <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm">
                                        {submissions.map((sub) => (
                                            <tr key={sub.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 font-semibold text-navy">{sub.date}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-lg font-bold text-[10px] uppercase ${sub.type === 'Symptom' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                                                        {sub.type}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-gray-500 text-xs truncate max-w-[150px]">{sub.details}</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(sub.status)}`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                                        <i className="ri-eye-line text-lg"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Section 4: Health Education & Awareness */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-navy font-bold text-xl">Learn & Prevent</h2>
                                <button onClick={() => navigate('/community/education')} className="text-xs font-bold text-primary hover:underline">Full Library</button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl flex items-start space-x-4 border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                                        <i className="ri-hand-sanitizer-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-sm">Hand Hygiene</h4>
                                        <p className="text-[10px] text-gray-500 mt-1">Proper techniques to prevent water-borne disease spread.</p>
                                        <button className="mt-2 text-[10px] font-bold text-primary flex items-center">
                                            <i className="ri-play-circle-line mr-1 text-xs"></i> Watch Video
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl flex items-start space-x-4 border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-500 flex-shrink-0">
                                        <i className="ri-drop-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-sm">Water Purification</h4>
                                        <p className="text-[10px] text-gray-500 mt-1">How to safely filter and boil water at home.</p>
                                        <button className="mt-2 text-[10px] font-bold text-primary flex items-center">
                                            <i className="ri-volume-up-line mr-1 text-xs"></i> Listen Audio
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Section 3 & 5: Right Sidebar (Alerts & AI Chatbot) */}
                    <div className="space-y-8">
                        {/* AI Assistant Card - Teaser */}
                        <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                                    <i className="ri-robot-line text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Health Assistant</h3>
                                <p className="text-white/60 text-xs leading-relaxed mb-6">Ask me anything about water-borne diseases, prevention, or how to use the app.</p>
                                <button
                                    onClick={() => navigate('/community/chatbot')}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold text-sm transition-all"
                                >
                                    Start Chatting
                                </button>
                                <p className="text-[8px] text-white/30 mt-4 italic text-center">Disclaimer: For informational purposes only. Not a substitute for medical advice.</p>
                            </div>
                        </div>

                        {/* Local Area Information */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-navy font-bold text-sm uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Area Status</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Village Source</span>
                                    <span className="text-navy font-bold">Community Tank</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Last Inspection</span>
                                    <span className="text-navy font-bold">2 days ago</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Nearby Facilities</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-xs text-navy font-semibold">
                                            <i className="ri-hospital-line text-primary mr-2"></i>
                                            Majuli Public Health Centre
                                        </div>
                                        <p className="text-[10px] text-gray-400 pl-6">Open 24/7 • 1.2 KM away</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}
