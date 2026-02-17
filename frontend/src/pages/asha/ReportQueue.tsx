import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

interface Report {
    id: string;
    name: string;
    symptoms: string[];
    date: string;
    severity: 'Low' | 'Medium' | 'High';
    status: 'New' | 'Under Verification' | 'Escalated' | 'Closed';
    location: string;
}

export default function AshaReportQueue() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [reports, _setReports] = useState<Report[]>([
        { id: 'R101', name: 'Raj Kumar', symptoms: ['Fever', 'Diarrhea'], date: '2026-02-11', severity: 'High', status: 'New', location: 'Majuli North' },
        { id: 'R102', name: 'Sita Begum', symptoms: ['Vomiting', 'Abdominal pain'], date: '2026-02-11', severity: 'Medium', status: 'New', location: 'Majuli West' },
        { id: 'R103', name: 'Mohan Bora', symptoms: ['Cough', 'Fever'], date: '2026-02-10', severity: 'Medium', status: 'Under Verification', location: 'Majuli North' },
        { id: 'R104', name: 'Amita Das', symptoms: ['Skin rash', 'Itching'], date: '2026-02-10', severity: 'Low', status: 'New', location: 'Majuli East' },
        { id: 'R105', name: 'Baroda Pathak', symptoms: ['Diarrhea', 'Dehydration'], date: '2026-02-11', severity: 'High', status: 'New', location: 'Majuli North' },
    ]);

    const filteredReports = reports.filter(r => r.location.includes(user?.profile?.village || ''));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700';
            case 'Under Verification': return 'bg-orange-100 text-orange-700';
            case 'Escalated': return 'bg-red-100 text-red-700';
            case 'Closed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AshaLayout title="Community Reports Queue" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Symptoms</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Severity</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredReports.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                    <i className="ri-inbox-2-line text-3xl text-gray-300"></i>
                                                </div>
                                                <h3 className="text-gray-500 font-bold">No new reports today</h3>
                                                <button
                                                    onClick={() => navigate('/asha/new-case')}
                                                    className="mt-4 px-6 py-2 bg-navy text-white rounded-xl font-bold text-xs"
                                                >
                                                    Create New Case
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReports.map((report) => (
                                        <tr key={report.id} className="group hover:bg-gray-50 transition-all">
                                            <td className="px-8 py-6 text-xs font-bold text-gray-400">#{report.id}</td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-navy">{report.name.replace(/(?<=.{1})./g, '*')}</p>
                                                <p className="text-[10px] text-gray-400 mt-1">{report.location}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {report.symptoms.map(s => (
                                                        <span key={s} className="bg-gray-50 text-navy px-2 py-0.5 rounded text-[10px] font-semibold border border-gray-100">{s}</span>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-1">{report.date}</p>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-wider ${report.severity === 'High' ? 'bg-red-500 text-white' : report.severity === 'Medium' ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'}`}>
                                                    {report.severity}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/asha/verify-reports/${report.id}`)}
                                                        className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-xl hover:bg-primary/90 transition-all"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button className="px-4 py-2 bg-navy text-white text-[10px] font-bold rounded-xl hover:bg-navy-dark transition-all">
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <i className="ri-information-line text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-navy">Surveillance Privacy</h4>
                            <p className="text-[10px] text-blue-700/60 font-medium">Reporter names are partially masked to comply with PDG (Public Data Governance) rules. Full identities are only visible during field verification.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-white text-navy text-[10px] font-bold rounded-xl border border-blue-100 hover:bg-gray-50 transition-all">
                        View Privacy Policy
                    </button>
                </div>
            </div>
        </AshaLayout>
    );
}
