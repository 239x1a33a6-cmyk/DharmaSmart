import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CommunityLayout from '../../components/layout/CommunityLayout';

interface Submission {
    id: string;
    type: 'Symptom' | 'Water';
    date: string;
    timestamp: number;
    status: 'Submitted' | 'Under Review' | 'Verified' | 'Closed';
    details: string;
    location: string;
}

export default function SubmissionsPage() {
    const navigate = useNavigate();
    const { user: _user } = useAuth();

    // Mock submissions with timestamps to test edit/delete rules
    const [submissions, setSubmissions] = useState<Submission[]>([
        {
            id: '1',
            type: 'Symptom',
            date: '2026-02-11',
            timestamp: Date.now() - 15 * 60 * 1000, // 15 mins ago
            status: 'Submitted',
            details: 'Fever, Diarrhea, Mild dehydration',
            location: 'Village A, Block B'
        },
        {
            id: '2',
            type: 'Water',
            date: '2026-02-11',
            timestamp: Date.now() - 45 * 60 * 1000, // 45 mins ago
            status: 'Under Review',
            details: 'Turbid water in community well',
            location: 'Village A, Block B'
        },
        {
            id: '3',
            type: 'Symptom',
            date: '2026-02-10',
            timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
            status: 'Verified',
            details: 'Vomiting, Abdominal pain',
            location: 'Village A, Block B'
        },
    ]);

    const canEdit = (sub: Submission) => {
        const hoursElapsed = (Date.now() - sub.timestamp) / (1000 * 60 * 60);
        return hoursElapsed < 1 && sub.status !== 'Verified' && sub.status !== 'Closed';
    };

    const canDelete = (sub: Submission) => {
        const minsElapsed = (Date.now() - sub.timestamp) / (1000 * 60);
        return minsElapsed < 30 && sub.status !== 'Verified' && sub.status !== 'Closed';
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            setSubmissions(submissions.filter(s => s.id !== id));
        }
    };

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
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-white border-b border-gray-100 py-6 px-8 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/community/dashboard')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <i className="ri-arrow-left-line text-navy text-xl"></i>
                        </button>
                        <h1 className="text-navy font-bold text-xl">My Submissions</h1>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => navigate('/report-symptoms')} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20">Report Symptoms</button>
                        <button onClick={() => navigate('/water-report')} className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl shadow-lg shadow-navy/20">Report Water Issue</button>
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto w-full flex-1">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-left border-b border-gray-100">
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Details</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {submissions.map((sub) => (
                                        <tr key={sub.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6 text-sm font-bold text-navy">{sub.date}</td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-lg font-bold text-[10px] uppercase ${sub.type === 'Symptom' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                                                    {sub.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-xs text-navy font-semibold">{sub.details}</p>
                                                <p className="text-[10px] text-gray-400 mt-1"><i className="ri-map-pin-line mr-1"></i>{sub.location}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(sub.status)}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        disabled={!canEdit(sub)}
                                                        className={`p-2 rounded-lg transition-all ${canEdit(sub) ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-gray-200'}`}
                                                        title={canEdit(sub) ? 'Edit Submission' : 'Editing disabled (1hr limit or verified)'}
                                                    >
                                                        <i className="ri-edit-line text-lg"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => canDelete(sub) && handleDelete(sub.id)}
                                                        disabled={!canDelete(sub)}
                                                        className={`p-2 rounded-lg transition-all ${canDelete(sub) ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'text-gray-200'}`}
                                                        title={canDelete(sub) ? 'Delete Submission' : 'Deletion disabled (30m limit)'}
                                                    >
                                                        <i className="ri-delete-bin-line text-lg"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {submissions.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <i className="ri-clipboard-line text-4xl text-gray-200"></i>
                                </div>
                                <h3 className="text-navy font-bold">No submissions yet</h3>
                                <p className="text-gray-400 text-xs mt-1">Your health and water reports will appear here</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h4 className="text-xs font-bold text-blue-700 uppercase mb-4 tracking-widest">Surveillance Rules</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-start space-x-3">
                                <i className="ri-time-line text-blue-500"></i>
                                <div>
                                    <p className="text-[10px] font-bold text-navy">Edit Window</p>
                                    <p className="text-[10px] text-blue-700/60 mt-0.5">Submissions can be edited within 1 hour of reporting.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <i className="ri-delete-bin-line text-blue-500"></i>
                                <div>
                                    <p className="text-[10px] font-bold text-navy">Delete Window</p>
                                    <p className="text-[10px] text-blue-700/60 mt-0.5">Submissions can be deleted within 30 minutes of reporting.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <i className="ri-shield-check-line text-blue-500"></i>
                                <div>
                                    <p className="text-[10px] font-bold text-navy">Locked Status</p>
                                    <p className="text-[10px] text-blue-700/60 mt-0.5">Reports are locked for editing once verified by health officials.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}
