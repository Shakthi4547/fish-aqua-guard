import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, ChevronDown, ChevronUp, Clock, ThermometerIcon, DropletIcon, Utensils } from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <ThermometerIcon size={16} className="text-red-400" />;
      case 'ph':
        return <DropletIcon size={16} className="text-cyan-400" />;
      case 'feed':
        return <Utensils size={16} className="text-yellow-400" />;
      default:
        return <Bell size={16} className="text-blue-400" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'temperature':
        return 'bg-red-500 bg-opacity-10 border-red-500 border-opacity-20';
      case 'ph':
        return 'bg-cyan-500 bg-opacity-10 border-cyan-500 border-opacity-20';
      case 'feed':
        return 'bg-yellow-500 bg-opacity-10 border-yellow-500 border-opacity-20';
      default:
        return 'bg-blue-500 bg-opacity-10 border-blue-500 border-opacity-20';
    }
  };

  const dismissNotification = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };

  const activeNotifications = notifications.filter(notification => !dismissedIds.includes(notification.id));

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl h-full"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg mr-3">
              <Bell size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-blue-300 text-sm">{activeNotifications.length} new alerts</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-300 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 mt-2"
            >
              {activeNotifications.length === 0 ? (
                <div className="text-center py-6 text-blue-300">
                  <p>No new notifications</p>
                </div>
              ) : (
                activeNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`rounded-lg border px-4 py-3 flex items-start justify-between ${getNotificationBg(notification.type)}`}
                  >
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3">
                        {getIcon(notification.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-blue-200">{notification.message}</p>
                        <div className="flex items-center mt-1 text-xs text-blue-300">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="shrink-0 ml-2 bg-blue-900 bg-opacity-30 hover:bg-opacity-50 p-1.5 rounded-full transition-colors"
                    >
                      <Check size={14} className="text-blue-300" />
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;