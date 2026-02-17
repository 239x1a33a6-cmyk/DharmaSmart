import { useState } from 'react';

interface WaterRemediationModalProps {
  language: 'en' | 'hi';
  onClose: () => void;
}

export default function WaterRemediationModal({ language, onClose }: WaterRemediationModalProps) {
  const [formData, setFormData] = useState({
    sourceName: '',
    sourceType: 'well',
    location: '',
    issue: '',
    action: '',
    assignedTo: '',
    targetDate: '',
    affectedHouseholds: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Water remediation task handled
    onClose();
  };

  const content = {
    en: {
      title: 'Add Water Remediation Task',
      sourceName: 'Water Source Name',
      sourceType: 'Source Type',
      location: 'Location',
      issue: 'Issue Identified',
      action: 'Remediation Action',
      assignTo: 'Assign To',
      targetDate: 'Target Completion Date',
      affectedHouseholds: 'Affected Households',
      cancel: 'Cancel',
      create: 'Create Task',
      sourceTypes: {
        well: 'Well',
        handpump: 'Handpump',
        river: 'River',
        tank: 'Tank',
        borewell: 'Borewell',
        piped: 'Piped Water'
      }
    },
    hi: {
      title: 'जल उपचार कार्य जोड़ें',
      sourceName: 'जल स्रोत का नाम',
      sourceType: 'स्रोत प्रकार',
      location: 'स्थान',
      issue: 'पहचानी गई समस्या',
      action: 'उपचार कार्रवाई',
      assignTo: 'को सौंपें',
      targetDate: 'लक्ष्य पूर्णता तिथि',
      affectedHouseholds: 'प्रभावित परिवार',
      cancel: 'रद्द करें',
      create: 'कार्य बनाएं',
      sourceTypes: {
        well: 'कुआं',
        handpump: 'हैंडपंप',
        river: 'नदी',
        tank: 'टैंक',
        borewell: 'बोरवेल',
        piped: 'पाइप जल'
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
              {t.sourceName} *
            </label>
            <input
              type="text"
              required
              value={formData.sourceName}
              onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter water source name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.sourceType} *
              </label>
              <select
                required
                value={formData.sourceType}
                onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="well">{t.sourceTypes.well}</option>
                <option value="handpump">{t.sourceTypes.handpump}</option>
                <option value="river">{t.sourceTypes.river}</option>
                <option value="tank">{t.sourceTypes.tank}</option>
                <option value="borewell">{t.sourceTypes.borewell}</option>
                <option value="piped">{t.sourceTypes.piped}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.affectedHouseholds} *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.affectedHouseholds}
                onChange={(e) => setFormData({ ...formData, affectedHouseholds: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Number of households"
              />
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.issue} *
            </label>
            <textarea
              required
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.action} *
            </label>
            <textarea
              required
              value={formData.action}
              onChange={(e) => setFormData({ ...formData, action: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe the remediation action"
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
                {t.targetDate} *
              </label>
              <input
                type="date"
                required
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              />
            </div>
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
