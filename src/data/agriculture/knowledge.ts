import { FarmingGuidance } from '../../types/farm';

export const FARMING_PRACTICES_GUIDANCE: FarmingGuidance[] = [
  {
    topic: 'Crop Rotation & Soil Health',
    category: 'Rotation',
    summary: 'Alternating cereal crops (paddy/wheat) with legumes (urad, arhar, chickpea) restores soil organic nitrogen and breaks pest life cycles.',
    actionPoints: [
      'Sow pulse crops (Chickpea / Urad) after Kharif rice to utilize residual root zone moisture.',
      'Rotational pulse crops fix atmospheric nitrogen, reducing synthetic urea requirements for the subsequent crop.'
    ]
  },
  {
    topic: 'Intercropping & Risk Management',
    category: 'General',
    summary: 'Planting short-duration pulses alongside tall field crops creates microclimate shading and hedges against weather volatility.',
    actionPoints: [
      'Plant Pigeon Pea (Arhar) on elevated bunds around Rice fields for dual harvest capability.',
      'Intercrop Maize with Cowpea or Soybean in a 2:1 row ratio to suppress weed growth naturally.'
    ]
  },
  {
    topic: 'Water-Conscious Irrigation',
    category: 'Water',
    summary: 'Avoid blanket flood irrigation. Synchronize watering schedules with Open-Meteo rainfall forecasts.',
    actionPoints: [
      'Check 3-day precipitation forecasts before starting canal or tubewell pumping.',
      'Adopt Alternate Wetting and Drying (AWD) for rice to reduce water consumption by 20–25% without sacrificing yield.'
    ]
  },
  {
    topic: 'Heavy Rainfall Preparation',
    category: 'Heavy Rain',
    summary: 'Excess water accumulation restricts root oxygen and washes away top-dressed fertilizers.',
    actionPoints: [
      'Cut V-shaped outlet channels in lower bund perimeters to release surface runoff during downpours.',
      'Postpone nitrogen top-dressing until standing water drains to prevent nutrient leaching.'
    ]
  },
  {
    topic: 'Heat Stress Management',
    category: 'Heat',
    summary: 'High temperatures accelerate evapotranspiration and lower soil moisture rapidly.',
    actionPoints: [
      'Maintain light standing water (2-3 cm) in rice fields during high heat spells to regulate root zone temperature.',
      'Apply foliar spray of 1% potassium chloride (KCl) to improve crop stomatal drought resistance.'
    ]
  }
];

export interface WaterGuidanceStatus {
  level: 'GOOD' | 'MODERATE' | 'LIMITED';
  title: string;
  description: string;
  recommendations: string[];
}

export function getWaterGuidance(rainSum7Day: number, waterAvailability: string): WaterGuidanceStatus {
  if (rainSum7Day > 25 || waterAvailability.includes('Good')) {
    return {
      level: 'GOOD',
      title: 'Adequate Moisture Outlook',
      description: 'Recent and expected rainfall combined with your water access indicates lower immediate crop water stress.',
      recommendations: [
        'Pause artificial irrigation to preserve energy and prevent waterlogging.',
        'Ensure field drainage channels are clear to release sudden heavy rainfall surges.'
      ]
    };
  } else if (rainSum7Day >= 10 || waterAvailability.includes('Moderate')) {
    return {
      level: 'MODERATE',
      title: 'Balanced Water Balance',
      description: 'Soil moisture is currently stable, but upcoming forecast should be monitored prior to heavy field operations.',
      recommendations: [
        'Monitor soil moisture at 10cm depth before scheduling secondary canal watering.',
        'Use field bunds to conserve incoming rainfall.'
      ]
    };
  } else {
    return {
      level: 'LIMITED',
      title: 'Conserve Water & Monitor Stress',
      description: 'Expected rainfall is low. Water availability should be prioritized according to critical crop phenology stages.',
      recommendations: [
        'Prioritize irrigation during critical stages (e.g. tillering or flowering).',
        'Consider mulching or alternate wetting and drying methods.'
      ]
    };
  }
}
