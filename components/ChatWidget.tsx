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
import { useSpeechRecognition } from '@/lib/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';

function createMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Randeaza markdown: **bold**, *italic*, [text](url), \n => <br>
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    // Link markdown: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="underline font-semibold hover:opacity-80 transition-opacity"
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkMatch[1]}
        </a>
      );
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

// Detectează quick replies contextuale pe baza răspunsului botului
function getContextualReplies(responseText: string): string[] | undefined {
  const lower = responseText.toLowerCase();

  if (
    lower.includes('meniu') ||
    lower.includes('cafea') ||
    lower.includes('cappuccino') ||
    lower.includes('espresso') ||
    lower.includes('produs') ||
    lower.includes('prețul') ||
    lower.includes('comandă')
  ) {
    return ['Opțiuni vegane', 'Deserturi', 'Cafea rece'];
  }

  if (lower.includes('rezervar') || lower.includes('rezervă') || lower.includes('masă')) {
    return ['Fă o rezervare', 'Program'];
  }

  return undefined;
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
      quickReplies: ['Vezi meniu', 'Recomandări', 'Rezervări', 'Program'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Dacă userul a scris manual, ascunde quick replies
  const [userTyped, setUserTyped] = useState(false);

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const {
    error: speechRecognitionError,
    isListening,
    isSupported: isSpeechRecognitionSupported,
    resetTranscript,
    startListening,
    stopListening,
    transcript,
  } = useSpeechRecognition();
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasListeningRef = useRef(false);

  // 🔊 HANDLE TEXT-TO-SPEECH
  const handleSpeak = (messageId: string, text: string) => {
    if (speakingId === messageId && isSpeaking) {
      stop();
      setSpeakingId(null);
    } else {
      setSpeakingId(messageId);
      // Chrome can be finicky when starting consecutive utterances; defer one tick.
      window.setTimeout(() => speak(text), 0);
    }
  };

  useEffect(() => {
    if (!isSpeaking) setSpeakingId(null);
  }, [isSpeaking]);

  useEffect(() => {
    if (!transcript) return;
    setInputValue(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!isOpen && isListening) {
      stopListening();
    }
  }, [isListening, isOpen, stopListening]);

  useEffect(() => {
    const justStoppedListening = wasListeningRef.current && !isListening;
    wasListeningRef.current = isListening;

    if (!justStoppedListening) return;

    const spokenMessage = transcript.trim();
    if (!spokenMessage) return;

    void handleSendMessage(spokenMessage);
    resetTranscript();
  }, [isListening, resetTranscript, transcript]);

  // 📜 AUTO-SCROLL LA MESAJE NOI
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 📝 TRIMITE MESAJ
  // isQuickReply=true înseamnă click pe buton (nu tastare manuală)
  const handleSendMessage = async (text?: string, isQuickReply = false) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Dacă userul a scris manual, activează flag-ul care ascunde quick replies
    if (!isQuickReply) {
      setUserTyped(true);
    }

    // Adaugă mesajul utilizatorului
    const userMessage: Message = {
      id: createMessageId(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 🚀 API CALL către Claude AI
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'Failed to get response');
      }

      // Calculează quick replies contextuale (doar dacă userul nu a scris manual)
      const contextReplies = (!isQuickReply ? undefined : getContextualReplies(data.response));

      const botResponse: Message = {
        id: createMessageId(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: contextReplies,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorText =
        error instanceof Error
          ? `Ups, ceva nu a mers: ${error.message}`
          : 'Ups, ceva nu a mers. Incearca din nou!';

      const errorMessage: Message = {
        id: createMessageId(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🎯 HANDLE QUICK REPLY CLICK
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply, true);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      return;
    }

    resetTranscript();
    startListening();
    inputRef.current?.focus();
  };

  // ⌨️ HANDLE KEY PRESS
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* 💬 CHAT WINDOW */}
      {isOpen && (
        <div className="
          mb-4 flex flex-col overflow-hidden shadow-2xl
          fixed inset-0 rounded-none
          sm:relative sm:inset-auto sm:w-[380px] sm:h-[600px] sm:rounded-2xl
          bg-white dark:bg-gray-900
          border border-gray-100 dark:border-gray-700
        ">
          {/* HEADER — gradient primar + font Plus Jakarta Sans */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight" style={{ fontFamily: 'var(--font-plus-jakarta-sans, sans-serif)' }}>
                  Vibe
                </h3>
                <p className="text-xs text-white/80 leading-tight">Asistent virtual • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => {
              const isLastBotMessage =
                message.sender === 'bot' && index === messages.length - 1;
              const showReplies =
                !userTyped &&
                isLastBotMessage &&
                message.quickReplies &&
                message.quickReplies.length > 0;

              return (
                <div key={message.id}>
                  {/* MESSAGE BUBBLE */}
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-[var(--primary)] text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-600'
                      }`}
                    >
                      {renderMarkdown(message.text)}
                    </div>
                  </div>

                  {/* BUTON ASCULTĂ — doar pentru mesajele bot, dacă browserul suportă TTS */}
                  {message.sender === 'bot' && isSupported && (
                    <div className="flex justify-start mt-1 ml-1">
                      <button
                        onClick={() => handleSpeak(message.id, message.text)}
                        title={speakingId === message.id && isSpeaking ? 'Oprește' : 'Ascultă'}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                          speakingId === message.id && isSpeaking
                            ? 'bg-[var(--primary)] text-white'
                            : 'text-gray-400 hover:text-[var(--primary)] hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {speakingId === message.id && isSpeaking ? (
                          <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          </svg>
                        )}
                        <span>{speakingId === message.id && isSpeaking ? 'Stop' : 'Ascultă'}</span>
                      </button>
                    </div>
                  )}

                  {/* QUICK REPLIES — doar ultimul mesaj bot, doar dacă userul n-a scris manual */}
                  {showReplies && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-1">
                      {message.quickReplies!.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 bg-white dark:bg-gray-800 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full text-xs font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce opacity-60" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce opacity-60" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce opacity-60" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT CONTAINER */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 shrink-0">
            {speechRecognitionError && (
              <p className="mb-2 px-1 text-xs text-red-500">{speechRecognitionError}</p>
            )}
            {isListening && (
              <p className="mb-2 px-1 text-xs text-[var(--primary)]">
                Ascult... cand te opresti, mesajul se trimite automat.
              </p>
            )}
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? 'Ascult...' : 'Scrie un mesaj...'}
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-[var(--primary)] focus:outline-none text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
              />
              {isSpeechRecognitionSupported && (
                <button
                  onClick={handleMicClick}
                  type="button"
                  title={isListening ? 'Opreste dictarea' : 'Porneste dictarea'}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[var(--primary)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3zm5-3a1 1 0 112 0 7 7 0 01-6 6.92V21h2a1 1 0 110 2H9a1 1 0 010-2h2v-3.08A7 7 0 015 11a1 1 0 112 0 5 5 0 0010 0z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔘 FLOATING BUTTON — culoarea primară, ascuns pe mobil când chat-ul e deschis */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </button>
      )}

      {/* NOTIFICATION BADGE */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--secondary)] text-white text-xs rounded-full flex items-center justify-center font-bold">
          1
        </div>
      )}
    </div>
  );
}
