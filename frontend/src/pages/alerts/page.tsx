import { useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  location: string;
  district: string;
  timestamp: string;
  channels: string[];
  status: 'sent' | 'acknowledged' | 'resolved';
  affectedPopulation: number;
  recommendedActions: string[];
  recommendedActionsHi: string[];
  triggerType: 'risk_threshold' | 'water_contamination' | 'symptom_clustering';
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-2024-001',
    type: 'critical',
    title: 'Critical Cholera Outbreak Risk',
    titleHi: 'गंभीर हैजा प्रकोप जोखिम',
    message: 'High cholera risk detected in Majuli District. Immediate preventive measures required.',
    messageHi: 'माजुली जिले में उच्च हैजा जोखिम का पता चला है। तत्काल निवारक उपाय आवश्यक हैं।',
    location: 'Majuli Block',
    district: 'Majuli',
    timestamp: '2024-01-15T09:30:00Z',
    channels: ['SMS', 'WhatsApp', 'App Push', 'Email', 'IVR'],
    status: 'sent',
    affectedPopulation: 12500,
    recommendedActions: [
      'Boil drinking water for at least 10 minutes',
      'Avoid raw or undercooked food',
      'Wash hands frequently with soap',
      'Seek immediate medical care if symptoms appear',
      'Report any cases to nearest health center'
    ],
    recommendedActionsHi: [
      'पीने के पानी को कम से कम 10 मिनट तक उबालें',
      'कच्चा या अधपका भोजन न खाएं',
      'साबुन से बार-बार हाथ धोएं',
      'लक्षण दिखने पर तुरंत चिकित्सा सहायता लें',
      'निकटतम स्वास्थ्य केंद्र को किसी भी मामले की रिपोर्ट करें'
    ],
    triggerType: 'risk_threshold'
  },
  {
    id: 'ALT-2024-002',
    type: 'high',
    title: 'Water Contamination Detected',
    titleHi: 'जल संदूषण का पता चला',
    message: 'Bacterial contamination found in 3 water sources in Dibrugarh. Avoid using these sources.',
    messageHi: 'डिब्रूगढ़ में 3 जल स्रोतों में बैक्टीरियल संदूषण पाया गया। इन स्रोतों का उपयोग न करें।',
    location: 'Dibrugarh Town',
    district: 'Dibrugarh',
    timestamp: '2024-01-15T11:45:00Z',
    channels: ['SMS', 'WhatsApp', 'App Push', 'IVR'],
    status: 'acknowledged',
    affectedPopulation: 8200,
    recommendedActions: [
      'Do not use water from handpumps near market area',
      'Use alternative water sources or bottled water',
      'Chlorination teams have been dispatched',
      'Water testing in progress',
      'Updates will be shared within 6 hours'
    ],
    recommendedActionsHi: [
      'बाजार क्षेत्र के पास हैंडपंप से पानी का उपयोग न करें',
      'वैकल्पिक जल स्रोतों या बोतलबंद पानी का उपयोग करें',
      'क्लोरीनीकरण टीमें भेजी गई हैं',
      'जल परीक्षण प्रगति पर है',
      'अपडेट 6 घंटे के भीतर साझा किए जाएंगे'
    ],
    triggerType: 'water_contamination'
  },
  {
    id: 'ALT-2024-003',
    type: 'high',
    title: 'Diarrhea Cases Clustering',
    titleHi: 'दस्त के मामलों में वृद्धि',
    message: '15 new diarrhea cases reported in Silchar in last 24 hours. Symptom clustering detected.',
    messageHi: 'सिलचर में पिछले 24 घंटों में दस्त के 15 नए मामले दर्ज किए गए। लक्षण समूहन का पता चला।',
    location: 'Silchar Block',
    district: 'Cachar',
    timestamp: '2024-01-15T14:20:00Z',
    channels: ['SMS', 'WhatsApp', 'App Push', 'Email'],
    status: 'sent',
    affectedPopulation: 6800,
    recommendedActions: [
      'Monitor for symptoms: watery stool, vomiting, fever',
      'Maintain strict hand hygiene',
      'Use ORS for mild dehydration',
      'Visit health center if symptoms worsen',
      'Health camps scheduled for tomorrow'
    ],
    recommendedActionsHi: [
      'लक्षणों की निगरानी करें: पानी जैसा मल, उल्टी, बुखार',
      'सख्त हाथ स्वच्छता बनाए रखें',
      'हल्के निर्जलीकरण के लिए ओआरएस का उपयोग करें',
      'लक्षण बिगड़ने पर स्वास्थ्य केंद्र जाएं',
      'कल के लिए स्वास्थ्य शिविर निर्धारित हैं'
    ],
    triggerType: 'symptom_clustering'
  },
  {
    id: 'ALT-2024-004',
    type: 'medium',
    title: 'Typhoid Risk Elevated',
    titleHi: 'टाइफाइड जोखिम बढ़ा',
    message: 'Moderate typhoid risk in Jorhat. Preventive measures recommended.',
    messageHi: 'जोरहाट में मध्यम टाइफाइड जोखिम। निवारक उपाय अनुशंसित हैं।',
    location: 'Jorhat Block',
    district: 'Jorhat',
    timestamp: '2024-01-15T16:00:00Z',
    channels: ['SMS', 'App Push'],
    status: 'sent',
    affectedPopulation: 4500,
    recommendedActions: [
      'Ensure food is properly cooked',
      'Drink only boiled or purified water',
      'Maintain personal hygiene',
      'Get vaccinated if available',
      'Report prolonged fever to health workers'
    ],
    recommendedActionsHi: [
      'सुनिश्चित करें कि भोजन ठीक से पका हो',
      'केवल उबला या शुद्ध पानी पिएं',
      'व्यक्तिगत स्वच्छता बनाए रखें',
      'उपलब्ध होने पर टीका लगवाएं',
      'लंबे समय तक बुखार की सूचना स्वास्थ्य कर्मियों को दें'
    ],
    triggerType: 'risk_threshold'
  },
  {
    id: 'ALT-2024-005',
    type: 'medium',
    title: 'Seasonal Disease Alert',
    titleHi: 'मौसमी रोग चेतावनी',
    message: 'Monsoon-related disease risk increasing. Stay vigilant.',
    messageHi: 'मानसून से संबंधित रोग जोखिम बढ़ रहा है। सतर्क रहें।',
    location: 'Tinsukia Block',
    district: 'Tinsukia',
    timestamp: '2024-01-15T17:30:00Z',
    channels: ['SMS', 'WhatsApp'],
    status: 'resolved',
    affectedPopulation: 3200,
    recommendedActions: [
      'Avoid stagnant water',
      'Use mosquito nets',
      'Keep surroundings clean',
      'Store food properly',
      'Drink safe water only'
    ],
    recommendedActionsHi: [
      'रुके हुए पानी से बचें',
      'मच्छरदानी का उपयोग करें',
      'आसपास साफ रखें',
      'भोजन को ठीक से स्टोर करें',
      'केवल सुरक्षित पानी पिएं'
    ],
    triggerType: 'risk_threshold'
  },
  {
    id: 'ALT-2024-006',
    type: 'low',
    title: 'Preventive Health Advisory',
    titleHi: 'निवारक स्वास्थ्य सलाह',
    message: 'General health advisory for upcoming festival season.',
    messageHi: 'आगामी त्योहार के मौसम के लिए सामान्य स्वास्थ्य सलाह।',
    location: 'Guwahati Block',
    district: 'Kamrup',
    timestamp: '2024-01-15T18:00:00Z',
    channels: ['SMS', 'App Push'],
    status: 'sent',
    affectedPopulation: 15000,
    recommendedActions: [
      'Maintain food hygiene during festivals',
      'Wash hands before eating',
      'Avoid street food from unhygienic sources',
      'Stay hydrated',
      'Report any health concerns promptly'
    ],
    recommendedActionsHi: [
      'त्योहारों के दौरान खाद्य स्वच्छता बनाए रखें',
      'खाने से पहले हाथ धोएं',
      'अस्वच्छ स्रोतों से स्ट्रीट फूड से बचें',
      'हाइड्रेटेड रहें',
      'किसी भी स्वास्थ्य चिंता की तुरंत रिपोर्ट करें'
    ],
    triggerType: 'risk_threshold'
  }
];

export default function AlertsPage() {
  const [alerts, _setAlerts] = useState<Alert[]>(mockAlerts);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [ivrEnabled, setIvrEnabled] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filterType === 'all' || alert.type === filterType;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-500 text-red-900';
      case 'high': return 'bg-orange-50 border-orange-500 text-orange-900';
      case 'medium': return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      case 'low': return 'bg-green-50 border-green-500 text-green-900';
      default: return 'bg-gray-50 border-gray-500 text-gray-900';
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'risk_threshold': return 'ri-alert-line';
      case 'water_contamination': return 'ri-drop-line';
      case 'symptom_clustering': return 'ri-group-line';
      default: return 'ri-notification-line';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4">
              <i className="ri-alarm-warning-line text-3xl text-white"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Alert & Early Warning System' : 'चेतावनी और प्रारंभिक चेतावनी प्रणाली'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Real-time disease outbreak alerts and preventive health advisories delivered through multiple channels in local languages'
                : 'स्थानीय भाषाओं में कई चैनलों के माध्यम से वास्तविक समय रोग प्रकोप चेतावनी और निवारक स्वास्थ्य सलाह'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Active Alerts' : 'सक्रिय चेतावनियां'}</p>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-notification-3-line text-2xl text-red-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'SMS Sent (24h)' : 'SMS भेजे गए (24 घंटे)'}</p>
                  <p className="text-3xl font-bold text-gray-900">8,742</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-message-2-line text-2xl text-orange-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'People Reached' : 'लोगों तक पहुंचे'}</p>
                  <p className="text-3xl font-bold text-gray-900">50.2K</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-group-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Acknowledgments' : 'पावतियां'}</p>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Language Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Language' : 'भाषा'}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </div>

              {/* Alert Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Alert Type' : 'चेतावनी प्रकार'}
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">{language === 'en' ? 'All Types' : 'सभी प्रकार'}</option>
                  <option value="critical">{language === 'en' ? 'Critical' : 'गंभीर'}</option>
                  <option value="high">{language === 'en' ? 'High' : 'उच्च'}</option>
                  <option value="medium">{language === 'en' ? 'Medium' : 'मध्यम'}</option>
                  <option value="low">{language === 'en' ? 'Low' : 'निम्न'}</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Status' : 'स्थिति'}
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">{language === 'en' ? 'All Status' : 'सभी स्थिति'}</option>
                  <option value="sent">{language === 'en' ? 'Sent' : 'भेजा गया'}</option>
                  <option value="acknowledged">{language === 'en' ? 'Acknowledged' : 'स्वीकृत'}</option>
                  <option value="resolved">{language === 'en' ? 'Resolved' : 'हल किया गया'}</option>
                </select>
              </div>

              {/* Channel Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Alert Channels' : 'चेतावनी चैनल'}
                </label>
                <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                  <i className="ri-settings-3-line mr-2"></i>
                  {language === 'en' ? 'Configure' : 'कॉन्फ़िगर करें'}
                </button>
              </div>
            </div>

            {/* Channel Toggles */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-4">
                {language === 'en' ? 'Enabled Notification Channels:' : 'सक्षम अधिसूचना चैनल:'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsEnabled}
                    onChange={(e) => setSmsEnabled(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    <i className="ri-message-2-line mr-1"></i>
                    SMS
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    <i className="ri-whatsapp-line mr-1"></i>
                    WhatsApp
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    <i className="ri-mail-line mr-1"></i>
                    Email
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ivrEnabled}
                    onChange={(e) => setIvrEnabled(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    <i className="ri-phone-line mr-1"></i>
                    IVR Voice
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Alert Trigger Types Info */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <h3 className="text-xl font-bold mb-4">
              {language === 'en' ? 'Alert Trigger Mechanisms' : 'चेतावनी ट्रिगर तंत्र'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-alert-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {language === 'en' ? 'Risk Threshold Exceeded' : 'जोखिम सीमा पार'}
                  </h4>
                  <p className="text-sm text-white/90">
                    {language === 'en'
                      ? 'Triggered when disease risk score crosses predefined thresholds'
                      : 'जब रोग जोखिम स्कोर पूर्वनिर्धारित सीमा को पार करता है तो ट्रिगर होता है'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-drop-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {language === 'en' ? 'Water Contamination' : 'जल संदूषण'}
                  </h4>
                  <p className="text-sm text-white/90">
                    {language === 'en'
                      ? 'Activated when bacterial contamination detected in water sources'
                      : 'जब जल स्रोतों में बैक्टीरियल संदूषण का पता चलता है तो सक्रिय होता है'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-group-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {language === 'en' ? 'Symptom Clustering' : 'लक्षण समूहन'}
                  </h4>
                  <p className="text-sm text-white/90">
                    {language === 'en'
                      ? 'Issued when abnormal clustering of similar symptoms detected'
                      : 'जब समान लक्षणों का असामान्य समूहन पाया जाता है तो जारी किया जाता है'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl shadow-md border-l-4 p-6 transition-all hover:shadow-lg cursor-pointer ${getAlertColor(alert.type)}`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${getTriggerIcon(alert.triggerType)} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getAlertBadgeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {language === 'en' ? alert.title : alert.titleHi}
                      </h3>
                      <p className="text-sm mb-3">
                        {language === 'en' ? alert.message : alert.messageHi}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center">
                          <i className="ri-map-pin-line mr-1"></i>
                          {alert.location}, {alert.district}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i>
                          {formatTimestamp(alert.timestamp)}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-group-line mr-1"></i>
                          {alert.affectedPopulation.toLocaleString()} {language === 'en' ? 'people' : 'लोग'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 text-2xl hover:scale-110 transition-transform">
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>

                {/* Channels */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Sent via:' : 'भेजा गया:'}
                  </span>
                  {alert.channels.map((channel) => (
                    <span key={channel} className="px-2 py-1 bg-white rounded text-xs font-medium">
                      {channel}
                    </span>
                  ))}
                </div>

                {/* Quick Actions Preview */}
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">
                    {language === 'en' ? 'Recommended Actions:' : 'अनुशंसित कार्रवाई:'}
                  </p>
                  <ul className="space-y-1">
                    {(language === 'en' ? alert.recommendedActions : alert.recommendedActionsHi).slice(0, 3).map((action, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <i className="ri-checkbox-circle-fill mr-2 mt-0.5 flex-shrink-0"></i>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  {alert.recommendedActions.length > 3 && (
                    <p className="text-sm text-gray-600 mt-2">
                      +{alert.recommendedActions.length - 3} {language === 'en' ? 'more actions' : 'और कार्रवाई'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Alert Detail Modal */}
          {selectedAlert && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAlert(null)}>
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className={`p-6 border-b-4 ${getAlertColor(selectedAlert.type)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <i className={`${getTriggerIcon(selectedAlert.triggerType)} text-3xl`}></i>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getAlertBadgeColor(selectedAlert.type)}`}>
                            {selectedAlert.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(selectedAlert.status)}`}>
                            {selectedAlert.status}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold">
                          {language === 'en' ? selectedAlert.title : selectedAlert.titleHi}
                        </h2>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAlert(null)}
                      className="text-2xl hover:bg-white/50 rounded-lg p-2 transition-colors"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>

                  <p className="text-base mb-4">
                    {language === 'en' ? selectedAlert.message : selectedAlert.messageHi}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {selectedAlert.location}, {selectedAlert.district}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-time-line mr-2"></i>
                      {formatTimestamp(selectedAlert.timestamp)}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-group-line mr-2"></i>
                      {selectedAlert.affectedPopulation.toLocaleString()} {language === 'en' ? 'people affected' : 'लोग प्रभावित'}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-notification-3-line mr-2"></i>
                      Alert ID: {selectedAlert.id}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Delivery Channels */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {language === 'en' ? 'Delivery Channels' : 'वितरण चैनल'}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {selectedAlert.channels.map((channel) => (
                        <div key={channel} className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center">
                          <i className={`${channel === 'SMS' ? 'ri-message-2-line' :
                              channel === 'WhatsApp' ? 'ri-whatsapp-line' :
                                channel === 'Email' ? 'ri-mail-line' :
                                  channel === 'IVR' ? 'ri-phone-line' :
                                    'ri-notification-3-line'
                            } text-2xl text-teal-600 mb-1`}></i>
                          <p className="text-sm font-medium text-gray-900">{channel}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {language === 'en' ? 'Recommended Actions' : 'अनुशंसित कार्रवाई'}
                    </h3>
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4">
                      <ul className="space-y-3">
                        {(language === 'en' ? selectedAlert.recommendedActions : selectedAlert.recommendedActionsHi).map((action, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                              <span className="text-xs font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-gray-900">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      {language === 'en' ? 'Acknowledge Alert' : 'चेतावनी स्वीकार करें'}
                    </button>
                    <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                      <i className="ri-share-line mr-2"></i>
                      {language === 'en' ? 'Share Alert' : 'चेतावनी साझा करें'}
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap">
                      <i className="ri-download-line mr-2"></i>
                      {language === 'en' ? 'Download' : 'डाउनलोड'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}