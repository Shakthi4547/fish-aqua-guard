import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import TemperatureChart from '../components/TemperatureChart';
import FeedStorage from '../components/FeedStorage';
import PhValue from '../components/PhValue';
import NotificationPanel from '../components/NotificationPanel';
import { getAquariumData } from '../utils/aquariumData';
import { AquariumData } from '../types';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<AquariumData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from an API endpoint
        const aquariumData = await getAquariumData();
        setData(aquariumData);
      } catch (error) {
        console.error('Failed to fetch aquarium data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-300 mb-4"></div>
          <p className="text-blue-300">Loading your aquarium data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 md:p-6 overflow-hidden">
        <div className="mb-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold"
          >
            Welcome back, {user?.name || 'User'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-blue-300"
          >
            Here's your aquarium status at a glance
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <TemperatureChart data={data.temperatureHistory} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FeedStorage level={data.feedLevel} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PhValue value={data.phValue} history={data.phHistory} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <NotificationPanel notifications={data.notifications} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;