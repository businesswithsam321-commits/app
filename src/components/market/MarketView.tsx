import React, { useState, useEffect } from 'react';
import { MarketHeader } from './MarketHeader';
import { MarketFiltersComponent } from './MarketFilters';
import { PriceSummaryCards } from './PriceSummaryCards';
import { PriceTrendChart } from './PriceTrendChart';
import { PriceTable } from './PriceTable';
import { marketDataService } from '../../services/market';
import { MarketFilters, MarketRecord, MarketResponse } from '../../types/market';
import { useApp } from '../../context/AppContext';
import { RefreshCw, AlertTriangle, Inbox } from 'lucide-react';

export const MarketView: React.FC = () => {
  const { farmContext, selectedMarketCommodity, setSelectedMarketCommodity } = useApp();

  const [filters, setFilters] = useState<MarketFilters>({
    state: 'Chhattisgarh',
    district: farmContext.district || 'Bilaspur',
    commodity: selectedMarketCommodity || ''
  });

  const [marketResponse, setMarketResponse] = useState<MarketResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableMarkets, setAvailableMarkets] = useState<string[]>([]);
  const [availableCommodities, setAvailableCommodities] = useState<string[]>([]);

  const [selectedRecord, setSelectedRecord] = useState<MarketRecord | undefined>(undefined);
  const [historicalRecords, setHistoricalRecords] = useState<MarketRecord[]>([]);

  // Load dropdown options
  useEffect(() => {
    const loadOptions = async () => {
      const [states, districts, markets, commodities] = await Promise.all([
        marketDataService.getStates(),
        marketDataService.getDistricts(filters.state),
        marketDataService.getMarkets(filters.district),
        marketDataService.getCommodities()
      ]);
      setAvailableStates(states);
      setAvailableDistricts(districts);
      setAvailableMarkets(markets);
      setAvailableCommodities(commodities);
    };
    loadOptions();
  }, [filters.state, filters.district]);

  // Fetch market data on filter change
  const fetchMarketData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await marketDataService.getMarketData(filters);
      setMarketResponse(res);
      
      const topRecord = res.records[0];
      setSelectedRecord(topRecord);

      if (topRecord) {
        setSelectedMarketCommodity(topRecord.commodity);
        const history = await marketDataService.getHistoricalPrices(
          topRecord.commodity,
          topRecord.district,
          topRecord.market,
          30
        );
        setHistoricalRecords(history);
      } else {
        setHistoricalRecords([]);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<MarketFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      state: 'Chhattisgarh',
      district: 'Bilaspur',
      commodity: '',
      searchQuery: ''
    });
  };

  const handleSelectRecord = async (record: MarketRecord) => {
    setSelectedRecord(record);
    setSelectedMarketCommodity(record.commodity);
    const history = await marketDataService.getHistoricalPrices(
      record.commodity,
      record.district,
      record.market,
      30
    );
    setHistoricalRecords(history);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-10">
      <MarketHeader />

      <MarketFiltersComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        availableStates={availableStates}
        availableDistricts={availableDistricts}
        availableMarkets={availableMarkets}
        availableCommodities={availableCommodities}
        onReset={handleResetFilters}
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-28 bg-stone-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-64 bg-stone-200 rounded-2xl"></div>
          <div className="h-48 bg-stone-200 rounded-2xl"></div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-950 font-display">Market Data Unavailable</h3>
            <p className="text-xs text-rose-800 mt-1 max-w-md mx-auto">
              We couldn't connect to the market data provider right now. Please check your connection and try again.
            </p>
          </div>
          <button
            onClick={fetchMarketData}
            className="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Loading Data</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && marketResponse && marketResponse.records.length === 0 && (
        <div className="bg-stone-50 border border-stone-300 rounded-2xl p-10 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-display">No Market Records Found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              No agricultural market records match your current filter selection. Try clearing or expanding your search filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Clear Filters & Reset</span>
          </button>
        </div>
      )}

      {/* Content View */}
      {!loading && !error && marketResponse && marketResponse.records.length > 0 && (
        <div className="space-y-6">
          <PriceSummaryCards
            summary={marketResponse.summary}
            selectedRecord={selectedRecord}
          />

          {selectedRecord && historicalRecords.length > 0 && (
            <PriceTrendChart
              commodityName={selectedRecord.commodity}
              marketName={selectedRecord.market}
              records={historicalRecords}
            />
          )}

          <PriceTable
            records={marketResponse.records}
            onSelectRecord={handleSelectRecord}
            selectedId={selectedRecord?.id}
          />
        </div>
      )}
    </div>
  );
};
