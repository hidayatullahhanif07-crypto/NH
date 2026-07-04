import React, { useState } from 'react';
import { Camera, Play, X, ChevronLeft, ChevronRight, Video } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90",
    title: "Eternal Vows Under the Arch",
    aspect: "landscape"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=90",
    title: "Romantic Glance",
    aspect: "portrait"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=90",
    title: "Hand in Hand, Together Forever",
    aspect: "square"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=90",
    title: "Luxury Floral Banquet",
    aspect: "portrait"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=90",
    title: "The Golden Grace",
    aspect: "square"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=1200&q=90",
    title: "The Sparkle of Love",
    aspect: "landscape"
  }
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % IMAGES.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <section 
      className="py-24 px-4 md:px-8 bg-cream-soft marble-bg relative"
      id="gallery"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-soft/20 border border-sky-primary/20 mb-4 animate-float-slow">
            <Camera className="w-5 h-5 text-navy" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-navy tracking-wide mb-3">
            Moments of Splendor
          </h2>
          <p className="font-cormorant text-lg text-navy opacity-80 italic max-w-md mx-auto mb-6">
            A visual anthology of our love story captured in precious light and eternal warmth.
          </p>
          <div className="w-16 h-[1px] bg-sky-primary/40 mx-auto mb-8" />

          {/* Luxury Tab Switcher */}
          <div className="inline-flex gap-2 p-1 rounded-full bg-sky-soft/10 border border-sky-primary/15 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-2 rounded-full font-poppins text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-navy/70 hover:text-navy'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-full font-poppins text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-navy/70 hover:text-navy'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Gallery</span>
            </button>
          </div>
        </div>

        {/* Photos View */}
        {activeTab === 'photos' && (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]"
            id="masonry-photo-gallery"
          >
            {IMAGES.map((img, idx) => {
              // Custom span based on aspect ratio for high-end asymmetrical masonry rhythm
              const gridSpan = 
                img.aspect === 'portrait' 
                  ? 'row-span-2' 
                  : img.aspect === 'landscape' 
                    ? 'col-span-1 sm:col-span-2' 
                    : '';
              
              return (
                <div
                  key={img.id}
                  onClick={() => openLightbox(idx)}
                  className={`relative overflow-hidden rounded-xl border border-sky-primary/10 group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 bg-white ${gridSpan}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Luxury Shimmer Overlay on Hover */}
                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                    <p className="font-playfair text-white text-lg font-light tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {img.title}
                    </p>
                    <p className="font-poppins text-[10px] text-sky-ice uppercase tracking-widest mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      View High-Res
                    </p>
                  </div>
                  {/* Fine Corner Highlights */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 pointer-events-none transition-all duration-500" />
                </div>
              );
            })}
          </div>
        )}

        {/* Videos View */}
        {activeTab === 'videos' && (
          <div className="max-w-4xl mx-auto space-y-12" id="cinematic-video-gallery">
            {/* Cinematic Prewedding Video */}
            <div className="glass-gold-card p-4 rounded-2xl relative group overflow-hidden border border-sky-primary/10">
              <div className="absolute inset-1 border border-sky-primary/10 pointer-events-none rounded-xl" />
              <div className="relative aspect-video rounded-xl overflow-hidden bg-navy/80">
                {/* HTML5 video preview looping elegantly or showcasing custom card */}
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-and-walking-4541-large.mp4"
                  controls
                  poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full dark-glass-card text-sky-ice font-poppins text-[9px] tracking-widest uppercase font-semibold flex items-center gap-1.5 pointer-events-none">
                  <Play className="w-3 h-3 text-sky-primary" />
                  <span>Cinematic Prewedding Trailer</span>
                </div>
              </div>
            </div>

            {/* Wedding Highlight Block Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-gold-card p-3 rounded-xl relative overflow-hidden flex flex-col justify-between border border-sky-primary/10">
                <div className="aspect-video bg-navy/80 rounded-lg overflow-hidden mb-3 relative">
                  <video
                    src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-bride-and-groom-during-the-celebration-4543-large.mp4"
                    controls
                    poster="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-playfair text-sm text-navy font-semibold px-1">Romantic Spark Teaser</h4>
                <p className="font-poppins text-[10px] text-sky-primary uppercase tracking-widest mt-1 px-1 mb-2">Duration: 0:45</p>
              </div>

              <div className="glass-gold-card p-3 rounded-xl relative overflow-hidden flex flex-col justify-between border border-sky-primary/10">
                <div className="aspect-video bg-navy/80 rounded-lg overflow-hidden mb-3 relative">
                  <video
                    src="https://assets.mixkit.co/videos/preview/mixkit-bride-throwing-the-bouquet-4544-large.mp4"
                    controls
                    poster="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-playfair text-sm text-navy font-semibold px-1">Bouquet Toss & Banquet Highlights</h4>
                <p className="font-poppins text-[10px] text-sky-primary uppercase tracking-widest mt-1 px-1 mb-2">Duration: 1:12</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-navy/95 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in"
          id="photo-lightbox-modal"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            id="btn-close-lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 md:left-8 z-50 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            id="btn-prev-lightbox"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 md:right-8 z-50 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            id="btn-next-lightbox"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container with Zoom Reveal */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col justify-center items-center"
          >
            <img
              src={IMAGES[lightboxIndex].url}
              alt={IMAGES[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl border border-white/10 animate-[pulse_8s_infinite_alternate]"
            />
            {/* Title / Caption */}
            <div className="absolute bottom-[-40px] text-center w-full">
              <h3 className="font-playfair text-white text-lg font-light tracking-wide">
                {IMAGES[lightboxIndex].title}
              </h3>
              <p className="font-poppins text-sky-primary text-[11px] uppercase tracking-widest mt-1">
                Photo {lightboxIndex + 1} of {IMAGES.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
