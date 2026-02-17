import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
}

export default function ChatbotPage() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Hello! I am your AI Health Assistant. How can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Simulate AI response logic
        await new Promise(resolve => setTimeout(resolve, 1000));

        let botResponse = "I'm not sure about that. I can help you report symptoms, explain alerts, or provide preventive steps for water-borne diseases.";

        const lowInput = input.toLowerCase();
        if (lowInput.includes('report') || lowInput.includes('symptom')) {
            botResponse = "I can guide you through reporting symptoms. Would you like to start a health report now? You can click the 'Report Health Symptoms' button on your dashboard.";
        } else if (lowInput.includes('alert') || lowInput.includes('warning')) {
            botResponse = "Alerts are patterns detected by our system to warn you about potential health risks in your area. You should check the 'Local Alerts' section for specific instructions.";
        } else if (lowInput.includes('water') || lowInput.includes('clean') || lowInput.includes('boil')) {
            botResponse = "To prevent water-borne diseases, always drink boiled or filtered water. If you notice any issues with your water source, please use the 'Report Water Issue' feature.";
        } else if (lowInput.includes('medicine') || lowInput.includes('treatment') || lowInput.includes('cure')) {
            botResponse = "I cannot prescribe medicines or diagnose diseases. Please consult a qualified doctor for medical advice. In case of emergency, visit your nearest Public Health Centre.";
        }

        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse }]);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden">
            <header className="bg-white border-b border-gray-100 py-6 px-8 flex items-center space-x-4 flex-shrink-0">
                <button onClick={() => navigate('/community/dashboard')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <i className="ri-arrow-left-line text-navy text-xl"></i>
                </button>
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <i className="ri-robot-line text-2xl"></i>
                    </div>
                    <div>
                        <h1 className="text-navy font-bold text-lg">AI Health Assistant</h1>
                        <div className="flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Always Online</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6" ref={scrollRef}>
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${m.type === 'user' ? 'bg-primary text-white font-semibold' : 'bg-white border border-gray-100 text-navy'}`}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex space-x-2">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 bg-white border-t border-gray-100 flex-shrink-0">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50 mb-4">
                        <div className="flex items-start space-x-3">
                            <i className="ri-information-line text-blue-500 text-sm mt-0.5"></i>
                            <p className="text-[10px] text-blue-700/60 font-medium italic">
                                Disclaimer: I am an AI assistant for informational purposes only. I cannot diagnose diseases, prescribe medicines, or replace official medical consultation. If you are feeling very unwell, please visit a doctor immediately.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about symptoms, alerts, or prevention..."
                            className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium"
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center hover:bg-navy-dark transition-all shadow-lg active:scale-90 disabled:opacity-30"
                        >
                            <i className="ri-send-plane-2-fill text-lg"></i>
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {['How to report symptoms?', 'What does an alert mean?', 'Water purification tips', 'Nearby health centres'].map(q => (
                            <button
                                key={q}
                                onClick={() => setInput(q)}
                                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-[10px] font-bold text-gray-500 rounded-lg transition-colors border border-gray-100"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
