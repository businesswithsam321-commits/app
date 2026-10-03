import { MarketRecord } from '../../types/market';

/**
 * Clearly labelled demonstration market dataset for ClimateCheck prototype.
 * NOTE: These numbers are fictional demonstration values and must NOT be presented as live market prices.
 */
const generateDemoRecords = (): MarketRecord[] => {
  const records: MarketRecord[] = [];
  
  const commodities = [
    { name: 'Rice', variety: 'Common (Swarna)', baseMin: 2100, baseMax: 2400, baseModal: 2280, unit: '₹/quintal' },
    { name: 'Rice', variety: 'Fine (MTU 1010)', baseMin: 2350, baseMax: 2650, baseModal: 2500, unit: '₹/quintal' },
    { name: 'Wheat', variety: 'Sharbati', baseMin: 2250, baseMax: 2550, baseModal: 2400, unit: '₹/quintal' },
    { name: 'Maize', variety: 'Hybrid Yellow', baseMin: 1950, baseMax: 2200, baseModal: 2080, unit: '₹/quintal' },
    { name: 'Soybean', variety: 'Yellow (JS 20-34)', baseMin: 4200, baseMax: 4650, baseModal: 4420, unit: '₹/quintal' },
    { name: 'Pigeon Pea / Arhar', variety: 'Tur (Asha)', baseMin: 9200, baseMax: 10100, baseModal: 9650, unit: '₹/quintal' },
    { name: 'Chickpea', variety: 'Desi Gram', baseMin: 5100, baseMax: 5600, baseModal: 5350, unit: '₹/quintal' },
    { name: 'Tomato', variety: 'Hybrid Local', baseMin: 1400, baseMax: 1900, baseModal: 1650, unit: '₹/quintal' },
    { name: 'Potato', variety: 'Jyoti', baseMin: 1200, baseMax: 1550, baseModal: 1380, unit: '₹/quintal' },
    { name: 'Onion', variety: 'Red Nashik', baseMin: 2400, baseMax: 2900, baseModal: 2650, unit: '₹/quintal' },
  ];

  const locations = [
    { state: 'Chhattisgarh', district: 'Bilaspur', market: 'Bilaspur' },
    { state: 'Chhattisgarh', district: 'Bilaspur', market: 'Tiphra Sub-Mandi' },
    { state: 'Chhattisgarh', district: 'Raipur', market: 'Raipur (Fafadih)' },
    { state: 'Chhattisgarh', district: 'Durg', market: 'Durg APMC' },
    { state: 'Chhattisgarh', district: 'Rajnandgaon', market: 'Rajnandgaon Mandi' },
    { state: 'Chhattisgarh', district: 'Korba', market: 'Korba Central Mandi' },
    { state: 'Chhattisgarh', district: 'Ambikapur', market: 'Ambikapur Mandi' },
    { state: 'Chhattisgarh', district: 'Jagdalpur', market: 'Jagdalpur APMC' },
  ];

  // Dates covering recent 14 days up to Oct 03, 2026
  const dates = [
    '2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24',
    '2026-09-25', '2026-09-26', '2026-09-27', '2026-09-28', '2026-09-29',
    '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03'
  ];

  let idCounter = 1000;

  locations.forEach(loc => {
    commodities.forEach(c => {
      // Generate slight realistic variations per day
      let currentModal = c.baseModal;
      
      dates.forEach((dateStr, dateIdx) => {
        // Deterministic pseudo-random variation based on date index & commodity
        const delta = (Math.sin(dateIdx * 1.5 + c.baseMin) * 45) + ((dateIdx % 3 === 0 ? 30 : -20));
        currentModal = Math.round((c.baseModal + delta) / 10) * 10;
        const minPrice = currentModal - Math.round(120 + (dateIdx * 5));
        const maxPrice = currentModal + Math.round(150 + (dateIdx * 8));

        records.push({
          id: `demo-${idCounter++}`,
          commodity: c.name,
          variety: c.variety,
          state: loc.state,
          district: loc.district,
          market: loc.market,
          minPrice: Math.max(100, minPrice),
          maxPrice: maxPrice,
          modalPrice: currentModal,
          unit: c.unit,
          date: dateStr,
          dataType: 'demo',
          isDemo: true
        });
      });
    });
  });

  return records;
};

export const DEMO_MARKET_RECORDS: MarketRecord[] = generateDemoRecords();
