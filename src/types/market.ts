export interface MarketRecord {
  id: string;
  commodity: string;
  variety: string;
  state: string;
  district: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  date: string; // YYYY-MM-DD
  dataType: "demo";
  isDemo: true;
}

export interface MarketFilters {
  state?: string;
  district?: string;
  market?: string;
  commodity?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}

export interface MarketSummary {
  commodity: string;
  latestRecord: MarketRecord;
  previousRecord?: MarketRecord;
  priceChange: number; // e.g. +80 or -50
  percentageChange: number; // e.g. +3.5 or -2.1
  isDemo: true;
  dataType: "demo";
}

export interface MarketResponse {
  records: MarketRecord[];
  total: number;
  isDemo: true;
  dataType: "demo";
  filterState: MarketFilters;
  summary?: MarketSummary;
}

export interface MarketDataProvider {
  getMarketData(filters?: MarketFilters): Promise<MarketResponse>;
  getCommodities(): Promise<string[]>;
  getStates(): Promise<string[]>;
  getDistricts(state?: string): Promise<string[]>;
  getMarkets(district?: string): Promise<string[]>;
  getHistoricalPrices(commodity: string, district: string, market: string, days?: number): Promise<MarketRecord[]>;
}
