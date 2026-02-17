import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AshaLayout from '../../components/layout/AshaLayout';

export default function DecisionSupport() {
    const _navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { risk: string, advice: string[], referral: string }>(null);

    const [inputs, setInputs] = useState({
        symptomsCount: '',
        waterQuality: 'Normal',
        season: 'Monsoon',
        rainfall: 'Heavy',
        feverPresent: false,
        vomitingPresent: false,
    });

    const analyzeRisk = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple logic simulation
        let risk = 'Low';
        let referral = 'Home Care / ORS';
        let advice = ['Monitor hydration', 'Ensure clean water'];

        if (inputs.waterQuality !== 'Normal' || inputs.rainfall === 'Heavy') {
            risk = 'Medium';
            advice.push('Boil water before consumption');
        }

        if (parseInt(inputs.symptomsCount) > 3 || (inputs.feverPresent && inputs.vomitingPresent)) {
            risk = 'High';
            referral = 'Refer to PHC Immediately';
            advice = ['Suspected outbreak pattern', 'Isolate patient if possible', 'Check nearby households'];
        }

        setResult({ risk, advice, referral });
        setLoading(false);
    };

    return (
        <AshaLayout title="ASHA AI Assistant" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-8">

                {/* Input Panel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-navy font-bold text-lg border-b border-gray-50 pb-4">Variable Input</h2>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Current Case Load</label>
                            <input
                                type="number"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-indigo-500 transition-all font-bold text-navy"
                                placeholder="Number of similar cases"
                                value={inputs.symptomsCount}
                                onChange={(e) => setInputs({ ...inputs, symptomsCount: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Water Quality</label>
                                <select
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm font-semibold outline-none"
                                    value={inputs.waterQuality}
                                    onChange={(e) => setInputs({ ...inputs, waterQuality: e.target.value })}
                                >
                                    <option>Normal</option>
                                    <option>Turbid</option>
                                    <option>Bad Odor</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Rainfall</label>
                                <select
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm font-semibold outline-none"
                                    value={inputs.rainfall}
                                    onChange={(e) => setInputs({ ...inputs, rainfall: e.target.value })}
                                >
                                    <option>None</option>
                                    <option>Light</option>
                                    <option>Heavy</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    checked={inputs.feverPresent}
                                    onChange={(e) => setInputs({ ...inputs, feverPresent: e.target.checked })}
                                />
                                <span className="text-sm font-bold text-navy">Fever Reported</span>
                            </label>
                            <label className="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    checked={inputs.vomitingPresent}
                                    onChange={(e) => setInputs({ ...inputs, vomitingPresent: e.target.checked })}
                                />
                                <span className="text-sm font-bold text-navy">Vomiting Reported</span>
                            </label>
                        </div>

                        <button
                            onClick={analyzeRisk}
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
                        >
                            {loading ? 'Analyzing Patterns...' : 'Analyze Risk'}
                        </button>
                    </div>
                </div>

                {/* Output Panel */}
                <div className="space-y-6">
                    {result ? (
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-100 h-full animate-fadeIn relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Analysis Result</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${result.risk === 'High' ? 'bg-red-500 text-white' : result.risk === 'Medium' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {result.risk} Risk
                                    </span>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-navy mb-2">{result.referral}</h2>
                                    <p className="text-sm text-gray-500 font-medium">Recommended Action Protocol</p>
                                </div>

                                <div className="space-y-4">
                                    {result.advice.map((item, idx) => (
                                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                                            <i className="ri-checkbox-circle-line text-indigo-600 mt-0.5"></i>
                                            <p className="text-sm text-navy font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start space-x-3">
                                    <i className="ri-robot-line text-indigo-600"></i>
                                    <p className="text-[10px] text-indigo-800 font-medium leading-relaxed">
                                        This is an AI-generated suggestion based on surveillance data. Always follow official PHC protocols and your own clinical judgment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                <i className="ri-magic-line text-2xl text-gray-400"></i>
                            </div>
                            <h3 className="text-navy font-bold mb-2">Ready to Assist</h3>
                            <p className="text-xs text-gray-500 max-w-xs">Enter field observations to receive risk assessment and protocol recommendations.</p>
                        </div>
                    )}
                </div>
            </div>
        </AshaLayout>
    );
}
