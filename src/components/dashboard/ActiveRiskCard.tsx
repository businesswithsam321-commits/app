import React from 'react';
import { useApp } from '../../context/AppContext';
import { Info, ArrowRight, ShieldAlert } from 'lucide-react';

export const ActiveRiskCard: React.FC = () => {
  const { weatherRisks, setActiveTab } = useApp();

  const topRisk = weatherRisks[0];

  if (!topRisk) {
    return (
      <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
            ✓
          </div>
          <div>
            <h3 className="font-bold text-emerald-950 font-display">No Major Weather Risks Detected</h3>
            <p className="text-xs text-stone-600">Current forecast parameters remain within normal operating thresholds.</p>
          </div>
        </div>
        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded font-semibold uppercase tracking-wider">
          ClimateCheck Risk Indicator
        </span>
      </div>
    );
  }

  const isHigh = topRisk.severity === 'High';
  const isModerate = topRisk.severity === 'Moderate';

  return (
    <div className={`bg-white rounded-2xl p-5 md:p-6 shadow-xs border-2 relative space-y-4 ${
      isHigh ? 'border-rose-300 bg-rose-50/20' : isModerate ? 'border-amber-300 bg-amber-50/30' : 'border-blue-300 bg-blue-50/30'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            isHigh ? 'bg-rose-100 text-rose-900 border border-rose-300' :
            isModerate ? 'bg-amber-100 text-amber-900 border border-amber-300' :
            'bg-blue-100 text-blue-900 border border-blue-200'
          }`}>
            {topRisk.severity} Risk
          </span>
          <span className="text-xs text-stone-500">•</span>
          <span className="text-xs text-stone-500 font-medium">ClimateCheck Risk Indicator</span>
        </div>

        <button
          onClick={() => setActiveTab('alerts')}
          className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
        >
          <span>View All Risks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-emerald-950 font-display flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${isHigh ? 'text-rose-700' : isModerate ? 'text-amber-700' : 'text-blue-700'}`} />
          {topRisk.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 mt-1">
          "{topRisk.message}"
        </p>
      </div>

      {/* Why Section */}
      <div className="p-3.5 bg-stone-100/90 border border-stone-300 rounded-xl space-y-1 text-xs text-stone-800">
        <div className="font-bold text-emerald-950 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-emerald-800 shrink-0" />
          Why this alert is triggered:
        </div>
        <div className="text-stone-700 pl-5">
          {topRisk.triggerReason}
        </div>
      </div>

      {/* Recommended Action */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-stone-800">
          <strong className="text-emerald-950">Recommended Action:</strong> "{topRisk.recommendedAction}"
        </div>
        <button
          onClick={() => setActiveTab('aichat')}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-900 text-white font-medium hover:bg-emerald-950 transition-colors flex items-center justify-center gap-1.5 shadow-xs text-xs"
        >
          <span>Ask AI for Steps</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
