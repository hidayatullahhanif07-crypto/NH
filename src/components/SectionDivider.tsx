import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-gradient-to-b from-transparent via-cream-soft/20 to-transparent pointer-events-none select-none">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center relative">
        
        {/* Stylized Islamic Arch Silhouette / Outline */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
          {/* Outer Arch Shape with Silver outline */}
          <div className="w-[180px] h-[100px] border-t-2 border-x-2 border-slate-300/35 rounded-t-[90px] relative">
            {/* Inner Arch Shape with Gold outline */}
            <div className="absolute inset-1.5 border-t border-x border-gold-accent/25 rounded-t-[84px]">
              {/* Soft Radial Gold/Blue glow inside the arch */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(245,215,142,0.1)_0%,_rgba(126,200,227,0.03)_50%,_transparent_100%)]" />
            </div>
          </div>
        </div>

        {/* Horizontal Silver/Gold Lines flanking the central arch */}
        <div className="w-full flex items-center justify-center gap-24 relative z-10">
          {/* Left Line */}
          <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 to-gold-accent/40" />
          
          {/* Right Line */}
          <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent via-slate-300/40 to-gold-accent/40" />
        </div>

        {/* Central Sparkling Medallion */}
        <motion.div 
          initial={{ opacity: 0.8, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/95 shadow-md border border-slate-200/60"
        >
          {/* Gold inner ring */}
          <div className="absolute inset-0.5 rounded-full border border-gold-accent/30" />
          <Sparkles className="w-4 h-4 text-sky-primary animate-pulse" />
        </motion.div>

        {/* Small hanging decorative dot/diamond */}
        <div className="absolute top-12 z-10 flex flex-col items-center">
          <div className="w-[1px] h-3 bg-gradient-to-b from-gold-accent/60 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold-accent bg-white shadow-sm" />
        </div>

      </div>
    </div>
  );
}
