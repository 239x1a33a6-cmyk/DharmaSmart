// Risk Intelligence & Prediction — State Admin
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

const predictions = [
    { disease: 'Cholera', affectedDistricts: ['Warangal', 'Nalgonda'], probability: 78, timeframe: '7 days', trend: 'rising', rainfall: 'high' },
    { disease: 'Dengue', affectedDistricts: ['Hyderabad', 'Rangareddy'], probability: 65, timeframe: '14 days', trend: 'rising', rainfall: 'moderate' },
    { disease: 'Malaria', affectedDistricts: ['Adilabad', 'Nizamabad'], probability: 52, timeframe: '21 days', trend: 'stable', rainfall: 'high' },
    { disease: 'Typhoid', affectedDistricts: ['Karimnagar', 'Khammam'], probability: 41, timeframe: '14 days', trend: 'falling', rainfall: 'low' },
];

const vulnerabilityRanking = Object.entries(districtAnalyticsData)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.riskScore - a.riskScore);

const seasonalRisks = [
    { season: 'Monsoon (Jun-Sep)', riskLevel: 'Critical', diseases: 'Cholera, Dengue, Malaria', icon: 'ri-rainy-fill' },
    { season: 'Post-Monsoon (Oct-Nov)', riskLevel: 'High', diseases: 'Dengue, Chikungunya', icon: 'ri-cloud-fill' },
    { season: 'Winter (Dec-Feb)', riskLevel: 'Moderate', diseases: 'Respiratory, Flu', icon: 'ri-snowy-fill' },
    { season: 'Summer (Mar-May)', riskLevel: 'High', diseases: 'Typhoid, Heatstroke, Dehydration', icon: 'ri-sun-fill' },
];

const aiSuggestions = [
    { text: 'Increase water testing frequency in Hyderabad by 2x', impact: 'high', category: 'Water Safety' },
    { text: 'Deploy 20 additional ASHA workers in Warangal', impact: 'critical', category: 'Workforce' },
    { text: 'Establish emergency medicine stockpile in Nalgonda', impact: 'high', category: 'Supply Chain' },
    { text: 'Schedule fogging campaign in Rangareddy before monsoon', impact: 'medium', category: 'Vector Control' },
    { text: 'Activate flood preparedness protocols in Khammam', impact: 'high', category: 'Disaster Prep' },
];

export default function RiskIntelligence() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Risk Intelligence & Prediction Engine</h2>
                <p className="text-sm text-slate-500 mt-1">AI-powered outbreak predictions and vulnerability analysis for Telangana</p>
            </div>

            {/* Outbreak Predictions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <i className="ri-robot-2-fill text-indigo-600 text-xl"></i>
                    <h3 className="text-lg font-bold text-slate-900">AI Outbreak Predictions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predictions.map((p, i) => (
                        <div key={i} className="border border-slate-100 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-slate-900 text-lg">{p.disease}</h4>
                                <span className={`px-3 py-1 rounded-full text-sm font-black ${p.probability >= 70 ? 'bg-red-100 text-red-700' : p.probability >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{p.probability}%</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-400">Districts</span><span className="font-semibold text-slate-700">{p.affectedDistricts.join(', ')}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Timeframe</span><span className="font-semibold text-slate-700">{p.timeframe}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Trend</span><span className={`font-bold ${p.trend === 'rising' ? 'text-red-600' : p.trend === 'falling' ? 'text-emerald-600' : 'text-slate-500'}`}><i className={`ri-arrow-${p.trend === 'rising' ? 'up' : p.trend === 'falling' ? 'down' : 'right'}-line`}></i> {p.trend}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Rainfall</span><span className="font-semibold text-blue-600">{p.rainfall}</span></div>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                                <div className="h-full rounded-full" style={{ width: `${p.probability}%`, backgroundColor: getRiskColor(p.probability) }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vulnerability Ranking */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">District Vulnerability Ranking</h3>
                    <div className="space-y-3">
                        {vulnerabilityRanking.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i < 3 ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'}`}>{i + 1}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 text-sm">{d.name}</p>
                                    <p className="text-xs text-slate-400">{d.activeCases} active | {d.waterContaminationAlerts} water alerts</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-black text-lg" style={{ color: getRiskColor(d.riskScore) }}>{d.riskScore}</span>
                                    <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(d.riskScore) }}>{getRiskLabel(d.riskScore)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Policy Suggestions */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <i className="ri-lightbulb-flash-fill text-amber-500 text-xl"></i>
                        <h3 className="text-lg font-bold text-slate-900">AI Policy Suggestions</h3>
                    </div>
                    <div className="space-y-3">
                        {aiSuggestions.map((s, i) => (
                            <div key={i} className="p-4 border border-slate-100 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.impact === 'critical' ? 'bg-red-100 text-red-700' : s.impact === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{s.impact}</span>
                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{s.category}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-900">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seasonal Forecast */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Seasonal Risk Forecast</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {seasonalRisks.map((s, i) => (
                        <div key={i} className="text-center p-5 bg-slate-50 rounded-xl">
                            <i className={`${s.icon} text-3xl text-slate-600 mb-2`}></i>
                            <p className="font-bold text-slate-900 text-sm mb-1">{s.season}</p>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' : s.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{s.riskLevel}</span>
                            <p className="text-xs text-slate-500 mt-2">{s.diseases}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
