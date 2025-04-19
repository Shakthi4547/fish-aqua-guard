import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Fish, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave" style={{ bottom: '10%', animationDuration: '15s' }}></div>
        <div className="wave" style={{ bottom: '5%', animationDuration: '10s', opacity: 0.6 }}></div>
        <div className="wave" style={{ bottom: '0%', animationDuration: '7s', opacity: 0.4 }}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="inline-flex items-center justify-center bg-blue-500 rounded-full p-3 mb-4"
          >
            <Fish size={36} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Fish Aqua Guard</h1>
          <p className="text-blue-200 mt-2">Sign in to monitor your aquarium</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500 bg-opacity-20 border border-red-400 text-white px-4 py-3 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-200 mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-blue-300" />
              </div>
              <input
                id="email"
                type="email"
                className="bg-blue-900 bg-opacity-30 border border-blue-700 text-white placeholder-blue-300 rounded-lg block w-full pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-blue-200 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-blue-300" />
              </div>
              <input
                id="password"
                type="password"
                className="bg-blue-900 bg-opacity-30 border border-blue-700 text-white placeholder-blue-300 rounded-lg block w-full pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </motion.button>
          
          <div className="mt-4 text-center text-sm text-blue-300">
            <span>Demo credentials: demo@example.com / password123</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;