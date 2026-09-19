import React, { useState, useRef, useEffect } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  CornerDownLeft, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const { 
    isAssistantOpen, 
    toggleAssistant, 
    chatMessages, 
    sendChatMessage 
  } = useTraffic();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    'Which road has the highest traffic?',
    'What is the current traffic density?',
    'Are there any emergency vehicles?',
    'Which signal needs optimization?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;
    sendChatMessage(text);
    if (!textToSend) setInputVal('');
  };

  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen]);

  return (
    <>
      {/* REQUIREMENT 12: Floating AI Assistant Button in Bottom-Right Corner (🤖) */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isAssistantOpen && (
          <button
            onClick={toggleAssistant}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all"
            title="Open Traffic AI Assistant"
            aria-label="Open Traffic AI Assistant"
          >
            <span className="text-2xl select-none">🤖</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-slate-900 animate-pulse" />
          </button>
        )}
      </div>

      {/* Chatbot Panel Modal */}
      {isAssistantOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-96 max-w-[calc(100vw-2.5rem)] h-[520px] rounded-3xl glass-panel-glow border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-lg">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5 font-mono">
                  <span>Traffic AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">
                  ● Connected to City Digital Twin
                </span>
              </div>
            </div>

            <button
              onClick={toggleAssistant}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
              <HelpCircle className="w-3 h-3 text-cyan-400" /> Ask:
            </span>
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-[10px] font-medium transition shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      🤖
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      isAi
                        ? 'bg-slate-900/90 text-slate-200 border border-slate-800 shadow-md'
                        : 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-slate-950 font-semibold shadow-md'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 font-mono ${
                        isAi ? 'text-slate-500' : 'text-slate-900/80'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about traffic, signals, ambulance..."
                className="flex-1 bg-slate-950 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition disabled:opacity-40 disabled:hover:bg-cyan-500 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
