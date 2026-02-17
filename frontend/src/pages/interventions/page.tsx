import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../dashboard/components/DashboardLayout';
import TaskCreationModal from './components/TaskCreationModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import SupplyAllocationModal from './components/SupplyAllocationModal';
import WaterRemediationModal from './components/WaterRemediationModal';
import { interventionTasks, medicalSupplies, waterSources } from '../../mocks/intervention-data';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function InterventionsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'tasks' | 'supplies' | 'water'>('tasks');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const filteredTasks = interventionTasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const content = {
    en: {
      title: 'Response & Intervention Management',
      subtitle: 'Task Assignment & Field Operations Tracking',
      createTask: 'Create New Task',
      search: 'Search tasks, locations...',
      filterStatus: 'Filter by Status',
      filterPriority: 'Filter by Priority',
      allStatuses: 'All Statuses',
      allPriorities: 'All Priorities',
      tabs: {
        tasks: 'Field Tasks',
        supplies: 'Medical Supplies',
        water: 'Water Remediation'
      },
      stats: {
        activeTasks: 'Active Tasks',
        completedToday: 'Completed Today',
        fieldWorkers: 'Field Workers',
        avgResponseTime: 'Avg Response Time'
      },
      taskCard: {
        assignedTo: 'Assigned to',
        dueDate: 'Due Date',
        progress: 'Progress',
        viewDetails: 'View Details'
      },
      status: {
        pending: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
        overdue: 'Overdue'
      },
      priority: {
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      }
    },
    hi: {
      title: 'प्रतिक्रिया और हस्तक्षेप प्रबंधन',
      subtitle: 'कार्य असाइनमेंट और फील्ड संचालन ट्रैकिंग',
      createTask: 'नया कार्य बनाएं',
      search: 'कार्य, स्थान खोजें...',
      filterStatus: 'स्थिति के अनुसार फ़िल्टर करें',
      filterPriority: 'प्राथमिकता के अनुसार फ़िल्टर करें',
      allStatuses: 'सभी स्थितियां',
      allPriorities: 'सभी प्राथमिकताएं',
      tabs: {
        tasks: 'फील्ड कार्य',
        supplies: 'चिकित्सा आपूर्ति',
        water: 'जल उपचार'
      },
      stats: {
        activeTasks: 'सक्रिय कार्य',
        completedToday: 'आज पूर्ण',
        fieldWorkers: 'फील्ड कार्यकर्ता',
        avgResponseTime: 'औसत प्रतिक्रिया समय'
      },
      taskCard: {
        assignedTo: 'को सौंपा गया',
        dueDate: 'नियत तारीख',
        progress: 'प्रगति',
        viewDetails: 'विवरण देखें'
      },
      status: {
        pending: 'लंबित',
        in_progress: 'प्रगति में',
        completed: 'पूर्ण',
        overdue: 'विलंबित'
      },
      priority: {
        critical: 'गंभीर',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न'
      }
    }
  };

  const t = content[language];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-primary animate-spin"></i>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout} roleTitle="Intervention Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">{t.title}</h1>
            <p className="text-gray-600 mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-translate-2"></i>
              <span className="text-sm font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line text-lg"></i>
              <span className="font-medium">{t.createTask}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.stats.activeTasks}</p>
                <p className="text-3xl font-bold text-navy mt-1">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-task-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.stats.completedToday}</p>
                <p className="text-3xl font-bold text-navy mt-1">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.stats.fieldWorkers}</p>
                <p className="text-3xl font-bold text-navy mt-1">48</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-team-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.stats.avgResponseTime}</p>
                <p className="text-3xl font-bold text-navy mt-1">2.4h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-task-line mr-2"></i>
            {t.tabs.tasks}
          </button>
          <button
            onClick={() => setActiveTab('supplies')}
            className={`px-6 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'supplies'
                ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-medicine-bottle-line mr-2"></i>
            {t.tabs.supplies}
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`px-6 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'water'
                ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-drop-line mr-2"></i>
            {t.tabs.water}
          </button>
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">{t.allStatuses}</option>
                  <option value="pending">{t.status.pending}</option>
                  <option value="in_progress">{t.status.in_progress}</option>
                  <option value="completed">{t.status.completed}</option>
                  <option value="overdue">{t.status.overdue}</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">{t.allPriorities}</option>
                  <option value="critical">{t.priority.critical}</option>
                  <option value="high">{t.priority.high}</option>
                  <option value="medium">{t.priority.medium}</option>
                  <option value="low">{t.priority.low}</option>
                </select>
              </div>
            </div>

            {/* Task Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                          {t.status[task.status as keyof typeof t.status]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-navy">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-map-pin-line mr-2 text-teal-600"></i>
                      {task.location}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-user-line mr-2 text-teal-600"></i>
                      {t.taskCard.assignedTo}: <span className="font-semibold ml-1">{task.assignedTo}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-calendar-line mr-2 text-teal-600"></i>
                      {t.taskCard.dueDate}: <span className="font-semibold ml-1">{task.dueDate}</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{t.taskCard.progress}</span>
                        <span className="font-semibold text-navy">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-gray-50 text-teal-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap">
                    <span className="font-medium">{t.taskCard.viewDetails}</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Medical Supplies Tab */}
        {activeTab === 'supplies' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy">Medical Supply Inventory</h2>
              <button
                onClick={() => setShowSupplyModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                Allocate Supplies
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Allocated</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalSupplies.map((supply) => (
                    <tr key={supply.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-navy">{supply.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{supply.category}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-navy">{supply.currentStock}</span>
                        <span className="text-gray-400"> / {supply.totalStock}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{supply.allocated}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{supply.location}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          supply.status === 'adequate' ? 'bg-green-100 text-green-800' :
                          supply.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {supply.status.charAt(0).toUpperCase() + supply.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Water Remediation Tab */}
        {activeTab === 'water' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy">Water Source Remediation Status</h2>
              <button
                onClick={() => setShowWaterModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                Add Remediation Task
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waterSources.map((source) => (
                    <tr key={source.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-navy">{source.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{source.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{source.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{source.issue}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{source.action}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full"
                              style={{ width: `${source.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-navy">{source.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          source.status === 'completed' ? 'bg-green-100 text-green-800' :
                          source.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {source.status.replace('_', ' ').charAt(0).toUpperCase() + source.status.slice(1).replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showTaskModal && (
        <TaskCreationModal
          language={language}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {showDetailsModal && selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          language={language}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showSupplyModal && (
        <SupplyAllocationModal
          language={language}
          onClose={() => setShowSupplyModal(false)}
        />
      )}

      {showWaterModal && (
        <WaterRemediationModal
          language={language}
          onClose={() => setShowWaterModal(false)}
        />
      )}
    </DashboardLayout>
  );
}
