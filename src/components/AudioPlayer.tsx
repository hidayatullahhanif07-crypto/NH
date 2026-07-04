import React, { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  experiencePhase: 'cover' | 'intro' | 'invitation';
}

// Global audio singleton to guarantee continuous play across any section/navigation state
let globalAudio: HTMLAudioElement | null = null;
let fadeInterval: NodeJS.Timeout | null = null;

export const getGlobalAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!globalAudio) {
    globalAudio = new Audio('https://raw.githubusercontent.com/hidayatullahhanif07-crypto/NH/main/Lagu/Alan_Ng_-_Can_t_Help_Falling_in_Love_Violin_Instrumental_(mp3.pm).mp3');
    globalAudio.loop = true;
    globalAudio.volume = 0; // Starts silent for elegant fade-in
  }
  return globalAudio;
};

// Smooth volume fade transitions
export const fadeGlobalAudio = (targetVolume: number, durationMs: number, onComplete?: () => void) => {
  const audio = getGlobalAudio();
  if (!audio) return;

  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }

  const startVolume = audio.volume;
  const steps = 30; // 30 steps for ultra-smooth transition
  const intervalTime = durationMs / steps;
  const volumeStep = (targetVolume - startVolume) / steps;
  
  let currentStep = 0;
  fadeInterval = setInterval(() => {
    currentStep++;
    const nextVolume = Math.min(1, Math.max(0, startVolume + volumeStep * currentStep));
    audio.volume = nextVolume;
    
    if (currentStep >= steps) {
      if (fadeInterval) {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
      audio.volume = targetVolume;
      if (onComplete) onComplete();
    }
  }, intervalTime);
};

export default function AudioPlayer({ isPlaying, setIsPlaying, experiencePhase }: AudioPlayerProps) {

  // Auto loop and basic setup
  useEffect(() => {
    const audio = getGlobalAudio();
    if (audio) {
      audio.loop = true;
    }
    return () => {
      // Don't pause or clear on unmount so music continues seamlessly.
      // But clear local interval to prevent leaks
      if (fadeInterval) {
        clearInterval(fadeInterval);
      }
    };
  }, []);

  // Listen for isPlaying changes from the floating button or other controller
  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;

    if (experiencePhase === 'cover') return; // Do not control until cover is opened

    if (isPlaying) {
      if (audio.paused) {
        audio.play()
          .then(() => {
            fadeGlobalAudio(0.3, 1200); // Gentle 1.2s fade-in to 30%
          })
          .catch((err) => {
            console.error('Playback failed to resume:', err);
            setIsPlaying(false);
          });
      } else {
        // If already playing, ensure target volume is faded in gently
        fadeGlobalAudio(0.3, 1000);
      }
    } else {
      if (!audio.paused) {
        // Fade out to 0 then pause
        fadeGlobalAudio(0, 800, () => {
          audio.pause();
        });
      }
    }
  }, [isPlaying, experiencePhase, setIsPlaying]);

  // Hide the audio floating controls during the initial cover
  if (experiencePhase === 'cover') {
    return null;
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" id="wedding-audio-player">
      {/* Sound wave visualizer (only visible when active and playing) */}
      {isPlaying && (
        <div className="flex gap-1 bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-sky-primary/30 items-center justify-center animate-fade-in shadow-md">
          <span className="text-[9px] text-sky-soft font-mono mr-1 uppercase tracking-widest">Playing</span>
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[2px] bg-sky-primary rounded-full animate-[pulse_0.8s_infinite_alternate] h-2"></span>
            <span className="w-[2px] bg-sky-soft rounded-full animate-[pulse_0.5s_infinite_alternate] h-3"></span>
            <span className="w-[2px] bg-gold-accent rounded-full animate-[pulse_0.7s_infinite_alternate] h-1.5"></span>
            <span className="w-[2px] bg-sky-primary rounded-full animate-[pulse_0.6s_infinite_alternate] h-2.5"></span>
          </div>
        </div>
      )}

      {/* Floating Control Button */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border hover:scale-110 active:scale-95 cursor-pointer ${
          isPlaying
            ? 'bg-sky-primary text-white border-sky-soft/40 animate-[spin_12s_linear_infinite]'
            : 'bg-navy text-sky-ice border-sky-primary/30'
        }`}
        aria-label="Toggle background music"
        title={isPlaying ? "Pause Music" : "Play Music"}
        id="btn-toggle-music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-[pulse_1.5s_infinite]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gold-accent" />
        )}
      </button>
    </div>
  );
}
