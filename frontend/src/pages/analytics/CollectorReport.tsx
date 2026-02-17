
import { useSurveillance } from '../../context/SurveillanceContext';

export default function CollectorReport() {
    const { districtStats, villageStats } = useSurveillance();

    if (!districtStats) return <div>Generating Report...</div>;

    const criticalVillages = Object.values(villageStats).filter(v => v.riskLevel === 'Critical');

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
            <div className="bg-white max-w-[210mm] w-full min-h-[297mm] p-12 shadow-2xl relative">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-black uppercase tracking-wider mb-2">District Surveillance Report</h1>
                        <p className="text-sm text-gray-600 font-serif">Office of the District Collector, Jorhat</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-black uppercase">Confidential</p>
                        <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Executive Summary */}
                <section className="mb-10">
                    <h2 className="text-sm font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">1. Executive Summary</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-black mb-1">{districtStats.totalActiveCases}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Active Cases</p>
                        </div>
                        <div className={`p-6 border border-gray-200 ${criticalVillages.length > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50'}`}>
                            <h3 className={`text-xl font-bold mb-1 ${criticalVillages.length > 0 ? 'text-red-700' : 'text-green-700'}`}>
                                {criticalVillages.length > 0 ? 'Outbreak Detected' : 'Normal Surveillance'}
                            </h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Current Status</p>
                        </div>
                    </div>
                </section>

                {/* Critical Zones */}
                <section className="mb-10">
                    <h2 className="text-sm font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">2. Critical High-Risk Zones</h2>

                    {criticalVillages.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black">
                                    <th className="py-2 text-xs font-bold uppercase">Village / Ward</th>
                                    <th className="py-2 text-xs font-bold uppercase">Risk Score</th>
                                    <th className="py-2 text-xs font-bold uppercase">Primary Issue</th>
                                    <th className="py-2 text-xs font-bold uppercase">Recommended Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criticalVillages.map(v => (
                                    <tr key={v.village} className="border-b border-gray-200">
                                        <td className="py-3 text-sm font-bold">{v.village}</td>
                                        <td className="py-3 text-sm">{v.riskScore}/100</td>
                                        <td className="py-3 text-sm text-red-700 font-bold">
                                            {v.clusterDetected ? 'Cluster Pattern' : v.contaminationStatus === 'Contaminated' ? 'Water Contamination' : 'High Case Load'}
                                        </td>
                                        <td className="py-3 text-sm">
                                            Immediate Medical Camp & Chlorine Distribution
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No critical zones identified at this time.</p>
                    )}
                </section>

                {/* Resource Analysis */}
                <section className="mb-10">
                    <h2 className="text-sm font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">3. Resource Allocation Requirements</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase mb-1">ORS Packets</p>
                            <p className="text-xl font-bold text-black">{districtStats.totalActiveCases * 5 + 100}</p>
                        </div>
                        <div className="p-4 border border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase mb-1">Chlorine Tabs</p>
                            <p className="text-xl font-bold text-black">{districtStats.waterIncidents * 1000 + 500}</p>
                        </div>
                        <div className="p-4 border border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase mb-1">Ambulances</p>
                            <p className="text-xl font-bold text-black">{Math.ceil(districtStats.criticalAlerts / 2)}</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <div className="absolute bottom-12 left-12 right-12 border-t border-gray-200 pt-4 flex justify-between items-center text-xs text-gray-400">
                    <p>Generated by Dharma Surveillance System v1.0</p>
                    <p>Verified Digital Signature: #8X-992-KL</p>
                </div>
            </div>
        </div>
    );
}
