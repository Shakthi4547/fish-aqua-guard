import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

interface FeedStorageProps {
  level: number; // 0-100
}

const FeedStorage: React.FC<FeedStorageProps> = ({ level }) => {
  // Determine colors based on level
  const getLevelClass = () => {
    if (level > 50) return 'feed-good';
    if (level > 25) return 'feed-medium';
    return 'feed-low';
  };

  const getLevelText = () => {
    if (level > 75) return 'Full';
    if (level > 50) return 'Good';
    if (level > 25) return 'Low';
    return 'Critical';
  };

  // Animation variants
  const barVariants = {
    initial: { width: 0 },
    animate: { width: `${level}%`, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl h-full"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-500 bg-opacity-20 p-2 rounded-lg mr-3">
            <Utensils size={24} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Feed Storage</h2>
            <p className="text-blue-300 text-sm">Current level</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold">{level}%</span>
            <span className={`text-sm ${level > 50 ? 'text-green-400' : level > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
              {getLevelText()}
            </span>
          </div>
          
          <div className="progress-bar-bg h-4 mb-6">
            <motion.div 
              className={`progress-bar h-full ${getLevelClass()}`}
              initial="initial"
              animate="animate"
              variants={barVariants}
            />
          </div>
          
          <div className="grid grid-cols-5 text-xs text-gray-400 mb-4">
            <div className="text-center">0%</div>
            <div className="text-center">25%</div>
            <div className="text-center">50%</div>
            <div className="text-center">75%</div>
            <div className="text-center">100%</div>
          </div>
          
          {level <= 25 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-900 bg-opacity-30 border border-red-800 text-white rounded-lg p-3 mt-4 text-sm"
            >
              <span className="font-medium">Low feed level alert!</span> Please refill soon to maintain regular feeding schedule.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedStorage;