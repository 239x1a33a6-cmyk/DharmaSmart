import { useState } from 'react';

interface Props {
  user: any;
}

export default function ClinicStaffDashboard({ user }: Props) {
  const [selectedTab, setSelectedTab] = useState('pending');

  const stats = [
    { label: 'Pending Cases', value: '18', icon: 'ri-file-list-3-line', color: 'bg-orange-500', change: '+5 today' },
    { label: 'Confirmed Cases', value: '42', icon: 'ri-checkbox-circle-line', color: 'bg-green-500', change: 'This week' },
    { label: 'Lab Tests Pending', value: '8', icon: 'ri-test-tube-line', color: 'bg-blue-500', change: '3 urgent' },
    { label: 'Escalations', value: '6', icon: 'ri-alarm-warning-line', color: 'bg-red-500', change: 'Last 24h' },
  ];

  const pendingCases = [
    {
      id: 'CS-2024-001',
      patient: 'Ramesh Kumar',
      age: 35,
      gender: 'Male',
      symptoms: 'Severe diarrhea, vomiting, dehydration',
      reportedBy: 'ASHA Worker - Priya Sharma',
      village: 'Majuli Village',
      severity: 'HIGH',
      time: '2 hours ago',
      vitals: { temp: '38.5°C', bp: '110/70', pulse: '95' },
    },
    {
      id: 'CS-2024-002',
      patient: 'Sunita Devi',
      age: 28,
      gender: 'Female',
      symptoms: 'Fever, abdominal pain, nausea',
      reportedBy: 'Community Member',
      village: 'Dibrugarh Ward 5',
      severity: 'MEDIUM',
      time: '4 hours ago',
      vitals: { temp: '37.8°C', bp: '120/80', pulse: '88' },
    },
  ];

  const confirmedCases = [
    {
      id: 'CS-2024-045',
      patient: 'Anil Borah',
      age: 42,
      diagnosis: 'Cholera',
      confirmedDate: 'Dec 24, 2024',
      status: 'Under Treatment',
      labResult: 'Positive - V. cholerae',
      severity: 'HIGH',
    },
    {
      id: 'CS-2024-046',
      patient: 'Meena Gogoi',
      age: 31,
      diagnosis: 'Typhoid',
      confirmedDate: 'Dec 23, 2024',
      status: 'Recovering',
      labResult: 'Positive - S. typhi',
      severity: 'MEDIUM',
    },
  ];

  const labTests = [
    {
      id: 'LAB-001',
      patient: 'Ramesh Kumar',
      testType: 'Stool Culture',
      priority: 'URGENT',
      requestedDate: 'Dec 25, 2024',
      expectedResult: 'Dec 26, 2024',
      status: 'Processing',
    },
    {
      id: 'LAB-002',
      patient: 'Sunita Devi',
      testType: 'Blood Test',
      priority: 'HIGH',
      requestedDate: 'Dec 25, 2024',
      expectedResult: 'Dec 27, 2024',
      status: 'Sample Collected',
    },
  ];

  const handleConfirmCase = (caseId: string) => {
    alert(`Case ${caseId} confirmed and added to surveillance system`);
  };

  const handleEscalate = (caseId: string) => {
    alert(`Case ${caseId} escalated to District Health Officer`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-white/90 text-lg">Primary Health Center - Clinical Dashboard</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-hospital-line text-6xl"></i>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Case Management Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('pending')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'pending'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              Pending Cases ({pendingCases.length})
            </button>
            <button
              onClick={() => setSelectedTab('confirmed')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'confirmed'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-checkbox-circle-line mr-2"></i>
              Confirmed Cases ({confirmedCases.length})
            </button>
            <button
              onClick={() => setSelectedTab('lab')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'lab'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-test-tube-line mr-2"></i>
              Lab Tests ({labTests.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Pending Cases Tab */}
          {selectedTab === 'pending' && (
            <div className="space-y-4">
              {pendingCases.map((case_) => (
                <div key={case_.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{case_.patient}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            case_.severity === 'HIGH' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                          }`}
                        >
                          {case_.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Case ID: {case_.id} | {case_.age} years, {case_.gender}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <i className="ri-map-pin-line mr-1"></i>
                        {case_.village} | Reported by: {case_.reportedBy}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{case_.time}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Symptoms</h4>
                      <p className="text-sm text-gray-700">{case_.symptoms}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Vitals</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-600">Temp</p>
                          <p className="font-semibold text-gray-900">{case_.vitals.temp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">BP</p>
                          <p className="font-semibold text-gray-900">{case_.vitals.bp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Pulse</p>
                          <p className="font-semibold text-gray-900">{case_.vitals.pulse}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleConfirmCase(case_.id)}
                      className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Confirm Case
                    </button>
                    <button className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-test-tube-line mr-2"></i>
                      Order Lab Test
                    </button>
                    <button
                      onClick={() => handleEscalate(case_.id)}
                      className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-alarm-warning-line mr-2"></i>
                      Escalate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Confirmed Cases Tab */}
          {selectedTab === 'confirmed' && (
            <div className="space-y-4">
              {confirmedCases.map((case_) => (
                <div key={case_.id} className="p-6 border-2 border-green-200 bg-green-50 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{case_.patient}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            case_.severity === 'HIGH' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                          }`}
                        >
                          {case_.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Case ID: {case_.id} | Age: {case_.age}</p>
                      <p className="text-sm text-gray-600">Confirmed: {case_.confirmedDate}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Diagnosis</h4>
                      <p className="text-sm text-gray-700">{case_.diagnosis}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Lab Result</h4>
                      <p className="text-sm text-gray-700">{case_.labResult}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Status</h4>
                      <p className="text-sm text-green-600 font-semibold">{case_.status}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-file-text-line mr-2"></i>
                      View Full Record
                    </button>
                    <button className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-edit-line mr-2"></i>
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lab Tests Tab */}
          {selectedTab === 'lab' && (
            <div className="space-y-4">
              {labTests.map((test) => (
                <div key={test.id} className="p-6 border-2 border-blue-200 bg-blue-50 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{test.patient}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            test.priority === 'URGENT' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                          }`}
                        >
                          {test.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Test ID: {test.id}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Test Type</h4>
                      <p className="text-sm text-gray-700">{test.testType}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Requested</h4>
                      <p className="text-sm text-gray-700">{test.requestedDate}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Expected</h4>
                      <p className="text-sm text-gray-700">{test.expectedResult}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Status</h4>
                      <p className="text-sm text-blue-600 font-semibold">{test.status}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-upload-line mr-2"></i>
                      Upload Result
                    </button>
                    <button className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-phone-line mr-2"></i>
                      Contact Lab
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
