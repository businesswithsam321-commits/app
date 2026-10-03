import React from 'react';
import { useApp } from '../../context/AppContext';
import { CloudSun, RefreshCw } from 'lucide-react';

export const WeatherView: React.FC = () => {
  const { weatherData, weatherLoading, weatherError, refetchWeather, locationName } = useApp();

  if (weatherLoading) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto w-full animate-pulse">
        <div className="h-28 bg-stone-200 rounded-2xl"></div>
        <div className="h-64 bg-stone-200 rounded-2xl"></div>
      </div>
    );
  }

  if (weatherError || !weatherData) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-4 max-w-7xl mx-auto w-full">
        <h3 className="font-bold text-rose-950 font-display">Weather Data Unavailable</h3>
        <p className="text-xs text-rose-800">{weatherError || "Unable to load weather information."}</p>
        <button
          onClick={refetchWeather}
          className="px-4 py-2 bg-rose-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Loading Weather</span>
        </button>
      </div>
    );
  }

  const { current, daily } = weatherData;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-10">
      <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              Agricultural Meteorology
            </span>
            <h2 className="text-2xl font-bold text-emerald-950 font-display mt-1 flex items-center gap-2">
              <CloudSun className="w-6 h-6 text-emerald-800" />
              Weather & Soil Observations
            </h2>
          </div>
          <div className="text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-300">
            Station: <strong>{locationName}</strong>
          </div>
        </div>

        {/* Extended Agro-Met Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block">Evapotranspiration (ET0)</span>
            <span className="text-2xl font-bold text-emerald-950 font-display mt-1 block">3.8 mm/day</span>
            <span className="text-[11px] text-emerald-800 font-medium">Low crop water loss</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block">Solar Radiation</span>
            <span className="text-2xl font-bold text-emerald-950 font-display mt-1 block">18.2 MJ/m²</span>
            <span className="text-[11px] text-stone-600">Sufficient photosynthesis</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block">Estimated Soil Moisture</span>
            <span className="text-2xl font-bold text-emerald-800 font-display mt-1 block">34.8%</span>
            <span className="text-[11px] text-emerald-800 font-medium">Field Capacity: High</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block">Leaf Wetness Duration</span>
            <span className="text-2xl font-bold text-emerald-950 font-display mt-1 block">6.5 hrs</span>
            <span className="text-[11px] text-amber-800 font-medium">Monitor fungal spores</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-emerald-950 font-display text-lg">7-Day Detailed Forecast</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {daily.map(d => (
            <div key={d.date} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-center space-y-1.5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">{d.dayName}</span>
                <span className="text-[10px] text-stone-400 block">{d.date.slice(5)}</span>
                <div className="text-xl my-1">
                  {d.precipitationSum > 10 ? '🌧' : d.precipitationSum > 0 ? '🌦' : '⛅'}
                </div>
                <div className="text-xs font-medium text-stone-700">{d.conditionText}</div>
              </div>

              <div className="pt-2 border-t border-stone-200 text-xs space-y-0.5">
                <div className="font-bold text-amber-900">{d.tempMax}°C <span className="text-stone-400 font-normal">/ {d.tempMin}°C</span></div>
                <div className="text-[11px] text-blue-700 font-semibold">{d.precipitationSum} mm rain</div>
                <div className="text-[10px] text-stone-500">{d.precipitationProbability}% prob</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
