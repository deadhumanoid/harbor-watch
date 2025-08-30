
import React from 'react';
import { CycloneForecastData } from '../types';
import { Wind, Waves, Compass, Clock } from 'lucide-react';

interface CycloneForecastProps {
  data: CycloneForecastData;
}

const CycloneForecast: React.FC<CycloneForecastProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-3">
        <Wind className="w-6 h-6 text-red-500 mr-3" />
        <h3 className="text-lg font-semibold text-white">Cyclone Forecast</h3>
      </div>
      {data.active ? (
        <div className="space-y-3">
            <div className={`p-3 rounded-md bg-red-900/50 border border-red-700`}>
                <p className="text-xl font-bold text-center text-red-300">{data.name} - CAT {data.category}</p>
            </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start">
              <Wind className="w-4 h-4 mr-2 mt-0.5 text-slate-400" />
              <div>
                <p className="font-semibold text-white">{data.wind_speed_kph} kph</p>
                <p className="text-slate-400">Wind Speed</p>
              </div>
            </div>
            <div className="flex items-start">
              <Waves className="w-4 h-4 mr-2 mt-0.5 text-slate-400" />
              <div>
                <p className="font-semibold text-white">{data.expected_surge_meters} m</p>
                <p className="text-slate-400">Surge</p>
              </div>
            </div>
             <div className="flex items-start col-span-2">
              <Clock className="w-4 h-4 mr-2 mt-0.5 text-slate-400" />
              <div>
                <p className="font-semibold text-white">~{data.landfall_eta_hours} hours</p>
                <p className="text-slate-400">Est. Landfall</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mt-4 mb-2 text-slate-300">Affected Regions:</h4>
            <div className="flex flex-wrap gap-2">
              {data.affected_regions.map(region => (
                <span key={region} className="bg-slate-700 text-slate-200 text-xs font-medium px-2 py-1 rounded-full">
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-400 text-center py-8">No active cyclone threats.</p>
      )}
    </div>
  );
};

export default CycloneForecast;
