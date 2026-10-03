import React, { useState } from 'react';
import { X, Sprout } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CropType, SeasonType, SoilType, WaterAvailability, CropStage } from '../../types/farm';

interface FarmContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmContextModal: React.FC<FarmContextModalProps> = ({ isOpen, onClose }) => {
  const { farmContext, updateFarmContext } = useApp();

  const [crop, setCrop] = useState<CropType>(farmContext.crop);
  const [season, setSeason] = useState<SeasonType>(farmContext.season);
  const [soil, setSoil] = useState<SoilType>(farmContext.soil);
  const [water, setWater] = useState<WaterAvailability>(farmContext.water);
  const [stage, setStage] = useState<CropStage>(farmContext.stage);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmContext({ crop, season, soil, water, stage });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-display">Farm & Field Context</h2>
              <p className="text-xs text-stone-500">Tailors advice & AI answers to your field</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Primary Crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value as CropType)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm px-3 py-2.5 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
            >
              <option value="Rice">Rice / Paddy</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Hybrid Maize</option>
              <option value="Soybean">Soybean</option>
              <option value="Pigeon Pea / Arhar">Pigeon Pea / Arhar</option>
              <option value="Chickpea">Chickpea (Gram)</option>
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Onion">Onion</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as SeasonType)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm px-3 py-2.5 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
              >
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Rabi">Rabi (Winter)</option>
                <option value="Zaid">Zaid (Summer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Soil Type</label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value as SoilType)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm px-3 py-2.5 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
              >
                <option value="Clay / Loamy">Clay / Loamy</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Black Cotton">Black Cotton Soil</option>
                <option value="Alluvial">Alluvial Soil</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Water Access</label>
              <select
                value={water}
                onChange={(e) => setWater(e.target.value as WaterAvailability)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm px-3 py-2.5 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
              >
                <option value="Moderate / Canal">Moderate / Canal</option>
                <option value="Good / Tubewell">Good / Tubewell</option>
                <option value="Limited / Rainfed">Limited / Rainfed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Crop Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as CropStage)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm px-3 py-2.5 text-stone-800 font-medium focus:outline-none focus:border-emerald-700"
              >
                <option value="Vegetative">Vegetative</option>
                <option value="Seedling / Nursery">Seedling / Nursery</option>
                <option value="Flowering / Panicle">Flowering / Panicle</option>
                <option value="Ripening / Harvest">Ripening / Harvest</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 leading-normal">
            Note: Updating your farm context adjusts weather risk thresholds, crop advice suitability, and AI Chat responses.
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-xs text-stone-700 font-medium hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold shadow-xs"
            >
              Save Farm Context
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
