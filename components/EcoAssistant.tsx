import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../services/geminiService';

export const EcoAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Ciao! I am your Eco-Guide for San Severo. Ask me about sustainable itineraries, local food, or history!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const answer = await askGemini(userMsg);
    
    setMessages(prev => [...prev, { sender: 'ai', text: answer }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col h-[500px] transition-all duration-300 transform origin-bottom-right">
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fas fa-leaf"></i>
              <span className="font-semibold">Eco-Guide Assistant</span>
            </div>
            <button onClick={toggleOpen} className="text-white hover:text-emerald-200">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white border border-stone-200 text-stone-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 text-stone-500 rounded-lg p-3 text-xs italic shadow-sm">
                  Thinking sustainably...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-stone-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about San Severo..."
                className="flex-1 border border-stone-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={toggleOpen}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-200 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-2xl animate-bounce-slow`}
        aria-label="Open Eco Assistant"
      >
        <i className="fas fa-robot"></i>
      </button>
    </div>
  );
};
