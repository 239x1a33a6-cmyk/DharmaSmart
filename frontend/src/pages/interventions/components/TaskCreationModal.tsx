import { useState } from 'react';

interface TaskCreationModalProps {
  language: 'en' | 'hi';
  onClose: () => void;
}

export default function TaskCreationModal({ language, onClose }: TaskCreationModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'health_screening',
    priority: 'medium',
    location: '',
    assignedTo: '',
    dueDate: '',
    resources: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation
    // Task creation handled
    onClose();
  };

  const content = {
    en: {
      title: 'Create New Field Task',
      taskTitle: 'Task Title',
      description: 'Description',
      type: 'Task Type',
      priority: 'Priority',
      location: 'Location',
      assignTo: 'Assign To',
      dueDate: 'Due Date',
      resources: 'Required Resources',
      cancel: 'Cancel',
      create: 'Create Task',
      types: {
        health_screening: 'Health Screening',
        water_testing: 'Water Testing',
        education: 'Community Education',
        supply_distribution: 'Supply Distribution',
        rapid_response: 'Rapid Response',
        sanitation: 'Sanitation Improvement'
      },
      priorities: {
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      }
    },
    hi: {
      title: 'नया फील्ड कार्य बनाएं',
      taskTitle: 'कार्य शीर्षक',
      description: 'विवरण',
      type: 'कार्य प्रकार',
      priority: 'प्राथमिकता',
      location: 'स्थान',
      assignTo: 'को सौंपें',
      dueDate: 'नियत तारीख',
      resources: 'आवश्यक संसाधन',
      cancel: 'रद्द करें',
      create: 'कार्य बनाएं',
      types: {
        health_screening: 'स्वास्थ्य जांच',
        water_testing: 'जल परीक्षण',
        education: 'सामुदायिक शिक्षा',
        supply_distribution: 'आपूर्ति वितरण',
        rapid_response: 'त्वरित प्रतिक्रिया',
        sanitation: 'स्वच्छता सुधार'
      },
      priorities: {
        critical: 'गंभीर',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न'
      }
    }
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy">{t.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.taskTitle} *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.description} *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.type} *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="health_screening">{t.types.health_screening}</option>
                <option value="water_testing">{t.types.water_testing}</option>
                <option value="education">{t.types.education}</option>
                <option value="supply_distribution">{t.types.supply_distribution}</option>
                <option value="rapid_response">{t.types.rapid_response}</option>
                <option value="sanitation">{t.types.sanitation}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.priority} *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="critical">{t.priorities.critical}</option>
                <option value="high">{t.priorities.high}</option>
                <option value="medium">{t.priorities.medium}</option>
                <option value="low">{t.priorities.low}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.location} *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.assignTo} *
              </label>
              <input
                type="text"
                required
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter worker name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.dueDate} *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.resources}
            </label>
            <textarea
              value={formData.resources}
              onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="List required resources (comma separated)"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all cursor-pointer whitespace-nowrap"
            >
              {t.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
