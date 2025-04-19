import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer } from 'lucide-react';
import { TemperatureData } from '../types';

interface TemperatureChartProps {
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const currentTemp = data[data.length - 1]?.value || 0;
  const tempStatus = currentTemp < 24 ? 'Low' : currentTemp > 28 ? 'High' : 'Optimal';
  const statusColor = tempStatus === 'Optimal' ? 'text-green-400' : tempStatus === 'High' ? 'text-red-400' : 'text-blue-400';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl overflow-hidden h-full"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg mr-3">
              <Thermometer size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Water Temperature</h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{currentTemp}°C</span>
                <span className={`ml-2 text-sm ${statusColor}`}>{tempStatus}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#94A3B8"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis 
                stroke="#94A3B8"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                domain={[20, 30]}
                ticks={[20, 22, 24, 26, 28, 30]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  borderRadius: '0.5rem', 
                  color: '#E2E8F0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: '#0F172A' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default TemperatureChart;