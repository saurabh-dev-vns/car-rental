import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Briefcase, Fuel, Star } from "lucide-react";

const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors shadow-md hover:shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[85vh] overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl">
            {/* Car Image Section with Features Below */}
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{car.rating}</span>
                </div>
              </div>
              
              {/* Features Grid Below Image - Square Layout */}
              <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Seats</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.features.seats}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Briefcase className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Bags</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.features.luggage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Fuel className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Fuel Type</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.features.fuel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Rating</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.rating}/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Details Section - Features moved here */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wide rounded-full mb-3">
                    {car.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {car.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl md:text-3xl font-bold text-orange-500">
                      ${car.price}
                      <span className="text-sm md:text-base font-normal text-gray-500 dark:text-zinc-400">/day</span>
                    </p>
                  </div>
                </div>

                {/* Description/Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features & Specifications</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-600 dark:text-zinc-400">Premium {car.category} with spacious interior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-600 dark:text-zinc-400">{car.features.fuel} fuel type for optimal efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-600 dark:text-zinc-400">Comfortable seating for {car.features.seats} passengers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-600 dark:text-zinc-400">Ample storage for {car.features.luggage} bags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-600 dark:text-zinc-400">Top-rated vehicle with {car.rating}★ customer reviews</span>
                    </li>
                    {car.category === 'SUV' && (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-zinc-400">All-wheel drive capability for enhanced traction</span>
                      </li>
                    )}
                    {car.category === 'Luxury' && (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-zinc-400">Premium leather interior and advanced entertainment system</span>
                      </li>
                    )}
                    {car.category === 'Sports' && (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-zinc-400">High-performance engine with sport-tuned suspension</span>
                      </li>
                    )}
                    {car.features.fuel === 'Electric' && (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-zinc-400">Zero emissions with impressive range and fast charging</span>
                      </li>
                    )}
                    {car.features.fuel === 'Hybrid' && (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-zinc-400">Excellent fuel economy with electric motor assistance</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons - Positioned at the bottom */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
                <button
                  onClick={() => {
                    window.location.href = `/booking/${car.id}`;
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  Book Now
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-300 dark:border-zinc-700 rounded-xl font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarDetailModal;