import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const QuickAiEntry: React.FC = () => {
  const { setActiveTab } = useApp();

  const handlePromptClick = () => {
    setActiveTab('aichat');
  };

  return (
    <div className="bg-emerald-950 text-white border border-emerald-800 rounded-2xl p-6 shadow-md relative overflow-hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">ASK CLIMATECHECK AI</h3>
            <p className="text-xs text-emerald-200">Contextual answers on weather, water, crops, & mandi prices</p>
          </div>
        </div>

        <button
          onClick={handlePromptClick}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open AI Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-[10px] uppercase font-bold text-emerald-300 shrink-0 tracking-wider">Suggested Questions:</span>
        <button
          onClick={handlePromptClick}
          className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-800 hover:border-emerald-500 text-emerald-100 text-xs transition-all"
        >
          Will rain affect my crop?
        </button>
        <button
          onClick={handlePromptClick}
          className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-800 hover:border-emerald-500 text-emerald-100 text-xs transition-all"
        >
          Should I irrigate today?
        </button>
        <button
          onClick={handlePromptClick}
          className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-800 hover:border-emerald-500 text-emerald-100 text-xs transition-all"
        >
          What should I grow this season?
        </button>
        <button
          onClick={handlePromptClick}
          className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-800 hover:border-emerald-500 text-emerald-100 text-xs transition-all"
        >
          What is the current rice price shown here?
        </button>
      </div>
    </div>
  );
};
