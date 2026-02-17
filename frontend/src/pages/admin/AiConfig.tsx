import React from 'react';

export default function AiConfig() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI & Analytics Configuration</h2>
                    <p className="text-sm text-slate-500 font-medium">Fine-tune epidemiological models, risk weightage, and training parameters</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                    <h3 className="font-bold text-slate-900">Active Disease Models</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'LSTM Outbreak Predictor (v2.4)', accuracy: '94.2%', status: 'Production', active: true },
                            { name: 'Random Forest Risk Scorer', accuracy: '88.5%', status: 'Optimization', active: true },
                            { name: 'CNN Satellite Water Analysis', accuracy: '91.0%', status: 'Staging', active: false },
                        ].map((m, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{m.name}</p>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Acc: {m.accuracy}</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${m.status === 'Production' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{m.status}</span>
                                    </div>
                                </div>
                                <button className={`w-10 h-5 rounded-full relative transition-all ${m.active ? 'bg-primary' : 'bg-slate-300'}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${m.active ? 'left-5.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <h3 className="font-bold text-xl mb-6">Model Training Cycles</h3>
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Total Training Samples</span>
                            <span className="text-sm font-mono font-bold">14.2M Points</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Next Scheduled Training</span>
                            <span className="text-sm font-mono font-bold">In 4h 12m</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-2/3 shadow-[0_0_12px_#14b8a6]"></div>
                        </div>
                        <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/40 transition-all text-xs uppercase tracking-widest">
                            INITIATE EMERGENCY RE-TRAIN
                        </button>
                    </div>
                    <i className="ri-cpu-line absolute -right-8 -bottom-8 text-9xl text-white opacity-5"></i>
                </div>
            </div>
        </div>
    );
}
