import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  LogIn,
  Mail,
  Lock,
  ChevronRight,
  Car,
  Star,
  Shield,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { auth } from "./Firebase.js";
import { useNavigate, Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import useAuthStore from "../../store/store.js";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // Redirect logged-in users to /profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/profile");
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(result.user);
      navigate("/profile"); // go to profile after login
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/profile");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 flex transition-colors duration-300">
      
      {/* LEFT SECTION: UNCHANGED */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full p-12 flex flex-col justify-between z-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-16 group">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Car className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold">CarRental</span>
            </Link>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Your Journey
                  <br />
                  Begins Here
                </h1>
                <p className="text-orange-50/90 text-lg leading-relaxed max-w-md">
                  Experience premium car rental services with unlimited miles
                  and flexible pickup options.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                {[
                  { icon: Star, title: "Premium Fleet", desc: "Top-tier vehicles" },
                  { icon: Shield, title: "Secure Booking", desc: "Protected transactions" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/5">
                    <feature.icon className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-orange-50/80 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "100+", label: "Premium Cars" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, index) => (
                <div key={index}>
                  <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-orange-50/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SECTION: LOGIN FORM (UNCHANGED, FULL FORM) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden flex flex-col items-center gap-4 mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-50 dark:bg-zinc-900 p-2 rounded-lg group-hover:bg-orange-100 dark:group-hover:bg-zinc-800 transition-all">
                <Car className="w-8 h-8 text-orange-500" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-white">Car</span>
                <span className="text-orange-500">Rental</span>
              </span>
            </Link>
          </motion.div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">Login to Your Account</h2>
            <p className="text-gray-600 dark:text-zinc-400">
              Welcome back! Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                  placeholder="Enter your password"
                />
                <Lock className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200/50 dark:border-red-900/50">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* FORGOT PASSWORD */}
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 transition-colors font-medium">
                Forgot password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign in
            </motion.button>

            {/* OR */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors">
                  or
                </span>
              </div>
            </div>

            {/* GOOGLE SIGN-IN */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-100 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm flex items-center justify-center gap-2">
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-600 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 dark:text-orange-400 font-bold hover:text-orange-600 transition-colors inline-flex items-center gap-1">
              Sign up
              <ChevronRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </motion.div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
