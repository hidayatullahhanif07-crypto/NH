import React, { useState } from 'react';
import { Copy, Check, Gift, Landmark, CreditCard, QrCode, MapPin } from 'lucide-react';

interface AccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  icon: React.ReactNode;
}

const ACCOUNTS: AccountInfo[] = [
  {
    bankName: "Bank Syariah Indonesia (BSI)",
    accountNumber: "7182931821",
    accountHolder: "Nurin Fildza Azzahra",
    icon: <CreditCard className="w-5 h-5 text-sky-primary" />
  },
  {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8420918231",
    accountHolder: "Hanif Hidayatullah",
    icon: <Landmark className="w-5 h-5 text-sky-primary" />
  }
];

export default function DigitalGift() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedQRIS, setCopiedQRIS] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const shippingAddress = "Jl. Terusan Kopo No. 123, Margahayu, Bandung, Jawa Barat, 40225";

  const handleWhatsappConfirm = () => {
    const message = encodeURIComponent(
      "Halo Nurin & Hanif,\n\nSaya ingin mengonfirmasi bahwa saya telah mengirimkan tanda kasih/hadiah pernikahan. Semoga pernikahan kalian berdua penuh berkah, kebahagiaan, dan kelancaran. Aamiin."
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <section 
      className="py-24 px-4 md:px-8 bg-pearl relative overflow-hidden"
      id="gift"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title & Description */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-soft/20 border border-sky-primary/20 mb-4 animate-float-slow">
            <Gift className="w-5 h-5 text-navy" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-navy tracking-wide mb-3">
            Digital Wedding Gift
          </h2>
          <p className="font-cormorant text-lg text-navy opacity-80 italic max-w-md mx-auto mb-6">
            Doa restu Anda adalah karunia terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih secara digital, Anda dapat melalui sarana berikut.
          </p>
          <div className="w-16 h-[1px] bg-sky-primary/40 mx-auto" />
        </div>

        {/* Gift Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bank Accounts Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-playfair text-lg text-navy tracking-wide font-medium flex items-center gap-2 px-1">
              <span>Transfer Bank</span>
              <div className="h-[1px] flex-1 bg-sky-primary/20" />
            </h3>

            {ACCOUNTS.map((acc, idx) => (
              <div 
                key={idx}
                className="glass-gold-card p-6 rounded-xl relative overflow-hidden group hover:shadow-lg transition-all duration-300 border border-sky-primary/10"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-navy to-sky-primary" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {acc.icon}
                    <span className="font-poppins text-xs font-semibold text-navy">{acc.bankName}</span>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(acc.accountNumber, idx)}
                    className="p-1.5 rounded-md hover:bg-sky-soft/20 text-navy/70 hover:text-navy transition-all duration-300"
                    title="Salin Nomor Rekening"
                    id={`btn-copy-${idx}`}
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-green-600 animate-scale-up" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="font-mono text-xl md:text-2xl font-bold tracking-wider text-navy select-all">
                    {acc.accountNumber}
                  </p>
                  <p className="font-poppins text-xs text-sky-primary font-bold uppercase tracking-wider">
                    a.n. {acc.accountHolder}
                  </p>
                </div>

                {/* Copied Success Message */}
                {copiedIndex === idx && (
                  <div className="mt-3 text-[11px] font-poppins text-green-600 font-semibold flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-200 w-fit animate-fade-in">
                    <span>Nomor rekening berhasil disalin!</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* QRIS Scan Card & Physical Address */}
          <div className="flex flex-col gap-6">
            <h3 className="font-playfair text-lg text-navy tracking-wide font-medium flex items-center gap-2 px-1">
              <span>QRIS Transfer</span>
              <div className="h-[1px] flex-1 bg-sky-primary/20" />
            </h3>

            <div className="glass-gold-card p-6 rounded-xl flex flex-col items-center justify-center text-center relative group hover:shadow-lg transition-all duration-300 border border-sky-primary/10">
              <div className="absolute top-0 right-0 w-12 h-12 bg-sky-primary/10 rounded-bl-full pointer-events-none" />
              
              <div className="bg-pearl p-3 rounded-lg border border-sky-primary/20 mb-4 shadow-inner relative">
                {/* QR Code Container Mockup */}
                <div className="w-40 h-40 bg-zinc-100 flex flex-col items-center justify-center relative overflow-hidden rounded">
                  <QrCode className="w-32 h-32 text-navy" />
                  <div className="absolute inset-0 border-4 border-double border-sky-primary/30 pointer-events-none" />
                  {/* Fake QRIS Logo Banner */}
                  <div className="absolute bottom-1 bg-red-600 text-[8px] font-bold text-white px-2 py-0.5 rounded shadow">
                    QRIS MOCKUP
                  </div>
                </div>
              </div>

              <span className="font-poppins text-xs font-semibold text-navy uppercase tracking-wider mb-1">
                Scan QRIS Code
              </span>
              <p className="font-poppins text-[10px] text-navy/70 max-w-xs leading-relaxed mb-1">
                Gunakan aplikasi mobile banking atau e-wallet pilihan Anda untuk melakukan scan QRIS.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address Container (Optional Physical Gift) */}
        <div className="glass-gold-card p-8 rounded-2xl border border-sky-primary/20 text-center max-w-2xl mx-auto mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-full bg-sky-soft/20 flex items-center justify-center border border-sky-primary/20">
              <MapPin className="w-4 h-4 text-navy" />
            </div>
          </div>
          
          <h4 className="font-playfair text-md font-medium text-navy tracking-wider mb-2">
            Kirim Kado / Alamat Pengiriman
          </h4>
          
          <p className="font-poppins text-xs md:text-sm text-navy/80 max-w-md mx-auto mb-4 leading-relaxed">
            {shippingAddress}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCopyAddress(shippingAddress)}
              className="px-5 py-2 rounded-full border border-sky-primary/30 text-navy font-poppins text-[11px] tracking-widest uppercase font-semibold hover:bg-sky-primary hover:text-white transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              id="btn-copy-address"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>Alamat Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsappConfirm}
              className="px-6 py-2 rounded-full bg-navy text-white font-poppins text-[11px] tracking-widest uppercase font-semibold hover:bg-sky-primary hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
              id="btn-whatsapp-confirm"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Konfirmasi Kado (WA)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
