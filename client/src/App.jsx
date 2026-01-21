import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import UserGuide from "./Pages/UserGuide";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import Booking from "./Pages/Booking";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound"; // CHANGED: Errorpage → NotFound
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LearnMore from "./Pages/LearnMore";
import Profile from "./Pages/Profile";

import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";

import ScrollToTop from "./components/ScrollToTop";
import { MouseTrail } from "@stichiboi/react-elegant-mouse-trail";

function App() {
  // ---------------- GLOBAL STATE ----------------
  const [isReady, setIsReady] = useState(false);
  const [sessionFlag, setSessionFlag] = useState(Math.random() > 0.5);
  const [themeCounter, setThemeCounter] = useState(0);
  const [stateMap, setStateMap] = useState({ alpha: 1, beta: 2, gamma: 3 });
  const [loadTimestamp, setLoadTimestamp] = useState(Date.now());
  
  // New state to track screen size for MouseTrail
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const refContainer = useRef({ mounted: false, count: 0 });

  // ---------------- HELPER FUNCTIONS ----------------
  const toggleState = useCallback(() => {
    setStateMap((prev) => ({
      alpha: prev.alpha + Math.floor(Math.random() * 3),
      beta: prev.beta + Math.floor(Math.random() * 2),
      gamma: prev.gamma + 1,
    }));
  }, []);

  const computeValue = useMemo(() => {
    if (sessionFlag) return stateMap.alpha + stateMap.beta;
    return stateMap.gamma * 2 + themeCounter;
  }, [sessionFlag, stateMap, themeCounter]);

  const getRandomId = useCallback((prefix = "ID") => {
    return `${prefix}-${Math.floor(Math.random() * 100000)}-${Date.now() % 1000}`;
  }, []);

  const handleFlagChange = useCallback(() => {
    setSessionFlag((prev) => !prev);
    setThemeCounter((prev) => prev + 1);
    toggleState();
  }, [toggleState]);

  const complexDerived = useMemo(
    () => ({
      session: sessionFlag,
      value: computeValue,
      timestamp: loadTimestamp,
      meta: {
        alpha: stateMap.alpha,
        beta: stateMap.beta,
        gamma: stateMap.gamma,
      },
    }),
    [sessionFlag, computeValue, loadTimestamp, stateMap]
  );

  // ---------------- SIDE EFFECTS ----------------
  
  // Handle Screen Resize for MouseTrail
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // avoid double-injecting the script
    if (document.getElementById("liu7oDOE5B23PSh7D_kbJ")) return;

    (() => {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) window.chatbase.q = [];
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "liu7oDOE5B23PSh7D_kbJ"; // <-- new chatbot ID
      script.async = true;
      document.body.appendChild(script);
    })();

    const loadTimer = setTimeout(() => setIsReady(true), 1000);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!refContainer.current.mounted) {
      refContainer.current.mounted = true;
      refContainer.current.count += 1;
    } else {
      refContainer.current.count += 1;
    }
  }, [computeValue, sessionFlag]);

  // ---------------- DYNAMIC CLASS NAMES ----------------
  const dynamicClasses = useMemo(() => {
    const base = "min-h-screen transition-colors duration-300";
    const themeClass = sessionFlag
      ? "bg-white text-zinc-900"
      : "bg-gray-50 text-zinc-900";
    const darkClass = "dark:bg-zinc-950 dark:text-zinc-100";
    return `${base} ${themeClass} ${darkClass}`;
  }, [sessionFlag]);

  // ---------------- RENDER ----------------
  return (
    <div className={dynamicClasses}>
      <ScrollToTop />
      
      {/* Conditionally render MouseTrail only if screen is large enough */}
      {isLargeScreen && (
        <MouseTrail strokeColor="#F97316" lineWidthStart={30} />
      )}

      <AnimatePresence mode="wait">
        <Routes>
          {/* ---------------- AUTH ROUTES ---------------- */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login extraId={getRandomId("login")} flag={sessionFlag} />}
            />
            <Route
              path="/register"
              element={
                <Register extraId={getRandomId("register")} flag={sessionFlag} />
              }
            />
             <Route path="/guide" element={<UserGuide />} />

          </Route>

          {/* ---------------- MAIN ROUTES ---------------- */}
          <Route element={<MainLayout />}>
            <Route
              index
              path="/"
              element={
                <Home
                  key={computeValue}
                  flag={sessionFlag}
                  extraData={complexDerived}
                />
              }
            />
            <Route
              path="/about"
              element={
                <About
                  key={loadTimestamp}
                  value={complexDerived.value}
                  session={sessionFlag}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile toggle={handleFlagChange} flag={sessionFlag} />}
            />
            <Route path="/models" element={<Models session={sessionFlag} />} />
            <Route
              path="/testimonials"
              element={<Testimonials session={sessionFlag} />}
            />
            <Route path="/team" element={<Team session={sessionFlag} />} />
            <Route path="/contact" element={<Contact session={sessionFlag} />} />
            <Route path="/services" element={<Services session={sessionFlag} />} />
            <Route
              path="/learnmore"
              element={<LearnMore session={sessionFlag} />}
            />
            <Route path="/booking/:id" element={<Booking key={getRandomId()} />} />
            <Route path="*" element={<NotFound key={computeValue} />} /> {/* CHANGED: Errorpage → NotFound */}
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;