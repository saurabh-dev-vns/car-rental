import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl w-full">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Error Code with Car Icon */}
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-6xl"
              >
                🚗
              </motion.div>
            </div>
            <h1 className="text-[180px] md:text-[220px] font-black text-gray-100 dark:text-gray-800/40 leading-none tracking-tighter">
              404
            </h1>
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Lost in the Road?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            The page you're looking for seems to have taken a wrong turn. 
            Don't worry, we'll help you navigate back!
          </motion.p>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 group-hover:-translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Homepage
            </Link>
          </motion.div>

          {/* Quick Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
          >
            {[
              { 
                to: '/models', 
                label: 'Browse Cars', 
                description: 'Explore our fleet',
                icon: '🚙',
                color: 'from-blue-500 to-cyan-400'
              },
              { 
                to: '/services', 
                label: 'Our Services', 
                description: 'Premium offerings',
                icon: '🔧',
                color: 'from-emerald-500 to-green-400'
              },
              { 
                to: '/contact', 
                label: 'Contact Us', 
                description: 'Get in touch',
                icon: '📞',
                color: 'from-purple-500 to-pink-400'
              },
              { 
                to: '/booking', 
                label: 'Book Now', 
                description: 'Reserve today',
                icon: '📅',
                color: 'from-red-500 to-orange-400'
              }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400">
                  {item.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </Link>
            ))}
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Still Can't Find What You Need?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our support team is here to help you 24/7
                </p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600 whitespace-nowrap"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;