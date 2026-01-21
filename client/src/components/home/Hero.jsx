import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Car,
  CheckCircle,
  ChevronRight,
  Star,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";
import { assets } from "../../assets/assets";
import Car3DModel from "../home/Car3DModel";

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const features = [
    { icon: Shield, text: "Fully Insured" },
    { icon: Clock, text: "24/7 Support" },
    { icon: CreditCard, text: "Flexible Payment" },
  ];

  const stats = [
    { value: "50+", label: "Car Models" },
    { value: "98%", label: "Happy Clients" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gray-50/50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container flex flex-col h-auto p-8 sm:p-16 relative w-full mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 lg:max-w-lg"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            style={{ y, opacity }}
          >
            {/* --- MOVED BADGE: Best Prices --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6 w-fit bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg shadow-orange-500/30 font-bold border border-white/10 backdrop-blur-sm"
            >
              Best Prices Guaranteed
            </motion.div>

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-100/50 dark:bg-orange-900/20 backdrop-blur-md border border-orange-200/50 dark:border-orange-700/30 rounded-full transition-all hover:bg-orange-200/50 dark:hover:bg-orange-800/30">
              <Star className="text-orange-500 w-5 h-5 fill-orange-500" />
              <span className="text-orange-700 dark:text-orange-400 font-medium text-sm">
                Premium Car Rental Service
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400 tracking-tight">
              Save <span className="text-orange-500">big</span> with our{" "}
              <span className="text-orange-500">car rental</span>
            </h1>

            <p className="text-gray-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed transition-colors max-w-md">
              Experience the freedom of the open road with our premium car rental
              service. Unbeatable prices, unlimited miles, and flexible pick-up
              options.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/models")}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl
                            hover:shadow-xl hover:shadow-orange-500/30 transition-all font-bold group"
              >
                <span>Book Ride</span>
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/learnmore")}
                className="
                    flex items-center gap-3 px-8 py-4 rounded-xl
                    bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md
                    text-gray-900 dark:text-white font-semibold
                    border border-gray-200 dark:border-zinc-800
                    transition-all duration-300
                    hover:border-orange-500/50 hover:bg-white/80 dark:hover:bg-zinc-800/80
                    hover:shadow-lg
                    group
                    "
              >
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            {/* Icon Features Section */}
            <div className="flex flex-wrap gap-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 backdrop-blur-sm transition-all hover:bg-white/50 dark:hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-gray-700 dark:text-zinc-300 font-medium text-sm">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Counters */}
            <div className="flex flex-wrap gap-12 border-t border-gray-200/50 dark:border-zinc-800 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-500 font-medium text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Section: 3D Model & Floating Cards */}
          <motion.div
            className="flex-1 lg:flex-[1.2] relative w-full h-[600px] lg:h-[800px] perspective-1000"
            initial="initial"
            animate="animate"
            variants={slideIn}
          >
            {/* 3D Car Model Component - Centered perfectly */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
               <Car3DModel />
            </div>

            {/* Floating Card: Latest Models - Enhanced Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute lg:bottom-20 lg:-right-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/40 dark:border-white/10 z-20 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
                  <Car className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg dark:text-white leading-none mb-1">
                    Latest Models
                  </p>
                  <p className="text-xs font-medium text-orange-500 uppercase tracking-wider">
                    Premium Selection
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;