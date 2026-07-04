import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function CountdownSection() {
  const targetDateStr = "2026-07-12T08:00:00"; // Future target date
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft bokeh background lights
  const bokehs = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 80,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 10
  }));

  return (
    <section
      id="countdown"
      className="py-24 px-4 md:px-8 bg-cream-soft marble-bg relative overflow-hidden flex flex-col items-center justify-center border-b border-sky-primary/10"
    >
      {/* Animated Soft Bokeh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bokehs.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full bg-sky-soft/10 mix-blend-multiply filter blur-2xl"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-poppins text-[10px] tracking-[0.4em] text-sky-primary uppercase font-bold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
            Counting Down The Days
            <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
          </p>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-navy tracking-wide mb-4">
            The Blessed Countdown
          </h2>
          <div className="w-12 h-[1px] bg-sky-primary/60 mx-auto" />
        </div>

        {/* Premium Rounded Card with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-3xl w-full bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[50px] text-center shadow-[0_20px_50px_rgba(26,54,93,0.08)] border border-slate-200/60 overflow-hidden light-sweep-container"
          id="countdown-card-new"
        >
          {/* Silver & Soft Gold Thin Borders */}
          <div className="absolute inset-3 border border-slate-300/40 rounded-[38px] pointer-events-none" />
          <div className="absolute inset-4 border border-gold-accent/20 rounded-[34px] pointer-events-none" />

          <h3 className="font-playfair text-lg text-navy italic font-medium tracking-wide mb-8">
            Time Left Until Our Sacred Moment
          </h3>

          {/* Time counters */}
          <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-2xl mx-auto relative z-10">
            {/* Days */}
            <div className="bg-white/60 p-4 md:p-6 rounded-[30px] border border-slate-200/40 shadow-[0_8px_30px_rgba(26,54,93,0.02)] flex flex-col justify-center items-center transition-all duration-300 hover:scale-105">
              <span className="font-playfair text-3xl md:text-5xl font-bold text-navy tracking-tight drop-shadow-[0_2px_4px_rgba(126,200,227,0.15)]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-poppins text-[9px] md:text-xs text-sky-primary uppercase tracking-widest font-bold mt-2">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="bg-white/60 p-4 md:p-6 rounded-[30px] border border-slate-200/40 shadow-[0_8px_30px_rgba(26,54,93,0.02)] flex flex-col justify-center items-center transition-all duration-300 hover:scale-105">
              <span className="font-playfair text-3xl md:text-5xl font-bold text-navy tracking-tight drop-shadow-[0_2px_4px_rgba(126,200,227,0.15)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-poppins text-[9px] md:text-xs text-sky-primary uppercase tracking-widest font-bold mt-2">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-white/60 p-4 md:p-6 rounded-[30px] border border-slate-200/40 shadow-[0_8px_30px_rgba(26,54,93,0.02)] flex flex-col justify-center items-center transition-all duration-300 hover:scale-105">
              <span className="font-playfair text-3xl md:text-5xl font-bold text-navy tracking-tight drop-shadow-[0_2px_4px_rgba(126,200,227,0.15)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-poppins text-[9px] md:text-xs text-sky-primary uppercase tracking-widest font-bold mt-2">
                Min
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-white/60 p-4 md:p-6 rounded-[30px] border border-slate-200/40 shadow-[0_8px_30px_rgba(26,54,93,0.02)] flex flex-col justify-center items-center transition-all duration-300 hover:scale-105">
              <span className="font-playfair text-3xl md:text-5xl font-bold text-sky-primary tracking-tight drop-shadow-[0_2px_10px_rgba(126,200,227,0.3)] animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-poppins text-[9px] md:text-xs text-sky-primary uppercase tracking-widest font-extrabold mt-2">
                Sec
              </span>
            </div>
          </div>

          <div className="mt-8 text-navy/60 font-poppins text-[10px] tracking-widest uppercase">
            Sunday, 12 July 2026 • Ritz-Carlton Jakarta
          </div>
        </motion.div>
      </div>
    </section>
  );
}
