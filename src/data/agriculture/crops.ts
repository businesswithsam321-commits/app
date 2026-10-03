import { CropRecommendation, FarmContext } from '../../types/farm';

export const CROP_DATABASE: Record<string, Omit<CropRecommendation, 'suitabilityScore' | 'suitabilityLabel' | 'reasons'>> = {
  'Rice': {
    crop: 'Rice',
    waterReq: '1000 – 1300 mm (High)',
    duration: '120 – 140 days',
    soilFit: 'Clay / Loamy soils with good water retention',
    seasonFit: 'Kharif staple for monsoon months',
    caveats: ['Vulnerable to prolonged standing water submergence past 10 days during nursery stage', 'Requires clear bund drainage outlets']
  },
  'Wheat': {
    crop: 'Wheat',
    waterReq: '400 – 600 mm (Moderate)',
    duration: '110 – 130 days',
    soilFit: 'Well-drained fertile loamy soil',
    seasonFit: 'Rabi winter season crop',
    caveats: ['Sensitive to early terminal heat during grain filling', 'Requires 4-5 timely irrigations']
  },
  'Maize': {
    crop: 'Maize',
    waterReq: '500 – 700 mm (Moderate)',
    duration: '90 – 115 days',
    soilFit: 'Deep, well-drained loamy to sandy loam soils',
    seasonFit: 'Kharif or Rabi flex crop',
    caveats: ['Extremely sensitive to waterlogging at knee-high stage', 'Requires broad bed or ridge planting']
  },
  'Soybean': {
    crop: 'Soybean',
    waterReq: '450 – 650 mm (Moderate)',
    duration: '90 – 105 days',
    soilFit: 'Well-drained loamy soil',
    seasonFit: 'Kharif oilseed choice',
    caveats: ['Requires broad bed furrow (BBF) to prevent root rot during heavy rains', 'Prefers pH 6.5 - 7.5']
  },
  'Pigeon Pea / Arhar': {
    crop: 'Pigeon Pea / Arhar',
    waterReq: '350 – 550 mm (Low to Moderate)',
    duration: '160 – 180 days',
    soilFit: 'Loamy to clay loam with deep rooting depth',
    seasonFit: 'Long-duration Kharif crop',
    caveats: ['Deep taproot tolerates short dry spells', 'Ideal for farm bund planting alongside rice']
  },
  'Chickpea': {
    crop: 'Chickpea',
    waterReq: '250 – 400 mm (Low)',
    duration: '90 – 110 days',
    soilFit: 'Loose loamy to clay soils with residual moisture',
    seasonFit: 'Rabi pulse after Kharif paddy',
    caveats: ['Extremely sensitive to excess moisture & humidity during flowering', 'Tolerates cooler winter nights']
  },
  'Tomato': {
    crop: 'Tomato',
    waterReq: '400 – 600 mm (Moderate with drip)',
    duration: '100 – 120 days',
    soilFit: 'Well-drained sandy loam to loamy soil',
    seasonFit: 'Rabi or Zaid vegetable option',
    caveats: ['Requires staking and protection from heavy downpours', 'Susceptible to early blight under high humidity']
  },
  'Potato': {
    crop: 'Potato',
    waterReq: '350 – 500 mm (Moderate)',
    duration: '80 – 100 days',
    soilFit: 'Loose friable sandy loam rich in organic matter',
    seasonFit: 'Rabi winter season',
    caveats: ['Needs friable soil for tuber expansion', 'Avoid waterlogging']
  },
  'Onion': {
    crop: 'Onion',
    waterReq: '350 – 450 mm (Moderate)',
    duration: '110 – 130 days',
    soilFit: 'Friable well-drained loamy soil',
    seasonFit: 'Rabi or Late Kharif',
    caveats: ['Shallow root system requires frequent light irrigation', 'Bulb formation benefits from sunny dry spells']
  }
};

export function calculateCropSuitability(context: FarmContext): CropRecommendation[] {
  const recommendations: CropRecommendation[] = [];

  Object.values(CROP_DATABASE).forEach(base => {
    let score = 50;
    const reasons: string[] = [];

    // Season match
    if (context.season === 'Kharif') {
      if (['Rice', 'Maize', 'Soybean', 'Pigeon Pea / Arhar'].includes(base.crop)) {
        score += 25;
        reasons.push(`Matches active Kharif monsoon growing season calendar.`);
      } else if (['Wheat', 'Chickpea', 'Potato'].includes(base.crop)) {
        score -= 30;
      }
    } else if (context.season === 'Rabi') {
      if (['Wheat', 'Chickpea', 'Maize', 'Tomato', 'Potato', 'Onion'].includes(base.crop)) {
        score += 25;
        reasons.push(`Matches active Rabi winter season calendar.`);
      } else if (base.crop === 'Rice') {
        score -= 10; // Summer paddy exists
      }
    }

    // Soil match
    if (context.soil.includes('Loamy') || context.soil.includes('Clay')) {
      if (['Rice', 'Wheat', 'Soybean', 'Pigeon Pea / Arhar'].includes(base.crop)) {
        score += 20;
        reasons.push(`Well-suited to ${context.soil} moisture retention properties.`);
      }
    } else if (context.soil.includes('Sandy')) {
      if (['Maize', 'Tomato', 'Potato', 'Onion'].includes(base.crop)) {
        score += 20;
        reasons.push(`Provides excellent aeration for ${base.crop} root development in ${context.soil}.`);
      }
    }

    // Water match
    if (context.water.includes('Good') || context.water.includes('Canal')) {
      if (base.crop === 'Rice') {
        score += 15;
        reasons.push(`Sufficient water access matches high crop water requirement.`);
      }
    } else if (context.water.includes('Limited') || context.water.includes('Rainfed')) {
      if (['Pigeon Pea / Arhar', 'Chickpea', 'Soybean'].includes(base.crop)) {
        score += 20;
        reasons.push(`Low to moderate water requirement aligns with rainfed water availability.`);
      } else if (base.crop === 'Rice') {
        score -= 15;
      }
    }

    let suitabilityLabel: CropRecommendation['suitabilityLabel'] = 'Consider with management';
    if (score >= 80) {
      suitabilityLabel = 'Potentially suitable';
    } else if (score >= 65) {
      suitabilityLabel = 'Consider with management';
    }

    if (score > 30) {
      recommendations.push({
        ...base,
        suitabilityScore: Math.min(95, Math.max(40, score)),
        suitabilityLabel,
        reasons
      });
    }
  });

  return recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
