import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { MarketFilters as IFilters } from '../../types/market';

interface MarketFiltersProps {
  filters: IFilters;
  onFilterChange: (newFilters: Partial<IFilters>) => void;
  availableStates: string[];
  availableDistricts: string[];
  availableMarkets: string[];
  availableCommodities: string[];
  onReset: () => void;
}

export const MarketFiltersComponent: React.FC<MarketFiltersProps> = ({
  filters,
  onFilterChange,
  availableStates,
  availableDistricts,
  availableMarkets,
  availableCommodities,
  onReset
}) => {
  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Commodity Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search commodity (e.g. Rice, Wheat, Maize)..."
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-700"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        <button
          onClick={onReset}
          className="px-3.5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-200">
        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">State</label>
          <select
            value={filters.state || 'Chhattisgarh'}
            onChange={(e) => onFilterChange({ state: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
          >
            {availableStates.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">District</label>
          <select
            value={filters.district || 'Bilaspur'}
            onChange={(e) => onFilterChange({ district: e.target.value, market: '' })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
          >
            <option value="">All Districts</option>
            {availableDistricts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Market (Mandi)</label>
          <select
            value={filters.market || ''}
            onChange={(e) => onFilterChange({ market: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
          >
            <option value="">All Markets</option>
            {availableMarkets.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Commodity</label>
          <select
            value={filters.commodity || ''}
            onChange={(e) => onFilterChange({ commodity: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
          >
            <option value="">All Commodities</option>
            {availableCommodities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
