import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Thermometer, Droplets, Sprout } from 'lucide-react';

export const AiChatView: React.FC = () => {
  const { locationName, farmContext, weatherData } = useApp();

  return (
    <div className="w-full flex-1 flex flex-col space-y-3 pb-2 md:pb-0 h-[calc(100dvh-120px)] md:h-[calc(100vh-100px)]">
      {/* Slim Context Strip */}
      <div className="py-2 px-3 bg-white/90 rounded-xl border border-stone-300 flex flex-wrap items-center gap-2 sm:gap-4 text-xs shrink-0 shadow-2xs">
        <span className="font-bold text-emerald-950 uppercase text-[10px] tracking-wider shrink-0">
          Climate Context:
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-stone-700">
          <MapPin className="w-3 h-3 text-emerald-700" />
          <span>{locationName}</span>
        </span>
        <span className="text-stone-300">•</span>
        <span className="inline-flex items-center gap-1 font-medium text-stone-700">
          <Thermometer className="w-3 h-3 text-amber-600" />
          <span>{weatherData?.current.temperature ?? 28}°C</span>
        </span>
        <span className="text-stone-300">•</span>
        <span className="inline-flex items-center gap-1 font-medium text-blue-700">
          <Droplets className="w-3 h-3 text-blue-600" />
          <span>Rain {weatherData?.current.rainProbability ?? 72}%</span>
        </span>
        <span className="text-stone-300">•</span>
        <span className="inline-flex items-center gap-1 font-medium text-emerald-900">
          <Sprout className="w-3 h-3 text-emerald-700" />
          <span>{farmContext.crop} ({farmContext.stage})</span>
        </span>
      </div>

      {/* Full-size Chatbase Embed Iframe */}
      <div className="w-full flex-1 rounded-2xl overflow-hidden border border-stone-300 bg-white shadow-xs relative">
        <iframe
          src="/help"
          title="Chatbase Assistant"
          className="w-full h-full border-0 rounded-2xl"
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};
