import { useState } from 'react';
import AshaLayout from '../../components/layout/AshaLayout';
import { districtInstructions } from '../../mocks/asha-mock-data';

export default function DistrictInstructions() {
    const [instructions, setInstructions] = useState(districtInstructions);
    const [selectedInstruction, setSelectedInstruction] = useState<typeof districtInstructions[0] | null>(null);

    const handleStatusUpdate = (id: string, newStatus: string) => {
        setInstructions(prev => prev.map(inst =>
            inst.id === id ? { ...inst, status: newStatus } : inst
        ));
        if (selectedInstruction && selectedInstruction.id === id) {
            setSelectedInstruction(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    return (
        <AshaLayout title="District Instructions">
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

                {selectedInstruction ? (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-fadeIn">
                        <button
                            onClick={() => setSelectedInstruction(null)}
                            className="text-gray-500 hover:text-navy mb-4 flex items-center space-x-2 text-sm font-bold"
                        >
                            <i className="ri-arrow-left-line"></i>
                            <span>Back to List</span>
                        </button>

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-navy mb-1">{selectedInstruction.title}</h2>
                                <p className="text-xs text-gray-500">ID: {selectedInstruction.id} • Issued: {selectedInstruction.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${selectedInstruction.priority === 'Critical' ? 'bg-red-100 text-red-600' :
                                    selectedInstruction.priority === 'High' ? 'bg-orange-100 text-orange-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                {selectedInstruction.priority} Priority
                            </span>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Instruction Deails</h3>
                            <p className="text-navy font-medium leading-relaxed">{selectedInstruction.description}</p>

                            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">Issued By</p>
                                    <p className="text-sm font-bold text-navy">{selectedInstruction.issuedBy}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Deadline</p>
                                    <p className="text-sm font-bold text-red-600">{selectedInstruction.deadline}</p>
                                </div>
                            </div>
                        </div>

                        {selectedInstruction.attachment && (
                            <div className="mb-8 p-4 border border-dashed border-gray-300 rounded-xl flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <i className="ri-file-pdf-line text-2xl text-red-500"></i>
                                    <div>
                                        <p className="text-sm font-bold text-navy">{selectedInstruction.attachment}</p>
                                        <p className="text-xs text-gray-500">Official Document</p>
                                    </div>
                                </div>
                                <button className="text-primary font-bold text-xs hover:underline">Download</button>
                            </div>
                        )}

                        <div className="flex flex-col space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your Action</h3>

                            {selectedInstruction.status === 'Pending' && (
                                <button
                                    onClick={() => handleStatusUpdate(selectedInstruction.id, 'In Progress')}
                                    className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all"
                                >
                                    Acknowledge & Start
                                </button>
                            )}

                            {selectedInstruction.status === 'In Progress' && (
                                <div className="space-y-3">
                                    <div className="p-4 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100">
                                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                                        You have marked this as <strong>In Progress</strong>.
                                    </div>
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInstruction.id, 'Completed')}
                                        className="w-full py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
                                    >
                                        Upload Proof & Mark Complete
                                    </button>
                                </div>
                            )}

                            {selectedInstruction.status === 'Completed' && (
                                <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100 flex items-center justify-center font-bold">
                                    <i className="ri-checkbox-circle-fill text-xl mr-2"></i>
                                    Action Completed Successfully
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase">Pending</p>
                                <p className="text-2xl font-bold text-orange-500">{instructions.filter(i => i.status === 'Pending').length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase">Completed</p>
                                <p className="text-2xl font-bold text-green-600">{instructions.filter(i => i.status === 'Completed').length}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-navy">Assigned Instructions</h3>
                                <button className="text-primary text-xs font-bold hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {instructions.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedInstruction(item)}
                                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className={`w-2 h-2 rounded-full ${item.priority === 'Critical' ? 'bg-red-500' : 'bg-blue-400'
                                                    }`}></span>
                                                <span className="text-xs text-gray-400 font-mono">{item.id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-navy group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                                        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                                            <span>Deadline: {item.deadline}</span>
                                            <i className="ri-arrow-right-line text-gray-300 group-hover:text-primary transition-colors text-lg"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AshaLayout>
    );
}
