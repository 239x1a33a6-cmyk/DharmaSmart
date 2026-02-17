
import React, { useState } from 'react';
import { mockDirectives } from '../../mocks/directive-mock-data';
import { Directive, DirectivePriority } from '../../types/directive-types';

export default function AshaDirectives() {
    // Filter to show only directives targeted at ASHA (for demo, just all mocks)
    const [directives, setDirectives] = useState<Directive[]>(mockDirectives);
    const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);

    const getPriorityColor = (p: DirectivePriority) => {
        switch (p) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const handleAcknowledge = (id: string) => {
        // Mock acknowledge logic
        const updated = directives.map(d => {
            if (d.id === id) {
                // In real app, we updates the recipient's status
                return { ...d, status: 'acknowledged' };
            }
            return d;
        });
        setDirectives(updated);
        setSelectedDirective(null);
        alert('Directive Acknowledged!');
    };

    return (
        <div className="space-y-6 p-4 animate-in fade-in duration-500 pb-24">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
                <h1 className="text-xl font-bold text-slate-900">My Orders & Directives</h1>
                <p className="text-xs text-slate-500 mt-1">Official instructions from District Health Office</p>
            </div>

            <div className="space-y-4">
                {directives.map(dir => (
                    <div
                        key={dir.id}
                        onClick={() => setSelectedDirective(dir)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 active:scale-95 transition-transform"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(dir.priority)}`}>
                                {dir.priority} Priority
                            </span>
                            <span className="text-[10px] text-slate-400">{new Date(dir.issuedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{dir.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{dir.description}</p>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                                    <i className="ri-user-star-fill text-xs text-slate-400"></i>
                                </div>
                                <span className="text-xs font-bold text-slate-500">{dir.senderName}</span>
                            </div>
                            <span className="text-xs font-bold text-blue-600">View Details <i className="ri-arrow-right-line"></i></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Sheet Modal for Details */}
            {selectedDirective && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${getPriorityColor(selectedDirective.priority)}`}>
                                    {selectedDirective.priority} Priority
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedDirective(null)}
                                className="p-2 bg-slate-100 rounded-full text-slate-500"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedDirective.title}</h2>

                        <div className="flex items-center space-x-3 mb-6 p-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                <i className="ri-government-fill text-slate-500"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Issued By</p>
                                <p className="text-sm font-bold text-slate-900">{selectedDirective.senderName}</p>
                                <p className="text-[10px] text-slate-500">{selectedDirective.senderRole}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Instructions</p>
                                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    {selectedDirective.description}
                                </p>
                            </div>

                            {selectedDirective.dueDate && (
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Deadline</p>
                                    <p className="text-sm font-bold text-red-600 flex items-center">
                                        <i className="ri-timer-flash-line mr-1"></i>
                                        {new Date(selectedDirective.dueDate).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => handleAcknowledge(selectedDirective.id)}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl text-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
                        >
                            <i className="ri-checkbox-circle-line"></i>
                            <span>Acknowledge & Start</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
