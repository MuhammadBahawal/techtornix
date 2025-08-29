import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiEye, 
  FiGlobe, 
  FiMonitor, 
  FiSmartphone, 
  FiTablet,
  FiActivity,
  FiTrendingUp
} from 'react-icons/fi';

const RealTimeAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    activeVisitors: 0,
    recentSessions: [],
    timestamp: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('http://techtornix.vercel.app/api/admin/analytics/realtime', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchAnalytics();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, []);

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'mobile':
        return FiSmartphone;
      case 'tablet':
        return FiTablet;
      default:
        return FiMonitor;
    }
  };

  const getDeviceColor = (device) => {
    switch (device) {
      case 'mobile':
        return 'text-green-400';
      case 'tablet':
        return 'text-blue-400';
      default:
        return 'text-purple-400';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FiActivity className="w-6 h-6 text-cyan-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Real-Time Analytics
          </h3>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Live
        </div>
      </div>

      {/* Active Visitors */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 mb-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cyan-100 text-sm font-medium">Active Visitors</p>
            <p className="text-3xl font-bold">{analytics.activeVisitors}</p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <FiUsers className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiEye className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          Recent Sessions
        </h4>

        {analytics.recentSessions.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analytics.recentSessions.map((session, index) => {
              const DeviceIcon = getDeviceIcon(session.device);
              return (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <DeviceIcon className={`w-5 h-5 ${getDeviceColor(session.device)}`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <FiGlobe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.country || 'Unknown'} 
                          {session.city && `, ${session.city}`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session.currentPage || 'Homepage'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(session.lastActivity).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {session.browser}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FiUsers className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active sessions</p>
          </div>
        )}
      </div>

      {/* Last Updated */}
      {analytics.timestamp && (
        <div className="text-center text-xs text-gray-400 border-t dark:border-gray-700 pt-4">
          Last updated: {new Date(analytics.timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default RealTimeAnalytics;
