
import React from 'react';
import { AlertLevel } from '../types';
import { ALERT_LEVEL_CONFIG } from '../constants';
import { AlertTriangle } from 'lucide-react';

interface AlertLevelIndicatorProps {
  level: AlertLevel;
}

const AlertLevelIndicator: React.FC<AlertLevelIndicatorProps> = ({ level }) => {
  const config = ALERT_LEVEL_CONFIG[level];

  return (
    <div className={`p-4 rounded-lg border-2 ${config.borderColor} bg-slate-800/50 flex items-center shadow-lg`}>
      <div className={`p-3 rounded-full ${config.color} mr-4`}>
        <AlertTriangle className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className={`text-sm font-bold uppercase tracking-wider ${config.textColor}`}>Current Threat Level</h2>
        <p className="text-2xl font-bold text-white">{config.label}</p>
        <p className="text-sm text-slate-300 mt-1">{config.description}</p>
      </div>
    </div>
  );
};

export default AlertLevelIndicator;
