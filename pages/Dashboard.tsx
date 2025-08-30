
import React from 'react';
import { useCoastalData } from '../hooks/useCoastalData';
import Header from '../components/Header';
import AlertLevelIndicator from '../components/AlertLevelIndicator';
import TideChart from '../components/TideChart';
import StatusCard from '../components/StatusCard';
import CycloneForecast from '../components/CycloneForecast';
import AlgalBloomStatus from '../components/AlgalBloomStatus';
import MapPlaceholder from '../components/MapPlaceholder';
import { RefreshCw, Thermometer, Droplet, Wind } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data, loading, error, refreshData } = useCoastalData();

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 mx-auto animate-spin text-cyan-400" />
          <p className="mt-4 text-lg">Initializing Decision Support System...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (!data) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <Header lastUpdated={data.tideData[data.tideData.length - 1].timestamp} onRefresh={refreshData} isRefreshing={loading}/>
      <main className="mt-6">
        <AlertLevelIndicator level={data.overallAlertLevel} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-6">
            <TideChart data={data.tideData} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatusCard 
                  Icon={<Droplet className="w-8 h-8 text-blue-400" />}
                  title="Current Tide Height"
                  value={data.currentTideHeight.toFixed(2)}
                  unit="meters"
                />
                 <StatusCard 
                  Icon={<Thermometer className="w-8 h-8 text-orange-400" />}
                  title="Water Temperature"
                  value={data.waterQuality.temperature.toFixed(1)}
                  unit="°C"
                />
                 <StatusCard 
                  Icon={<div className="w-8 h-8 text-emerald-400 font-bold text-lg">ChA</div>}
                  title="Chlorophyll-a"
                  value={data.waterQuality.chlorophyll_a.toFixed(1)}
                  unit="µg/L"
                />
                 <StatusCard 
                  Icon={<Wind className="w-8 h-8 text-slate-400" />}
                  title="Wind Speed"
                  value={data.cycloneForecast.active ? data.cycloneForecast.wind_speed_kph : "5"}
                  unit="kph"
                />
            </div>
          </div>
          {/* Right Sidebar */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <CycloneForecast data={data.cycloneForecast} />
            <AlgalBloomStatus status={data.waterQuality.status} />
            <MapPlaceholder />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
