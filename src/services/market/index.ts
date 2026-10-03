import { MarketDataProvider } from '../../types/market';
import { DemoMarketDataProvider } from './DemoMarketDataProvider';

// Singleton instance of the active market data provider
// To switch to a real API in the future, replace DemoMarketDataProvider with RealMarketDataProvider
export const activeMarketDataProvider: MarketDataProvider = new DemoMarketDataProvider();

export class MarketDataService {
  private provider: MarketDataProvider;

  constructor(provider: MarketDataProvider = activeMarketDataProvider) {
    this.provider = provider;
  }

  public getMarketData(filters?: Parameters<MarketDataProvider['getMarketData']>[0]) {
    return this.provider.getMarketData(filters);
  }

  public getCommodities() {
    return this.provider.getCommodities();
  }

  public getStates() {
    return this.provider.getStates();
  }

  public getDistricts(state?: string) {
    return this.provider.getDistricts(state);
  }

  public getMarkets(district?: string) {
    return this.provider.getMarkets(district);
  }

  public getHistoricalPrices(commodity: string, district: string, market: string, days?: number) {
    return this.provider.getHistoricalPrices(commodity, district, market, days);
  }
}

export const marketDataService = new MarketDataService();
