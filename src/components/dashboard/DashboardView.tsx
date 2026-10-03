import React from 'react';
import { LocationWeatherHeader } from './LocationWeatherHeader';
import { ActiveRiskCard } from './ActiveRiskCard';
import { ForecastCharts } from './ForecastCharts';
import { DashboardMarketCard } from './DashboardMarketCard';
import { QuickAiEntry } from './QuickAiEntry';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowRight } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-10">
      {/* 1. TOP: Location + Weather Summary */}
      <LocationWeatherHeader />

      {/* 2. SECOND: Weather Risk / Alerts */}
      <ActiveRiskCard />

      {/* 3. THIRD: Forecast Charts */}
      <ForecastCharts />

      {/* 4. FOURTH: Farm Context & Crop Recommendation Quick Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-800" />
                <div>
                  <h3 className="font-bold text-emerald-950 font-display text-base">CROP ADVICE PREVIEW</h3>
                  <p className="text-[11px] text-stone-500">Potentially suitable based on your current context</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('crops')}
                className="text-xs text-emerald-800 font-bold hover:underline"
              >
                View Advice →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="flex justify-between items-center font-bold text-emerald-950">
                  <span>Rice / Paddy (MTU 1010)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold">
                    Potentially suitable
                  </span>
                </div>
                <p className="text-stone-600 mt-1 text-[11px]">
                  Matches Kharif rainfall patterns (1000-1300mm). Loamy soil retains optimal moisture for tillering.
                </p>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="flex justify-between items-center font-bold text-emerald-950">
                  <span>Pigeon Pea / Arhar</span>
                  <span className="text-[10px] bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-semibold">
                    Consider
                  </span>
                </div>
                <p className="text-stone-600 mt-1 text-[11px]">
                  Deep taproot utilizes sub-surface moisture. Plant on elevated bunds alongside rice plots.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Agronomic suitability model</span>
            <button
              onClick={() => setActiveTab('crops')}
              className="text-emerald-800 font-bold flex items-center gap-1"
            >
              <span>Explore Crop Reasoning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. FIFTH: Market Summary Card */}
        <DashboardMarketCard />
      </div>

      {/* 6. SIXTH: Quick AI Entry */}
      <QuickAiEntry />
    </div>
  );
};
