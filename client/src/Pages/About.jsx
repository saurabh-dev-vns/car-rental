import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Car,
  CheckCircle,
  Award,
  Settings,
  Users,
  CreditCard,
  Clock,
  BarChart,
  PhoneCall,
  Calendar,
} from "lucide-react";

/* Reusable animation */
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

/* Feature cards data */
const featureCards = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Advanced security measures for safe transactions",
    color: "text-blue-400",
    glow: "rgba(59,130,246,0.6)",
    bg: "bg-blue-950/40",
  },
  {
    icon: Car,
    title: "Wide Selection",
    description: "Diverse fleet of vehicles for every need",
    color: "text-orange-400",
    glow: "rgba(249,115,22,0.6)",
    bg: "bg-orange-950/40",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
    color: "text-green-400",
    glow: "rgba(34,197,94,0.6)",
    bg: "bg-green-950/40",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Flexible and secure payment options",
    color: "text-purple-400",
    glow: "rgba(168,85,247,0.6)",
    bg: "bg-purple-950/40",
  },
];

/* Advanced features */
const advancedFeatures = [
  { icon: Clock, title: "Real-time Availability", color: "text-indigo-400" },
  { icon: Calendar, title: "Flexible Duration", color: "text-pink-400" },
  { icon: CreditCard, title: "Integrated Payments", color: "text-yellow-400" },
  { icon: BarChart, title: "Admin Analytics", color: "text-teal-400" },
  { icon: PhoneCall, title: "24/7 Support", color: "text-red-400" },
];

/* Stats */
const stats = [
  { value: "15K+", label: "Happy Customers" },
  { value: "150+", label: "Locations" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-10">

      {/* HERO */}
      <section className="py-20 text-center">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 mb-6">
            <Star className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-medium">About Us</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the Best in{" "}
            <span className="text-orange-400">Car Rentals</span>
          </h1>

          <p className="text-zinc-400 text-lg">
            Seamless, reliable, and modern car rentals designed for everyone.
          </p>
        </motion.div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-zinc-900/40">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-orange-400" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>

            <p className="text-zinc-400 mb-6">
              We aim to simplify car rentals through transparency, reliability,
              and a customer-first approach.
            </p>

            <ul className="space-y-4">
              {[
                "Easy booking experience",
                "Transparent pricing",
                "24/7 customer support",
                "Well-maintained fleet",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-zinc-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="bg-zinc-900 p-6 rounded-xl text-center shadow-lg"
              >
                <h3 className="text-3xl font-bold text-orange-400">
                  {stat.value}
                </h3>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Settings className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-zinc-400 mt-2">
              Designed for comfort, trust, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -16, rotateX: 8, rotateY: -8 }}
                transition={{ type: "spring", stiffness: 110, damping: 18 }}
                className="group relative rounded-2xl p-[1px] perspective-1000"
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${f.glow}, transparent 60%)`,
                  }}
                />

                {/* Card */}
                <div
                  className={`relative rounded-2xl p-6 h-full ${f.bg}
                  shadow-[0_25px_60px_rgba(0,0,0,0.6)]
                  transition-all duration-500`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.2, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="relative w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
                  >
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: f.glow }}
                    />
                    <div className="absolute inset-0 rounded-xl bg-white/10 blur-md" />
                    <f.icon className={`relative w-7 h-7 ${f.color}`} />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3">
                    {f.title}
                  </h3>
                  <p className="text-zinc-400">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ADVANCED FEATURES */}
          <div className="mt-28 text-center">
            <h3 className="text-2xl font-bold mb-10">Advanced Features</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h4 className="font-semibold">{f.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
