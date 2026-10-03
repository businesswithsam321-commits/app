import React from 'react';
import { MarketRecord } from '../../types/market';

interface PriceTableProps {
  records: MarketRecord[];
  onSelectRecord?: (record: MarketRecord) => void;
  selectedId?: string;
}

export const PriceTable: React.FC<PriceTableProps> = ({ records, onSelectRecord, selectedId }) => {
  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <h3 className="font-bold text-emerald-950 font-display text-base sm:text-lg">
            Commodity Price Records Table
          </h3>
          <p className="text-xs text-stone-500">
            Showing {records.length} demonstration market record{records.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded">
          Demo data
        </span>
      </div>

      {/* Responsive scroll wrapper: ONLY table scrolls horizontally on mobile */}
      <div className="w-full overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-left text-xs border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
              <th className="py-3 px-3.5">Commodity</th>
              <th className="py-3 px-3.5">Variety</th>
              <th className="py-3 px-3.5">Market</th>
              <th className="py-3 px-3.5">District</th>
              <th className="py-3 px-3.5 text-right">Min Price</th>
              <th className="py-3 px-3.5 text-right">Max Price</th>
              <th className="py-3 px-3.5 text-right">Modal Price</th>
              <th className="py-3 px-3.5 text-center">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-800">
            {records.map((r) => {
              const isSelected = r.id === selectedId;
              return (
                <tr
                  key={r.id}
                  onClick={() => onSelectRecord && onSelectRecord(r)}
                  className={`hover:bg-emerald-50/60 transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-100/70 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-3.5 font-bold text-emerald-950">{r.commodity}</td>
                  <td className="py-3 px-3.5 text-stone-600">{r.variety}</td>
                  <td className="py-3 px-3.5 font-medium">{r.market}</td>
                  <td className="py-3 px-3.5 text-stone-600">{r.district}</td>
                  <td className="py-3 px-3.5 text-right text-stone-700">₹{r.minPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3.5 text-right text-stone-700">₹{r.maxPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3.5 text-right font-bold text-emerald-950">₹{r.modalPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3.5 text-center text-stone-500 font-mono text-[11px]">
                    {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
