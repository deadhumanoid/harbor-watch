
import React from 'react';

interface StatusCardProps {
  Icon: React.ReactNode;
  title: string;
  value: string | number;
  unit: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ Icon, title, value, unit }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg flex items-center">
      <div className="p-3 rounded-full bg-slate-700 mr-4">
        {Icon}
      </div>
      <div>
        <h4 className="text-sm text-slate-400 font-medium">{title}</h4>
        <p className="text-2xl font-bold text-white">
          {value} <span className="text-base font-normal text-slate-300">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
