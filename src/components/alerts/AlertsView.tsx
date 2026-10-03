import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, ShieldAlert, CheckCircle, Info, ArrowRight } from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { weatherRisks, setActiveTab } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-10">
      <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              Early Warning System
            </span>
            <h2 className="text-2xl font-bold text-emerald-950 font-display mt-1 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              Active Weather Risk Advisories
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Rule-based deterministic warnings derived directly from Open-Meteo atmospheric readings
            </p>
          </div>

          <div className="text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-300">
            Active Alerts: <strong>{weatherRisks.length}</strong>
          </div>
        </div>

        {weatherRisks.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950 font-display">No Major Weather Risks Detected</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              No significant ClimateCheck risks detected for the current weather forecast window in your area.
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {weatherRisks.map((risk) => {
              const isHigh = risk.severity === 'High';
              const isModerate = risk.severity === 'Moderate';

              return (
                <div
                  key={risk.id}
                  className={`p-5 rounded-2xl border-2 space-y-3 shadow-xs ${
                    isHigh ? 'border-rose-300 bg-rose-50/30' : isModerate ? 'border-amber-300 bg-amber-50/40' : 'border-blue-200 bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isHigh ? 'bg-rose-100 text-rose-900 border border-rose-300' :
                        isModerate ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}>
                        {risk.severity} Risk
                      </span>
                      <span className="text-xs text-stone-500">•</span>
                      <span className="text-xs text-stone-600 font-semibold">{risk.category}</span>
                    </div>

                    <span className="text-[10px] text-stone-400 font-mono">
                      ClimateCheck Risk Indicator
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-emerald-950 font-display flex items-center gap-2">
                    <ShieldAlert className={`w-5 h-5 ${isHigh ? 'text-rose-700' : isModerate ? 'text-amber-700' : 'text-blue-700'}`} />
                    {risk.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    "{risk.message}"
                  </p>

                  <div className="p-3 bg-white/80 border border-stone-200 rounded-xl space-y-1 text-xs">
                    <div className="font-bold text-emerald-950 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-emerald-800" />
                      Trigger explanation:
                    </div>
                    <div className="text-stone-700 pl-4">{risk.triggerReason}</div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-stone-200">
                    <div className="text-stone-800">
                      <strong className="text-emerald-950">Recommended Action:</strong> "{risk.recommendedAction}"
                    </div>

                    <button
                      onClick={() => setActiveTab('aichat')}
                      className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-900 text-white font-medium hover:bg-emerald-950 transition-colors flex items-center justify-center gap-1.5 text-xs shadow-xs"
                    >
                      <span>Ask AI Assistance</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
