import { AquariumData } from '../types';

// Simulate fetching data from IoT devices/API
export const getAquariumData = (): Promise<AquariumData> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate temperature data for the last 24 hours
      const temperatureHistory = generateTemperatureData();
      const phHistory = generatePhData();
      
      // Current values
      const currentTemperature = temperatureHistory[temperatureHistory.length - 1].value;
      const feedLevel = Math.floor(Math.random() * 101); // Random value between 0-100
      const phValue = phHistory[phHistory.length - 1].value;
      
      // Generate notifications
      const notifications = generateNotifications(currentTemperature, phValue, feedLevel);
      
      resolve({
        temperatureHistory,
        currentTemperature,
        feedLevel,
        phValue,
        phHistory,
        notifications,
      });
    }, 800);
  });
};

// Generate sample temperature data
const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  
  // Base temperature around 26°C with some variation
  let temp = 26 + (Math.random() * 2 - 1);
  
  // Generate data points for the last 24 hours (1 per hour)
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    // Add some random variation but maintain a reasonable trend
    temp += (Math.random() * 0.6 - 0.3);
    
    // Keep temperature in a realistic range
    temp = Math.max(22, Math.min(29, temp));
    
    data.push({
      time: `${time.getHours()}:00`,
      value: parseFloat(temp.toFixed(1)),
    });
  }
  
  return data;
};

// Generate sample pH data
const generatePhData = () => {
  const data = [];
  const now = new Date();
  
  // Base pH around 7.0 with some variation
  let ph = 7.0 + (Math.random() * 0.6 - 0.3);
  
  // Generate data points for the last 24 hours (1 per hour)
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    // Add some random variation but maintain a reasonable trend
    ph += (Math.random() * 0.2 - 0.1);
    
    // Keep pH in a realistic range
    ph = Math.max(6.0, Math.min(8.0, ph));
    
    data.push({
      time: `${time.getHours()}:00`,
      value: parseFloat(ph.toFixed(1)),
    });
  }
  
  return data;
};

// Generate notifications based on current values
const generateNotifications = (temperature: number, ph: number, feedLevel: number) => {
  const notifications = [];
  const now = new Date();
  
  // Add temperature notification if out of optimal range
  if (temperature > 28 || temperature < 24) {
    notifications.push({
      id: 'temp-1',
      type: 'temperature',
      title: 'Temperature Alert',
      message: temperature > 28 
        ? `Water temperature is high (${temperature}°C). Consider cooling methods.` 
        : `Water temperature is low (${temperature}°C). Check heater functionality.`,
      time: formatTime(now),
      read: false,
    });
  }
  
  // Add pH notification if out of optimal range
  if (ph > 7.5 || ph < 6.5) {
    const timeAgo = new Date(now);
    timeAgo.setMinutes(now.getMinutes() - 15);
    
    notifications.push({
      id: 'ph-1',
      type: 'ph',
      title: 'pH Level Warning',
      message: ph > 7.5 
        ? `pH level is too alkaline (${ph}). Check water parameters.` 
        : `pH level is too acidic (${ph}). Monitor water conditions.`,
      time: formatTime(timeAgo),
      read: false,
    });
  }
  
  // Add feed notification if low
  if (feedLevel < 30) {
    const timeAgo = new Date(now);
    timeAgo.setHours(now.getHours() - 2);
    
    notifications.push({
      id: 'feed-1',
      type: 'feed',
      title: 'Feed Level Low',
      message: `Feed storage at ${feedLevel}%. Refill recommended.`,
      time: formatTime(timeAgo),
      read: false,
    });
  }
  
  // Add system notification for regular maintenance
  const timeAgo = new Date(now);
  timeAgo.setHours(now.getHours() - 8);
  
  notifications.push({
    id: 'system-1',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'Weekly water change recommended within the next 24 hours.',
    time: formatTime(timeAgo),
    read: false,
  });
  
  return notifications;
};

// Format time for notifications
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};