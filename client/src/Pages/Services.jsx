import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star,
  Shield,
  Car,
  Settings,
  Users,
  CreditCard,
  Clock,
  BarChart,
  PhoneCall,
  Calendar,
  CheckCircle,
  MapPin,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               Animation Configs                            */
/* -------------------------------------------------------------------------- */

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const cardReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: "easeOut", delay },
});

const cardHover = {
  whileHover: { scale: 1.03, y: -6 },
  transition: { duration: 0.25, ease: "easeOut" },
};

/* -------------------------------------------------------------------------- */
/*                               Helper Components                             */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <motion.div {...sectionFade} className="text-center mb-16">
    <div className="flex items-center justify-center gap-2 mb-4">
      {Icon && <Icon className="w-6 h-6 text-orange-500" />}
      <h2 className="text-3xl font-bold dark:text-white">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description, color, bgColor, delay }) => (
  <motion.div
    {...cardReveal(delay)}
    {...cardHover}
    className={`${bgColor} rounded-2xl p-8
      border border-transparent dark:border-zinc-800/60
      shadow-sm hover:shadow-lg`}
  >
    <Icon className={`w-9 h-9 mb-4 ${color}`} />
    <h3 className="text-xl font-semibold mb-2 dark:text-zinc-100">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-zinc-400">{description}</p>
  </motion.div>
);

const StepCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    {...cardReveal(delay)}
    {...cardHover}
    className="bg-white dark:bg-zinc-900 p-8 rounded-2xl
      border border-gray-200 dark:border-zinc-800 text-center"
  >
    <Icon className="w-10 h-10 mx-auto mb-4 text-orange-500" />
    <h4 className="text-xl font-semibold mb-2 dark:text-white">
      {title}
    </h4>
    <p className="text-gray-600 dark:text-zinc-400">{description}</p>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

const featureCards = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Advanced security measures for safe transactions",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Car,
    title: "Wide Selection",
    description: "Diverse fleet of vehicles for every need",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Flexible and secure payment options",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const advancedFeatures = [
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "Check car availability instantly with live updates",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: Calendar,
    title: "Flexible Duration",
    description: "Rent cars from hours to months with flexible terms",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    icon: BarChart,
    title: "Admin Analytics",
    description: "Comprehensive dashboards with insights",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    icon: PhoneCall,
    title: "Priority Support",
    description: "Dedicated support for premium users",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Choose Location",
    description: "Select pickup location and date",
  },
  {
    icon: Car,
    title: "Pick Your Car",
    description: "Browse and choose the perfect vehicle",
  },
  {
    icon: CheckCircle,
    title: "Confirm & Drive",
    description: "Pay securely and enjoy the ride",
  },
];

/* -------------------------------------------------------------------------- */
/*                               Main Component                                */
/* -------------------------------------------------------------------------- */

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 pt-10">
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...sectionFade} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Our Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Enjoy the Best Service in{" "}
              <span className="text-orange-500">Car Rentals</span>
            </h1>

            <p className="text-gray-600 dark:text-zinc-400 text-lg">
              Reliable, transparent, and customer-first car rental solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            icon={Settings}
            title="Main Services"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((item, idx) => (
              <ServiceCard key={idx} {...item} delay={idx * 0.08} />
            ))}
          </div>

          {/* How It Works */}
          <motion.div {...sectionFade} className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">
              How It Works
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <StepCard key={idx} {...step} delay={idx * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Premium Services */}
          <motion.div {...sectionFade} className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-16 dark:text-white">
              Premium Services
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((item, idx) => (
                <ServiceCard key={idx} {...item} delay={idx * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...sectionFade} className="mt-40 text-center">
            <h3 className="text-3xl font-bold mb-4 dark:text-white">
              Ready to Book Your Ride?
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 mb-8">
              Experience comfort, reliability, and transparent pricing.
            </p>

            <Link
              to="/models"
              className="inline-block px-8 py-3 rounded-xl font-medium
                border border-orange-500 text-orange-500
                hover:bg-orange-500 hover:text-white transition"
            >
              Explore Cars
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
