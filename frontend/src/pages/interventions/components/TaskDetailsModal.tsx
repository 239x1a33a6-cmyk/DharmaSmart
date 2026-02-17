interface TaskDetailsModalProps {
  task: any;
  language: 'en' | 'hi';
  onClose: () => void;
}

export default function TaskDetailsModal({ task, language, onClose }: TaskDetailsModalProps) {
  const content = {
    en: {
      title: 'Task Details',
      taskInfo: 'Task Information',
      timeline: 'Activity Timeline',
      outcomes: 'Outcomes & Results',
      resources: 'Allocated Resources',
      updateProgress: 'Update Progress',
      markComplete: 'Mark as Complete',
      reassign: 'Reassign Task',
      close: 'Close',
      labels: {
        taskId: 'Task ID',
        type: 'Type',
        priority: 'Priority',
        status: 'Status',
        location: 'Location',
        assignedTo: 'Assigned To',
        createdDate: 'Created Date',
        dueDate: 'Due Date',
        progress: 'Progress',
        affectedPopulation: 'Affected Population'
      }
    },
    hi: {
      title: 'कार्य विवरण',
      taskInfo: 'कार्य जानकारी',
      timeline: 'गतिविधि समयरेखा',
      outcomes: 'परिणाम और परिणाम',
      resources: 'आवंटित संसाधन',
      updateProgress: 'प्रगति अपडेट करें',
      markComplete: 'पूर्ण के रूप में चिह्नित करें',
      reassign: 'कार्य पुनः सौंपें',
      close: 'बंद करें',
      labels: {
        taskId: 'कार्य आईडी',
        type: 'प्रकार',
        priority: 'प्राथमिकता',
        status: 'स्थिति',
        location: 'स्थान',
        assignedTo: 'को सौंपा गया',
        createdDate: 'निर्माण तिथि',
        dueDate: 'नियत तारीख',
        progress: 'प्रगति',
        affectedPopulation: 'प्रभावित जनसंख्या'
      }
    }
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy">{t.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Task Header */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-navy mb-2">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Task Information */}
          <div>
            <h4 className="text-lg font-bold text-navy mb-4">{t.taskInfo}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.taskId}</p>
                <p className="font-semibold text-navy">{task.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.type}</p>
                <p className="font-semibold text-navy">{task.type.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.priority}</p>
                <p className="font-semibold text-navy">{task.priority.toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.status}</p>
                <p className="font-semibold text-navy">{task.status.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.location}</p>
                <p className="font-semibold text-navy">{task.location}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.assignedTo}</p>
                <p className="font-semibold text-navy">{task.assignedTo}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.createdDate}</p>
                <p className="font-semibold text-navy">{task.createdDate}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.dueDate}</p>
                <p className="font-semibold text-navy">{task.dueDate}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.progress}</p>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-navy">{task.progress}%</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{t.labels.affectedPopulation}</p>
                <p className="font-semibold text-navy">{task.affectedPopulation.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          {task.resources && (
            <div>
              <h4 className="text-lg font-bold text-navy mb-4">{t.resources}</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {task.resources.map((resource: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <i className="ri-checkbox-circle-fill text-teal-600 mr-2"></i>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Timeline */}
          {task.timeline && (
            <div>
              <h4 className="text-lg font-bold text-navy mb-4">{t.timeline}</h4>
              <div className="space-y-3">
                {task.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-navy">{event.action}</p>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">By: {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outcomes */}
          {task.outcomes && (
            <div>
              <h4 className="text-lg font-bold text-navy mb-4">{t.outcomes}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(task.outcomes).map(([key, value]) => (
                  <div key={key} className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-navy">{value as number}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.close}
            </button>
            <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2"></i>
              {t.reassign}
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-edit-line mr-2"></i>
              {t.updateProgress}
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all cursor-pointer whitespace-nowrap">
              <i className="ri-checkbox-circle-line mr-2"></i>
              {t.markComplete}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
