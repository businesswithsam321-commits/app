import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherData, WeatherRisk } from '../types/weather';
import { FarmContext } from '../types/farm';
import { openMeteoService } from '../services/weather/openMeteoService';
import { calculateWeatherRisks } from '../services/weather/riskEngine';

export type ActiveTab = 'dashboard' | 'weather' | 'alerts' | 'crops' | 'market' | 'aichat';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  locationName: string;
  latitude: number;
  longitude: number;
  setLocation: (name: string, lat?: number, lon?: number) => void;
  farmContext: FarmContext;
  updateFarmContext: (updates: Partial<FarmContext>) => void;
  weatherData: WeatherData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  weatherRisks: WeatherRisk[];
  refetchWeather: () => void;
  // Selected market choices across app
  selectedMarketCommodity: string;
  setSelectedMarketCommodity: (c: string) => void;
  selectedMarketDistrict: string;
  setSelectedMarketDistrict: (d: string) => void;
  selectedMarketName: string;
  setSelectedMarketName: (m: string) => void;
}

const DEFAULT_FARM_CONTEXT: FarmContext = {
  crop: 'Rice',
  season: 'Kharif',
  soil: 'Clay / Loamy',
  water: 'Moderate / Canal',
  stage: 'Vegetative',
  district: 'Bilaspur',
  state: 'Chhattisgarh'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [locationName, setLocationName] = useState<string>('Bilaspur, Chhattisgarh');
  const [latitude, setLatitude] = useState<number>(22.0797);
  const [longitude, setLongitude] = useState<number>(82.1391);
  const [farmContext, setFarmContext] = useState<FarmContext>(DEFAULT_FARM_CONTEXT);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherRisks, setWeatherRisks] = useState<WeatherRisk[]>([]);

  // Market selections
  const [selectedMarketCommodity, setSelectedMarketCommodity] = useState<string>('Rice');
  const [selectedMarketDistrict, setSelectedMarketDistrict] = useState<string>('Bilaspur');
  const [selectedMarketName, setSelectedMarketName] = useState<string>('Bilaspur');

  const loadWeather = async (lat: number, lon: number, locName: string) => {
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await openMeteoService.fetchWeather(lat, lon, locName);
      setWeatherData(data);
      const risks = calculateWeatherRisks(data);
      setWeatherRisks(risks);
    } catch (err: any) {
      setWeatherError("Unable to retrieve live weather data right now.");
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(latitude, longitude, locationName);
  }, [latitude, longitude, locationName]);

  const setLocation = (name: string, lat?: number, lon?: number) => {
    setLocationName(name);
    const [dist, st] = name.split(',').map(s => s.trim());
    if (dist) {
      setSelectedMarketDistrict(dist);
      setSelectedMarketName(dist);
      setFarmContext(prev => ({ ...prev, district: dist, state: st || prev.state }));
    }
    if (lat && lon) {
      setLatitude(lat);
      setLongitude(lon);
    } else {
      // Approximate coordinates for common preset locations
      const locLower = name.toLowerCase();
      if (locLower.includes('raipur')) {
        setLatitude(21.2514); setLongitude(81.6296);
      } else if (locLower.includes('durg')) {
        setLatitude(21.1904); setLongitude(81.2849);
      } else if (locLower.includes('korba')) {
        setLatitude(22.3595); setLongitude(82.7501);
      } else if (locLower.includes('ambikapur')) {
        setLatitude(23.1214); setLongitude(83.1979);
      } else if (locLower.includes('jagdalpur')) {
        setLatitude(19.0744); setLongitude(82.0222);
      } else {
        setLatitude(22.0797); setLongitude(82.1391); // Bilaspur default
      }
    }
  };

  const updateFarmContext = (updates: Partial<FarmContext>) => {
    setFarmContext(prev => ({ ...prev, ...updates }));
  };

  const refetchWeather = () => {
    loadWeather(latitude, longitude, locationName);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        locationName,
        latitude,
        longitude,
        setLocation,
        farmContext,
        updateFarmContext,
        weatherData,
        weatherLoading,
        weatherError,
        weatherRisks,
        refetchWeather,
        selectedMarketCommodity,
        setSelectedMarketCommodity,
        selectedMarketDistrict,
        setSelectedMarketDistrict,
        selectedMarketName,
        setSelectedMarketName
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
