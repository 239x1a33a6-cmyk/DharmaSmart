import { useState } from 'react';

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [_selectedResource, _setSelectedResource] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: 'ri-apps-line' },
    { id: 'hygiene', label: 'Hygiene', icon: 'ri-hand-sanitizer-line' },
    { id: 'water', label: 'Water Safety', icon: 'ri-drop-line' },
    { id: 'prevention', label: 'Prevention', icon: 'ri-shield-check-line' },
    { id: 'firstaid', label: 'First Aid', icon: 'ri-first-aid-kit-line' },
  ];

  const resources = [
    {
      type: 'video',
      title: 'Hand Washing Techniques',
      titleHindi: 'हाथ धोने की तकनीक',
      duration: '2:30',
      views: '12.4K',
      downloads: 3240,
      languages: ['English', 'Hindi', 'Assamese'],
      category: 'hygiene',
      thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300', // Hand cleaning
    },
    {
      type: 'video',
      title: 'Water Purification Methods',
      titleHindi: 'जल शुद्धिकरण विधियाँ',
      duration: '4:15',
      views: '18.2K',
      downloads: 4820,
      languages: ['English', 'Hindi', 'Bengali'],
      category: 'water',
      thumbnail: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=400&h=300', // Water boiling/safe
    },
    {
      type: 'infographic',
      title: 'Cholera Prevention Guide',
      titleHindi: 'हैजा रोकथाम गाइड',
      downloads: 8500,
      languages: ['English', 'Hindi', 'Assamese', 'Bengali'],
      category: 'prevention',
      thumbnail: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?auto=format&fit=crop&q=80&w=400&h=500', // Prevention/Shield
    },
    {
      type: 'audio',
      title: 'Recognizing Dehydration Symptoms',
      titleHindi: 'निर्जलीकरण के लक्षण पहचानना',
      duration: '3:45',
      plays: '6.8K',
      downloads: 2140,
      languages: ['Hindi', 'Assamese', 'Manipuri'],
      category: 'firstaid',
      thumbnail: 'https://readdy.ai/api/search-image?query=audio%20waveform%20visualization%20with%20medical%20icons%20dehydration%20symptoms%20illustration%20colorful%20gradient%20background%20modern%20design%20health%20education%20audio%20content%20visual&width=400&height=300&seq=edu-audio-001&orientation=landscape',
    },
    {
      type: 'video',
      title: 'Safe Food Handling Practices',
      titleHindi: 'सुरक्षित भोजन संभालने के तरीके',
      duration: '5:20',
      views: '15.6K',
      downloads: 3980,
      languages: ['English', 'Hindi', 'Bengali'],
      category: 'hygiene',
      thumbnail: 'https://images.unsplash.com/photo-1466632346940-990b035d250c?auto=format&fit=crop&q=80&w=400&h=300', // Food safety
    },
    {
      type: 'infographic',
      title: 'When to Seek Medical Care',
      titleHindi: 'चिकित्सा सहायता कब लें',
      downloads: 11200,
      languages: ['English', 'Hindi', 'Assamese'],
      category: 'firstaid',
      thumbnail: 'https://readdy.ai/api/search-image?query=medical%20emergency%20decision%20flowchart%20infographic%20with%20warning%20signs%20symptoms%20icons%20colorful%20educational%20poster%20Indian%20healthcare%20context%20simple%20clear%20visual%20guide&width=400&height=500&seq=edu-medical-001&orientation=portrait',
    },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategory === 'all' || resource.category === selectedCategory) &&
      (selectedLanguage === 'all' || resource.languages.includes(selectedLanguage))
  );

  const handleResourceClick = (resource: any) => {
    _setSelectedResource(resource);
    // Track download/view
    // Resource access tracked
  };

  const handleFeedbackSubmit = () => {
    setShowFeedbackModal(false);
    // Show success message
    alert('Thank you for your feedback! Your input helps improve our AI predictions.');
  };

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-4 gap-8 opacity-20 transform -rotate-12 scale-150">
              <i className="ri-heart-pulse-line text-8xl"></i>
              <i className="ri-shield-cross-line text-8xl"></i>
              <i className="ri-microscope-line text-8xl"></i>
              <i className="ri-capsule-line text-8xl"></i>
              <i className="ri-medicine-bottle-line text-8xl"></i>
              <i className="ri-nurse-line text-8xl"></i>
              <i className="ri-government-line text-8xl"></i>
              <i className="ri-hospital-line text-8xl"></i>
            </div>
          </div>
          <div className="relative text-center py-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
              स्वास्थ्य शिक्षा केंद्र
            </h2>
            <p className="text-2xl font-heading text-gray-700">Community Education Hub</p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multilingual health education resources in video, audio, and visual formats
            </p>

            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search health topics... (स्वास्थ्य विषय खोजें...)"
                  className="w-full px-6 py-4 pr-32 border-2 border-primary/20 rounded-full focus:border-primary focus:outline-none text-lg shadow-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer">
                  <i className="ri-search-line"></i>
                  <span>Search</span>
                </button>
                <button className="absolute right-24 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <i className="ri-mic-line text-primary text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                }`}
            >
              <i className={`${category.icon} text-lg`}></i>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-600">Filter by:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Assamese">অসমীয়া (Assamese)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Manipuri">মৈতৈলোন্ (Manipuri)</option>
              <option value="Bodo">बड़ो (Bodo)</option>
              <option value="Mizo">Mizo ṭawng</option>
              <option value="Nagamese">Nagamese</option>
            </select>
            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none cursor-pointer">
              <option>All Formats</option>
              <option>Videos</option>
              <option>Infographics</option>
              <option>Audio</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            <strong>{filteredResources.length}</strong> resources found
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((resource, idx) => (
            <div
              key={idx}
              onClick={() => handleResourceClick(resource)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-navy/80 backdrop-blur-sm text-white rounded-full text-xs font-semibold flex items-center space-x-1 whitespace-nowrap">
                  <i
                    className={`${resource.type === 'video'
                      ? 'ri-play-circle-line'
                      : resource.type === 'audio'
                        ? 'ri-volume-up-line'
                        : 'ri-file-text-line'
                      }`}
                  ></i>
                  <span className="capitalize">{resource.type}</span>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center space-x-1">
                  <i className="ri-download-line text-primary"></i>
                  <span>{resource.downloads}</span>
                </div>
                {resource.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <i className="ri-play-fill text-3xl text-primary"></i>
                    </div>
                  </div>
                )}
                {resource.type === 'audio' && (
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
                    <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                      <i className="ri-play-fill text-white"></i>
                    </button>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-1 bg-primary rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-heading font-bold text-navy mb-1 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.titleHindi}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.languages.map((lang, langIdx) => (
                    <span
                      key={langIdx}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium whitespace-nowrap"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  {resource.type === 'video' && (
                    <>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <i className="ri-time-line"></i>
                        <span>{resource.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <i className="ri-eye-line"></i>
                        <span>{resource.views}</span>
                      </div>
                    </>
                  )}
                  {resource.type === 'audio' && (
                    <>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <i className="ri-time-line"></i>
                        <span>{resource.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <i className="ri-headphone-line"></i>
                        <span>{resource.plays}</span>
                      </div>
                    </>
                  )}
                  {resource.type === 'infographic' && (
                    <>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <i className="ri-download-line"></i>
                        <span>{resource.downloads}</span>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap cursor-pointer">
                        Download PDF
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <button className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all whitespace-nowrap cursor-pointer">
            Load More Resources
            <i className="ri-arrow-down-line ml-2"></i>
          </button>
        </div>

        {/* Feedback Collection Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-12 border-2 border-primary/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border-2 border-primary/20">
                <i className="ri-feedback-line text-primary"></i>
                <span className="text-sm font-semibold text-gray-700">Help Us Improve</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-navy">
                Share Your Experience
              </h3>
              <p className="text-lg text-gray-600">
                Your feedback helps improve our AI predictions and educational content. Report confirmed cases, outcomes, and suggestions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-line text-primary text-sm"></i>
                  </div>
                  <span className="text-gray-700">Report confirmed disease outcomes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-line text-primary text-sm"></i>
                  </div>
                  <span className="text-gray-700">Rate educational content effectiveness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-line text-primary text-sm"></i>
                  </div>
                  <span className="text-gray-700">Suggest improvements for AI model accuracy</span>
                </li>
              </ul>
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-chat-3-line"></i>
                <span>Submit Feedback</span>
              </button>
            </div>
            <div className="relative aspect-video bg-white/50 backdrop-blur-md rounded-2xl border-2 border-primary/20 flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <i className="ri-message-3-line text-5xl text-primary"></i>
                </div>
                <p className="font-heading font-bold text-navy">Vector Participation View</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400/30"></div>
                  <div className="w-8 h-8 rounded-full bg-teal-400/30"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-400/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-feedback-line text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold">Community Feedback</h3>
                    <p className="text-sm text-white/80">Help improve our AI predictions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none cursor-pointer">
                  <option>Confirmed Disease Outcome</option>
                  <option>Educational Content Rating</option>
                  <option>AI Prediction Accuracy</option>
                  <option>Water Quality Report</option>
                  <option>General Suggestion</option>
                </select>
              </div>

              {/* Outcome Confirmation */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-navy mb-3 flex items-center space-x-2">
                  <i className="ri-hospital-line text-blue-600"></i>
                  <span>Confirmed Outcome (Optional)</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Disease Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none cursor-pointer">
                      <option>Select disease</option>
                      <option>Diarrhea</option>
                      <option>Cholera</option>
                      <option>Typhoid</option>
                      <option>Hepatitis A</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Laboratory Confirmed?</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none cursor-pointer">
                      <option>Yes - Lab Confirmed</option>
                      <option>No - Clinical Diagnosis</option>
                      <option>Suspected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* AI Prediction Accuracy */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Was the AI prediction accurate?
                </label>
                <div className="flex space-x-3">
                  {['Very Accurate', 'Accurate', 'Somewhat', 'Inaccurate'].map((rating) => (
                    <button
                      key={rating}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium cursor-pointer"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Educational Content Helpfulness
                </label>
                <div className="flex items-center justify-between px-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                    >
                      <i className="ri-star-line text-3xl text-yellow-400 hover:ri-star-fill"></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Feedback */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Share your experience, suggestions, or confirmed outcomes..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Village/Ward</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                  <input
                    type="text"
                    placeholder="Enter district"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Contact (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">For follow-up verification only</p>
              </div>

              {/* AI Retraining Notice */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-brain-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">AI Model Improvement</h4>
                  <p className="text-sm text-green-700">
                    Your feedback will be used to retrain our AI models, improving prediction accuracy for future outbreaks. All data is anonymized and secure.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer group">
          <i className="ri-question-line text-2xl group-hover:hidden"></i>
          <i className="ri-customer-service-2-line text-2xl hidden group-hover:block"></i>
        </button>
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-3 text-sm font-semibold text-navy whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask Health Assistant
        </div>
      </div>
    </section>
  );
}
