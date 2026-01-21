import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star,
  Quote,
  ThumbsUp,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

// Helper components
const StatCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
    whileTap={{ scale: 0.95 }}
    layout
    className="text-center p-6 rounded-lg bg-gray-50 dark:bg-zinc-900 group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all border border-transparent dark:border-zinc-800 shadow-md"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex justify-center mb-4"
    >
      <Icon className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
    </motion.div>
    <div>
      <motion.h3
        animate={{ y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {value}
      </motion.h3>
      <p className="text-gray-600 dark:text-zinc-400">{label}</p>
    </div>
  </motion.div>
);

const HighlightCard = ({ title, count, color, bgColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, y: [0, -4, 0], rotate: [0, 1, -1, 0] }}
    whileTap={{ scale: 0.95 }}
    layout
    className={`${bgColor} rounded-xl p-6 text-center border border-transparent dark:border-zinc-800/50 shadow-md transition-all`}
  >
    <div className="flex flex-col items-center">
      <motion.h3
        className={`text-2xl font-bold mb-2 ${color}`}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {count.toLocaleString()}+
      </motion.h3>
      <motion.p
        animate={{ y: [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-gray-700 dark:text-zinc-300 font-medium"
      >
        {title}
      </motion.p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "/path/to/avatar1.jpg",
      rating: 5,
      comment:
        "The best car rental experience I've ever had! The process was seamless from start to finish. The car was immaculate and the customer service was exceptional.",
      carRented: "Tesla Model 3",
      date: "January 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Family Vacation",
      image: "/path/to/avatar2.jpg",
      rating: 5,
      comment:
        "Perfect for our family vacation! The SUV was spacious, clean, and well-maintained. The staff was incredibly helpful with car seat installation.",
      carRented: "Toyota Highlander",
      date: "December 2023",
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Weekend Getaway",
      image: "/path/to/avatar3.jpg",
      rating: 4,
      comment:
        "Great service and competitive prices. The pickup and drop-off process was quick and efficient. Will definitely use again!",
      carRented: "BMW 3 Series",
      date: "February 2024",
    },
  ];

  const stats = [
    { value: "15K+", label: "Happy Customers", icon: Users },
    { value: "4.9", label: "Average Rating", icon: Star },
    { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    { value: "24/7", label: "Customer Support", icon: MessageCircle },
  ];

  const reviewHighlights = [
    { title: "Exceptional Service", count: 2481, color: "text-green-500 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-900/20" },
    { title: "Clean Vehicles", count: 1938, color: "text-blue-500 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Easy Booking", count: 1756, color: "text-purple-500 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Great Value", count: 1542, color: "text-orange-500 dark:text-orange-400", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  ];

  useEffect(() => {
    if (!hovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovering]);

  const nextTestimonial = () => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevTestimonial = () => setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Star
          className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-zinc-700"}`}
        />
      </motion.div>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 pt-8 transition-colors duration-300">

      {/* Hero Section */}
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="text-center max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors duration-200">
              <Quote className="w-5 h-5 text-orange-500" />
              <span className="text-orange-700 dark:text-orange-400 font-medium">Customer Stories</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              What Our <span className="text-orange-500">Customers</span> Say
            </h1>

            <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed">
              Discover why thousands of customers choose us for their car rental needs and trust us with their travel experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-zinc-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial Section */}
      <section className="py-16" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <div className="container mx-auto px-4">
          <div className="relative">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1, y: [0, -6, 0], rotate: [0, 1, -1, 0] }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className={`rounded-2xl p-8 md:p-12 shadow-lg border transition-colors ${
                  activeIndex % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-orange-50 dark:bg-orange-900/20"
                }`}
              >
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <motion.div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 shadow-inner animate-pulse"
                    animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <User className="w-8 h-8 text-gray-500 dark:text-zinc-500" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-xl font-semibold dark:text-white">{testimonials[activeIndex].name}</h3>
                      <span className="text-gray-300 dark:text-zinc-700 hidden sm:inline">|</span>
                      <span className="text-gray-600 dark:text-zinc-400">{testimonials[activeIndex].role}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">{renderStars(testimonials[activeIndex].rating)}</div>

                    <p className="text-gray-600 dark:text-zinc-300 text-lg leading-relaxed mb-4 italic">
                      "{testimonials[activeIndex].comment}"
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-zinc-500">
                      <span className="bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        Car Rented: {testimonials[activeIndex].carRented}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>{testimonials[activeIndex].date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevTestimonial} className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-orange-200 dark:hover:border-orange-900/50 transition-all shadow-sm">
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextTestimonial} className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-orange-200 dark:hover:border-orange-900/50 transition-all shadow-sm">
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Animated Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <motion.span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${activeIndex === idx ? "bg-orange-500 dark:bg-orange-400 animate-pulse" : "bg-gray-300 dark:bg-zinc-700"}`}
                  layout
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Review Highlights Section */}
      <section className="py-16 bg-white dark:bg-zinc-950/50 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">What People Love About Us</h2>
            <p className="text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">See what aspects of our service customers appreciate the most</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewHighlights.map((highlight, index) => (
              <HighlightCard key={index} title={highlight.title} count={highlight.count} color={highlight.color} bgColor={highlight.bgColor} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn} 
            initial="initial" 
            whileInView="whileInView" 
            className="bg-orange-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl shadow-orange-500/20 hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Experience It Yourself?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-orange-100 font-medium">
              Join thousands of satisfied customers and book your perfect rental car today.
            </p>
            
            {/* --- FIX: Wrapped button in Link to /booking --- */}
            <Link to="/models">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="bg-white dark:bg-zinc-100 text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 dark:hover:bg-white transition-all shadow-lg"
              >
                Book Now
              </motion.button>
            </Link>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
