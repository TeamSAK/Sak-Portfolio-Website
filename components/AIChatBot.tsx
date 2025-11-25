import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToGemini, GeminiError } from '../services/geminiService';

const QUICK_PROMPTS = [
  "What are your core skills?",
  "Tell me about your experience",
  "Show me a cool project",
  "How can I hire you?"
];

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: "Hi there! I'm Sak's AI assistant. I can answer questions about his work, skills, and background. How can I help?",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const processMessage = async (text: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = {
      role: ChatRole.USER,
      text: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      
      const botMessage: ChatMessage = {
        role: ChatRole.MODEL,
        text: responseText,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error(error);
      let errorMessageText = "I encountered an error connecting to the neural network. Please try again.";

      if (error instanceof GeminiError) {
          switch (error.code) {
              case 'MISSING_API_KEY':
                  errorMessageText = "Deployment Error: API Key missing. If this is deployed on Vercel, please add 'VITE_API_KEY' or 'NEXT_PUBLIC_API_KEY' to your Environment Variables in Project Settings.";
                  break;
              case 'INVALID_API_KEY':
                  errorMessageText = "Authentication failed. The API key configured is invalid.";
                  break;
              case 'RATE_LIMIT':
                  errorMessageText = "I'm receiving too many messages right now. Please wait a moment before sending another.";
                  break;
              case 'SERVER_ERROR':
                  errorMessageText = "The AI service is currently unavailable. Please try again later.";
                  break;
              case 'CONNECTION_ERROR':
                  errorMessageText = "I'm having trouble connecting to the server. Please check your internet connection.";
                  break;
              case 'UNKNOWN':
              default:
                  errorMessageText = "I encountered an unexpected error. Please try again later.";
          }
      }

      const errorMessage: ChatMessage = {
        role: ChatRole.MODEL,
        text: errorMessageText,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processMessage(inputValue.trim());
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-primary/50 z-50 ${
          isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
        }`}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={32} fill="currentColor" className="opacity-90" />
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '3s' }}></span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[95vw] md:w-[420px] h-[600px] max-h-[85vh] bg-surface/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-20 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-1">
            <div className="bg-surface/10 backdrop-blur-md p-4 flex justify-between items-center rounded-t-[20px]">
                <div className="flex items-center gap-3 text-white">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Sparkles size={20} className="text-yellow-300" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white/10"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-base leading-tight">Sak's AI Assistant</h3>
                        <span className="text-[10px] font-medium opacity-80 bg-white/20 px-2 py-0.5 rounded-full">Powered by Gemini 2.5</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white/90 transition-colors"
                >
                    <ChevronDown size={24} />
                </button>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-black/20 scroll-smooth">
          
          <div className="text-center text-xs text-gray-400 my-4 uppercase tracking-widest font-medium opacity-50">
             Today
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-3 animate-fade-in-up ${
                msg.role === ChatRole.USER ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === ChatRole.USER
                    ? 'bg-gray-200 dark:bg-white/10'
                    : 'bg-gradient-to-br from-primary to-secondary'
                }`}
              >
                {msg.role === ChatRole.USER ? (
                  <User size={16} className="text-gray-600 dark:text-white" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] space-y-1`}>
                  <div
                    className={`px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === ChatRole.USER
                        ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                        : 'bg-surface border border-gray-200 dark:border-white/10 text-text rounded-2xl rounded-bl-sm'
                    } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' : ''}`}
                  >
                    {msg.text}
                  </div>
                  <span className={`text-[10px] text-gray-400 px-1 block ${msg.role === ChatRole.USER ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-end gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-sm">
                 <Bot size={16} className="text-white" />
              </div>
              <div className="bg-surface border border-gray-200 dark:border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts (Visible only if few messages) */}
        {!isLoading && messages.length < 3 && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide mask-linear-fade">
                {QUICK_PROMPTS.map((prompt, idx) => (
                    <button 
                        key={idx}
                        onClick={() => processMessage(prompt)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full bg-background border border-primary/20 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors flex-shrink-0 shadow-sm"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-surface border-t border-gray-200 dark:border-white/10">
          <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-background border border-gray-200 dark:border-white/10 text-text text-sm rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 p-2 bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all shadow-md transform active:scale-95 flex items-center justify-center"
            >
              <Send size={16} className={inputValue.trim() ? 'translate-x-0.5 translate-y-px' : ''} />
            </button>
          </form>
        </div>

        <style>{`
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fadeInUp 0.3s ease-out forwards;
            }
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
      </div>
    </>
  );
};

export default AIChatBot;