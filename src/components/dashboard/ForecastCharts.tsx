import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ForecastCharts: React.FC = () => {
  const { weatherData } = useApp();

  if (!weatherData) return null;

  const chartData = weatherData.daily.map(d => ({
    day: d.dayName,
    date: d.date,
    tempMax: d.tempMax,
    tempMin: d.tempMin,
    rain: d.precipitationSum,
    prob: d.precipitationProbability
  }));

  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-5 md:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-display">
            7-Day Temperature & Rain Forecast
          </h3>
          <p className="text-xs text-stone-500">
            Daily maximum/minimum temperature curves with expected rainfall volume
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Max Temp</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Min Temp</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-800"></span> Rain (mm)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div>
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Temperature Trends (°C)</div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
                <YAxis domain={['dataMin - 3', 'dataMax + 3']} tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-emerald-950 text-white p-2 rounded-xl text-xs space-y-1">
                          <div className="font-bold text-emerald-300">{data.day} ({data.date})</div>
                          <div>Max Temp: <strong className="text-amber-400">{data.tempMax}°C</strong></div>
                          <div>Min Temp: <strong className="text-blue-300">{data.tempMin}°C</strong></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="tempMax" stroke="#D97706" strokeWidth={2.5} fillOpacity={0.15} fill="#D97706" />
                <Area type="monotone" dataKey="tempMin" stroke="#3B82F6" strokeWidth={2} fillOpacity={0.05} fill="#3B82F6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rainfall Volume Chart */}
        <div>
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Rainfall Volume (mm)</div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6F7B74' }} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-emerald-950 text-white p-2 rounded-xl text-xs space-y-1">
                          <div className="font-bold text-emerald-300">{data.day}</div>
                          <div>Rainfall: <strong className="text-emerald-400">{data.rain} mm</strong></div>
                          <div>Rain Prob: <strong>{data.prob}%</strong></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="rain" fill="#153E2B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
