import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users, Camera, Gift, MapPin, Menu, X, Volume2, Home, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OpeningCover from './components/OpeningCover';
import CinematicIntro from './components/CinematicIntro';
import AudioPlayer, { getGlobalAudio, fadeGlobalAudio } from './components/AudioPlayer';
import SurahArRum from './components/SurahArRum';
import EventSection from './components/EventSection';
import LoveStoryTimeline from './components/LoveStoryTimeline';
import GallerySection from './components/GallerySection';
import RsvpSection from './components/RsvpSection';
import DigitalGift from './components/DigitalGift';
import CountdownSection from './components/CountdownSection';
import SectionDivider from './components/SectionDivider';

export default function App() {
  // Navigation active section control
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Parse guest name from URL query parameters ( Indonesia standard: ?to=Nama+Tamu or ?p=Nama+Tamu )
  const [guestName, setGuestName] = useState('Tamu Undangan');

  // State machine for cinematic experience flow
  const [experiencePhase, setExperiencePhase] = useState<'cover' | 'intro' | 'invitation'>('cover');
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Particle System - rose petals and gold dust
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Read recipient name from query params
    const queryParams = new URLSearchParams(window.location.search);
    const toParam = queryParams.get('to') || queryParams.get('p');
    if (toParam) {
      setGuestName(toParam);
    }

    // Generate random ambient background particles
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 8, // seconds delay
      duration: 8 + Math.random() * 12, // seconds duration
      size: 6 + Math.random() * 14 // pixels
    }));
    setParticles(list);
  }, []);

  // Set up active section observer on scroll
  useEffect(() => {
    if (experiencePhase !== 'invitation') return;

    const handleScroll = () => {
      const sections = ['home', 'couple', 'countdown', 'event', 'lovestory', 'gallery', 'rsvp', 'gift', 'wishes', 'surah-ar-rum', 'closing'];
      let currentActive = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is close to top of viewport
          if (rect.top <= 180) {
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [experiencePhase]);

  const handleOpenInvitation = () => {
    // 1. Play background music immediately on user gesture/click to bypass all mobile/desktop autoplay bans
    const audio = getGlobalAudio();
    if (audio) {
      audio.play()
        .then(() => {
          // Immediately fade in smoothly to 30% volume over 1.5 seconds
          fadeGlobalAudio(0.3, 1500);
        })
        .catch((err) => {
          console.warn('Audio play request failed or deferred:', err);
        });
    }

    // 2. Set states: enter intro view & turn on playing state
    setExperiencePhase('intro');
    setAudioPlaying(true);
  };

  const handleIntroComplete = () => {
    // Enter final website invitation view
    setExperiencePhase('invitation');
    // Start play instrumental music automatically
    setAudioPlaying(true);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-soft select-none font-poppins relative text-charcoal overflow-x-hidden">
      
      {/* Background Ambient Romantic Audio Stream */}
      <AudioPlayer isPlaying={audioPlaying} setIsPlaying={setAudioPlaying} experiencePhase={experiencePhase} />

      {/* 1. Opening Cover */}
      {experiencePhase === 'cover' && (
        <OpeningCover onOpen={handleOpenInvitation} guestName={guestName} />
      )}

      {/* 2. 15-Second Cinematic Intro */}
      {experiencePhase === 'intro' && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* 3. Main Luxury Invitation Website */}
      {experiencePhase === 'invitation' && (
        <div className="relative animate-[fadeIn_1.5s_ease-out]">
          
          {/* Floating Sky Blue & White Petals Background Layer */}
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute bg-gradient-to-tr from-sky-soft/30 to-white/40 rounded-full animate-float-slow"
                style={{
                  left: `${p.left}%`,
                  top: `-10%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div>

          {/* Luxury Navigation Menu (Floating Bar) */}
          <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[90%] md:w-full glass-gold-card px-4 py-2 rounded-full shadow-lg border border-sky-primary/25 flex items-center justify-between">
            <span className="font-playfair text-md font-bold tracking-widest text-navy pl-2">
              N <span className="text-sky-primary font-sans">♥</span> H
            </span>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-4 items-center">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Couple', id: 'couple' },
                { label: 'Schedule', id: 'countdown' },
                { label: 'Story', id: 'lovestory' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'RSVP', id: 'rsvp' },
                { label: 'Wishes', id: 'wishes' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`font-poppins text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 hover:text-sky-primary cursor-pointer ${
                    activeSection === item.id ? 'text-sky-primary border-b border-sky-primary pb-0.5' : 'text-navy/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Nav Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-sky-soft/20 text-navy transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              id="btn-toggle-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Full-screen Navigation Panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-30 bg-navy/95 backdrop-blur-md pt-24 px-8 flex flex-col gap-6 text-center justify-center h-screen"
                id="mobile-nav-panel"
              >
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Mempelai / Couple', id: 'couple' },
                  { label: 'Wedding Countdown', id: 'countdown' },
                  { label: 'Our Event Schedule', id: 'event' },
                  { label: 'Our Love Story', id: 'lovestory' },
                  { label: 'Moments / Gallery', id: 'gallery' },
                  { label: 'RSVP Confirmation', id: 'rsvp' },
                  { label: 'Digital Wedding Gift', id: 'gift' },
                  { label: 'Wishes & Blessings', id: 'wishes' },
                  { label: 'Surah Ar-Rum', id: 'surah-ar-rum' }
                ].map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleScrollToSection(item.id)}
                    className="font-playfair text-xl tracking-wider text-pearl hover:text-sky-primary transition-colors py-2 border-b border-white/5 cursor-pointer"
                    id={`btn-nav-mobile-${idx}`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ====================================
              HOME / HERO SECTION
              ==================================== */}
          <section
            id="home"
            className="min-h-screen bg-cream-soft marble-bg relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
          >
            {/* Visual background overlays */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky-soft/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-sky-soft/10 to-transparent pointer-events-none" />

            <div className="max-w-2xl w-full z-10 flex flex-col items-center mt-12 animate-fade-in" id="hero-panel">
              {/* Monogram Decorative Circle */}
              <div className="w-16 h-16 rounded-full border border-sky-primary/40 bg-white shadow-sm flex items-center justify-center font-playfair text-xl text-navy font-semibold mb-8 animate-[spin_12s_linear_infinite]">
                N ♥ H
              </div>

              {/* Subheader */}
              <p className="font-poppins text-xs tracking-[0.4em] text-navy uppercase font-bold mb-4">
                The Sacred Marriage Union
              </p>

              {/* Names - Bride & Groom completely equal in visual hierarchy */}
              <h1 className="font-vibes text-5xl md:text-7xl tracking-wide text-navy mb-2 leading-tight">
                Nurin Fildza Azzahra
              </h1>
              <div className="font-playfair text-md tracking-widest text-navy/70 my-3">
                &
              </div>
              <h1 className="font-vibes text-5xl md:text-7xl tracking-wide text-navy mb-8 leading-tight">
                Hanif Hidayatullah
              </h1>

              {/* Separator */}
              <div className="flex items-center gap-3 w-1/3 justify-center mb-8">
                <div className="h-[1px] w-full bg-sky-primary/30" />
                <Sparkles className="w-4 h-4 text-sky-primary animate-pulse" />
                <div className="h-[1px] w-full bg-sky-primary/30" />
              </div>

              {/* Date & Location */}
              <p className="font-playfair text-xl text-navy font-semibold tracking-wider">
                Sunday, 12 July 2026
              </p>
              <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold mt-2">
                The Ritz-Carlton Jakarta, Mega Kuningan
              </p>

              {/* Parallax elements representing luxury items */}
              <div className="absolute top-1/4 left-5 w-16 h-16 opacity-20 animate-float-slow pointer-events-none">
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=100&q=40" alt="rose" className="w-full h-full object-cover rounded-full border border-white" />
              </div>
              <div className="absolute bottom-1/4 right-5 w-20 h-20 opacity-25 animate-float-medium pointer-events-none">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=100&q=40" alt="orchids" className="w-full h-full object-cover rounded-full border border-white" />
              </div>
            </div>

            {/* Animated Scroll indicator */}
            <div className="absolute bottom-10 z-10 flex flex-col items-center gap-1 pointer-events-none">
              <span className="font-poppins text-[9px] tracking-widest uppercase text-navy/60 font-bold">Scroll Down</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-sky-primary to-transparent rounded-full animate-bounce" />
            </div>
          </section>

          {/* ====================================
              SURAH AR-RUM
             ==================================== */}
          <SurahArRum />

          <SectionDivider />

          {/* ====================================
              BRIDE & GROOM SECTION
              ==================================== */}
          <section
            id="couple"
            className="py-24 px-4 md:px-8 bg-pearl relative overflow-hidden"
          >
            {/* Background Decorative Bloom blobs */}
            <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-[-10%] w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 text-center" id="couple-panel">
              {/* Section Title */}
              <p className="font-poppins text-[10px] tracking-[0.4em] text-navy uppercase font-bold mb-2">
                Mempelai Wanita & Pria
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-navy tracking-wide mb-3">
                The Bride & Groom
              </h2>
              <p className="font-cormorant text-lg text-navy opacity-80 italic max-w-md mx-auto mb-12">
                "By the grace of Allah SWT, we happily announce our union, joining our hearts under His glorious guidance."
              </p>
              <div className="w-16 h-[1px] bg-sky-primary/40 mx-auto mb-16" />

              {/* Couple Grid Cards - Nurin FIRST on the left (on top for mobile) */}
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto" id="couple-grid">
                
                {/* Bride Card (Nurin FIRST) */}
                <div className="glass-gold-card p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-sky-primary/10">
                  {/* Elegant decorative corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sky-primary/30" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sky-primary/30" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sky-primary/30" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sky-primary/30" />

                  {/* Elegant circular frame portrait */}
                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-sky-primary p-1.5 shadow-md mb-6 relative">
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                        alt="Nurin Fildza Azzahra Portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover origin-top"
                      />
                    </div>
                  </div>

                  <h3 className="font-vibes text-4xl text-navy mb-1">
                    Nurin Fildza Azzahra
                  </h3>
                  <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold mb-4">
                    The Bride
                  </p>

                  <div className="border-t border-sky-primary/10 pt-4 w-full">
                    <p className="font-cormorant text-md text-navy/70 italic mb-1">
                      Putri tercinta dari
                    </p>
                    <p className="font-playfair text-md font-semibold text-navy">
                      Bapak Popon Gunawan, S.E.
                    </p>
                    <p className="font-playfair text-md font-semibold text-navy">
                      & Ibu Fauziah Hanum, A.Ma.
                    </p>
                  </div>
                </div>

                {/* Groom Card (Hanif SECOND) */}
                <div className="glass-gold-card p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-sky-primary/10">
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sky-primary/30" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sky-primary/30" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sky-primary/30" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sky-primary/30" />

                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-sky-primary p-1.5 shadow-md mb-6 relative">
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100">
                      <img
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                        alt="Hanif Hidayatullah Portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover origin-top"
                      />
                    </div>
                  </div>

                  <h3 className="font-vibes text-4xl text-navy mb-1">
                    Hanif Hidayatullah
                  </h3>
                  <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold mb-4">
                    The Groom
                  </p>

                  <div className="border-t border-sky-primary/10 pt-4 w-full">
                    <p className="font-cormorant text-md text-navy/70 italic mb-1">
                      Putra tercinta dari
                    </p>
                    <p className="font-playfair text-md font-semibold text-navy">
                      Bapak H. Amiruddin
                    </p>
                    <p className="font-playfair text-md font-semibold text-navy">
                      & Ibu Hj. Kurniawati
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ====================================
              COUNTDOWN SECTION
             ==================================== */}
          <CountdownSection />

          <SectionDivider />

          {/* ====================================
              DETAIL ACARA / EVENT SCHEDULE
             ==================================== */}
          <EventSection />

          <SectionDivider />

          {/* ====================================
              LOVE STORY
             ==================================== */}
          <LoveStoryTimeline />

          <SectionDivider />

          {/* ====================================
              PHOTO & VIDEO GALLERY
             ==================================== */}
          <GallerySection />

          <SectionDivider />

          {/* ====================================
              RSVP
             ==================================== */}
          <RsvpSection guestName={guestName} />

          <SectionDivider />

          {/* ====================================
              DIGITAL GIFT
             ==================================== */}
          <DigitalGift />

          <SectionDivider />

          {/* ====================================
              CLOSING / THANKS SECTION
              ==================================== */}
          <section
            id="closing"
            className="py-24 px-4 bg-navy text-pearl text-center relative overflow-hidden"
          >
            {/* Elegant luxury sky blue lights and sparkles */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-sky-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sky-soft/10 to-transparent pointer-events-none" />

            <div className="max-w-xl mx-auto relative z-10" id="closing-panel">
              <div className="w-16 h-16 rounded-full border border-sky-primary/30 bg-white/10 flex items-center justify-center font-playfair text-lg text-gold-accent mb-8 mx-auto animate-float-slow">
                N ♥ H
              </div>

              <h2 className="font-playfair text-3xl md:text-4xl font-medium tracking-wide mb-6">
                Terima Kasih
              </h2>

              <p className="font-cormorant text-lg md:text-xl text-sky-ice italic font-light leading-relaxed mb-8 max-w-md mx-auto">
                "Kehadiran dan doa restu Anda adalah kado terindah bagi kami berdua. Terima kasih telah menjadi bagian dari lembaran baru perjalanan hidup kami."
              </p>

              <div className="flex items-center gap-3 justify-center mb-12">
                <div className="h-[1px] w-12 bg-sky-primary/30" />
                <span className="font-poppins text-[10px] tracking-widest text-sky-soft uppercase font-semibold">Kami Yang Berbahagia</span>
                <div className="h-[1px] w-12 bg-sky-primary/30" />
              </div>

              <p className="font-vibes text-4xl text-pearl mb-1">
                Nurin & Hanif
              </p>
              <p className="font-poppins text-[9px] text-sky-soft/75 uppercase tracking-widest mt-1 font-medium">
                Beserta Keluarga Besar
              </p>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
