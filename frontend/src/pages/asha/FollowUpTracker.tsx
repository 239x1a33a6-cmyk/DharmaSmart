import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AshaLayout from '../../components/layout/AshaLayout';

export default function FollowUpTracker() {
    const _navigate = useNavigate();

    const [tasks, setTasks] = useState([
        { id: 1, type: 'Revisit', name: 'Household #42 (R. Kumar)', due: 'Today', status: 'Pending', priority: 'High' },
        { id: 2, type: 'Verification', name: 'Water Source Check (Well-03)', due: 'Tomorrow', status: 'Pending', priority: 'Medium' },
        { id: 3, type: 'Escalation', name: 'Cluster Investigation #C01', due: 'Awaiting PHC', status: 'Locked', priority: 'Critical' },
    ]);

    const markDone = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
    };

    return (
        <AshaLayout title="Follow-up Tracker" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-3xl mx-auto w-full space-y-6">
                {tasks.map(task => (
                    <div key={task.id} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group ${task.status === 'Completed' ? 'opacity-60 grayscale' : ''}`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${task.priority === 'Critical' ? 'bg-red-500' : task.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                <i className={`ri-${task.type === 'Revisit' ? 'home-heart' : task.type === 'Verification' ? 'checkbox-circle' : 'alarm-warning'}-line text-xl`}></i>
                            </div>
                            <div>
                                <h3 className={`font-bold text-navy ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{task.type}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className={`text-[10px] font-bold ${task.due === 'Today' ? 'text-red-500' : 'text-gray-400'}`}>{task.due}</span>
                                </div>
                            </div>
                        </div>

                        {task.status !== 'Locked' && task.status !== 'Completed' && (
                            <button
                                onClick={() => markDone(task.id)}
                                className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                            >
                                <i className="ri-check-line text-xl"></i>
                            </button>
                        )}
                        {task.status === 'Locked' && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded-lg">Locked</span>
                        )}
                        {task.status === 'Completed' && (
                            <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase rounded-lg">Done</span>
                        )}
                    </div>
                ))}

                <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center">
                    <i className="ri-add-line mr-2"></i> Add Personal Reminder
                </button>
            </div>
        </AshaLayout>
    );
}
