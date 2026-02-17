import { useState, useEffect } from 'react';
import { backendApi } from '../../services/backend-api';

interface Role {
    id: number;
    name: string;
    description: string;
}

interface UserRegistration {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    requested_role: Role;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    created_at: string;
    reviewed_by: any;
    reviewed_at: string | null;
    admin_notes: string;
}

export default function UserApprovals() {
    const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
    const [selectedRegistration, setSelectedRegistration] = useState<UserRegistration | null>(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchRegistrations();
    }, [filter]);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const endpoint = filter === 'PENDING' ? '/auth/registrations/pending/' : '/auth/registrations/';
            const response: any = await backendApi.get(endpoint);
            let data = response;

            // Filter if not PENDING
            if (filter !== 'PENDING' && filter !== 'ALL') {
                data = data.filter((r: UserRegistration) => r.status === filter);
            }

            setRegistrations(data);
        } catch (error) {
            console.error('Failed to fetch registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (registrationId: number) => {
        setProcessing(true);
        try {
            await backendApi.post(`/auth/registrations/${registrationId}/approve/`, {
                admin_notes: adminNotes,
            });
            setSelectedRegistration(null);
            setAdminNotes('');
            fetchRegistrations();
            alert('User approved successfully!');
        } catch (error) {
            console.error('Failed to approve registration:', error);
            alert('Failed to approve user');
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async (registrationId: number) => {
        if (!adminNotes.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }
        setProcessing(true);
        try {
            await backendApi.post(`/auth/registrations/${registrationId}/reject/`, {
                admin_notes: adminNotes,
            });
            setSelectedRegistration(null);
            setAdminNotes('');
            fetchRegistrations();
            alert('User rejected');
        } catch (error) {
            console.error('Failed to reject registration:', error);
            alert('Failed to reject user');
        } finally {
            setProcessing(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        APPROVED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        REJECTED: 'bg-red-100 text-red-800 border-red-300',
    };

    const pendingCount = registrations.filter(r => r.status === 'PENDING').length;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">User Registration Approvals</h1>
                    <p className="text-slate-600">Review and approve new user registration requests</p>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2">
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === status
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                            {status === 'PENDING' && pendingCount > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Registrations Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <i className="ri-loader-4-line text-4xl text-blue-600 animate-spin"></i>
                        <p className="text-slate-600 mt-4">Loading registrations...</p>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <i className="ri-inbox-line text-6xl text-slate-300"></i>
                        <p className="text-slate-500 mt-4">No {filter.toLowerCase()} registrations found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Submitted</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {registrations.map((registration) => (
                                    <tr key={registration.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-slate-900">
                                                    {registration.first_name} {registration.last_name}
                                                </p>
                                                <p className="text-sm text-slate-500">{registration.email}</p>
                                                <p className="text-xs text-slate-400">{registration.username}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                                {registration.requested_role.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {formatDate(registration.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${statusColors[registration.status]}`}>
                                                {registration.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedRegistration(registration)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedRegistration && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900">Review Registration</h2>
                                <button
                                    onClick={() => {
                                        setSelectedRegistration(null);
                                        setAdminNotes('');
                                    }}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* User Info */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">User Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500">Name</p>
                                        <p className="font-medium text-slate-900">
                                            {selectedRegistration.first_name} {selectedRegistration.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Username</p>
                                        <p className="font-medium text-slate-900">{selectedRegistration.username}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Email</p>
                                        <p className="font-medium text-slate-900">{selectedRegistration.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Phone</p>
                                        <p className="font-medium text-slate-900">{selectedRegistration.phone_number || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role Request */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Role Request</h3>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-lg font-bold text-blue-900">{selectedRegistration.requested_role.name}</p>
                                    {selectedRegistration.requested_role.description && (
                                        <p className="text-sm text-blue-700 mt-1">{selectedRegistration.requested_role.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Justification */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Justification</h3>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-slate-700">{selectedRegistration.reason}</p>
                                </div>
                            </div>

                            {/* Admin Notes */}
                            {selectedRegistration.status === 'PENDING' && (
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-2 block">
                                        Admin Notes {selectedRegistration.status === 'PENDING' && '(Optional for approval, required for rejection)'}
                                    </label>
                                    <textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={4}
                                        placeholder="Add notes about your decision..."
                                    />
                                </div>
                            )}

                            {/* Existing Admin Notes (for reviewed requests) */}
                            {selectedRegistration.status !== 'PENDING' && selectedRegistration.admin_notes && (
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Admin Notes</h3>
                                    <div className="p-4 bg-slate-50 rounded-lg">
                                        <p className="text-slate-700">{selectedRegistration.admin_notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        {selectedRegistration.status === 'PENDING' && (
                            <div className="p-6 border-t border-slate-200 flex gap-4">
                                <button
                                    onClick={() => handleReject(selectedRegistration.id)}
                                    disabled={processing}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <i className="ri-loader-4-line animate-spin"></i>
                                    ) : (
                                        <i className="ri-close-circle-line"></i>
                                    )}
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleApprove(selectedRegistration.id)}
                                    disabled={processing}
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <i className="ri-loader-4-line animate-spin"></i>
                                    ) : (
                                        <i className="ri-checkbox-circle-line"></i>
                                    )}
                                    Approve
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
