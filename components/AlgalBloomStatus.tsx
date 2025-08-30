
import React from 'react';
import { Microscope } from 'lucide-react';

type AlgalBloomStatusType = 'Clear' | 'Watch' | 'Warning';

interface AlgalBloomStatusProps {
  status: AlgalBloomStatusType;
}

const STATUS_CONFIG = {
  Clear: {
    label: 'Clear',
    color: 'text-green-400',
    bgColor: 'bg-green-900/50',
    borderColor: 'border-green-700',
    description: 'No significant algal activity detected.',
  },
  Watch: {
    label: 'Watch',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/50',
    borderColor: 'border-yellow-700',
    description: 'Conditions favorable for bloom formation.',
  },
  Warning: {
    label: 'Warning',
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/50',
    borderColor: 'border-orange-700',
    description: 'High concentration of algae detected.',
  },
};

const AlgalBloomStatus: React.FC<AlgalBloomStatusProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-3">
        <Microscope className="w-6 h-6 text-cyan-400 mr-3" />
        <h3 className="text-lg font-semibold text-white">Algal Bloom Status</h3>
      </div>
      <div className={`p-3 rounded-md text-center ${config.bgColor} border ${config.borderColor}`}>
        <p className={`text-xl font-bold ${config.color}`}>{config.label}</p>
        <p className="text-sm text-slate-300 mt-1">{config.description}</p>
      </div>
    </div>
  );
};

export default AlgalBloomStatus;
