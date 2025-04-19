import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DropletIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PhHistoryData } from '../types';

interface PhValueProps {
  value: number;
  history: PhHistoryData[];
}

const PhValue: React.FC<PhValueProps> = ({ value, history }) => {
  const [showGraph, setShowGraph] = useState(false);

  // Determine pH status
  const getPhStatus = () => {
    if (value < 6.5) return { text: 'Too Acidic', color: 'text-red-400' };
    if (value > 7.5) return { text: 'Too Alkaline', color: 'text-red-400' };
    return { text: 'Optimal', color: 'text-green-400' };
  };

  const status = getPhStatus();

  // Calculate gradient position based on pH level (5.5-8.5 range)
  const getPHGradientPosition = () => {
    const min = 5.5;
    const max = 8.5;
    const position = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, position)); // Clamp between 0-100
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl h-full"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-cyan-500 bg-opacity-20 p-2 rounded-lg mr-3">
              <DropletIcon size={24} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">pH Level</h2>
              <p className="text-blue-300 text-sm">Water acidity</p>
            </div>
          </div>
          <button 
            onClick={() => setShowGraph(!showGraph)}
            className="text-sm text-blue-300 hover:text-white transition-colors"
          >
            {showGraph ? 'Hide Graph' : 'Show Graph'}
          </button>
        </div>
        
        {!showGraph ? (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold">{value.toFixed(1)}</span>
              <span className={`text-sm ${status.color}`}>{status.text}</span>
            </div>
            
            <div className="relative h-8 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full mb-2 overflow-hidden">
              <div className="absolute inset-y-0 left-0 right-0 water-drop-bg"></div>
              <div 
                className="absolute top-0 w-5 h-5 bg-white rounded-full shadow-lg -ml-2.5 flex items-center justify-center"
                style={{ left: `${getPHGradientPosition()}%` }}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>5.5</span>
              <span>6.5</span>
              <span>7.0</span>
              <span>7.5</span>
              <span>8.5</span>
            </div>
            
            <div className="mt-4 text-sm text-blue-200">
              <p>Optimal pH range for most freshwater fish: 6.5-7.5</p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="h-64 mt-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={history}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <XAxis 
                  dataKey="time" 
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  domain={[5.5, 8.5]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderColor: 'rgba(6, 182, 212, 0.5)',
                    borderRadius: '0.5rem', 
                    color: '#E2E8F0'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 2, fill: '#0F172A' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#06B6D4' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PhValue;