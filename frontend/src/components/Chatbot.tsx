import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your Health Assistant. I can help you with information about diseases, symptoms, prevention, water safety, and health reporting. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState({ width: 400, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const knowledgeBase: { [key: string]: string } = {
    // Diseases
    cholera: 'Cholera is an acute diarrheal infection caused by contaminated water or food. Symptoms include severe watery diarrhea, vomiting, and rapid dehydration. Treatment involves oral rehydration solution (ORS) and immediate medical attention. Prevention: drink boiled water, maintain hygiene, and wash hands frequently.',
    diarrhea: 'Diarrhea is characterized by loose, watery stools occurring more than three times a day. It can be caused by contaminated water, food, or infections. Stay hydrated with ORS, avoid solid foods initially, and seek medical help if it persists for more than 2 days or if you see blood in stool.',
    typhoid: 'Typhoid fever is caused by Salmonella typhi bacteria, spread through contaminated water and food. Symptoms include prolonged fever, weakness, stomach pain, headache, and loss of appetite. Treatment requires antibiotics. Prevention: drink safe water, eat cooked food, and get vaccinated.',
    hepatitis: 'Hepatitis A is a liver infection caused by contaminated food or water. Symptoms include jaundice (yellowing of skin/eyes), fatigue, nausea, and abdominal pain. It usually resolves on its own but requires rest and proper nutrition. Prevention: vaccination, safe water, and good hygiene.',
    
    // Symptoms
    fever: 'Fever is a body temperature above 100.4°F (38°C). It\'s often a sign of infection. Stay hydrated, rest, and take fever-reducing medication if needed. Seek medical attention if fever exceeds 103°F, lasts more than 3 days, or is accompanied by severe symptoms.',
    vomiting: 'Vomiting can be caused by infections, food poisoning, or other conditions. Stay hydrated with small sips of water or ORS. Avoid solid foods until vomiting stops. Seek medical help if vomiting persists for more than 24 hours or if you see blood.',
    dehydration: 'Dehydration occurs when your body loses more fluids than it takes in. Signs include dry mouth, decreased urination, dizziness, and fatigue. Treatment: drink ORS or clean water frequently. Severe dehydration requires immediate medical attention.',
    
    // Prevention & Hygiene
    handwashing: 'Proper handwashing is crucial for preventing diseases. Wash hands with soap and water for at least 20 seconds, especially before eating, after using the toilet, and after touching animals. If soap is unavailable, use ash or sand as alternatives.',
    water: 'Safe drinking water is essential. Always boil water for at least 1 minute before drinking. Store water in clean, covered containers. Avoid drinking from unknown sources. If boiling isn\'t possible, use water purification tablets or filters.',
    hygiene: 'Good hygiene practices include: washing hands regularly, keeping food covered, using clean utensils, disposing of waste properly, and maintaining clean surroundings. These practices prevent most water-borne and food-borne diseases.',
    
    // Reporting & Emergency
    report: 'To report symptoms: Go to the "Report Symptoms" page, fill in your symptoms, location, and severity. For water quality issues, use the "Water Safety Report" page. In emergencies, call your local health center or use the emergency helpline.',
    emergency: 'Seek immediate medical attention if you experience: severe dehydration, blood in stool/vomit, high fever (above 103°F), difficulty breathing, severe abdominal pain, or symptoms lasting more than 3 days. Call emergency services or visit the nearest health center.',
    alert: 'Health alerts are sent when disease risks are detected in your area. Check the "Alerts" page regularly. Follow all preventive measures mentioned in alerts. Share alerts with family and neighbors.',
    
    // Water Safety
    'water quality': 'Water quality indicators include: clarity (no turbidity), no unusual smell or taste, pH between 6.5-8.5, and absence of bacterial contamination. Report any changes in water quality immediately. Use the "Water Safety Report" feature.',
    'water source': 'Common water sources include wells, handpumps, rivers, and tanks. Each requires different safety measures. Wells and handpumps should be regularly tested and maintained. River water must always be boiled. Store water in clean containers.',
    
    // General Health
    ors: 'Oral Rehydration Solution (ORS) is a life-saving treatment for dehydration. Mix 1 liter of clean water with 6 teaspoons of sugar and 1/2 teaspoon of salt. Drink small amounts frequently. ORS packets are available at health centers.',
    vaccination: 'Vaccinations protect against many diseases including typhoid, hepatitis A, and cholera. Visit your nearest health center for vaccination schedules. Keep vaccination records updated. Vaccines are often free at government health centers.',
    nutrition: 'Good nutrition strengthens immunity. Eat a balanced diet with fruits, vegetables, grains, and proteins. Ensure children receive proper nutrition. Malnutrition increases disease risk. Seek help from ASHA workers for nutrition guidance.',
  };

  const quickReplies = [
    'What are cholera symptoms?',
    'How to prevent diarrhea?',
    'Water safety tips',
    'How to report symptoms?',
    'Emergency contacts',
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBestMatch = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Direct keyword matching
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }
    
    // Pattern matching for common questions
    if (lowerQuery.includes('symptom') && lowerQuery.includes('cholera')) {
      return knowledgeBase.cholera;
    }
    if (lowerQuery.includes('prevent') && (lowerQuery.includes('diarrhea') || lowerQuery.includes('disease'))) {
      return knowledgeBase.hygiene;
    }
    if (lowerQuery.includes('water') && (lowerQuery.includes('safe') || lowerQuery.includes('clean'))) {
      return knowledgeBase.water;
    }
    if (lowerQuery.includes('report') || lowerQuery.includes('submit')) {
      return knowledgeBase.report;
    }
    if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent') || lowerQuery.includes('help')) {
      return knowledgeBase.emergency;
    }
    if (lowerQuery.includes('hand') && lowerQuery.includes('wash')) {
      return knowledgeBase.handwashing;
    }
    
    // Default response
    return 'I can help you with information about:\n\n• Diseases: cholera, diarrhea, typhoid, hepatitis\n• Symptoms: fever, vomiting, dehydration\n• Prevention: handwashing, water safety, hygiene\n• Reporting: how to report symptoms and water issues\n• Emergency: when to seek immediate help\n\nPlease ask me about any of these topics!';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = findBestMatch(inputText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = Math.max(350, Math.min(600, window.innerWidth - e.clientX - 24));
      const newHeight = Math.max(400, Math.min(800, window.innerHeight - e.clientY - 24));
      
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (!isOpen) return null;

  return (
    <div
      ref={chatboxRef}
      className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
    >
      {/* Resize Handle */}
      <div
        className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-teal-500/20 transition-colors"
        onMouseDown={handleMouseDown}
      >
        <i className="ri-drag-move-line text-gray-400 text-xs"></i>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="ri-robot-line text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg">Health Assistant</h3>
            <p className="text-xs text-white/90">Online • Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'bg-white shadow-sm border border-gray-200'
                }`}
              >
                <p className={`text-sm whitespace-pre-line ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 bg-white border-t border-gray-200">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-gray-700 whitespace-nowrap transition-colors cursor-pointer"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-teal-500 focus:outline-none text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
