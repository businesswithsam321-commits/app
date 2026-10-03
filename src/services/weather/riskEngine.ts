import { WeatherData, WeatherRisk } from '../../types/weather';

export function calculateWeatherRisks(weather: WeatherData): WeatherRisk[] {
  const risks: WeatherRisk[] = [];
  const { current, daily } = weather;

  // 1. Heavy Rainfall Risk Check
  const maxRainDay = daily.reduce((prev, curr) => (curr.precipitationSum > prev.precipitationSum ? curr : prev), daily[0]);
  if (maxRainDay && maxRainDay.precipitationSum >= 25) {
    risks.push({
      id: 'risk-heavy-rain',
      title: 'Heavy Rainfall Risk Indicator',
      severity: maxRainDay.precipitationSum >= 40 ? 'High' : 'Moderate',
      category: 'Heavy Rain',
      message: `Forecast indicates up to ${maxRainDay.precipitationSum} mm precipitation on ${maxRainDay.dayName}. Heavy rain may cause standing water in low-lying fields.`,
      triggerReason: `High rainfall forecast (${maxRainDay.precipitationSum} mm) + ${maxRainDay.precipitationProbability}% probability on ${maxRainDay.dayName}`,
      recommendedAction: 'Check field drainage channels, ensure bund outlets are clear, and delay scheduled fertilizer or chemical sprays.',
      createdAt: new Date().toLocaleDateString()
    });
  } else if (current.rainProbability >= 70 && current.precipitation >= 12) {
    risks.push({
      id: 'risk-moderate-rain',
      title: 'Moderate Rainfall Watch',
      severity: 'Moderate',
      category: 'Heavy Rain',
      message: `Current humidity (${current.humidity}%) and rain probability (${current.rainProbability}%) point to upcoming localized showers.`,
      triggerReason: `Rain probability (${current.rainProbability}%) + past 24h rain (${current.precipitation} mm)`,
      recommendedAction: 'Monitor low-lying plots and clear drainage ditches before evening.',
      createdAt: new Date().toLocaleDateString()
    });
  }

  // 2. Heat Stress Risk Check
  const maxTempDay = daily.reduce((prev, curr) => (curr.tempMax > prev.tempMax ? curr : prev), daily[0]);
  if (maxTempDay && maxTempDay.tempMax >= 36) {
    risks.push({
      id: 'risk-heat-stress',
      title: 'Heat Stress Indicator',
      severity: maxTempDay.tempMax >= 39 ? 'High' : 'Moderate',
      category: 'Heat Stress',
      message: `Maximum daytime temperature is forecast to reach ${maxTempDay.tempMax}°C on ${maxTempDay.dayName}. High temperatures increase soil evaporation and crop moisture demand.`,
      triggerReason: `Forecast max temperature (${maxTempDay.tempMax}°C) exceeds heat threshold (36°C)`,
      recommendedAction: 'Ensure adequate field irrigation where available, schedule sprays for early morning hours, and monitor crop moisture stress.',
      createdAt: new Date().toLocaleDateString()
    });
  }

  // 3. Dry Conditions Risk Check
  const total7DayRain = daily.reduce((acc, curr) => acc + curr.precipitationSum, 0);
  const avgMaxTemp = daily.reduce((acc, curr) => acc + curr.tempMax, 0) / (daily.length || 1);
  if (total7DayRain < 5 && avgMaxTemp >= 32) {
    risks.push({
      id: 'risk-dry-spell',
      title: 'Dry Condition Indicator',
      severity: 'Moderate',
      category: 'Dry Spells',
      message: `Low expected 7-day rainfall (${total7DayRain.toFixed(1)} mm total) combined with average max temperature of ${avgMaxTemp.toFixed(1)}°C may elevate soil water stress.`,
      triggerReason: `7-day rain sum (${total7DayRain.toFixed(1)} mm) below 5 mm threshold + elevated temperature (${avgMaxTemp.toFixed(1)}°C)`,
      recommendedAction: 'Prioritize crop water allocation, preserve soil moisture with mulching where practical, and plan supplementary irrigation.',
      createdAt: new Date().toLocaleDateString()
    });
  }

  // 4. High Humidity & Leaf Wetness Watch (Pest risk)
  if (current.humidity >= 78 && current.temperature >= 26) {
    risks.push({
      id: 'risk-humidity-pest',
      title: 'High Humidity Pest & Fungal Watch',
      severity: 'Information',
      category: 'Pest & Humidity',
      message: `High relative humidity (${current.humidity}%) paired with warm temperature (${current.temperature}°C) creates favorable conditions for leaf wetness and fungal pathogens.`,
      triggerReason: `Relative humidity (${current.humidity}%) + temperature (${current.temperature}°C)`,
      recommendedAction: 'Inspect crop leaves for early blast, sheath blight, or fungal spot symptoms before broadcasting nitrogen.',
      createdAt: new Date().toLocaleDateString()
    });
  }

  return risks;
}
