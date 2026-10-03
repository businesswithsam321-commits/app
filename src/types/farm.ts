export type CropType = 'Rice' | 'Wheat' | 'Maize' | 'Soybean' | 'Pigeon Pea / Arhar' | 'Chickpea' | 'Tomato' | 'Potato' | 'Onion';
export type SeasonType = 'Kharif' | 'Rabi' | 'Zaid';
export type SoilType = 'Clay / Loamy' | 'Sandy Loam' | 'Black Cotton' | 'Alluvial';
export type WaterAvailability = 'Limited / Rainfed' | 'Moderate / Canal' | 'Good / Tubewell';
export type CropStage = 'Seedling / Nursery' | 'Vegetative' | 'Flowering / Panicle' | 'Ripening / Harvest';

export interface FarmContext {
  crop: CropType;
  season: SeasonType;
  soil: SoilType;
  water: WaterAvailability;
  stage: CropStage;
  district: string;
  state: string;
}

export interface CropRecommendation {
  crop: CropType;
  suitabilityScore: number; // 0 to 100
  suitabilityLabel: 'Potentially suitable' | 'Highly recommended' | 'Consider with management';
  reasons: string[];
  caveats: string[];
  waterReq: string;
  duration: string;
  soilFit: string;
  seasonFit: string;
}

export interface FarmingGuidance {
  topic: string;
  category: 'Water' | 'Heat' | 'Heavy Rain' | 'Rotation' | 'General';
  summary: string;
  actionPoints: string[];
}
