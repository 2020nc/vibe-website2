'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from '@/lib/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

interface Message {
  id: string;
  text: string;
  fullText?: string;
  isStreaming?: boolean;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}

function createMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\n)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          className="font-semibold underline transition-opacity hover:opacity-80"
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }

    if (part === '\n') {
      return <br key={index} />;
    }

    return <span key={index}>{part}</span>;
  });
}

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

function trackAssistantEvent(eventName: string, details: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer?.push({ event: eventName, ...details });
  analyticsWindow.gtag?.('event', eventName, details);
}

function countRenderedWords(text: string) {
  return (text.match(/\S+\s*/g) ?? []).length;
}

export default function ChatWidget({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const chatPanelId = 'chat-widget-panel';
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salut! Sunt Vibe, asistentul tău virtual. Cu ce te pot ajuta astăzi?',
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ['Recomandă-mi o cafea', 'Vreau să rezerv', 'Program & locație', 'Oferte speciale'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userTyped, setUserTyped] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [pausedSpeech, setPausedSpeech] = useState<{ id: string; text: string } | null>(null);

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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastBotMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasListeningRef = useRef(false);
  const pausedSpeakRef = useRef<{ id: string; text: string } | null>(null);
  const shouldKeepBotMessagePinnedRef = useRef(false);

  const getSpeakableTextFromVisibleProgress = (message: Message) => {
    const fullText = message.fullText ?? message.text;

    if (!message.isStreaming) {
      return fullText;
    }

    const renderedWordCount = countRenderedWords(message.text);
    const tokens = fullText.match(/\S+\s*/g) ?? [fullText];
    const remainingText = tokens.slice(renderedWordCount).join('').trim();

    return remainingText || fullText;
  };

  const handleSpeak = (messageId: string, text: string) => {
    if (speakingId === messageId && isSpeaking) {
      stop();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(messageId);
    setPausedSpeech(null);
    window.setTimeout(() => speak(text), 0);
  };

  useEffect(() => {
    if (!isSpeaking) {
      setSpeakingId(null);
    }
  }, [isSpeaking]);

  useEffect(() => {
    if (isOpen || !isSpeaking || !speakingId) return;

    const message = messages.find((item) => item.id === speakingId);
    if (message) {
      pausedSpeakRef.current = { id: message.id, text: message.text };
      setPausedSpeech({ id: message.id, text: message.text });
    }

    stop();
    setSpeakingId(null);
  }, [isOpen, isSpeaking, messages, speakingId, stop]);

  useEffect(() => {
    if (!transcript) return;
    setInputValue(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!isOpen) return;
    trackAssistantEvent('assistant_opened');
  }, [isOpen]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getOffsetTopWithinContainer = (element: HTMLElement, container: HTMLElement) => {
    let offsetTop = 0;
    let current: HTMLElement | null = element;

    while (current && current !== container) {
      offsetTop += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }

    return offsetTop;
  };

  const scrollLastBotMessageToTop = () => {
    const container = messagesContainerRef.current;
    const lastBotMessage = lastBotMessageRef.current;

    if (!container || !lastBotMessage) return;

    const topOffset = Math.max(getOffsetTopWithinContainer(lastBotMessage, container) - 12, 0);
    container.scrollTo({ top: topOffset, behavior: 'auto' });
  };

  useLayoutEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (lastMessage.sender === 'bot') {
      shouldKeepBotMessagePinnedRef.current = true;
      const frameId = window.requestAnimationFrame(() => {
        scrollLastBotMessageToTop();
        window.setTimeout(scrollLastBotMessageToTop, 0);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    shouldKeepBotMessagePinnedRef.current = false;
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isTyping) return;
    if (shouldKeepBotMessagePinnedRef.current) return;

    const frameId = window.requestAnimationFrame(() => {
      scrollToBottom();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isTyping]);

  useEffect(() => {
    const streamingMessage = [...messages]
      .reverse()
      .find((message) => message.sender === 'bot' && message.isStreaming && message.fullText);

    if (!streamingMessage || !streamingMessage.fullText) {
      return;
    }

    const tokens = streamingMessage.fullText.match(/\S+\s*/g) ?? [streamingMessage.fullText];
    const currentText = streamingMessage.text;
    const currentTokenCount = currentText ? (currentText.match(/\S+\s*/g) ?? []).length : 0;

    if (currentTokenCount >= tokens.length) {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === streamingMessage.id
            ? {
                ...message,
                text: message.fullText ?? message.text,
                isStreaming: false,
              }
            : message
        )
      );
      setIsTyping(false);
      return;
    }

    const nextTokenCount = Math.min(currentTokenCount + 1, tokens.length);
    const nextText = tokens.slice(0, nextTokenCount).join('');
    const nextToken = tokens[nextTokenCount - 1] ?? '';
    const delay = /[.!?]\s*$/.test(nextToken) ? 420 : /[,;:]\s*$/.test(nextToken) ? 260 : 145;

    const timeoutId = window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === streamingMessage.id
            ? {
                ...message,
                text: nextText,
                isStreaming: nextTokenCount < tokens.length,
              }
            : message
        )
      );

      if (nextTokenCount >= tokens.length) {
        setIsTyping(false);
      }
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [messages]);

  useEffect(() => {
    if (!shouldKeepBotMessagePinnedRef.current) {
      return;
    }

    const container = messagesContainerRef.current;
    const lastBotMessage = lastBotMessageRef.current;

    if (!container || !lastBotMessage || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      scrollLastBotMessageToTop();
    });

    observer.observe(lastBotMessage);

    return () => {
      observer.disconnect();
    };
  }, [messages]);

  const handleSendMessage = async (text?: string, isQuickReply = false) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    if (!isQuickReply) {
      setUserTyped(true);
    }

    const userMessage: Message = {
      id: createMessageId(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    trackAssistantEvent('assistant_message_sent', {
      source: isQuickReply ? 'quick_reply' : 'manual_or_voice',
      prompt: messageText,
    });

    try {
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

      const contextReplies = !isQuickReply ? undefined : getContextualReplies(data.response);

      const botResponse: Message = {
        id: createMessageId(),
        text: '',
        fullText: data.response,
        isStreaming: true,
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
          : 'Ups, ceva nu a mers. Încearcă din nou!';

      const errorMessage: Message = {
        id: createMessageId(),
        text: '',
        fullText: errorText,
        isStreaming: true,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    trackAssistantEvent('assistant_quick_reply_clicked', { reply });
    void handleSendMessage(reply, true);
  };

  const handleMicClick = () => {
    if (isListening) {
      trackAssistantEvent('assistant_voice_stopped');
      stopListening();
      return;
    }

    resetTranscript();
    trackAssistantEvent('assistant_voice_started');
    startListening();
    inputRef.current?.focus();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          id={chatPanelId}
          role="dialog"
          aria-modal="false"
          aria-label="Asistentul virtual Vibe"
          className="
            fixed inset-0 mb-4 flex min-h-0 flex-col overflow-hidden rounded-none border border-gray-100
            bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900
            sm:relative sm:inset-auto sm:h-[calc(100vh-8.5rem)] sm:max-h-[600px] sm:w-[380px] sm:rounded-2xl
          "
        >
          <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-base font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans, sans-serif)' }}
                >
                  Vibe
                </h3>
                <p className="text-xs leading-tight text-white/80">Asistent virtual • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Închide chatul"
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-800"
            style={{ overflowAnchor: 'none' }}
          >
            {messages.map((message, index) => {
              const isLastBotMessage = message.sender === 'bot' && index === messages.length - 1;
              const showReplies =
                !userTyped &&
                isLastBotMessage &&
                !message.isStreaming &&
                message.quickReplies &&
                message.quickReplies.length > 0;

              return (
                <div key={message.id} className="scroll-mt-3">
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      ref={isLastBotMessage ? lastBotMessageRef : null}
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'rounded-br-sm bg-[var(--primary)] text-white'
                          : 'rounded-bl-sm border border-gray-100 bg-white text-gray-800 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                      }`}
                    >
                      {renderMarkdown(message.text)}
                      {message.isStreaming && <span className="ml-1 inline-block animate-pulse">|</span>}
                    </div>
                  </div>

                  {showReplies && (
                    <div className="ml-1 mt-2 flex flex-wrap gap-2">
                      {message.quickReplies!.map((reply, replyIndex) => (
                        <button
                          key={replyIndex}
                          onClick={() => handleQuickReply(reply)}
                          className="rounded-full border-2 border-[var(--primary)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--primary)] transition-all duration-200 hover:bg-[var(--primary)] hover:text-white dark:bg-gray-800"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-gray-600 dark:bg-gray-700">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] opacity-60" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] opacity-60" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] opacity-60" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="shrink-0 border-t border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            {isSupported && (() => {
              const lastBot = [...messages].reverse().find((message) => message.sender === 'bot');
              if (!lastBot) return null;

              const active = speakingId === lastBot.id && isSpeaking;
              const wasPaused = !active && pausedSpeech?.id === lastBot.id;

              return (
                <div className="mb-2 flex justify-start">
                  <button
                    onClick={() => {
                      if (wasPaused) setPausedSpeech(null);
                      handleSpeak(lastBot.id, getSpeakableTextFromVisibleProgress(lastBot));
                    }}
                    title={
                      active
                        ? 'Oprește'
                        : wasPaused
                          ? 'Ascultă din nou de la început'
                          : lastBot.isStreaming
                            ? 'Ascultă răspunsul în curs'
                            : 'Ascultă ultimul răspuns'
                    }
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                      active
                        ? 'bg-[var(--primary)] text-white'
                        : wasPaused
                          ? 'animate-pulse bg-[var(--secondary)] text-white'
                          : lastBot.isStreaming
                            ? 'border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/15'
                            : 'border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-[var(--primary)] dark:border-gray-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    {active ? (
                      <svg className="h-3.5 w-3.5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                    <span>
                      {active
                        ? 'Stop'
                        : wasPaused
                          ? '▶ Ascultă din nou'
                          : lastBot.isStreaming
                            ? 'Ascultă acum'
                            : 'Ascultă'}
                    </span>
                  </button>
                </div>
              );
            })()}

            {speechRecognitionError && (
              <p className="mb-2 px-1 text-xs text-red-500">{speechRecognitionError}</p>
            )}

            {isListening && (
              <p className="mb-2 px-1 text-xs text-[var(--primary)]">
                Ascult... când te oprești, mesajul se trimite automat.
              </p>
            )}

            {!isListening && !speechRecognitionError && isSpeechRecognitionSupported && (
              <p className="mb-2 overflow-hidden rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-2.5 py-1 text-[10px] font-medium whitespace-nowrap text-[var(--primary-dark)] text-ellipsis">
                🎤 Meniu · Rezervări · Program · Locație
              </p>
            )}

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? 'Ascult...' : 'Scrie un mesaj...'}
                className="flex-1 rounded-full border-2 border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
              />

              {isSpeechRecognitionSupported && (
                <button
                  onClick={handleMicClick}
                  type="button"
                  title={isListening ? 'Oprește dictarea' : 'Pornește dictarea'}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    isListening
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-[var(--primary)] hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3zm5-3a1 1 0 112 0 7 7 0 01-6 6.92V21h2a1 1 0 110 2H9a1 1 0 010-2h2v-3.08A7 7 0 015 11a1 1 0 112 0 5 5 0 0010 0z" />
                  </svg>
                </button>
              )}

              <button
                onClick={() => void handleSendMessage()}
                disabled={!inputValue.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition-all duration-200 hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Deschide asistentul virtual Vibe"
          aria-expanded={isOpen}
          aria-controls={chatPanelId}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </button>
      )}

      {!isOpen && (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-bold text-white">
          1
        </div>
      )}
    </div>
  );
}
