
import React, { useState } from 'react';
import { mockDirectives } from '../../mocks/directive-mock-data';
import { Directive, DirectivePriority, DirectiveType } from '../../types/directive-types';
import { mockUsers } from '../../mocks/admin-mock-data';

export default function DistrictDirectives() {
    const [directives, setDirectives] = useState<Directive[]>(mockDirectives);
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');

    // New Directive Form State
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newType, setNewType] = useState<DirectiveType>('order');
    const [newPriority, setNewPriority] = useState<DirectivePriority>('medium');
    const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

    const handleCreateDirective = () => {
        const newDirective: Directive = {
            id: `dir-${Date.now()}`,
            title: newTitle,
            description: newDesc,
            type: newType,
            priority: newPriority,
            senderId: 'user-2', // Mock DHO
            senderName: 'Dr. Priya Sharma (DHO)',
            senderRole: 'DISTRICT_ADMIN',
            recipients: selectedRecipients.map(id => {
                const user = mockUsers.find(u => u.id === id);
                return {
                    id: id,
                    name: user?.fullName || 'Unknown',
                    role: user?.role || 'ASHA_WORKER',
                    status: 'pending'
                };
            }),
            issuedAt: new Date().toISOString(),
        };

        setDirectives([newDirective, ...directives]);
        setShowModal(false);
        // Reset form
        setNewTitle('');
        setNewDesc('');
        setSelectedRecipients([]);
    };

    const getPriorityColor = (p: DirectivePriority) => {
        switch (p) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getTypeIcon = (t: DirectiveType) => {
        switch (t) {
            case 'order': return 'ri-government-fill';
            case 'report_request': return 'ri-file-list-3-line';
            case 'campaign': return 'ri-megaphone-line';
            case 'emergency': return 'ri-alarm-warning-fill';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Official Directives & Orders</h1>
                    <p className="text-slate-500 text-sm">Issue mandatory orders and tasks to field workers.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center"
                >
                    <i className="ri-send-plane-fill mr-2"></i> Issue New Directive
                </button>
            </div>

            {/* Directive List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex space-x-4">
                    <button onClick={() => setFilterStatus('all')} className={`text-sm font-bold ${filterStatus === 'all' ? 'text-slate-900' : 'text-slate-500'}`}>All</button>
                    <button onClick={() => setFilterStatus('active')} className={`text-sm font-bold ${filterStatus === 'active' ? 'text-slate-900' : 'text-slate-500'}`}>Active</button>
                    <button onClick={() => setFilterStatus('completed')} className={`text-sm font-bold ${filterStatus === 'completed' ? 'text-slate-900' : 'text-slate-500'}`}>Completed</button>
                </div>

                <div className="divide-y divide-slate-100">
                    {directives.map(dir => (
                        <div key={dir.id} className="p-6 hover:bg-slate-50 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${getPriorityColor(dir.priority)}`}>
                                        <i className={`${getTypeIcon(dir.type)} text-lg`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{dir.title}</h3>
                                        <p className="text-xs text-slate-500 font-mono">ID: {dir.id} • Issued: {new Date(dir.issuedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${getPriorityColor(dir.priority)}`}>
                                    {dir.priority}
                                </span>
                            </div>

                            <p className="text-sm text-slate-600 mb-4 pl-[3.25rem]">{dir.description}</p>

                            <div className="pl-[3.25rem] flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {dir.recipients.map((r, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600" title={`${r.name} (${r.status})`}>
                                            {r.name.charAt(0)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">
                                        +{dir.recipients.length}
                                    </div>
                                </div>

                                <div className="text-xs font-bold text-slate-400">
                                    {dir.recipients.filter(r => r.status === 'completed').length} / {dir.recipients.length} Completed
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Issue New Directive</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                                    placeholder="e.g. Mandatory Malaria Screening"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                    <select
                                        className="w-full p-2 border border-slate-200 rounded-lg"
                                        value={newType}
                                        onChange={e => setNewType(e.target.value as any)}
                                    >
                                        <option value="order">Official Order</option>
                                        <option value="report_request">Report Request</option>
                                        <option value="campaign">Health Campaign</option>
                                        <option value="emergency">Emergency Alert</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label>
                                    <select
                                        className="w-full p-2 border border-slate-200 rounded-lg"
                                        value={newPriority}
                                        onChange={e => setNewPriority(e.target.value as any)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                <textarea
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none h-24 resize-none"
                                    placeholder="Detailed instructions..."
                                    value={newDesc}
                                    onChange={e => setNewDesc(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recipients (Mock)</label>
                                <div className="border border-slate-200 rounded-lg max-h-32 overflow-y-auto p-2 space-y-1">
                                    {mockUsers.filter(u => u.role === 'ASHA_WORKER').slice(0, 5).map(u => (
                                        <label key={u.id} className="flex items-center space-x-2 p-1 hover:bg-slate-50 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="accent-slate-900"
                                                checked={selectedRecipients.includes(u.id)}
                                                onChange={e => {
                                                    if (e.target.checked) setSelectedRecipients([...selectedRecipients, u.id]);
                                                    else setSelectedRecipients(selectedRecipients.filter(id => id !== u.id));
                                                }}
                                            />
                                            <span className="text-sm">{u.fullName}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button onClick={handleCreateDirective} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-lg hover:bg-slate-800">Send Directive</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
