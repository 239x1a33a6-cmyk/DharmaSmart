import { useState } from 'react';
import AshaLayout from '../../components/layout/AshaLayout';
import { awarenessSessions } from '../../mocks/asha-mock-data';

export default function AwarenessSessions() {
    const [sessions, setSessions] = useState(awarenessSessions);
    const [showForm, setShowForm] = useState(false);
    const [newSession, setNewSession] = useState({
        topic: '',
        date: '',
        location: '',
        participants: 0,
        summary: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const session = {
            id: `AS-${Date.now()}`,
            ...newSession,
            status: 'Completed'
        };
        setSessions([session, ...sessions]);
        setShowForm(false);
        setNewSession({ topic: '', date: '', location: '', participants: 0, summary: '' });
    };

    return (
        <AshaLayout title="Awareness Sessions">
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

                {!showForm ? (
                    <>
                        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-navy">Sessions Conducted</h2>
                                <p className="text-xs text-gray-400">Track community education efforts</p>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 bg-navy text-white text-sm font-bold rounded-xl shadow-lg shadow-navy/20 active:scale-95 transition-all flex items-center space-x-2"
                            >
                                <i className="ri-add-line"></i>
                                <span>Record New</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sessions.map(session => (
                                <div key={session.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                                            {session.status}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">{session.date}</span>
                                    </div>
                                    <h3 className="font-bold text-navy text-lg mb-2">{session.topic}</h3>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <i className="ri-map-pin-line"></i>
                                            <span>{session.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <i className="ri-group-line"></i>
                                            <span>{session.participants} Attendees</span>
                                        </div>
                                    </div>
                                    {session.summary && (
                                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 italic">
                                            "{session.summary}"
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="font-bold text-navy text-lg">Record Session Details</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Topic Covered</label>
                                    <input
                                        type="text"
                                        required
                                        value={newSession.topic}
                                        onChange={e => setNewSession({ ...newSession, topic: e.target.value })}
                                        placeholder="e.g., Malaria Prevention"
                                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-navy"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newSession.date}
                                            onChange={e => setNewSession({ ...newSession, date: e.target.value })}
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-navy"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Attendees</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={newSession.participants}
                                            onChange={e => setNewSession({ ...newSession, participants: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-navy"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Location / Venue</label>
                                    <input
                                        type="text"
                                        required
                                        value={newSession.location}
                                        onChange={e => setNewSession({ ...newSession, location: e.target.value })}
                                        placeholder="e.g., Community Hall"
                                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-navy"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Session Summary & Key Points</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={newSession.summary}
                                        onChange={e => setNewSession({ ...newSession, summary: e.target.value })}
                                        placeholder="Describe what was discussed and any community feedback..."
                                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-navy resize-none"
                                    ></textarea>
                                </div>

                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center space-x-3">
                                    <i className="ri-image-add-line text-blue-500 text-xl"></i>
                                    <div>
                                        <p className="text-sm font-bold text-navy">Upload Event Photos</p>
                                        <p className="text-xs text-blue-500">helps in verifying the session</p>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg shadow-xl shadow-navy/20 active:scale-[0.98] transition-all">
                                Submit Report
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AshaLayout>
    );
}
