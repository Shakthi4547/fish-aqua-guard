import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, Fish, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-900 bg-opacity-40 backdrop-blur-lg border-b border-blue-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 text-white"
            >
              <Fish size={28} className="text-cyan-400" />
            </motion.div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">Fish Aqua Guard</h1>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Bell size={22} className="text-blue-200 hover:text-white transition-colors" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center notification-dot">
                  {notificationCount}
                </span>
              )}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center text-blue-200 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-1" />
              <span>Logout</span>
            </motion.button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-200 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-blue-900 bg-opacity-90 backdrop-blur-lg border-b border-blue-800"
        >
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center text-blue-200">
                <Bell size={20} className="mr-2" />
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-blue-200 py-2 w-full"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;