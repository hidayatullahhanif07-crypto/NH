import React from 'react';
import { Heart } from 'lucide-react';
import { LoveStoryEvent } from '../types';

const STORY_EVENTS: LoveStoryEvent[] = [
  {
    id: "story-1",
    title: "The First Meet",
    date: "14 February 2022",
    description: "Our paths crossed for the very first time under the soft lights of a quiet bookstore cafe. A simple conversation about our favorite literature blossomed into hours of laughter, marking the start of a chapter we never wanted to end.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "story-2",
    title: "Getting Closer",
    date: "10 September 2023",
    description: "Through countless shared sunrises, late-night talks, and quiet coffee dates, we found a rare, beautiful understanding in one another. We realized that our dreams, values, and hearts were perfectly aligned, moving in a single gentle rhythm.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "story-3",
    title: "The Engagement",
    date: "25 December 2025",
    description: "Under a starry winter sky surrounded by our closest families, Hanif asked the question that would seal our fates forever. Amidst tears of joy and endless smiles, Nurin said yes to a lifetime of shared adventures and devotion.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "story-4",
    title: "Our Wedding Day",
    date: "12 July 2026",
    description: "Today, we step into the grand grand ballroom of our dreams to unite our souls before God and our beloved guests. A sacred vow of love, loyalty, and companionship designed to last until eternity.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  }
];

export default function LoveStoryTimeline() {
  return (
    <section 
      className="py-24 px-4 md:px-8 bg-cream-soft marble-bg relative overflow-hidden"
      id="lovestory"
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-soft/20 border border-sky-primary/20 mb-4 animate-float-slow">
            <Heart className="w-5 h-5 text-navy fill-navy" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-navy tracking-wide mb-3">
            Our Love Story
          </h2>
          <p className="font-cormorant text-lg text-navy opacity-80 italic max-w-md mx-auto mb-6">
            A beautiful, handcrafted path of faith, laughter, and companionship leading to this sacred union.
          </p>
          <div className="w-16 h-[1px] bg-sky-primary/40 mx-auto" />
        </div>

        {/* Timeline Structure */}
        <div className="relative border-l border-sky-primary/20 md:border-l-0 md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-sky-primary/25 space-y-16">
          
          {STORY_EVENTS.map((evt, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <div 
                key={evt.id}
                className="relative flex flex-col md:flex-row md:items-center pl-8 md:pl-0"
              >
                {/* Timeline Center Bullet Pin (Hidden on small, centered on md+) */}
                <div className="absolute left-0 top-2 -translate-x-[13px] md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-sky-primary bg-pearl shadow-md flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 rounded-full bg-navy" />
                  </div>
                </div>

                {/* Left/Right Container Grid */}
                <div className="grid md:grid-cols-2 gap-8 w-full">
                  
                  {/* Event Content Card */}
                  <div className={`order-2 ${isEven ? 'md:order-1 md:text-right' : 'md:order-2 md:col-start-2'}`}>
                    <div className="glass-gold-card p-6 md:p-8 rounded-2xl shadow-md border border-sky-primary/10 relative hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                      {/* Accent Indicator Line */}
                      <div className={`absolute top-0 h-1.5 w-16 bg-navy rounded-full ${isEven ? 'left-6 md:left-auto md:right-6' : 'left-6'}`} />

                      <span className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                        {evt.date}
                      </span>
                      
                      <h3 className="font-playfair text-xl font-semibold text-navy mt-2 mb-4">
                        {evt.title}
                      </h3>

                      <p className="font-poppins text-xs md:text-sm text-navy/80 font-light leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic Photo Card */}
                  <div className={`order-1 ${isEven ? 'md:order-2 md:col-start-2' : 'md:order-1'}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-sky-primary/10 relative group">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
