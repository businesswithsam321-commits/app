import React, { useState } from 'react';
import { MarketRecord } from '../../types/market';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PriceTrendChartProps {
  commodityName: string;
  marketName: string;
  records: MarketRecord[];
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ commodityName, marketName, records }) => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D'>('7D');

  const sliceCount = timeframe === '7D' ? 7 : 30;
  const chartData = records.slice(-sliceCount).map(r => ({
    date: new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    fullDate: r.date,
    modalPrice: r.modalPrice,
    minPrice: r.minPrice,
    maxPrice: r.maxPrice
  }));

  const minVal = chartData.length > 0 ? Math.min(...chartData.map(d => d.modalPrice)) - 50 : 2000;
  const maxVal = chartData.length > 0 ? Math.max(...chartData.map(d => d.modalPrice)) + 50 : 2500;

  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-emerald-950 font-display text-base sm:text-lg flex items-center gap-1.5">
              <TrendingUp className="w-5 h-5 text-emerald-800" />
              {commodityName} — Modal Price Trend
            </h3>
            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded">
              Demo price trend
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Modal price movement over time at {marketName} (₹/quintal)
          </p>
        </div>

        {/* 7 Days / 30 Days Toggle */}
        <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-300 text-xs self-start sm:self-auto">
          <button
            onClick={() => setTimeframe('7D')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              timeframe === '7D' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:text-emerald-950'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30D')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              timeframe === '30D' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:text-emerald-950'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#153E2B" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#153E2B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E7" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
              <YAxis domain={[minVal, maxVal]} tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-emerald-950 text-white p-2.5 rounded-xl text-xs space-y-1 shadow-lg border border-emerald-800">
                        <div className="font-bold text-emerald-300">{data.fullDate} (Demo)</div>
                        <div>Modal Price: <strong className="text-white">₹{data.modalPrice}</strong> / quintal</div>
                        <div className="text-[10px] text-stone-300">Range: ₹{data.minPrice} – ₹{data.maxPrice}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="modalPrice" stroke="#153E2B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorModal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-stone-500">
          No historical price records available for this selection.
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Label: <strong>Demo price trend</strong> — values generated for UI prototype</span>
        </span>
        <span className="font-mono text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-700">isDemo: true</span>
      </div>
    </div>
  );
};
