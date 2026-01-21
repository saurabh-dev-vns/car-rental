import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Car,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Custom X (Twitter) Icon Component
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { Icon: XIcon, href: "#", color: "hover:bg-black" },
    { Icon: Instagram, href: "#", color: "hover:bg-pink-600" },
    { Icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Car Models", path: "/models" },
    { label: "Services", path: "/services" },
    { label: "Contact Us", path: "/contact" },
  ];

  const workingHours = [
    { day: "Mon - Fri", hours: "9:00AM - 9:00PM" },
    { day: "Saturday", hours: "9:00AM - 7:00PM" },
    { day: "Sunday", hours: "10:00AM - 6:00PM" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 text-gray-600 dark:text-zinc-400 pt-16 pb-8 relative overflow-hidden transition-colors duration-300 border-t border-gray-200 dark:border-zinc-900">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 dark:opacity-10 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <Car className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-white">Car</span>
                <span className="text-orange-500">Rental</span>
              </span>
            </Link>
            <p className="leading-relaxed">
              Your trusted partner for car rentals. Experience premium service with unlimited miles and flexible pick-up options at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center ${color} hover:text-white transition-all duration-300 shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group hover:text-orange-500 transition-colors inline-flex items-center space-x-2"
                  >
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-200 dark:border-zinc-800"></div>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Working Hours</h3>
            <ul className="space-y-4">
              {workingHours.map((schedule, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-zinc-500">{schedule.day}</span>
                    <span className="block text-gray-900 dark:text-white font-medium">{schedule.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform" />
                <span className="hover:text-orange-500 transition-colors">+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="hover:text-orange-500 transition-colors">info@carrental.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>123 Car Street, Auto City, AC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Newsletter</h3>
            <p className="text-gray-500 dark:text-zinc-400">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  {isSubscribed ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900/30"
            >
              <p className="text-sm">
                🎉 <span className="text-orange-600 dark:text-orange-400 font-semibold">Special Offer:</span> 
                <span className="text-gray-700 dark:text-zinc-300"> Get 15% off your first rental!</span>
              </p>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-gray-500 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} CarRental. All rights reserved. Built with ❤️ for a better car rental experience.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;