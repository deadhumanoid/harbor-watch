
import React from 'react';
import { RefreshCw, Waves } from 'lucide-react';

interface HeaderProps {
    lastUpdated: string;
    onRefresh: () => void;
    isRefreshing: boolean;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, isRefreshing }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex items-center">
        <Waves className="w-10 h-10 text-cyan-400" />
        <div className="ml-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Coastal Threat Decision Assist</h1>
          <p className="text-sm text-slate-400">Real-time monitoring for Mumbai Coastal Region</p>
        </div>
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="text-right mr-4">
            <p className="text-xs text-slate-400">Last updated</p>
            <p className="text-sm font-medium">{new Date(lastUpdated).toLocaleTimeString()}</p>
        </div>
        <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Refresh data"
        >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
