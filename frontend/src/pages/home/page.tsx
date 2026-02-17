import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SystemComparison from './components/SystemComparison';
import SystemOverview from './components/SystemOverview';
import SystemWorkflow from './components/SystemWorkflow';
import UserRoles from './components/UserRoles';
import AlertSystem from './components/AlertSystem';
import Education from './components/Education';
import DataPrivacy from './components/DataPrivacy';
import Footer from './components/Footer';
import Chatbot from '../../components/Chatbot';

export default function HomePage() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemStatement />
      <SystemComparison />
      <SystemOverview />
      <SystemWorkflow />
      <UserRoles />
      <AlertSystem showAlert={false} onClose={() => { }} />
      <Education />
      <DataPrivacy />
      <Footer />

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all cursor-pointer whitespace-nowrap z-50"
      >
        <i className={`${showChatbot ? 'ri-close-line' : 'ri-chat-3-line'} text-2xl`}></i>
      </button>

      {/* Chatbot Window */}
      <Chatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  );
}
