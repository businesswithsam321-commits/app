import React from 'react';
import { Store, AlertCircle } from 'lucide-react';
import { DemoBanner } from '../common/DemoBanner';

export const MarketHeader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Agricultural Mandi Intelligence
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-display flex items-center gap-2">
              <Store className="w-7 h-7 text-emerald-800" />
              MARKET
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              DEMO DATA — NOT LIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Explore agricultural commodity prices and local market trends
          </p>
        </div>

        <div className="text-xs text-stone-600 bg-stone-200/60 px-3.5 py-2 rounded-xl border border-stone-300 self-start sm:self-auto">
          Demo Dataset Mode · <strong className="text-emerald-900">Replaceable Architecture</strong>
        </div>
      </div>

      <DemoBanner />
    </div>
  );
};
