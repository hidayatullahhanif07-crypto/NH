import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio('https://www.mfiles.co.uk/mp3-downloads/canon-in-d.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback blocked by browser autoplay policy:', err);
          setError('Browser blocked autoplay. Tap anywhere to play.');
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const nextState = !isPlaying;
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" id="wedding-audio-player">
      {/* Sound wave visualizer (only visible when playing) */}
      {isPlaying && (
        <div className="flex gap-1 bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-sky-primary/30 items-center justify-center animate-fade-in">
          <span className="text-[10px] text-sky-soft font-mono mr-1 uppercase tracking-widest">Live</span>
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
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border hover:scale-115 active:scale-95 ${
          isPlaying
            ? 'bg-sky-primary text-white border-sky-soft animate-[spin_8s_linear_infinite]'
            : 'bg-navy text-sky-ice border-sky-primary/40'
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
