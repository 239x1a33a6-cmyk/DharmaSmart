import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function EducationPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const categories = ['Water Safety', 'Sanitation', 'Seasonal Disease', 'Emergency Care'];
    const [activeCategory, setActiveCategory] = useState('Water Safety');

    const content = [
        {
            id: 'e1',
            title: 'How to Sanitize Drinking Water at Home',
            category: 'Water Safety',
            type: 'Article + Video',
            duration: '5 mins',
            highlights: ['Boiling techniques', 'Safe storage', 'Filtering methods'],
            icon: 'ri-drop-line',
            popular: true
        },
        {
            id: 'e2',
            title: 'Identifying Early Symptoms of Cholera',
            category: 'Seasonal Disease',
            type: 'Infographic',
            duration: '3 mins',
            highlights: ['Key symptoms', 'Immediate actions', 'When to visit doctor'],
            icon: 'ri-virus-line',
            popular: true
        },
        {
            id: 'e3',
            title: 'Proper Hand Washing Techniques',
            category: 'Sanitation',
            type: 'Audio Guide',
            duration: '2 mins',
            highlights: ['Steps for kids', 'When to wash', 'Soap vs Sanitizer'],
            icon: 'ri-hand-sanitizer-line'
        },
        {
            id: 'e4',
            title: 'ORS Preparation & Usage Guide',
            category: 'Emergency Care',
            type: 'Video',
            duration: '4 mins',
            highlights: ['Home-made ORS', 'Feeding babies', 'Dehydration signs'],
            icon: 'ri-heart-pulse-line'
        }
    ];

    const filteredContent = content.filter(c => c.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-100 py-6 px-8 flex items-center space-x-4 sticky top-0 z-10">
                <button onClick={() => navigate('/community/dashboard')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <i className="ri-arrow-left-line text-navy text-xl"></i>
                </button>
                <div>
                    <h1 className="text-navy font-bold text-xl">Learn & Prevent</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        Verified health resources for {user?.profile?.state}
                    </p>
                </div>
            </header>

            <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
                {/* Category Selector */}
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Seasonal Recommendation Card */}
                <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/20">
                                Seasonal Priority: Monsoon
                            </div>
                            <h2 className="text-2xl font-bold">Preventing Post-Rain Outbreaks</h2>
                            <p className="text-white/80 text-sm max-w-md">Early patterns show a risk of water-borne diseases in {user?.profile?.district}. Explore our priority guide on water safety.</p>
                        </div>
                        <button className="px-8 py-3 bg-white text-navy rounded-xl font-bold text-sm shadow-xl active:scale-[0.98] transition-all w-fit">
                            Start Priority Lesson
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredContent.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col cursor-pointer">
                            <div className="p-8 flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <i className={`${item.icon} text-3xl`}></i>
                                    </div>
                                    {item.popular && (
                                        <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Popular</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {item.highlights.map(h => (
                                        <span key={h} className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded text-[10px] font-semibold">{h}</span>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center"><i className="ri-play-circle-line mr-1 text-xs"></i> {item.type}</span>
                                    <span className="flex items-center"><i className="ri-time-line mr-1 text-xs"></i> {item.duration}</span>
                                </div>
                            </div>
                            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-navy">View Resource</span>
                                <i className="ri-arrow-right-line text-primary group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Multimedia Hub Simulation */}
                <div className="grid lg:grid-cols-3 gap-8 pt-8">
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-navy font-bold text-lg mb-6 flex items-center">
                            <i className="ri-video-line text-primary mr-2"></i>
                            Featured Video Guide
                        </h3>
                        <div className="aspect-video bg-navy rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-all">
                                    <i className="ri-play-fill text-3xl text-white"></i>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-[10px] font-bold text-white/60 mb-1 uppercase">Recommended for your area</p>
                                <h4 className="text-lg font-bold text-white leading-tight">Setting up a simple water filtration system at home</h4>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-navy font-bold text-lg mb-6 flex items-center">
                            <i className="ri-mic-line text-secondary mr-2"></i>
                            Audio Daily
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-navy shadow-sm">
                                            <i className="ri-play-mini-fill"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-navy">Health Update #{i}</p>
                                            <p className="text-[10px] text-gray-400">2:30 • {i}h ago</p>
                                        </div>
                                    </div>
                                    <i className="ri-download-line text-gray-300"></i>
                                </div>
                            ))}
                            <p className="text-[10px] text-gray-400 text-center italic mt-4">Available in 12 local languages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
