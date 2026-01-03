import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import useAuthStore from '../store/store';
import MyBookings from '../components/Profile/MyBookings';
import { Skeleton } from '../components/ui/Skeleton';

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-zinc-400">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pt-28 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {user.displayName || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-zinc-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-zinc-700">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 sm:px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 px-4 sm:px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'bookings'
                    ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">My Bookings</span>
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-white">{user.displayName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Account Created
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(user.metadata.creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <MyBookings userId={user.uid} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;