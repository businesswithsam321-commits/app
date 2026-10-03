export interface GeocodingResult {
  name: string;
  admin1?: string; // State
  country?: string;
  latitude: number;
  longitude: number;
}

export class GeocodingService {
  async searchLocation(query: string): Promise<GeocodingResult[]> {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      
      if (!data.results) return [];

      return data.results.map((item: any) => ({
        name: item.name,
        admin1: item.admin1 || 'Chhattisgarh',
        country: item.country || 'India',
        latitude: item.latitude,
        longitude: item.longitude
      }));
    } catch (err) {
      console.warn("Geocoding API error:", err);
      return [];
    }
  }

  async reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const city = data.city || data.locality || data.principalSubdivision || 'Bilaspur';
        const state = data.principalSubdivision || 'Chhattisgarh';
        return `${city}, ${state}`;
      }
    } catch (e) {
      // Fallback
    }
    return `Bilaspur, Chhattisgarh`;
  }
}

export const geocodingService = new GeocodingService();
