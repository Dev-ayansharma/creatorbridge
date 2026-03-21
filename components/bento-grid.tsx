"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, Command, BarChart3, Zap, Shield } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

function SystemStatus() {
  const [dots, setDots] = useState([true, true, true, false, true]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => prev.map(() => Math.random() > 0.2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {dots.map((active, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${
            active ? "bg-emerald-500" : "bg-zinc-700"
          }`}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function KeyboardCommand() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressed(true);
      setTimeout(() => setPressed(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <motion.kbd
        animate={pressed ? { scale: 0.95, y: 2 } : { scale: 1, y: 0 }}
        className="px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 font-mono"
      >
        ⌘
      </motion.kbd>
      <motion.kbd
        animate={pressed ? { scale: 0.95, y: 2 } : { scale: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 font-mono"
      >
        K
      </motion.kbd>
    </div>
  );
}

function AnimatedChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const points = [
    { x: 0, y: 60 },
    { x: 20, y: 45 },
    { x: 40, y: 55 },
    { x: 60, y: 30 },
    { x: 80, y: 40 },
    { x: 100, y: 15 },
  ];

  const pathD = points.reduce((acc, point, i) => {
    return i === 0
      ? `M ${point.x} ${point.y}`
      : `${acc} L ${point.x} ${point.y}`;
  }, "");

  return (
    <svg ref={ref} viewBox="0 0 100 70" className="w-full h-24">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {isInView && (
        <>
          <path
            d={`${pathD} L 100 70 L 0 70 Z`}
            fill="url(#chartGradient)"
            className="opacity-50"
          />
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            className="draw-line"
          />
        </>
      )}
    </svg>
  );
}

export function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ✅ hydration-safe mount check
  const [mounted, setMounted] = useState(false);

  // ✅ client-side random metrics
  const [metrics, setMetrics] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);

    const values = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 40 + 60));

    setMetrics(values);
  }, []);

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Everything you need to ship
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Built for modern teams. Powerful features that help you build,
            deploy, and scale faster than ever.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={mounted && isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* System Status */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                  <Activity className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Real-time Monitoring
                </h3>
                <p className="text-zinc-400 text-sm">
                  Track system health, performance metrics, and alerts in real-time.
                </p>
              </div>
              <SystemStatus />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {["CPU", "Memory", "Network", "Storage"].map((metric, i) => (
                <div key={metric} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {metrics[i] ?? "--"}%
                  </div>
                  <div className="text-xs text-zinc-500">{metric}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Other cards unchanged */}
          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <Command className="w-5 h-5 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Command Palette</h3>
            <KeyboardCommand />
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <BarChart3 className="w-5 h-5 text-zinc-400 mb-4" />
            <AnimatedChart />
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <Zap className="w-5 h-5 text-zinc-400 mb-4" />
            <span className="text-white">~32ms</span>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <Shield className="w-5 h-5 text-zinc-400 mb-4" />
            <span className="text-white">Enterprise Security</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
