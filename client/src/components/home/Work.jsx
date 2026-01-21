import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  CircleHelp,
} from "lucide-react";

// --- 3D Tilt Card Component ---
const TiltCard = ({ step, index }) => {
  const ref = useRef(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the tilt
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform for rotation based on mouse position
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative group h-full w-full"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-8 
                   shadow-xl transition-all duration-300 isolate overflow-hidden"
      >
        {/* Shine/Glare Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.8), transparent 80%)`,
          }}
        />

        <div
          className="flex flex-col items-center text-center relative z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Icon Container */}
          <div
            className={`w-20 h-20 ${step.bgcolor} rounded-2xl flex items-center justify-center mb-6 
                       shadow-inner border border-white/20 dark:border-white/5 group-hover:scale-110 transition-transform duration-300`}
          >
            <step.icon
              className={`w-10 h-10 ${step.iconcolor} drop-shadow-md`}
            />
          </div>

          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
            {step.title}
          </h3>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm">
            {step.description}
          </p>
        </div>

        {/* Step Number Badge */}
        <div
          className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl 
                     flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20
                     border border-white/20"
          style={{ transform: "translateZ(80px)" }}
        >
          {index + 1}
        </div>

        {/* Completion Check Icon */}
        <div
          className="absolute bottom-4 right-4"
          style={{ transform: "translateZ(40px)" }}
        >
          <CheckCircle className="w-6 h-6 text-gray-300 dark:text-zinc-700 group-hover:text-green-500 transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

// --- 3D Tilt Button Component ---
const TiltButton = ({ onClick, children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = (mouseY / height - 0.5) * -20; // Max tilt 20deg
    const rY = (mouseX / width - 0.5) * 20;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95, translateY: 4 }}
      style={{ transform }}
      className="relative group inline-block"
    >
      <div
        className="relative z-10 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white 
                   rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30 
                   border-t border-white/20 overflow-hidden transform-style-3d"
      >
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
      </div>

      {/* 3D Depth Layer */}
      <div className="absolute inset-0 bg-orange-700 rounded-2xl translate-y-2 -z-10 transition-transform duration-100 ease-out group-active:translate-y-1" />
    </motion.button>
  );
};

const Work = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const steps = [
    {
      icon: Car,
      title: "Select Your Car",
      description:
        "Choose from our wide range of premium vehicles for any occasion",
      bgcolor: "bg-blue-50 dark:bg-blue-900/20",
      iconcolor: "text-blue-500",
    },
    {
      icon: MapPin,
      title: "Pick-up Location",
      description:
        "Select from our numerous convenient pick-up and drop-off locations",
      bgcolor: "bg-green-50 dark:bg-green-900/20",
      iconcolor: "text-green-500",
    },
    {
      icon: Calendar,
      title: "Pick-up Date",
      description:
        "Choose your rental duration and preferred pick-up timing",
      bgcolor: "bg-purple-50 dark:bg-purple-900/20",
      iconcolor: "text-purple-500",
    },
    {
      icon: CreditCard,
      title: "Make Payment",
      description: "Quick and secure payment with multiple payment options",
      bgcolor: "bg-orange-50 dark:bg-orange-900/20",
      iconcolor: "text-orange-500",
    },
  ];

  return (
    <section
      id="work-section"
      className="bg-gray-50/50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300 py-24 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const section = document.getElementById("work-section");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/50 dark:bg-orange-900/20 backdrop-blur-sm rounded-full mb-6
              cursor-pointer hover:bg-orange-200/50 dark:hover:bg-orange-800/30 border border-orange-200/50 dark:border-orange-700/30 transition-all duration-300"
          >
            <CircleHelp className="w-5 h-5 text-orange-500" />
            <span className="text-orange-700 dark:text-orange-400 font-medium">
              How It Works?
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Rent Your Dream Car in 4 Easy Steps
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            We've streamlined our rental process to get you on the road quickly
            and safely. Follow these simple steps to begin your journey with us.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 perspective-1000"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              className="h-full"
            >
              <TiltCard step={step} index={index} />

              {/* Connecting Line (Only for Desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-gray-300 dark:border-zinc-700 z-0"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 dark:text-zinc-400 mb-8 text-lg">
            Ready to get started? Book your dream car now!
          </p>

          <TiltButton onClick={() => navigate("/models")}>
            Book a Car Now
          </TiltButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;