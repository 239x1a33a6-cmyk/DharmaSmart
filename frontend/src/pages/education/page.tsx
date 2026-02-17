import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/feature/PageHeader';

export default function EducationPage() {
  const _navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Topics', icon: 'ri-apps-line' },
    { id: 'hygiene', label: 'Hygiene', icon: 'ri-hand-sanitizer-line' },
    { id: 'water', label: 'Water Safety', icon: 'ri-drop-line' },
    { id: 'prevention', label: 'Prevention', icon: 'ri-shield-check-line' },
    { id: 'symptoms', label: 'Symptoms', icon: 'ri-thermometer-line' },
    { id: 'first-aid', label: 'First Aid', icon: 'ri-first-aid-kit-line' },
  ];

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'assamese', label: 'Assamese' },
    { id: 'bengali', label: 'Bengali' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Proper Hand Washing Technique',
      category: 'hygiene',
      type: 'Video',
      duration: '3 min',
      language: 'Hindi',
      icon: 'ri-video-line',
      color: 'bg-red-500',
      description: 'Learn the correct way to wash hands to prevent disease transmission',
      views: '12.5K',
    },
    {
      id: 2,
      title: 'Safe Drinking Water Practices',
      category: 'water',
      type: 'Audio',
      duration: '5 min',
      language: 'Assamese',
      icon: 'ri-volume-up-line',
      color: 'bg-blue-500',
      description: 'Essential tips for ensuring your drinking water is safe',
      views: '8.3K',
    },
    {
      id: 3,
      title: 'Recognizing Cholera Symptoms',
      category: 'symptoms',
      type: 'Infographic',
      duration: '2 min',
      language: 'English',
      icon: 'ri-image-line',
      color: 'bg-green-500',
      description: 'Visual guide to identifying early warning signs of cholera',
      views: '15.2K',
    },
    {
      id: 4,
      title: 'Food Safety and Hygiene',
      category: 'hygiene',
      type: 'Video',
      duration: '4 min',
      language: 'Hindi',
      icon: 'ri-video-line',
      color: 'bg-red-500',
      description: 'How to handle and prepare food safely to prevent contamination',
      views: '9.7K',
    },
    {
      id: 5,
      title: 'Water Purification Methods',
      category: 'water',
      type: 'Document',
      duration: '6 min',
      language: 'English',
      icon: 'ri-file-text-line',
      color: 'bg-purple-500',
      description: 'Simple home-based water purification techniques',
      views: '11.4K',
    },
    {
      id: 6,
      title: 'Preventing Diarrhea in Children',
      category: 'prevention',
      type: 'Video',
      duration: '5 min',
      language: 'Bengali',
      icon: 'ri-video-line',
      color: 'bg-red-500',
      description: 'Essential preventive measures for protecting children',
      views: '13.8K',
    },
    {
      id: 7,
      title: 'Dehydration First Aid',
      category: 'first-aid',
      type: 'Infographic',
      duration: '3 min',
      language: 'Hindi',
      icon: 'ri-image-line',
      color: 'bg-green-500',
      description: 'Quick guide to treating dehydration at home',
      views: '10.1K',
    },
    {
      id: 8,
      title: 'Community Sanitation Best Practices',
      category: 'hygiene',
      type: 'Audio',
      duration: '7 min',
      language: 'Assamese',
      icon: 'ri-volume-up-line',
      color: 'bg-blue-500',
      description: 'Maintaining clean and healthy community spaces',
      views: '7.6K',
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language.toLowerCase() === selectedLanguage;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <PageHeader
        title="Health Education & Resources"
        subtitle="Learn how to stay healthy and prevent diseases"
        backPath="/dashboard"
      />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    placeholder="Search resources..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === category.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <i className={`${category.icon} mr-2`}></i>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Filter */}
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredResources.length}</span> resources
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
              >
                <div className={`${resource.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <i className={`${resource.icon} text-3xl`}></i>
                    </div>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-white/90 text-sm">{resource.description}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      {resource.duration}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-eye-line mr-1"></i>
                      {resource.views}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                      {resource.language}
                    </span>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors group-hover:scale-105 cursor-pointer whitespace-nowrap">
                      <i className="ri-play-circle-line mr-2"></i>
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLanguage('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Emergency Contact */}
          <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-white/90 mb-4">Contact our 24/7 health helpline</p>
                <div className="flex items-center space-x-4">
                  <a
                    href="tel:1800-XXX-XXXX"
                    className="px-6 py-3 bg-white text-red-500 rounded-full font-semibold hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line mr-2"></i>
                    Call Now
                  </a>
                  <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-semibold hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-chat-3-line mr-2"></i>
                    Chat Support
                  </button>
                </div>
              </div>
              <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-customer-service-2-line text-6xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

