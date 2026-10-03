import { MarketDataProvider, MarketFilters, MarketRecord, MarketResponse, MarketSummary } from '../../types/market';
import { DEMO_MARKET_RECORDS } from '../../data/market/demoData';

export class DemoMarketDataProvider implements MarketDataProvider {
  private records: MarketRecord[] = DEMO_MARKET_RECORDS;

  async getMarketData(filters?: MarketFilters): Promise<MarketResponse> {
    // Simulate slight async delay for loading state verification
    await new Promise(resolve => setTimeout(resolve, 250));

    let filtered = [...this.records];

    if (filters) {
      if (filters.state) {
        filtered = filtered.filter(r => r.state.toLowerCase() === filters.state?.toLowerCase());
      }
      if (filters.district) {
        filtered = filtered.filter(r => r.district.toLowerCase() === filters.district?.toLowerCase());
      }
      if (filters.market) {
        filtered = filtered.filter(r => r.market.toLowerCase() === filters.market?.toLowerCase());
      }
      if (filters.commodity) {
        filtered = filtered.filter(r => r.commodity.toLowerCase() === filters.commodity?.toLowerCase());
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(r => 
          r.commodity.toLowerCase().includes(query) ||
          r.variety.toLowerCase().includes(query) ||
          r.market.toLowerCase().includes(query) ||
          r.district.toLowerCase().includes(query)
        );
      }
      if (filters.startDate) {
        filtered = filtered.filter(r => r.date >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter(r => r.date <= filters.endDate!);
      }
    }

    // Sort by date descending
    filtered.sort((a, b) => b.date.localeCompare(a.date));

    let summary: MarketSummary | undefined = undefined;

    if (filtered.length > 0) {
      const latestRecord = filtered[0];
      // Find previous day record for same commodity/market
      const previousRecord = this.records.find(r => 
        r.commodity === latestRecord.commodity &&
        r.market === latestRecord.market &&
        r.date < latestRecord.date
      );

      const priceChange = previousRecord ? latestRecord.modalPrice - previousRecord.modalPrice : 0;
      const percentageChange = previousRecord && previousRecord.modalPrice > 0
        ? Number(((priceChange / previousRecord.modalPrice) * 100).toFixed(1))
        : 0;

      summary = {
        commodity: latestRecord.commodity,
        latestRecord,
        previousRecord,
        priceChange,
        percentageChange,
        isDemo: true,
        dataType: "demo"
      };
    }

    return {
      records: filtered,
      total: filtered.length,
      isDemo: true,
      dataType: "demo",
      filterState: filters || {},
      summary
    };
  }

  async getCommodities(): Promise<string[]> {
    const set = new Set(this.records.map(r => r.commodity));
    return Array.from(set).sort();
  }

  async getStates(): Promise<string[]> {
    const set = new Set(this.records.map(r => r.state));
    return Array.from(set).sort();
  }

  async getDistricts(state?: string): Promise<string[]> {
    const source = state ? this.records.filter(r => r.state === state) : this.records;
    const set = new Set(source.map(r => r.district));
    return Array.from(set).sort();
  }

  async getMarkets(district?: string): Promise<string[]> {
    const source = district ? this.records.filter(r => r.district === district) : this.records;
    const set = new Set(source.map(r => r.market));
    return Array.from(set).sort();
  }

  async getHistoricalPrices(commodity: string, district: string, market: string, days = 30): Promise<MarketRecord[]> {
    let filtered = this.records.filter(r => 
      r.commodity.toLowerCase() === commodity.toLowerCase() &&
      r.district.toLowerCase() === district.toLowerCase() &&
      r.market.toLowerCase() === market.toLowerCase()
    );

    if (filtered.length === 0) {
      // Fallback by commodity and district if market has no exact match
      filtered = this.records.filter(r => 
        r.commodity.toLowerCase() === commodity.toLowerCase() &&
        r.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (filtered.length === 0) {
      // Fallback by commodity only
      filtered = this.records.filter(r => 
        r.commodity.toLowerCase() === commodity.toLowerCase()
      );
    }

    // Sort ascending by date for charts
    filtered.sort((a, b) => a.date.localeCompare(b.date));
    return filtered.slice(-days);
  }
}
