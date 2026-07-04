import React from 'react';

export default function SurahArRum() {
  return (
    <section 
      className="py-20 px-4 md:px-8 bg-cream-soft marble-bg relative overflow-hidden flex flex-col items-center justify-center border-y border-sky-primary/20"
      id="surah-ar-rum"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sky-soft/15 blur-3xl pointer-events-none" />

      {/* Elegant Golden Frame */}
      <div className="relative max-w-2xl w-full glass-gold-card p-8 md:p-12 rounded-2xl shadow-xl text-center z-10 border border-sky-primary/20">
        {/* Intricate Borders */}
        <div className="absolute inset-2 border border-sky-primary/10 pointer-events-none rounded-xl" />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-sky-primary/5 pointer-events-none rounded-lg" />

        {/* Calligraphy Header Decoration */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-10 h-[1px] bg-sky-primary/50" />
          <span className="font-playfair text-xs tracking-[0.25em] text-navy uppercase font-semibold">Surah Ar-Rum</span>
          <div className="w-10 h-[1px] bg-sky-primary/50" />
        </div>

        {/* Real Arabic Calligraphy or High-Quality Arab Typography */}
        <div className="my-8 px-4" id="arabic-text-container">
          <p className="font-playfair text-3xl md:text-4xl text-navy font-medium mb-3 leading-relaxed tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p 
            className="text-2xl md:text-3xl text-charcoal leading-loose font-serif font-semibold text-right tracking-wide px-2 md:px-4"
            dir="rtl"
            id="arabic-verse"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>
        </div>

        {/* Transliteration */}
        <div className="mb-6 max-w-lg mx-auto px-4" id="latin-transliteration">
          <p className="font-cormorant text-md text-navy opacity-80 italic leading-relaxed">
            "Wa min āyātihī an khalaqa lakum min anfusikum azwājal litaskunū ilaihā wa ja‘ala bainakum mawaddataw wa rahmah, inna fī zālika la'āyātil liqaumiy yatafakkarūn."
          </p>
        </div>

        {/* Separator */}
        <div className="w-20 h-[1px] bg-sky-primary/30 mx-auto my-6" />

        {/* Translation */}
        <div className="max-w-xl mx-auto px-4" id="indonesian-translation">
          <p className="font-poppins text-xs md:text-sm text-navy/90 font-light leading-relaxed">
            Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </p>
        </div>

        {/* Surah Citation */}
        <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold mt-6">
          — QS. Ar-Rum (30): 21
        </p>
      </div>

      {/* Small floating flower petals representation near frame */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-white/40 to-transparent rounded-full blur-xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-tr from-sky-ice/15 to-transparent rounded-full blur-xl pointer-events-none animate-float-medium" />
    </section>
  );
}
