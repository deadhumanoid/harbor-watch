
import { useState, useEffect } from 'react';
import { TideDataPoint, WaterQualityData, CycloneForecastData, CoastalData, AlertLevel } from '../types';
import { TIDE_DANGER_THRESHOLD, TIDE_WARNING_THRESHOLD } from '../constants';

// Simulates the Python data generation logic
const generateTideData = (): TideDataPoint[] => {
  const data: TideDataPoint[] = [];
  const now = new Date(2025, 7, 30, 12, 0, 0); // August 30, 2025, Noon
  const startTime = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago
  const intervalMinutes = 15;
  let currentTime = startTime;

  while (currentTime <= now) {
    const timeNumeric = (currentTime.getTime() - startTime.getTime()) / 1000;
    
    const baseTideLevel = 1.5;
    const diurnalAmplitude = 0.5;
    const semidiurnalAmplitude = 1.0;
    const seaLevelRiseRate = 0.003 / (365.25 * 24 * 3600);

    const diurnalTide = diurnalAmplitude * Math.sin(timeNumeric / (24 * 3600) * 2 * Math.PI);
    const semidiurnalTide = semidiurnalAmplitude * Math.sin(timeNumeric / (12.42 * 3600) * 2 * Math.PI + 1.5);
    const seaLevelTrend = seaLevelRiseRate * timeNumeric;
    const noise = (Math.random() - 0.5) * 0.2;
    
    let tide_height_meters = baseTideLevel + diurnalTide + semidiurnalTide + seaLevelTrend + noise;
    tide_height_meters = Math.round(tide_height_meters * 100) / 100;
    
    data.push({
      timestamp: currentTime.toISOString(),
      tide_height_meters,
    });
    currentTime = new Date(currentTime.getTime() + intervalMinutes * 60 * 1000);
  }
  return data;
};

const generateWaterQualityData = (currentTide: number): WaterQualityData => {
    const baseTemp = 28.5;
    const baseChloro = 8.0;
    
    const temp = parseFloat((baseTemp + Math.random() * 2 - 1).toFixed(1));
    const chlorophyll_a = parseFloat((baseChloro + Math.random() * 5).toFixed(1));

    let status: 'Clear' | 'Watch' | 'Warning' = 'Clear';
    if (chlorophyll_a > 20) {
        status = 'Warning';
    } else if (chlorophyll_a > 12) {
        status = 'Watch';
    }

    return { temperature: temp, chlorophyll_a, status };
};

const generateCycloneForecast = (currentTide: number): CycloneForecastData => {
    // Make cyclone active if tide is unusually high
    const active = currentTide > 2.8 || Math.random() > 0.8;
    if (!active) {
        return { active: false, name: '', category: 0, wind_speed_kph: 0, expected_surge_meters: 0, landfall_eta_hours: 0, affected_regions: [] };
    }
    return {
        active: true,
        name: 'Vayu',
        category: 2,
        wind_speed_kph: 130,
        expected_surge_meters: 1.5,
        landfall_eta_hours: 48,
        affected_regions: ['Mumbai', 'Alibag', 'Ratnagiri Coast']
    };
};

const calculateOverallAlertLevel = (tideHeight: number, waterQuality: WaterQualityData, cyclone: CycloneForecastData): AlertLevel => {
    if (cyclone.active || tideHeight + (cyclone.expected_surge_meters || 0) > TIDE_DANGER_THRESHOLD) {
        return AlertLevel.SEVERE;
    }
    if (tideHeight > TIDE_DANGER_THRESHOLD || waterQuality.status === 'Warning') {
        return AlertLevel.HIGH;
    }
    if (tideHeight > TIDE_WARNING_THRESHOLD || waterQuality.status === 'Watch') {
        return AlertLevel.MODERATE;
    }
    return AlertLevel.LOW;
};

export const useCoastalData = () => {
  const [data, setData] = useState<CoastalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    // Simulate API call delay
    setTimeout(() => {
      try {
        const tideData = generateTideData();
        const currentTideHeight = tideData[tideData.length - 1].tide_height_meters;
        const waterQuality = generateWaterQualityData(currentTideHeight);
        const cycloneForecast = generateCycloneForecast(currentTideHeight);
        const overallAlertLevel = calculateOverallAlertLevel(currentTideHeight, waterQuality, cycloneForecast);
        
        setData({
          tideData,
          waterQuality,
          cycloneForecast,
          overallAlertLevel,
          currentTideHeight
        });
      } catch (e) {
        setError("Failed to generate simulation data.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh data every minute
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refreshData: fetchData };
};
