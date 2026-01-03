import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { SkeletonCard } from '../ui/Skeleton';

const MyBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Bookings
        </h3>
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 dark:text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No bookings yet
        </h3>
        <p className="text-gray-600 dark:text-zinc-400">
          You have not made any bookings yet. Start exploring our cars!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Bookings ({bookings.length})
      </h3>
      
      {bookings.map((booking, index) => (
        <motion.div
          key={booking._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-600"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {booking.carName}
              </h4>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-orange-500">
                ${booking.totalPrice}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-zinc-400 flex-shrink-0" />
              <div>
                <p className="text-gray-600 dark:text-zinc-400">Start Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500 dark:text-zinc-400 flex-shrink-0" />
              <div>
                <p className="text-gray-600 dark:text-zinc-400">End Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:col-span-2 lg:col-span-1">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-zinc-400 flex-shrink-0" />
              <div>
                <p className="text-gray-600 dark:text-zinc-400">Location</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {booking.location}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-600">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Booked on {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyBookings;