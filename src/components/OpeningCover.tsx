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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-cream-soft px-4 py-8"
      style={{ minHeight: '100dvh' }}
      id="opening-cover"
    >
      {/* 1. HD BACKGROUND IMAGE WITH KEN BURNS SLOW ZOOM EFFECT */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center animate-slow-zoom pointer-events-none"
        style={{ 
          backgroundImage: `url('https://raw.githubusercontent.com/hidayatullahhanif07-crypto/NH/main/Gambar/file_0000000094b47209b2311369afcb8f5f.png')`
        }} 
      />

      {/* 2. ELEGANT 18% WHITE OVERLAY FOR SUPERIOR CONTRAST */}
      <div className="absolute inset-0 bg-white/18 z-0 pointer-events-none" />

      {/* Background Marble Texture overlay */}
      <div className="absolute inset-0 marble-bg opacity-30 pointer-events-none z-0" />

      {/* 3. ATMOSPHERIC CAHAYA (Light Rays from above) */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.45)_0%,_rgba(255,255,255,0.05)_50%,_transparent_100%)] pointer-events-none z-0 mix-blend-overlay animate-pulse" style={{ animationDuration: '8s' }} />

      {/* 4. SOFT CLOUDS: Drifting elegant ambient clouds */}
      <div className="absolute top-12 left-1/10 w-[600px] h-[250px] rounded-full bg-white/20 filter blur-[90px] pointer-events-none animate-cloud-drift z-0" />

      {/* 5. SOFT MIST/FOG: Elegant mist rising from bottom to top */}
      <div className="absolute inset-x-0 bottom-0 h-[28rem] bg-gradient-to-t from-white/35 via-sky-soft/10 to-transparent pointer-events-none filter blur-[100px] opacity-75 animate-fog-drift-1 z-0" />
      <div className="absolute inset-x-0 bottom-0 h-[22rem] bg-gradient-to-t from-sky-soft/25 via-pearl/10 to-transparent pointer-events-none filter blur-[80px] opacity-65 animate-fog-drift-2 z-0" />

      {/* 6. FLOATING PARTICLES & TWINKLING SPARKLES */}
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

      {/* 7. HANGING SWAYING ROYAL CRYSTALS (Kiri & Kanan Atas) */}
      <div className="absolute top-0 left-6 md:left-12 pointer-events-none z-10 hidden sm:block">
        <div className="animate-crystal-sway flex flex-col items-center">
          <div className="w-[1px] h-32 bg-gradient-to-b from-slate-400/80 via-gold-accent/50 to-sky-primary/60" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-accent bg-white shadow-md -mt-[2px]" />
          <div className="w-[1px] h-10 bg-gradient-to-b from-sky-primary/60 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-sky-primary/80 shadow-[0_0_8px_rgba(126,200,227,0.8)] -mt-[2px]" />
        </div>
      </div>
      <div className="absolute top-0 right-6 md:right-12 pointer-events-none z-10 hidden sm:block">
        <div className="animate-crystal-sway flex flex-col items-center" style={{ animationDelay: '-3s' }}>
          <div className="w-[1px] h-24 bg-gradient-to-b from-slate-400/80 via-gold-accent/50 to-sky-primary/60" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-accent bg-white shadow-md -mt-[2px]" />
          <div className="w-[1px] h-14 bg-gradient-to-b from-sky-primary/60 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-gold-accent/80 shadow-[0_0_8px_rgba(245,215,142,0.8)] -mt-[2px]" />
        </div>
      </div>

      {/* 8. WIND-BLOWN FLOATING FLORAL PETALS & LEAVES */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Soft sky-blue leaf/petal */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 20, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[8%] opacity-35 text-sky-primary"
        >
          <svg width="35" height="35" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C65,30 100,50 50,100 C0,50 35,30 50,0 Z" />
          </svg>
        </motion.div>
        
        {/* Soft luxury gold leaf */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -25, 0],
            rotate: [0, -40, 0],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-[20%] right-[12%] opacity-25 text-gold-accent"
        >
          <svg width="30" height="30" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C70,25 90,55 50,100 C10,55 30,25 50,0 Z" />
          </svg>
        </motion.div>

        {/* Soft green/mint leaf swaying */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
            rotate: [0, 30, 0],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[68%] left-[7%] opacity-30 text-sky-soft"
        >
          <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C65,30 100,50 50,100 C0,50 35,30 50,0 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Decorative corners framework */}
      <div className="absolute inset-4 md:inset-8 border border-sky-primary/10 pointer-events-none p-1 rounded-3xl z-10">
        <div className="w-full h-full border border-sky-primary/5 rounded-2xl flex justify-between items-start" />
      </div>

      {/* 9. PREMIUM GLASSMORPHISM CENTRAL HERO CARD (Slightly smaller, spacious whitespace, clear text) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-t-[140px] md:rounded-t-[180px] rounded-b-[40px] md:rounded-b-[50px] text-center flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(26,54,93,0.18)] z-20 border border-white/50 overflow-hidden light-sweep-container"
        style={{ maxWidth: '520px', width: '90%', margin: '0 auto' }}
        id="cover-card"
      >
        {/* Elegant Light Reflection Overlay / Shimmer on Card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80 pointer-events-none" />
        
        {/* Thin Silver Inner Frame */}
        <div className="absolute inset-2 md:inset-3 border border-slate-300/35 rounded-t-[130px] md:rounded-t-[168px] rounded-b-[30px] md:rounded-b-[40px] pointer-events-none" />
        
        {/* Soft Gold Inner Frame Accents */}
        <div className="absolute inset-3 md:inset-4 border border-gold-accent/15 rounded-t-[124px] md:rounded-t-[162px] rounded-b-[25px] md:rounded-b-[34px] pointer-events-none" />

        {/* Monogram Circle */}
        <motion.div 
          variants={itemVariants}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-sky-primary bg-white/95 shadow-md mb-4 md:mb-6 relative group z-10"
        >
          <div className="absolute inset-1 rounded-full border border-gold-accent/40" />
          <span className="font-playfair text-xl md:text-2xl font-light tracking-wide text-navy group-hover:scale-110 transition-transform duration-500">
            N <span className="text-sky-primary font-sans text-lg">♥</span> H
          </span>
        </motion.div>

        {/* Cinematic Header Text */}
        <motion.p 
          variants={itemVariants}
          className="font-poppins text-[10px] md:text-xs tracking-[0.3em] text-navy uppercase font-semibold mb-3 md:mb-5 z-10 flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
          The Wedding of
          <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
        </motion.p>

        {/* Couple Names - Same Font, Elegant Parisienne Font, Non-overlapping, readable */}
        <motion.div variants={itemVariants} className="space-y-1.5 md:space-y-3 mb-4 md:mb-6 z-10 w-full px-2">
          <h1 
            className="font-parisienne text-navy tracking-wide font-normal leading-tight text-center"
            style={{ 
              fontSize: "clamp(2rem, 5vw + 0.8rem, 2.85rem)",
              textShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 4px rgba(126,200,227,0.25)"
            }}
          >
            Nurin Fildza Azzahra
          </h1>
          
          <div className="font-playfair text-xs md:text-sm tracking-[0.2em] text-navy opacity-70 py-0.5">
            &
          </div>
          
          <h1 
            className="font-parisienne text-navy tracking-wide font-normal leading-tight text-center"
            style={{ 
              fontSize: "clamp(2rem, 5vw + 0.8rem, 2.85rem)",
              textShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 4px rgba(126,200,227,0.25)"
            }}
          >
            Hanif Hidayatullah
          </h1>
        </motion.div>

        {/* Separator line with small diamonds and silver style */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 w-1/2 justify-center mb-4 md:mb-6 z-10">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-sky-primary/40" />
          <div className="w-2 h-2 rotate-45 border border-gold-accent bg-white" />
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-sky-primary/40" />
        </motion.div>

        {/* Guest Information Panel */}
        <motion.div 
          variants={itemVariants}
          className="w-full p-4 md:p-5 rounded-2xl bg-white/75 border border-sky-soft/35 shadow-sm mb-5 md:mb-6 backdrop-blur-sm z-10"
        >
          <p className="font-poppins text-[9px] md:text-[10px] tracking-[0.15em] text-navy opacity-80 uppercase font-bold mb-2">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <h2 className="font-playfair text-lg md:text-xl font-semibold text-navy tracking-wide my-0.5 py-0.5 px-3 border-b border-sky-primary/20 inline-block min-w-[70%] text-shadow-sm">
            {guestName}
          </h2>
          <p className="font-poppins text-[8px] md:text-[9px] text-gray-400 mt-1.5 italic">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </motion.div>

        {/* Enter Invitation Luxury Button */}
        <motion.button
          variants={itemVariants}
          onClick={onOpen}
          className="relative px-8 py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-sky-primary via-navy to-sky-primary text-white font-poppins text-[10px] md:text-xs tracking-widest uppercase font-semibold rounded-full shadow-lg hover:shadow-sky-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 md:gap-2.5 group cursor-pointer border border-white/40 z-10"
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
