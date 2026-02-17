import { useState } from 'react';
import AshaLayout from '../../components/layout/AshaLayout';
import { communicationArchive } from '../../mocks/asha-mock-data';

export default function CommunicationArchive() {
    const [archive] = useState(communicationArchive);

    return (
        <AshaLayout title="Communication Archive">
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-navy">Sent Messages & Alerts</h2>
                        <p className="text-xs text-gray-400">History of all community broadcasts</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                        <i className="ri-archive-line text-purple-500 text-xl"></i>
                    </div>
                </div>

                <div className="space-y-4">
                    {archive.map(msg => (
                        <div key={msg.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${msg.type === 'Alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {msg.type}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">{msg.date}</span>
                            </div>

                            <h3 className="text-lg font-bold text-navy mb-1">{msg.title}</h3>
                            <p className="text-xs text-gray-500 mb-4">Recipients: {msg.recipients} Households</p>

                            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-gray-50 pt-3">
                                <span>Status: {msg.status}</span>
                                <button className="text-primary hover:underline">Download Report</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AshaLayout>
    );
}
