import React, { useEffect, useState } from 'react';
import { Store, ArrowRight, AlertCircle } from 'lucide-react';
import { marketDataService } from '../../services/market';
import { MarketRecord } from '../../types/market';
import { useApp } from '../../context/AppContext';

export const DashboardMarketCard: React.FC = () => {
  const { setActiveTab, farmContext, setSelectedMarketCommodity } = useApp();
  const [snapshotRecords, setSnapshotRecords] = useState<MarketRecord[]>([]);

  useEffect(() => {
    const loadSnapshot = async () => {
      const res = await marketDataService.getMarketData({
        state: 'Chhattisgarh',
        district: farmContext.district || 'Bilaspur'
      });
      // Pick top distinct commodities
      const map = new Map<string, MarketRecord>();
      res.records.forEach(r => {
        if (!map.has(r.commodity) && map.size < 3) {
          map.set(r.commodity, r);
        }
      });
      setSnapshotRecords(Array.from(map.values()));
    };
    loadSnapshot();
  }, [farmContext.district]);

  const handleOpenMarket = (commodity?: string) => {
    if (commodity) {
      setSelectedMarketCommodity(commodity);
    }
    setActiveTab('market');
  };

  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-bold text-emerald-950 font-display text-base">MARKET SNAPSHOT</h3>
              <p className="text-[11px] text-stone-500">Mandi modal prices for {farmContext.district}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3 text-amber-700" />
            Demo data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {snapshotRecords.map(r => (
            <div
              key={r.id}
              onClick={() => handleOpenMarket(r.commodity)}
              className="p-3 bg-stone-50 hover:bg-emerald-50/60 border border-stone-300 rounded-xl cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950">{r.commodity}</span>
                <span className="text-[10px] text-stone-500">{r.market}</span>
              </div>
              <div className="text-lg font-bold text-emerald-950 font-display mt-1">
                ₹{r.modalPrice.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-stone-500">/qtl</span>
              </div>
              <div className="text-[10px] text-stone-500 mt-1 flex justify-between">
                <span>Range: ₹{r.minPrice} - ₹{r.maxPrice}</span>
                <span className="text-amber-800 font-semibold">Demo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
        <span className="text-stone-500 text-[11px]">
          Uses exact Market Data Service (`DemoMarketDataProvider`)
        </span>
        <button
          onClick={() => handleOpenMarket()}
          className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1"
        >
          <span>View Market</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
