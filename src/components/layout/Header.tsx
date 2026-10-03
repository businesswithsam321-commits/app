import React, { useState } from 'react';
import { MapPin, Sprout, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LocationModal } from '../common/LocationModal';
import { FarmContextModal } from '../common/FarmContextModal';

export const Header: React.FC = () => {
  const { locationName, farmContext } = useApp();
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-stone-300 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold text-lg shadow-xs border border-emerald-700/30">
            <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 0-10 10c0 5.25 7 10 10 10s10-4.75 10-10A10 10 0 0 0 12 2Z"></path>
              <path d="M12 12v6"></path>
              <path d="M12 12a4 4 0 0 1 4-4"></path>
              <path d="M12 15a3 3 0 0 0-3-3"></path>
            </svg>
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-emerald-950 text-lg sm:text-xl block leading-tight">
              CLIMATECHECK
            </span>
            <span className="text-[11px] text-stone-500 block tracking-normal -mt-0.5">
              AI Climate & Farming Information Platform
            </span>
          </div>
        </div>

        {/* Location & Farm Context Quick Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLocModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-emerald-700 transition-all text-xs font-medium text-stone-800 shadow-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span className="truncate max-w-[130px] sm:max-w-none">{locationName}</span>
            <span className="text-emerald-700 font-semibold text-[11px] ml-0.5">[Change]</span>
          </button>

          <button
            onClick={() => setIsContextModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/70 border border-stone-300 hover:border-stone-400 text-xs text-stone-800 font-medium transition-all"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>{farmContext.crop} · {farmContext.season}</span>
            <ChevronDown className="w-3 h-3 text-stone-500" />
          </button>
        </div>
      </header>

      <LocationModal isOpen={isLocModalOpen} onClose={() => setIsLocModalOpen(false)} />
      <FarmContextModal isOpen={isContextModalOpen} onClose={() => setIsContextModalOpen(false)} />
    </>
  );
};
