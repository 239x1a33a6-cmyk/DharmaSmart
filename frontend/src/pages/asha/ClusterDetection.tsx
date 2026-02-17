import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function ClusterDetection() {
    const navigate = useNavigate();
    const { user: _user } = useAuth();

    // In a real app, this would be fetched from an API
    const [clusters, _setClusters] = useState<any[]>([
        {
            id: 'C-001',
            type: 'Suspected Cholera / Acute Diarrhea',
            cases: 4,
            symptoms: 'Diarrhea, Dehydration',
            source: 'Community Well #3',
            location: 'Majuli North - Ward 4',
            risk: 'Critical',
            detectedAt: '2026-02-11 09:00',
            status: 'Active'
        }
    ]);

    return (
        <AshaLayout title="Cluster Detection Panel" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-8">

                <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-start space-x-6 relative z-10">
                        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                            <i className="ri-error-warning-line text-3xl"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">⚠ Urgent Pattern Detected</span>
                                <span className="text-[10px] text-orange-700 font-bold">{clusters[0].detectedAt}</span>
                            </div>
                            <h2 className="text-xl font-bold text-navy mb-2">{clusters[0].type}</h2>
                            <p className="text-sm text-orange-800/70 font-medium mb-4">
                                System has automatically grouped <span className="font-bold underline">{clusters[0].cases} reports</span> within 48 hours sharing the same geographic cluster and water source.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/50 p-3 rounded-xl border border-orange-200">
                                    <p className="text-[8px] font-bold text-orange-700 uppercase mb-1 tracking-widest">Common Symptoms</p>
                                    <p className="text-xs font-bold text-navy">{clusters[0].symptoms}</p>
                                </div>
                                <div className="bg-white/50 p-3 rounded-xl border border-orange-200">
                                    <p className="text-[8px] font-bold text-orange-700 uppercase mb-1 tracking-widest">Suspected Source</p>
                                    <p className="text-xs font-bold text-navy">{clusters[0].source}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                <button
                                    onClick={() => navigate('/asha/verify-reports/C-001')} // Assuming specific route for cluster verification or reuse verify-reports
                                    className="flex-1 py-4 bg-navy text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all"
                                >
                                    Initiate Cluster Investigation
                                </button>
                                <button
                                    onClick={() => navigate('/asha/heatmap')}
                                    className="px-6 py-4 bg-white text-navy border border-orange-200 rounded-xl font-bold text-xs active:scale-95 transition-all"
                                >
                                    View Map Pins
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-navy font-bold flex items-center">
                        <i className="ri-history-line mr-2 text-primary"></i>
                        Detection Methodology
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <i className="ri-radar-line text-xl"></i>
                            </div>
                            <h4 className="text-sm font-bold text-navy mb-2">Spatio-Temporal Analysis</h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                Tracks occurrences of similar clinical syndromes within a 500m radius and a 72-hour window to identify micro-outbreaks.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                                <i className="ri-drop-line text-xl"></i>
                            </div>
                            <h4 className="text-sm font-bold text-navy mb-2">Source Linkage</h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                Correlates health reports with water quality logs and community-reported water issues to pinpoint contamination sources.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10">
                    <div className="flex items-start space-x-4">
                        <i className="ri-medal-fill text-primary text-2xl"></i>
                        <div>
                            <h4 className="text-sm font-bold text-primary">Pre-emptive Surveillance Mode</h4>
                            <p className="text-[10px] text-primary/70 font-semibold leading-relaxed mt-1">
                                This feature empowers ASHA workers to move from reactive follow-ups to proactive investigation, potentially stopping an outbreak at its very first cluster.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </AshaLayout>
    );
}
