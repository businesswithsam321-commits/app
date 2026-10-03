export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  rainProbability: number;
  windSpeed: number;
  weatherCode: number;
  conditionText: string;
  isDay: boolean;
  time: string;
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  dayName: string;
  weatherCode: number;
  conditionText: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  locationName: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
}

export type RiskSeverity = 'Information' | 'Moderate' | 'High';

export interface WeatherRisk {
  id: string;
  title: string;
  severity: RiskSeverity;
  category: 'Heavy Rain' | 'Heat Stress' | 'Dry Spells' | 'Pest & Humidity' | 'Wind';
  message: string;
  triggerReason: string;
  recommendedAction: string;
  createdAt: string;
}
