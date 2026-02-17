import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AshaLayout from '../../components/layout/AshaLayout';

export default function OfflineManager() {
    const _navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncing, setSyncing] = useState(false);

    // Simulated offline queue
    const [queue, setQueue] = useState([
        { id: 1, type: 'Field Report', title: 'Case #R105 Verification', time: '10 mins ago', size: '2.4 MB' },
        { id: 2, type: 'Water Log', title: 'Source Well-02 Update', time: '2 hours ago', size: '0.1 MB' },
        { id: 3, type: 'Household Survey', title: 'New Family Registration', time: 'Yesterday', size: '1.2 MB' },
    ]);

    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setQueue([]);
        setSyncing(false);
    };

    return (
        <AshaLayout title={isOnline ? 'Online Mode' : 'Offline Mode Active'} showBack backPath="/asha/dashboard">
            <div className={`p-4 md:p-8 max-w-2xl mx-auto w-full space-y-8 ${!isOnline ? 'border-t-4 border-gray-800' : 'border-t-4 border-green-600'}`}>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${queue.length > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        <i className={`ri-${queue.length > 0 ? 'database-2' : 'check-double'}-line text-4xl`}></i>
                    </div>
                    <h2 className="text-2xl font-bold text-navy mb-2">
                        {queue.length > 0 ? `${queue.length} Pending Uploads` : 'All Data Synced'}
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">
                        {queue.length > 0
                            ? 'Data is safely stored on your device. Sync manually when you reach a network zone.'
                            : 'Your device is up to date with the central server.'}
                    </p>

                    {queue.length > 0 && (
                        <button
                            onClick={handleSync}
                            disabled={syncing || !isOnline}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {syncing ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                                    Syncing Cloud Database...
                                </>
                            ) : (
                                <>
                                    <i className="ri-refresh-line mr-2"></i>
                                    {isOnline ? 'Sync Now' : 'Waiting for Connection...'}
                                </>
                            )}
                        </button>
                    )}
                </div>

                {queue.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Offline Queue</h3>
                        {queue.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                                        <i className={`ri-${item.type === 'Field Report' ? 'file-list' : item.type === 'Water Log' ? 'drop' : 'user-add'}-line`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-sm">{item.title}</h4>
                                        <p className="text-[10px] text-gray-400">{item.time} • {item.size}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded">Pending</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start space-x-4">
                    <i className="ri-hard-drive-2-line text-blue-600 text-xl mt-1"></i>
                    <div>
                        <h4 className="text-sm font-bold text-navy">Local Storage Used</h4>
                        <div className="w-full h-2 bg-blue-200 rounded-full mt-2 mb-1 overflow-hidden">
                            <div className="w-[12%] h-full bg-blue-600"></div>
                        </div>
                        <p className="text-[10px] text-blue-700 font-medium">145 MB used of 2 GB allocated for offline maps and records.</p>
                    </div>
                </div>

            </div>
        </AshaLayout>
    );
}
