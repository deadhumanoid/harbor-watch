
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TideDataPoint } from '../types';
import { TIDE_DANGER_THRESHOLD, TIDE_WARNING_THRESHOLD } from '../constants';

interface TideChartProps {
  data: TideDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const time = new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return (
            <div className="bg-slate-800/80 backdrop-blur-sm p-3 rounded-md border border-slate-600">
                <p className="text-sm text-slate-300">{`Time: ${time}`}</p>
                <p className="text-base font-bold text-cyan-400">{`Tide: ${payload[0].value.toFixed(2)} m`}</p>
            </div>
        );
    }
    return null;
};

const TideChart: React.FC<TideChartProps> = ({ data }) => {
    const formattedData = data.map(d => ({
        ...d,
        timeLabel: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg h-96">
      <h3 className="text-lg font-semibold mb-4 text-white">Tide Level (Last 48 Hours)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 20, left: -10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            interval={Math.floor(formattedData.length / 8)}
            />
          <YAxis 
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            label={{ value: 'Height (m)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{paddingTop: '20px'}}/>
          <ReferenceLine y={TIDE_WARNING_THRESHOLD} label={{ value: "Warning", position: "right", fill: '#f59e0b' }} stroke="#f59e0b" strokeDasharray="3 3" />
          <ReferenceLine y={TIDE_DANGER_THRESHOLD} label={{ value: "Danger", position: "right", fill: '#ef4444' }} stroke="#ef4444" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="tide_height_meters" 
            name="Tide Height"
            stroke="#22d3ee" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TideChart;
