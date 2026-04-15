'use client';

/**
 * 🤖 CHAT WIDGET - Barista Bot pentru Vibe Caffè
 *
 * Componenta principală a chatbot-ului:
 * - Floating button (colț dreapta jos)
 * - Chat window cu mesaje
 * - Input pentru mesaje noi
 * - Typing indicator
 * - Quick replies
 */

import { useState, useRef, useEffect } from 'react';

// Randeaza markdown simplu: **bold**, *italic*, \n => <br>
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part === '\n') {
      return <br key={i} />;
    }
    return <span key={i}>{part}</span>;
  });
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}

export default function ChatWidget() {
  // 📊 STATE MANAGEMENT
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salut! Sunt Vibe, asistentul tău virtual. Cu ce te pot ajuta astăzi?',
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ['Vreau cafea!', 'Fac o rezervare', 'Văd meniul', 'Info despre voi'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 📜 AUTO-SCROLL LA MESAJE NOI
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 📝 TRIMITE MESAJ
  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Adaugă mesajul utilizatorului
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 🚀 API CALL către OpenAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botResponse: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        // Nu mai afișăm quick replies după mesajul inițial
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);

      // Fallback error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Ups, ceva nu a mers. Încearcă din nou! 😊',
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ['Încearcă din nou', 'Vezi meniul', 'Contact'],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🎯 HANDLE QUICK REPLY CLICK
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  // ⌨️ HANDLE KEY PRESS
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 💬 CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Vibe</h3>
                <p className="text-sm text-white/80">Asistent virtual • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message) => (
              <div key={message.id}>
                {/* MESSAGE BUBBLE */}
                <div
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[#14B8A6] text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{renderMarkdown(message.text)}</p>
                  </div>
                </div>

                {/* QUICK REPLIES (doar pentru mesajele bot-ului) */}
                {message.sender === 'bot' && message.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-2">
                    {message.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border-2 border-[#14B8A6] text-[#14B8A6] dark:text-[#14B8A6] rounded-full text-sm font-semibold hover:bg-[#14B8A6] hover:text-white transition-all duration-300"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT CONTAINER */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrie un mesaj..."
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-[#14B8A6] focus:outline-none text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-[#14B8A6] hover:bg-[#0D9488] disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔘 FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-3xl ${
          !isOpen ? 'animate-pulse' : ''
        }`}
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        )}
      </button>

      {/* NOTIFICATION BADGE (opțional - pentru mesaje noi) */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#F97316] text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
          1
        </div>
      )}
    </div>
  );
}
