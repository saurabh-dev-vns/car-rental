import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  UserPlus,
  Mail,
  Lock,
  ChevronRight,
  Car,
  Star,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Users,
} from "lucide-react";
import { auth } from "./Firebase.js";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/store.js";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      navigate("/profile");
    }
  });
  return () => unsubscribe();
}, [navigate, setUser]);


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert("Signed in with Google successfully!");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       formData.email,
  //       formData.password
  //     );
  //     setUser(userCredential.user);
  //     alert("Registration successful!");
  //   } catch (error) {
  //     setError("Registration failed. Please check your details and try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  // Password match check
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    //Firebase Email/Password Signup
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;
    setUser(user);

    console.log("Firebase signup success:", user.email);

    // Call backend to send greeting mail
    const res = await fetch("http://localhost:5000/api/mail/welcome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.email.split("@")[0], 
      }),
    });

    if (!res.ok) {
      console.warn("⚠️Signup done but mail failed");
    } else {
      console.log("📧Greeting mail sent successfully");
    }

    alert("Registration successful! Welcome 🎉");
    navigate("/profile");

  } catch (error) {
    console.error("Signup error:", error.code, error.message);

    // User-friendly messages
    if (error.code === "auth/email-already-in-use") {
      setError("Email already registered. Please login.");
    } else if (error.code === "auth/weak-password") {
      setError("Password must be at least 6 characters.");
    } else if (error.code === "auth/invalid-email") {
      setError("Invalid email address.");
    } else {
      setError("Registration failed. Please try again.");
    }
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 flex transition-colors duration-300">
      {/* Left Section: Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}></div>

          {/* Floating shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="relative w-full p-12 flex flex-col justify-between z-10">
          {/* Top Section */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-white mb-16 group">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Car className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold">CarRental</span>
            </Link>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Start Your
                  <br />
                  Journey Today
                </h1>
                <p className="text-orange-50/90 text-lg leading-relaxed max-w-md">
                  Join thousands of satisfied customers and experience our
                  premium car rental services.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {[
                  {
                    icon: Users,
                    title: "Easy Sign Up",
                    desc: "Quick registration process",
                  },
                  {
                    icon: Shield,
                    title: "Secure Account",
                    desc: "Protected personal data",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/5">
                    <feature.icon className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-orange-50/80 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4">
              <Star className="w-8 h-8 text-white" />
              <div>
                <h4 className="text-white font-semibold">
                  Trusted by Thousands
                </h4>
                <p className="text-orange-50/80 text-sm">
                  Join our growing community of car renters
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section: Register Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
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
            <h2 className="text-3xl font-bold mb-2 dark:text-white">Create Your Account</h2>
            <p className="text-gray-600 dark:text-zinc-400">
              Join us for the best car rental experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-4 top-3.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                  placeholder="Create a password"
                />
                <Lock className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors">
                  {showPassword.password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                  placeholder="Confirm your password"
                />
                <Lock className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors">
                  {showPassword.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200/50 dark:border-red-900/50">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create Account
            </motion.button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors">
                  or continue with
                </span>
              </div>
            </div>

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
              Sign up with Google
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 dark:text-orange-400 font-bold hover:text-orange-600 transition-colors inline-flex items-center gap-1">
              Sign in
              <ChevronRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
