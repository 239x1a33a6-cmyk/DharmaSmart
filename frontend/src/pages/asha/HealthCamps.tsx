import { useState } from 'react';
import AshaLayout from '../../components/layout/AshaLayout';
import { healthCamps } from '../../mocks/asha-mock-data';

export default function HealthCamps() {
    const [camps] = useState(healthCamps);

    const handleSendReminder = (campName: string) => {
        alert(`Reminder sent to all villagers for ${campName}!`);
    };

    return (
        <AshaLayout title="Health Camps">
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-navy">Upcoming & Past Camps</h2>
                        <p className="text-xs text-gray-400">Coordinate medical camps in your village</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <i className="ri-hospital-line text-blue-500 text-xl"></i>
                    </div>
                </div>

                <div className="space-y-4">
                    {camps.map(camp => (
                        <div key={camp.id} className="bg-white overflow-hidden rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`h-2 w-full ${camp.status === 'Upcoming' ? 'bg-primary' : 'bg-gray-300'}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${camp.status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {camp.status}
                                    </span>
                                    <span className="text-xs text-navy font-bold">{camp.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-navy mb-2">{camp.name}</h3>

                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Doctor Assigned</p>
                                        <p className="text-sm font-bold text-navy">{camp.doctor}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Target Group</p>
                                        <p className="text-sm font-bold text-navy">{camp.target}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Services Provided</p>
                                    <div className="flex flex-wrap gap-2">
                                        {camp.services.map((service, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {camp.status === 'Upcoming' ? (
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleSendReminder(camp.name)}
                                            className="flex-1 py-3 bg-navy text-white rounded-xl font-bold text-sm shadow-lg shadow-navy/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                                        >
                                            <i className="ri-notification-3-line"></i>
                                            <span>Send Reminder</span>
                                        </button>
                                        <button className="px-4 py-3 bg-white border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-all">
                                            <i className="ri-file-list-line"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-green-700">Total Registered</p>
                                            <p className="text-2xl font-bold text-green-800">{camp.registered}</p>
                                        </div>
                                        <button className="text-green-700 text-xs font-bold hover:underline">View Report</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AshaLayout>
    );
}
