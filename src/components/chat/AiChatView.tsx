import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Thermometer, Droplets, Sprout, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

const AGENT_ID = import.meta.env.VITE_CHATBASE_AGENT_ID || 'OBi1rNp7vL0reEIicNKzw';

export const AiChatView: React.FC = () => {
  const { locationName, farmContext, weatherData } = useApp();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Timeout safety net in case iframe hangs indefinitely
    const timer = setTimeout(() => {
      setIsLoading((loading) => {
        if (loading) {
          // If still loading after 12s, allow user to retry or view iframe
          return false;
        }
        return false;
      });
    }, 12000);

    return () => clearTimeout(timer);
  }, [key]);

  const handleRetry = () => {
    setKey((prev) => prev + 1);
  };

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

      {/* Full-size Chatbase Embed Container */}
      <div className="w-full flex-1 rounded-2xl overflow-hidden border border-stone-300 bg-white shadow-xs relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-xs p-6 text-center">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
            <p className="font-semibold text-stone-800 text-sm">Loading Framtech Assistant...</p>
            <p className="text-xs text-stone-500 mt-1">Connecting to agricultural advisor service</p>
          </div>
        )}

        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-amber-50/50">
            <AlertTriangle className="w-10 h-10 text-amber-600 mb-3" />
            <h3 className="font-bold text-stone-900 text-base mb-1">Chat Assistant Unavailable</h3>
            <p className="text-xs text-stone-600 max-w-md mb-4">
              Unable to load the Chatbase service. Please check your network connection or try again.
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Loading Chat</span>
            </button>
          </div>
        ) : (
          <iframe
            key={key}
            src="/help"
            title="Framtech Assistant"
            className="w-full h-full border-0 rounded-2xl"
            style={{ width: '100%', height: '100%', border: 'none' }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};
