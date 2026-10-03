import React from 'react';
import { MarketSummary, MarketRecord } from '../../types/market';
import { TrendingUp, TrendingDown, Calendar, MapPin, AlertCircle, Info } from 'lucide-react';

interface PriceSummaryCardsProps {
  summary?: MarketSummary;
  selectedRecord?: MarketRecord;
}

export const PriceSummaryCards: React.FC<PriceSummaryCardsProps> = ({ summary, selectedRecord }) => {
  const record = selectedRecord || summary?.latestRecord;

  if (!record) return null;

  const priceChange = summary?.priceChange ?? 0;
  const percentageChange = summary?.percentageChange ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Modal Price */}
        <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">Demo Modal Price</span>
              <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-300">
                Demo
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-950 mt-1">
              ₹{record.modalPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-stone-500 ml-1">/{record.unit.split('/')[1] || 'quintal'}</span>
            </div>
            <div className="text-xs font-medium text-stone-700 mt-1">
              {record.commodity} ({record.variety})
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center gap-1.5 text-[11px]">
            {priceChange !== 0 ? (
              <span className={`font-semibold flex items-center gap-0.5 ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? `+₹${priceChange}` : `-₹${Math.abs(priceChange)}`} ({isPositive ? `+${percentageChange}%` : `${percentageChange}%`})
              </span>
            ) : (
              <span className="text-stone-500 font-medium">No price change</span>
            )}
            <span className="text-stone-400 text-[10px] truncate">(vs prev demo record)</span>
          </div>
        </div>

        {/* Card 2: Price Range */}
        <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">Demo Price Range</span>
              <span className="text-stone-400 text-[10px]">Daily Spread</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-emerald-950 mt-1">
              ₹{record.minPrice.toLocaleString('en-IN')} – ₹{record.maxPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Spread: ₹{(record.maxPrice - record.minPrice).toLocaleString('en-IN')} / quintal
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
            <span>Min / Max limits</span>
            <span className="text-amber-800 font-semibold text-[10px]">Demo Range</span>
          </div>
        </div>

        {/* Card 3: Market & District */}
        <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">Market & Location</span>
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <div className="text-lg font-bold font-display text-emerald-950 mt-1">
              {record.market}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              {record.district}, {record.state}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-200 text-[11px] text-stone-500">
            Selected District Center
          </div>
        </div>

        {/* Card 4: Date & Dataset Status */}
        <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">Latest Record Date</span>
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="text-lg font-bold font-display text-emerald-950 mt-1">
              {new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="text-xs text-stone-600 mt-0.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Demo dataset record</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-200 text-[11px] text-stone-500">
            dataType: <code className="text-stone-800 bg-stone-100 px-1 py-0.5 rounded font-mono">"demo"</code>
          </div>
        </div>
      </div>

      {/* Helper text explaining the numbers */}
      <div className="p-3 bg-stone-100/90 border border-stone-300 rounded-xl text-xs text-stone-700 flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-emerald-950">Understanding Demo Modal Price:</strong>
          <span className="ml-1">
            The demo modal price represents the most commonly reported transaction price for the selected commodity in the demonstration dataset. Because this application is currently using demonstration data, numbers do not reflect live government mandi transactions.
          </span>
        </div>
      </div>
    </div>
  );
};
