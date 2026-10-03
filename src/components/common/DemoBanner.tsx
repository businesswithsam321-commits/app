import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DemoBannerProps {
  compact?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100/90 text-amber-900 border border-amber-300 shadow-xs">
        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
        <span>Demo market data — not live</span>
      </span>
    );
  }

  return (
    <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-amber-900 text-xs sm:text-sm">Demo market data — not live</div>
          <p className="text-amber-800 text-[11px] sm:text-xs">
            Prices displayed on this prototype are fictional demonstration records for UI validation. They do not represent live mandi quotes.
          </p>
        </div>
      </div>
      <span className="hidden sm:inline-block font-mono text-[10px] bg-amber-200/60 px-2 py-0.5 rounded text-amber-900 font-semibold uppercase tracking-wider shrink-0">
        Prototype Mode
      </span>
    </div>
  );
};
