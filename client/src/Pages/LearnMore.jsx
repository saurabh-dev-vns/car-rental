import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Car,
  MapPin,
  CreditCard,
  Search,
  Calendar,
  Key,
  ThumbsUp,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const features = [
    {
      icon: CreditCard,
      title: "Affordable Pricing",
      description: "Competitive rates with no hidden fees. Get the best value for your money.",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: MapPin,
      title: "Flexible Locations",
      description: "Multiple pickup and drop-off points across the city for your convenience.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Car,
      title: "Diverse Fleet",
      description: "Choose from our wide range of vehicles including luxury, economy, and SUVs.",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you anytime, anywhere.",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  const benefits = [
    { value: "50+", label: "Car Models" },
    { value: "24/7", label: "Support" },
    { value: "98%", label: "Happy Clients" },
    { value: "150+", label: "Locations" },
  ];

  const steps = [
    {
      icon: Search,
      title: "Search & Compare",
      description: "Browse our collection and compare different vehicles.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Calendar,
      title: "Select Dates",
      description: "Choose your pickup and return dates.",
      color: "from-blue-500 to-green-500",
    },
    {
      icon: Key,
      title: "Quick Booking",
      description: "Easy and secure booking process.",
      color: "from-green-500 to-yellow-500",
    },
    {
      icon: ThumbsUp,
      title: "Start Driving",
      description: "Pick up your car and enjoy your journey.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 pt-8 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-4xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2
             bg-orange-100 dark:bg-orange-900/30
             rounded-full mb-8 cursor-pointer
             hover:bg-orange-200 dark:hover:bg-orange-800
             transition-all duration-300
             hover:shadow-[0_0_16px_rgba(249,115,22,0.35)]"
          >
        <Sparkles className="w-5 h-5 text-orange-500" />
          <span className="text-orange-700 dark:text-orange-400 font-medium">
            Discover More
          </span>
        </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Experience Premium Car Rental Service
            </h1>

            <p className="text-xl text-gray-600 dark:text-zinc-400 mb-12 leading-relaxed">
              Your journey begins with us — Comfortable, Reliable, and Affordable
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/models")}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium 
                         hover:bg-orange-600 transition-colors inline-flex items-center gap-2 shadow-lg shadow-orange-500/20">
                View Our Fleet
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contact")}
                  className="
                    px-8 py-4 rounded-lg font-medium
                    bg-transparent
                    text-orange-500
                    border border-orange-500/50
                    transition-all duration-300
                    hover:border-orange-500
                    hover:bg-orange-500/5
                    hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]
                    "
                  >
                    Contact Us
      </motion.button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-16 pb-16 bg-white dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg text-center group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all border border-transparent dark:border-zinc-800">
                <h3 className="text-3xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="white"
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Why Choose Us</h2>
            <p className="text-gray-600 dark:text-zinc-400">
              We offer the best car rental experience with premium features and services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.bgColor} rounded-xl p-8 hover:-translate-y-2 transition-all border border-transparent dark:border-zinc-800/50`}>
                <div className="mb-6">
                  <feature.icon className={`w-12 h-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">How It Works</h2>
            <p className="text-gray-600 dark:text-zinc-400">
              Get started with our simple and streamlined booking process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, ${step.color})`,
                    opacity: 0.1,
                  }}></div>
                <div className="relative bg-white dark:bg-zinc-900 rounded-xl p-8 border border-gray-100 dark:border-zinc-800 transition-colors shadow-sm">
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-6">
                    <step.icon className="w-12 h-12 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 dark:text-zinc-100">{step.title}</h3>
                  <p className="text-gray-600 dark:text-zinc-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
            <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
              <Zap className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">
                Ready to Hit the Road?
              </h2>
              <p className="text-xl mb-8 text-orange-100">
                Start your journey with our premium car rental service today
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/booking/1")}
                className="px-8 py-4 bg-white text-orange-500 rounded-lg font-bold 
                         hover:bg-orange-50 transition-colors inline-flex items-center gap-2 shadow-xl">
                <Car className="w-5 h-5" />
                Book a Ride Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;