
import React from 'react';
import { MapPin } from 'lucide-react';

const MapPlaceholder: React.FC = () => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg h-64 flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-2">Area Overview</h3>
      <div className="flex-grow bg-slate-700 rounded-md relative overflow-hidden">
        {/* Abstract landmass shape */}
        <div 
          className="absolute w-3/4 h-full bg-emerald-800/50"
          style={{
            clipPath: 'polygon(0 0, 60% 0, 100% 100%, 0% 100%)'
          }}
        ></div>
        {/* Abstract sea */}
         <div 
          className="absolute w-full h-full bg-blue-800/40"
          style={{
            clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 100% 100%)'
          }}
        ></div>
        
        {/* Markers */}
        <div className="absolute" style={{ top: '30%', left: '45%' }}>
          <MapPin className="w-6 h-6 text-red-500 fill-current" />
          <span className="text-xs text-white bg-slate-900/50 px-1 rounded -translate-x-1/3 absolute">Mumbai</span>
        </div>
        <div className="absolute" style={{ top: '60%', left: '70%' }}>
          <MapPin className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-xs text-white bg-slate-900/50 px-1 rounded -translate-x-1/3 absolute">Alibag</span>
        </div>
         <div className="absolute" style={{ top: '10%', left: '15%' }}>
          <MapPin className="w-5 h-5 text-green-400 fill-current" />
           <span className="text-xs text-white bg-slate-900/50 px-1 rounded -translate-x-1/3 absolute">Vasai</span>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
