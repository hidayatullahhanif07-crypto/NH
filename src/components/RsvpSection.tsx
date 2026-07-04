import React, { useState, useEffect } from 'react';
import { Mail, Users, CheckCircle, HelpCircle, XCircle, Send, Award, Heart } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { RsvpData, WishData } from '../types';
import confetti from 'canvas-confetti';

interface RsvpSectionProps {
  guestName: string;
}

export default function RsvpSection({ guestName }: RsvpSectionProps) {
  const [formData, setFormData] = useState({
    name: guestName || '',
    status: 'hadir' as 'hadir' | 'tidak_hadir' | 'ragu',
    guestsCount: 1,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [stats, setStats] = useState({
    totalAttendingGuests: 0,
    countHadir: 0,
    countTidakHadir: 0,
    countRagu: 0
  });

  const [wishes, setWishes] = useState<WishData[]>([]);

  // Default elegant pre-loaded wishes to ensure a premium decorated initial state if empty
  const seedWishes: WishData[] = [
    {
      id: "seed-1",
      name: "Siti Rahmawati & Keluarga",
      message: "Selamat menempuh hidup baru Nurin dan Hanif! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Senantiasa dilimpahi keberkahan dan kebahagiaan yang abadi. Aamiin ya rabbal alamin.",
      createdAt: Date.now() - 3600000 * 2
    },
    {
      id: "seed-2",
      name: "Budi Gunawan",
      message: "Happy Wedding Nurin & Hanif! Ikut bahagia melihat perjalanan cinta kalian sampai ke pelaminan hari ini. Semoga rukun selalu, sukses menggelar resepsi yang megah, dan segera diberikan keturunan yang sholeh/sholehah.",
      createdAt: Date.now() - 3600000 * 5
    },
    {
      id: "seed-3",
      name: "Dr. Amanda Puteri",
      message: "Selamat berbahagia untuk kedua mempelai yang serasi ini! Doa terbaik kami agar jalinan cinta kalian terus mekar seindah bunga peonies hari ini, saling menguatkan dalam suka maupun duka.",
      createdAt: Date.now() - 3600000 * 24
    }
  ];

  // Listen to Firestore to get live RSVP stats
  useEffect(() => {
    const q = collection(db, 'rsvps');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalGuests = 0;
      let hadir = 0;
      let tidakHadir = 0;
      let ragu = 0;

      snapshot.forEach((doc) => {
        const data = doc.data() as RsvpData;
        if (data.status === 'hadir') {
          hadir += 1;
          totalGuests += (Number(data.guestsCount) || 1);
        } else if (data.status === 'tidak_hadir') {
          tidakHadir += 1;
        } else if (data.status === 'ragu') {
          ragu += 1;
        }
      });

      setStats({
        totalAttendingGuests: totalGuests,
        countHadir: hadir,
        countTidakHadir: tidakHadir,
        countRagu: ragu
      });
    });

    return () => unsubscribe();
  }, []);

  // Listen to wishes collection ordered by newest first
  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedWishes: WishData[] = [];
      snapshot.forEach((doc) => {
        loadedWishes.push({ id: doc.id, ...doc.data() } as WishData);
      });
      
      // Combine Firestore wishes with seed wishes if empty
      if (loadedWishes.length === 0) {
        setWishes(seedWishes);
      } else {
        setWishes(loadedWishes);
      }
    }, (error) => {
      console.warn("Firestore wishes listener error, using seed wishes:", error);
      setWishes(seedWishes);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const rsvpPayload: RsvpData = {
        name: formData.name,
        status: formData.status,
        guestsCount: formData.status === 'hadir' ? formData.guestsCount : 0,
        message: formData.message,
        createdAt: Date.now()
      };

      // Save wish if there is a message
      if (formData.message.trim()) {
        await addDoc(collection(db, 'wishes'), {
          name: formData.name,
          message: formData.message,
          createdAt: Date.now()
        });
      }

      await addDoc(collection(db, 'rsvps'), rsvpPayload);

      // Trigger Celebration confetti!
      if (formData.status === 'hadir') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7EC8E3', '#AEE6FF', '#DDF4FF', '#FFFFFF', '#F5D78E']
        });
      }

      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Reset form message
      setFormData(prev => ({ ...prev, message: '' }));
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting RSVP: ", err);
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="py-24 px-4 md:px-8 bg-cream-soft marble-bg relative"
      id="rsvp"
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-10 right-[-10%] w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-80 h-80 bg-sky-ice/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-soft/20 border border-sky-primary/20 mb-4 animate-float-slow">
            <Mail className="w-5 h-5 text-navy" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-navy tracking-wide mb-3">
            RSVP & Ucapan Bahagia
          </h2>
          <p className="font-cormorant text-lg text-navy/85 italic max-w-md mx-auto mb-6">
            Konfirmasikan kehadiran Anda dan sampaikan doa restu hangat bagi pernikahan mulia kami.
          </p>
          <div className="w-16 h-[1px] bg-sky-primary/40 mx-auto" />
        </div>

        {/* Attendance Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto animate-fade-in" id="rsvp-stats">
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/40 p-4 rounded-2xl text-center shadow-[0_8px_30px_rgba(26,54,93,0.03)] transition-all duration-300 hover:-translate-y-1">
            <CheckCircle className="w-5 h-5 text-sky-primary mx-auto mb-1.5" />
            <p className="font-poppins text-[9px] text-navy/60 uppercase tracking-widest font-bold">Hadir</p>
            <p className="font-playfair text-lg md:text-xl font-bold text-navy mt-1">
              {stats.countHadir} ({stats.totalAttendingGuests} Pax)
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-md border border-slate-200/40 p-4 rounded-2xl text-center shadow-[0_8px_30px_rgba(26,54,93,0.03)] transition-all duration-300 hover:-translate-y-1">
            <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1.5" />
            <p className="font-poppins text-[9px] text-navy/60 uppercase tracking-widest font-bold">Absen</p>
            <p className="font-playfair text-lg md:text-xl font-bold text-navy mt-1">{stats.countTidakHadir}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md border border-slate-200/40 p-4 rounded-2xl text-center shadow-[0_8px_30px_rgba(26,54,93,0.03)] transition-all duration-300 hover:-translate-y-1">
            <HelpCircle className="w-5 h-5 text-gold-accent mx-auto mb-1.5" />
            <p className="font-poppins text-[9px] text-navy/60 uppercase tracking-widest font-bold">Ragu</p>
            <p className="font-playfair text-lg md:text-xl font-bold text-navy mt-1">{stats.countRagu}</p>
          </div>
        </div>

        {/* Large Glassmorphism Card */}
        <div className="max-w-2xl mx-auto relative">
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/35 backdrop-blur-xl rounded-[45px] shadow-[0_25px_60px_-15px_rgba(26,54,93,0.12)] border border-slate-200/50 pointer-events-none" />
          
          <div className="relative bg-white/30 backdrop-blur-xl p-8 md:p-12 rounded-[45px] border border-slate-200/40 shadow-xl overflow-hidden light-sweep-container">
            {/* Double Border Inner Lines */}
            <div className="absolute inset-3 border border-slate-300/30 rounded-[37px] pointer-events-none" />
            <div className="absolute inset-4 border border-gold-accent/10 rounded-[33px] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-playfair text-xl md:text-2xl text-navy text-center mb-8 font-medium italic tracking-wide">
                Konfirmasi Kehadiran & Doa Restu
              </h3>

              {submitSuccess ? (
                <div className="text-center py-8 px-4 animate-fade-in" id="rsvp-success-state">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-sky-primary animate-pulse" />
                  </div>
                  <h3 className="font-playfair text-2xl font-medium text-navy mb-2">Terima Kasih Banyak!</h3>
                  <p className="font-poppins text-xs text-navy/70 leading-relaxed max-w-sm mx-auto">
                    Konfirmasi dan doa restu Anda telah terekam secara real-time. Terima kasih atas partisipasi dan kebaikan hati Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="rsvp-form">
                  
                  {/* Form Nama Tamu */}
                  <div>
                    <label htmlFor="rsvp-name" className="block font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-extrabold mb-2.5">
                      Nama Tamu / Undangan
                    </label>
                    <input
                      type="text"
                      id="rsvp-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama Anda..."
                      className="w-full px-4 py-3.5 rounded-2xl border border-sky-primary/20 bg-white/70 focus:bg-white focus:outline-none focus:border-navy transition-all font-poppins text-xs"
                    />
                  </div>

                  {/* Pilihan Kehadiran */}
                  <div>
                    <span className="block font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-extrabold mb-2.5">
                      Pilihan Kehadiran
                    </span>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {/* Hadir */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'hadir' })}
                        className={`py-3.5 px-2 rounded-2xl border font-poppins text-[11px] font-bold tracking-wider uppercase flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                          formData.status === 'hadir'
                            ? 'bg-navy border-navy text-white shadow-md transform -translate-y-0.5'
                            : 'bg-white/60 border-slate-200 text-sky-primary hover:border-sky-primary/40'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Hadir</span>
                      </button>

                      {/* Absen */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'tidak_hadir' })}
                        className={`py-3.5 px-2 rounded-2xl border font-poppins text-[11px] font-bold tracking-wider uppercase flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                          formData.status === 'tidak_hadir'
                            ? 'bg-navy border-navy text-white shadow-md transform -translate-y-0.5'
                            : 'bg-white/60 border-slate-200 text-sky-primary hover:border-sky-primary/40'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Absen</span>
                      </button>

                      {/* Ragu */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'ragu' })}
                        className={`py-3.5 px-2 rounded-2xl border font-poppins text-[11px] font-bold tracking-wider uppercase flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                          formData.status === 'ragu'
                            ? 'bg-navy border-navy text-white shadow-md transform -translate-y-0.5'
                            : 'bg-white/60 border-slate-200 text-sky-primary hover:border-sky-primary/40'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Ragu</span>
                      </button>
                    </div>
                  </div>

                  {/* Pax Selector (visible if attending) */}
                  {formData.status === 'hadir' && (
                    <div className="animate-fade-in" id="pax-selector-container">
                      <label htmlFor="rsvp-guests" className="block font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-extrabold mb-2.5">
                        Jumlah Pax / Orang Yang Hadir
                      </label>
                      <div className="relative">
                        <select
                          id="rsvp-guests"
                          value={formData.guestsCount}
                          onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                          className="w-full px-4 py-3.5 rounded-2xl border border-sky-primary/20 bg-white/70 focus:bg-white focus:outline-none focus:border-navy transition-all font-poppins text-xs appearance-none"
                        >
                          <option value="1">1 Orang</option>
                          <option value="2">2 Orang</option>
                          <option value="3">3 Orang</option>
                          <option value="4">4 Orang</option>
                          <option value="5">5 Orang</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sky-primary">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Kolom Ucapan & Doa */}
                  <div>
                    <label htmlFor="rsvp-message" className="block font-poppins text-[10px] tracking-widest text-sky-primary uppercase font-extrabold mb-2.5">
                      Kolom Ucapan & Doa Restu
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan ucapan dan doa hangat Anda di sini..."
                      className="w-full px-4 py-3.5 rounded-2xl border border-sky-primary/20 bg-white/70 focus:bg-white focus:outline-none focus:border-navy transition-all font-poppins text-xs resize-none"
                    />
                  </div>

                  {/* Tombol Kirim */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-navy text-white font-poppins text-xs tracking-widest uppercase font-semibold rounded-full shadow-lg hover:bg-sky-primary hover:shadow-sky-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="btn-submit-rsvp"
                  >
                    <Send className="w-3.5 h-3.5 text-gold-accent" />
                    <span>{isSubmitting ? "Mengirimkan ucapan..." : "Kirim Konfirmasi & Ucapan"}</span>
                  </button>
                </form>
              )}

              {/* Elegant Gold/Heart Divider */}
              <div className="flex items-center gap-3 w-3/4 mx-auto my-12">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-primary/30 to-transparent" />
                <Heart className="w-4 h-4 text-gold-accent animate-pulse shrink-0" />
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-primary/30 to-transparent" />
              </div>

              {/* Dynamic list of greetings from guests at the bottom */}
              <div className="space-y-4">
                <h4 className="font-playfair text-lg text-navy text-center mb-6 font-medium italic tracking-wide">
                  Daftar Ucapan & Doa Restu ({wishes.length})
                </h4>

                {/* Scroller */}
                <div 
                  className="max-h-[380px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-sky-primary/30 scroll-smooth custom-scrollbar" 
                  id="wishes-scroller"
                >
                  {wishes.map((wish, index) => {
                    const firstLetter = wish.name ? wish.name.charAt(0).toUpperCase() : 'G';
                    return (
                      <div 
                        key={wish.id || index}
                        className="bg-white/60 p-4 rounded-2xl border border-slate-200/40 shadow-sm flex gap-3 items-start animate-fade-in transition-all duration-300 hover:scale-[1.01]"
                      >
                        {/* Elegant initial avatar with sky blue gradient */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-soft to-sky-ice border border-sky-primary/20 flex items-center justify-center font-playfair font-bold text-navy shrink-0 shadow-inner">
                          {firstLetter}
                        </div>
                        {/* Body */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="font-playfair text-sm font-semibold text-navy truncate">
                              {wish.name}
                            </h5>
                            {wish.createdAt && (
                              <span className="font-poppins text-[8px] text-gray-400 tracking-wider">
                                {new Date(wish.createdAt).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </span>
                            )}
                          </div>
                          <p className="font-poppins text-xs text-navy/80 leading-relaxed break-words whitespace-pre-line">
                            {wish.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
