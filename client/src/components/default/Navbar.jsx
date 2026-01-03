import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Car,
  ChevronDown,
  User,
} from "lucide-react";
import { auth } from "../Auth/Firebase.js";
import { signOut } from "firebase/auth";
import useAuthStore from "../../store/store.js";
import ThemeToggle from "./ThemeToggle.jsx";
import Button from "../ui/Button.jsx"; // Fixed the path here

const Navbar = () => {
  const { user, setUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        logout();
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    setIsOpen(false);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setUser, logout, location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isLinkActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/models", label: "Models" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/team", label: "Our Team" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${scrolled
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
        }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* LEFT SIDE: Toggle + Logo */}
          <div className="flex items-center space-x-4">
            <ThemeToggle /> {/* Theme switch on the far left */}

            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold group">
              <Car className="w-8 h-8 text-orange-500 transform group-hover:scale-110 transition-transform" />
              <span className="text-gray-900 dark:text-white">Car</span>
              <span className="text-orange-500">Rental</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all hover:text-orange-500 relative
                  ${isLinkActive(item.path)
                    ? "text-orange-500"
                    : "text-gray-700 dark:text-zinc-300"
                  }
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-orange-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${isLinkActive(item.path) ? "after:w-full" : ""}`}>
                {item.label}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <Button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    variant="primary"
                    size="md"
                    className="flex items-center space-x-2"
                  >
                    <span>Account</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </Button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-zinc-800">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full px-4 py-2 text-left text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-500 transition-colors flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-500 transition-colors flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="flex items-center space-x-2 text-gray-700 dark:text-zinc-300 hover:text-orange-500 transition-all">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    size="md"
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 dark:text-zinc-300 hover:text-orange-500 transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-zinc-950 backdrop-blur-sm border-t dark:border-zinc-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-orange-500 
                    ${isLinkActive(item.path) ? "text-orange-500" : "text-gray-700 dark:text-zinc-300"}
                    p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-zinc-800 text-center`}>
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-zinc-700 space-y-3">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center space-x-2 p-3 text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-500 transition-colors rounded-lg">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-center space-x-2 w-full p-3 text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-500 transition-colors rounded-lg">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center space-x-2 p-3 text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-500 transition-colors rounded-lg">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <div className="px-2">
                        <Button
                          as={Link}
                          to="/register"
                          onClick={() => setIsOpen(false)}
                          variant="primary"
                          className="w-full justify-center"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Sign Up</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;