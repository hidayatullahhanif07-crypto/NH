import React from 'react';
import { Calendar, MapPin, Clock, Shirt, Compass, ExternalLink } from 'lucide-react';

export default function EventSection() {
  const googleMapsUrl = "https://maps.app.goo.gl/BkWuX3p4W82U9t4J8"; // Ritz-Carlton Jakarta
  const embedMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3966.2575210344426!2d106.8242099!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fb40958e07%3A0xe54d852a4b3f309d!2sThe%20Ritz-Carlton%20Jakarta%2C%20Mega%20Kuningan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  const handleSaveToCalendar = () => {
    const title = encodeURIComponent("The Wedding of Nurin & Hanif");
    const dates = "20260712T010000Z/20260712T070000Z"; // Sunday, 12 July 2026
    const details = encodeURIComponent("Pernikahan Nurin Fildza Azzahra & Hanif Hidayatullah. Mohon doa restu dan kehadiran Bapak/Ibu/Saudara/i.");
    const location = encodeURIComponent("Grand Ballroom, The Ritz-Carlton Jakarta, Mega Kuningan");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      className="py-24 px-4 md:px-8 bg-pearl relative overflow-hidden"
      id="event"
    >
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-15%] w-72 h-72 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-poppins text-[10px] tracking-[0.4em] text-sky-primary uppercase font-bold mb-2">
            The Save The Date
          </p>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-navy tracking-wide mb-4">
            Wedding Schedule
          </h2>
          <div className="w-12 h-[1px] bg-sky-primary mx-auto mb-6" />
        </div>

        {/* Akad & Resepsi Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16" id="event">
          {/* Akad Nikah */}
          <div className="glass-gold-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-sky-primary/10">
            {/* Corner Decorative Shimmer */}
            <div className="absolute top-0 left-0 w-2 h-full bg-navy" />
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-sky-soft/20 rounded-lg text-navy">
                  <Calendar className="w-5 h-5" />
                </span>
                <h3 className="font-playfair text-xl font-bold text-navy tracking-wide">
                  Akad Nikah
                </h3>
              </div>

              <div className="space-y-5 text-left mb-8">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Hari & Tanggal
                    </p>
                    <p className="font-playfair text-md text-navy font-medium mt-0.5">
                      Minggu, 12 Juli 2026
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Waktu
                    </p>
                    <p className="font-playfair text-md text-navy font-medium mt-0.5">
                      08:00 – 10:00 WIB
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Tempat
                    </p>
                    <p className="font-playfair text-md text-navy font-semibold mt-0.5">
                      Grand Ballroom
                    </p>
                    <p className="font-poppins text-xs text-navy/80">
                      The Ritz-Carlton Jakarta, Mega Kuningan
                    </p>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="flex items-start gap-3">
                  <Shirt className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Dress Code
                    </p>
                    <p className="font-playfair text-xs text-navy/80 mt-0.5">
                      Smart Elegant (Soft Pastel / Neutral Tones)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-sky-primary/10 pt-6 flex gap-3">
              <button
                onClick={handleSaveToCalendar}
                className="flex-1 py-3 px-4 rounded-full border border-sky-primary/30 text-navy font-poppins text-[10px] tracking-widest uppercase font-semibold hover:bg-sky-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-calendar-akad"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add To Calendar</span>
              </button>
            </div>
          </div>

          {/* Resepsi */}
          <div className="glass-gold-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-sky-primary/10">
            <div className="absolute top-0 left-0 w-2 h-full bg-navy" />
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-sky-soft/20 rounded-lg text-navy">
                  <Calendar className="w-5 h-5" />
                </span>
                <h3 className="font-playfair text-xl font-bold text-navy tracking-wide">
                  Resepsi Pernikahan
                </h3>
              </div>

              <div className="space-y-5 text-left mb-8">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Hari & Tanggal
                    </p>
                    <p className="font-playfair text-md text-navy font-medium mt-0.5">
                      Minggu, 12 Juli 2026
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Waktu
                    </p>
                    <p className="font-playfair text-md text-navy font-medium mt-0.5">
                      11:00 – 14:00 WIB
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Tempat
                    </p>
                    <p className="font-playfair text-md text-navy font-semibold mt-0.5">
                      Grand Ballroom
                    </p>
                    <p className="font-poppins text-xs text-navy/80">
                      The Ritz-Carlton Jakarta, Mega Kuningan
                    </p>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="flex items-start gap-3">
                  <Shirt className="w-4 h-4 text-sky-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-bold">
                      Dress Code
                    </p>
                    <p className="font-playfair text-xs text-navy/80 mt-0.5">
                      Smart Elegant (Soft Pastel / Neutral Tones)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-sky-primary/10 pt-6 flex gap-3">
              <button
                onClick={handleSaveToCalendar}
                className="flex-1 py-3 px-4 rounded-full border border-sky-primary/30 text-navy font-poppins text-[10px] tracking-widest uppercase font-semibold hover:bg-sky-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-calendar-resepsi"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add To Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps Container */}
        <div className="glass-gold-card p-4 rounded-2xl overflow-hidden relative shadow-lg border border-sky-primary/10">
          <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full dark-glass-card text-sky-ice font-poppins text-[10px] tracking-widest uppercase font-semibold flex items-center gap-2 pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-sky-primary animate-spin-slow" />
            <span>Interactive Venue Map</span>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner border border-sky-primary/15">
            <iframe
              src={embedMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ritz Carlton Jakarta Mega Kuningan Map"
              id="google-maps-iframe"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="text-left">
              <h4 className="font-playfair text-sm font-semibold text-navy">The Ritz-Carlton Jakarta, Mega Kuningan</h4>
              <p className="font-poppins text-[11px] text-navy/70">Jl. DR. Ide Anak Agung Gde Agung Kav.E.1.1 No.1, Kuningan, Jakarta</p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-navy text-white font-poppins text-[10px] tracking-widest uppercase font-semibold hover:bg-sky-primary hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md w-full sm:w-auto justify-center"
              id="btn-open-gmaps"
            >
              <span>Petunjuk Arah</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
