import React, { useEffect, useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  duration: number; // millseconds
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: "A Grand Beginning",
    subtitle: "The soft light of golden sunrise fills the grand ballroom, where crystal chandeliers glitter like stars.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 2,
    title: "Pure Devotion",
    subtitle: "White silk flowing slowly in the breeze, reflecting clean, eternal grace.",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 3,
    title: "Eternal Vows",
    subtitle: "Two rings of pure gold, a sacred bond designed to transcend time.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 4,
    title: "In Perfect Bloom",
    subtitle: "Orchids, white roses, and peony petals styled to perfection.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 5,
    title: "Nurin & Hanif",
    subtitle: "Two hearts written in sky silver, becoming one destiny.",
    image: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 6,
    title: "N ♥ H",
    subtitle: "The royal union of two souls under God's infinite grace.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    duration: 2500,
  },
  {
    id: 7,
    title: "The Dream Unfolds",
    subtitle: "Welcome to our happily ever after. Step inside our luxury wedding invitation.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80",
    duration: 3000,
  }
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-105');

  useEffect(() => {
    // Phase 1: Trigger the scene entry animation
    setAnimationClass('opacity-100 scale-100 transition-all duration-1500 ease-out');

    // Timer to trigger scene exit and advance
    const currentScene = SCENES[currentSceneIndex];
    
    const exitTimer = setTimeout(() => {
      // Transition out
      setAnimationClass('opacity-0 scale-95 transition-all duration-1000 ease-in');
    }, currentScene.duration - 800);

    const advanceTimer = setTimeout(() => {
      if (currentSceneIndex < SCENES.length - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }, currentScene.duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(advanceTimer);
    };
  }, [currentSceneIndex, onComplete]);

  const handleSkip = () => {
    setAnimationClass('opacity-0 scale-95 transition-all duration-500 ease-in-out');
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const scene = SCENES[currentSceneIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal flex flex-col items-center justify-center overflow-hidden"
      id="cinematic-intro"
    >
      {/* Background Image with slow cinematic zoom */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/80 z-10" />
        <img
          src={scene.image}
          alt={scene.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover origin-center transition-transform duration-[3000ms] ease-out ${
            animationClass.includes('opacity-100') ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 px-4 py-2 rounded-full dark-glass-card text-sky-ice font-poppins text-[10px] tracking-widest uppercase font-semibold flex items-center gap-1.5 hover:bg-sky-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer border border-sky-soft/30"
        id="btn-skip-intro"
      >
         <span>Skip Intro</span>
        <SkipForward className="w-3.5 h-3.5 text-gold-accent" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex gap-2" id="intro-progress-bar">
        {SCENES.map((_, idx) => (
          <div
            key={idx}
            className={`h-[2px] transition-all duration-500 rounded-full ${
              idx === currentSceneIndex ? 'w-8 bg-sky-primary' : 'w-2 bg-pearl/30'
            }`}
          />
        ))}
      </div>

      {/* Content Container */}
      <div 
        className={`relative z-20 max-w-xl w-full px-6 text-center select-none ${animationClass}`}
        id="intro-text-panel"
      >
        {/* Cinematic Scene Number */}
        <p className="font-poppins text-[10px] tracking-[0.4em] text-sky-soft uppercase font-semibold mb-3">
          Scene {scene.id} of {SCENES.length}
        </p>

        {/* Cinematic Title with Gold/Silver Foil Gradient */}
        <h2 className="font-playfair text-3xl md:text-5xl font-light tracking-wide text-pearl mb-6">
          {scene.title === "N ♥ H" ? (
            <span className="gold-shimmer font-playfair font-semibold tracking-widest">{scene.title}</span>
          ) : scene.title === "Nurin & Hanif" ? (
            <span className="gold-shimmer font-playfair font-medium">{scene.title}</span>
          ) : (
            scene.title
          )}
        </h2>

        {/* Description */}
        <p className="font-cormorant text-lg md:text-xl text-sky-ice/90 font-light leading-relaxed max-w-md mx-auto italic">
          "{scene.subtitle}"
        </p>
      </div>

      {/* Bottom Scene Label */}
      <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-playfair text-sky-soft italic text-xs tracking-wider">
          The Wedding of Nurin & Hanif
        </span>
        <div className="w-1 h-8 bg-gradient-to-b from-sky-primary/60 to-transparent rounded-full animate-[pulse_1.5s_infinite]" />
      </div>
    </div>
  );
}
