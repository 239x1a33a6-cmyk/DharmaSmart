import React, { useState } from 'react';
import { useSurveillance } from '../../context/SurveillanceContext';

export default function AlertManagement() {
    const [currentStep, setCurrentStep] = useState(1);
    const { clusters, dispatchTeam } = useSurveillance();
    const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
    const [_alertConfig, _setAlertConfig] = useState({
        severity: 'High',
        channels: {
            sms: true,
            whatsapp: true,
            ivr: false,
            radio: false
        },
        message: '',
        resources: [] as string[]
    });

    const steps = [
        { id: 1, title: 'Select Target', icon: 'ri-focus-3-line' },
        { id: 2, title: 'Risk Assessment', icon: 'ri-dashboard-line' },
        { id: 3, title: 'Resource Allocation', icon: 'ri-medicine-bottle-line' },
        { id: 4, title: 'Containment Strategy', icon: 'ri-shield-cross-line' },
        { id: 5, title: 'Draft Message', icon: 'ri-message-2-line' },
        { id: 6, title: 'Review', icon: 'ri-file-search-line' },
        { id: 7, title: 'Broadcast', icon: 'ri-broadcast-line' }
    ];

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 7));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    // Dummy broadcast function
    const handleBroadcast = () => {
        if (selectedClusterId) {
            dispatchTeam(selectedClusterId);
            alert('Alert Broadcasted Successfully to 12,450 Residents!');
            setCurrentStep(1); // Reset
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="font-bold text-navy text-lg">Select Active Cluster</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clusters.map(cluster => (
                                <div
                                    key={cluster.id}
                                    onClick={() => setSelectedClusterId(cluster.id)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedClusterId === cluster.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-navy">{cluster.village} Outbreak</h4>
                                            <p className="text-sm text-gray-500">Risk Score: {cluster.riskScore}</p>
                                        </div>
                                        {selectedClusterId === cluster.id && <i className="ri-checkbox-circle-fill text-red-500 text-xl"></i>}
                                    </div>
                                </div>
                            ))}
                            {clusters.length === 0 && (
                                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-xl">
                                    <p className="text-gray-500">No active clusters detected.</p>
                                    <button className="mt-4 px-4 py-2 bg-navy text-white rounded-lg text-sm">Force Simulations</button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-navy text-lg">Risk Assessment Matrix</h3>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <div className="flex items-center mb-4">
                                <i className="ri-alert-fill text-3xl text-orange-500 mr-4"></i>
                                <div>
                                    <h4 className="font-bold text-orange-800">High Contagion Probability</h4>
                                    <p className="text-sm text-orange-700">R0 Value estimated at 2.4 based on symptom velocity.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase">Population at Risk</p>
                                    <p className="font-bold text-xl text-navy">12,450</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase">Vulnerable (Avg Age)</p>
                                    <p className="font-bold text-xl text-navy">1,200</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase">Water Sources</p>
                                    <p className="font-bold text-xl text-red-500">3 Unsafe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-navy text-lg">Resource Allocation</h3>
                        <p className="text-sm text-gray-500">Select resources to deploy immediately.</p>
                        <div className="space-y-3">
                            {['Ambulance (x2)', 'Water Tankers (x3)', 'Medical Staff (x5)', 'ORS Stock (500 units)'].map((r, i) => (
                                <label key={i} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-navy rounded" defaultChecked />
                                    <span className="ml-3 font-medium text-gray-700">{r}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-navy text-lg">Containment Strategy</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-navy bg-blue-50 rounded-xl cursor-pointer">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-navy">Ring Vaccination</h4>
                                    <i className="ri-checkbox-circle-fill text-navy"></i>
                                </div>
                                <p className="text-xs text-gray-600 mt-2">Vaccinate immediate contacts and surrounding households.</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-xl hover:border-navy cursor-pointer">
                                <h4 className="font-bold text-gray-700">Mass Prophylaxis</h4>
                                <p className="text-xs text-gray-500 mt-2">Distribute antibiotics to entire sector.</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-xl hover:border-navy cursor-pointer">
                                <h4 className="font-bold text-gray-700">Quarantine Zone</h4>
                                <p className="text-xs text-gray-500 mt-2">Restrict movement in/out of village.</p>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-navy text-lg">Draft Broadcast Message</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Communication Channels</label>
                                <div className="flex space-x-4">
                                    {['SMS', 'WhatsApp', 'IVR Call', 'Radio', 'Loudspeaker'].map(c => (
                                        <label key={c} className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox text-navy rounded" defaultChecked={['SMS', 'WhatsApp'].includes(c)} />
                                            <span className="ml-2 text-sm text-gray-600">{c}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message Template</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy h-32"
                                    defaultValue={`URGENT HEALTH ALERT: Contamination detected in Majuli water sources. Do not drink from community wells. Boil water before use. Medical teams are en route. - District Health Officer, Jorhat`}
                                ></textarea>
                                <p className="text-xs text-gray-400 mt-1 text-right">145 / 160 characters (SMS)</p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Language Translation (Auto-AI)</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Assamese</span>
                                        <span className="text-green-600 font-bold text-xs">READY</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Hindi</span>
                                        <span className="text-green-600 font-bold text-xs">READY</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Bengali</span>
                                        <span className="text-green-600 font-bold text-xs">READY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 text-center">
                        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                            <i className="ri-file-shield-2-fill text-4xl text-yellow-600"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-navy">Final Approval Required</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            You are about to broadcast a <strong>Level 3 Health Alert</strong> to <strong>12,450 residents</strong>.
                            This action will deploy emergency resources and trigger public alarms.
                        </p>

                        <div className="bg-gray-50 p-4 rounded-xl text-left max-w-lg mx-auto border border-gray-200">
                            <h4 className="font-bold text-gray-700 text-sm border-b border-gray-200 pb-2 mb-2">Summary</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-gray-500">Target:</span> <span className="font-medium">Majuli Cluster</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Channels:</span> <span className="font-medium">SMS, WhatsApp</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Resources:</span> <span className="font-medium">Ambulance, Water Tankers</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Strategy:</span> <span className="font-medium">Ring Vaccination</span></li>
                            </ul>
                        </div>
                    </div>
                );
            case 7:
                // Broadcasting State
                return (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <div className="relative w-32 h-32 mb-6">
                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
                            <div className="absolute inset-4 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <i className="ri-broadcast-line text-5xl text-white animate-pulse"></i>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-navy mb-2">Broadcasting Alert...</h2>
                        <p className="text-gray-500 mb-8">Synchronizing with Telecom Operators</p>

                        <div className="w-full max-w-md bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-red-600 h-2 rounded-full w-[75%] animate-pulse"></div>
                        </div>
                        <p className="text-xs text-gray-400">Sent: 9,230 / 12,450</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Emergency Alert Wizard</h1>
                    <p className="text-gray-500">Rapid Response protocol for disease containment</p>
                </div>
                <div className="text-right">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Protocol: ACTIVE
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Stepper */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative flex items-center">
                                {index !== steps.length - 1 && (
                                    <div className={`absolute left-4 top-8 w-0.5 h-10 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                )}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                            ${step.id === currentStep ? 'bg-navy text-white shadow-lg shadow-navy/30' :
                                        step.id < currentStep ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {step.id < currentStep ? <i className="ri-check-line"></i> : <i className={step.icon}></i>}
                                </div>
                                <div className="ml-4">
                                    <p className={`text-sm font-bold ${step.id === currentStep ? 'text-navy' : 'text-gray-500'}`}>{step.title}</p>
                                    {step.id === currentStep && <p className="text-xs text-blue-500 animate-pulse">In Progress...</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col justify-between min-h-[600px]">
                    <div className="flex-1">
                        {renderStepContent()}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-8">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || currentStep === 7}
                            className={`px-6 py-2 rounded-lg font-bold text-sm ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Back
                        </button>

                        {currentStep < 6 && (
                            <button
                                onClick={handleNext}
                                disabled={currentStep === 1 && !selectedClusterId}
                                className={`px-8 py-3 bg-navy text-white rounded-xl font-bold text-sm shadow-lg hover:bg-navy-dark transition-all flex items-center ${currentStep === 1 && !selectedClusterId ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next Step <i className="ri-arrow-right-line ml-2"></i>
                            </button>
                        )}

                        {currentStep === 6 && (
                            <button
                                onClick={() => { handleNext(); setTimeout(handleBroadcast, 3000); }}
                                className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center animate-pulse"
                            >
                                <i className="ri-broadcast-fill mr-2"></i> CONFIRM BROADCAST
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
