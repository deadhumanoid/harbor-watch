
export enum AlertLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  SEVERE = 'SEVERE',
}

export interface TideDataPoint {
  timestamp: string;
  tide_height_meters: number;
}

export interface WaterQualityData {
  chlorophyll_a: number; // in µg/L
  temperature: number; // in Celsius
  status: 'Clear' | 'Watch' | 'Warning';
}

export interface CycloneForecastData {
  active: boolean;
  name: string;
  category: number;
  wind_speed_kph: number;
  expected_surge_meters: number;
  landfall_eta_hours: number;
  affected_regions: string[];
}

export interface CoastalData {
  tideData: TideDataPoint[];
  waterQuality: WaterQualityData;
  cycloneForecast: CycloneForecastData;
  overallAlertLevel: AlertLevel;
  currentTideHeight: number;
}
