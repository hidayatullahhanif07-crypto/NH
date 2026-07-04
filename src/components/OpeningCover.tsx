import React from 'react';
import { motion } from 'motion/react';
import { MailOpen, Sparkles } from 'lucide-react';

interface OpeningCoverProps {
  onOpen: () => void;
  guestName: string;
}

export default function OpeningCover({ onOpen, guestName }: OpeningCoverProps) {
  // Staggered children variants for elegant fade-in sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-cream-soft px-4 py-12 md:py-16 animate-slow-zoom-bg"
      style={{ minHeight: '100dvh' }}
      id="opening-cover"
    >
      {/* Background Marble Texture overlay */}
      <div className="absolute inset-0 marble-bg opacity-40 pointer-events-none" />

      {/* 1. SUNLIGHT RAYS: Soft solar glow behind the Card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(245,215,142,0.22)_0%,_rgba(126,200,227,0.08)_40%,_transparent_75%)] animate-sunray-pulse" />
      </div>

      {/* 2. SOFT CLOUDS: Drifting elegant ambient clouds */}
      <div className="absolute top-12 left-1/10 w-[600px] h-[250px] rounded-full bg-white/30 filter blur-[90px] pointer-events-none animate-cloud-drift" />

      {/* 3. SOFT MIST/FOG: Elegant mist rising from bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[30rem] bg-gradient-to-t from-white/30 via-sky-soft/10 to-transparent pointer-events-none filter blur-[110px] opacity-70 animate-fog-drift-1" />
      <div className="absolute inset-x-0 bottom-0 h-[24rem] bg-gradient-to-t from-sky-soft/20 via-pearl/10 to-transparent pointer-events-none filter blur-[90px] opacity-60 animate-fog-drift-2" />

      {/* 4. FLOATING PARTICLES & SPARKLES */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full animate-sparkle-blink shadow-[0_0_10px_#fff]"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 9) % 70}%`,
              animationDelay: `${i * 0.45}s`,
              animationDuration: `${3.5 + (i % 3) * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* 5. FLOATING FLORAL PETAL DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Sky blue soft petal 1 */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[8%] opacity-30 text-sky-primary"
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C65,30 100,50 50,100 C0,50 35,30 50,0 Z" />
          </svg>
        </motion.div>
        
        {/* Soft Gold petal 2 */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            rotate: [0, -35, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[18%] right-[10%] opacity-20 text-gold-accent"
        >
          <svg width="35" height="35" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C65,35 100,50 50,100 C0,50 35,35 50,0 Z" />
          </svg>
        </motion.div>

        {/* Sky blue soft petal 3 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0],
            rotate: [0, 20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[65%] left-[6%] opacity-25 text-sky-soft"
        >
          <svg width="30" height="30" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C65,30 100,50 50,100 C0,50 35,30 50,0 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Decorative Sky Blue & Silk Ornaments / Light Blobs in background corners */}
      <div className="absolute top-[-20%] left-[-25%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-sky-soft/15 to-transparent blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-sky-ice/25 to-transparent blur-3xl opacity-60 pointer-events-none" />

      {/* Double Border Outer Elegant Arch Frame */}
      <div className="absolute inset-4 md:inset-8 border border-sky-primary/15 pointer-events-none p-1 rounded-3xl z-10">
        <div className="w-full h-full border border-sky-primary/5 rounded-2xl flex justify-between items-start" />
      </div>

      {/* Beautiful Central Glass Container with Arch design, double borders, and premium animations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative bg-white/45 backdrop-blur-xl p-8 md:p-12 rounded-t-[200px] rounded-b-[60px] text-center flex flex-col items-center justify-center shadow-[0_30px_70px_rgba(26,54,93,0.15)] z-20 border border-slate-200/50 overflow-hidden light-sweep-container"
        style={{ maxWidth: '520px', width: '90%', margin: '0 auto' }}
        id="cover-card"
      >
        {/* Elegant Light Reflection Overlay / Shimmer on Card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-80 pointer-events-none" />
        {/* Thin Silver Inner Frame */}
        <div className="absolute inset-3 border border-slate-300/40 rounded-t-[188px] rounded-b-[48px] pointer-events-none" />
        {/* Soft Gold Inner Frame Accents */}
        <div className="absolute inset-4 border border-gold-accent/15 rounded-t-[184px] rounded-b-[44px] pointer-events-none" />

        {/* Monogram Circle */}
        <motion.div 
          variants={itemVariants}
          className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-sky-primary bg-white/90 shadow-lg mb-8 relative group z-10"
        >
          <div className="absolute inset-1 rounded-full border border-gold-accent/40" />
          <span className="font-playfair text-3xl font-light tracking-wide text-navy group-hover:scale-110 transition-transform duration-500">
            N <span className="text-sky-primary font-sans text-xl">♥</span> H
          </span>
        </motion.div>

        {/* Cinematic Header Text */}
        <motion.p 
          variants={itemVariants}
          className="font-poppins text-xs tracking-[0.35em] text-navy uppercase font-semibold mb-4 z-10 flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
          The Wedding of
          <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
        </motion.p>

        {/* Couple Names - Equalized, premium, glowing */}
        <motion.div variants={itemVariants} className="space-y-3 mb-8 z-10 w-full px-2">
          <h1 
            className="font-vibes text-navy tracking-wide animate-name-glow drop-shadow-[0_2px_15px_rgba(126,200,227,0.15)] leading-tight text-center"
            style={{ fontSize: "clamp(2.3rem, 6.5vw, 3.8rem)" }}
          >
            Nurin Fildza Azzahra
          </h1>
          <div className="font-playfair text-sm tracking-[0.25em] text-navy opacity-70 py-1">
            &
          </div>
          <h1 
            className="font-vibes text-navy tracking-wide animate-name-glow drop-shadow-[0_2px_15px_rgba(126,200,227,0.15)] leading-tight text-center"
            style={{ fontSize: "clamp(2.3rem, 6.5vw, 3.8rem)" }}
          >
            Hanif Hidayatullah
          </h1>
        </motion.div>

        {/* Separator line with small diamonds and silver style */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 w-1/2 justify-center mb-8 z-10">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-sky-primary/40" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-accent bg-white" />
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-sky-primary/40" />
        </motion.div>

        {/* Guest Information Panel */}
        <motion.div 
          variants={itemVariants}
          className="w-full p-6 rounded-2xl bg-white/70 border border-sky-soft/30 shadow-sm mb-8 backdrop-blur-sm z-10"
        >
          <p className="font-poppins text-[10px] tracking-[0.18em] text-navy opacity-80 uppercase font-bold mb-3">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <h2 className="font-playfair text-xl md:text-2xl font-semibold text-navy tracking-wide my-1 py-1 px-4 border-b border-sky-primary/20 inline-block min-w-[70%] text-shadow-sm">
            {guestName}
          </h2>
          <p className="font-poppins text-[9px] text-gray-400 mt-2.5 italic">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </motion.div>

        {/* Enter Invitation Luxury Button */}
        <motion.button
          variants={itemVariants}
          onClick={onOpen}
          className="relative px-10 py-4 bg-gradient-to-r from-sky-primary via-navy to-sky-primary text-white font-poppins text-xs tracking-widest uppercase font-semibold rounded-full shadow-lg hover:shadow-sky-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2.5 group cursor-pointer border border-white/40 z-10"
          id="btn-buka-undangan"
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          <MailOpen className="w-4 h-4 animate-bounce group-hover:animate-pulse text-gold-accent" />
          <span className="tracking-widest">Buka Undangan</span>
        </motion.button>
      </motion.div>

      {/* Decorative Footers */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 text-navy/40 font-playfair italic text-xs pointer-events-none z-10">
        <span>Nurin & Hanif Wedding</span>
      </div>
      <div className="absolute bottom-6 right-6 flex items-center gap-2 text-navy/40 font-poppins text-[10px] tracking-[0.2em] pointer-events-none z-10">
        <span>12 . 07 . 2026</span>
      </div>
    </div>
  );
}

