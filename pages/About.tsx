
import React from 'react';
import { MapPin, Info, Globe, ShieldCheck, ExternalLink, Navigation, LocateFixed } from 'lucide-react';

const About: React.FC = () => {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Maihar+Garden+Resort,+Daburgram,+Jasidih+Road,+Deoghar,+Jharkhand+814142";

  // Google Maps Embed URL for Maihar Garden Resort
  const embedMapUrl = "https://maps.google.com/maps?q=Maihar+Garden+Resort,+Daburgram,+Jasidhi+Road,+Deoghar,+Jharkhand+814142&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Hero Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-32">
        {/* Responsive Image Container */}
        <div className="relative h-[350px] sm:h-[450px] md:h-[650px] rounded-3xl overflow-hidden border border-[#1F2937] shadow-2xl animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover filter brightness-[0.7] grayscale group-hover:grayscale-0 transition-all duration-1000 animate-ken-burns"
            alt="Medical Excellence"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent"></div>

          {/* Overlay card optimized for mobile */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-10 md:left-10 p-6 md:p-10 glass-card rounded-2xl md:rounded-3xl max-w-sm animate-fade-in-up delay-2 shadow-2xl border border-[#C9A24D]/20">
            <h4 className="text-2xl md:text-3xl font-bold serif text-[#C9A24D]">Excellence</h4>
            <p className="text-[11px] md:text-sm text-[#9AA4B2] mt-2 md:mt-3 leading-relaxed">Dedicated to the highest standards of maternal healthcare and clinical research.</p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold serif text-[#C9A24D] mb-4 md:mb-8">About Jasicon 2026</h1>
            <div className="space-y-4 md:space-y-6 text-[#E6EAF0] text-sm md:text-lg leading-relaxed">
              <p className="text-xl md:text-2xl italic font-light serif text-[#9AA4B2] border-l-4 border-[#C9A24D] pl-4 md:pl-6">
                "Pioneering the future of women's healthcare through surgical innovation."
              </p>
              <p>The National Conference of Obstetrics & Gynecology (Jasicon) is India's premier forum for academic exchange. For the 2026 edition, we are proud to host our gathering in a location of deep heritage and significance.</p>
              <p>Our focus this year is <span className="text-[#C9A24D] font-bold">"Technological Advancements in Fetal Medicine,"</span> highlighting the intersection of robotic surgery, genomic diagnostics, and global maternal health policies.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8 animate-fade-in-up delay-2">
            <div className="p-6 md:p-8 bg-[#121826] rounded-2xl md:rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/50 transition-all group">
              <h5 className="text-3xl md:text-5xl font-bold text-[#C9A24D] group-hover:scale-110 transition-transform">5000+</h5>
              <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-[#9AA4B2] mt-2 font-bold">Global Delegates</p>
            </div>
            <div className="p-6 md:p-8 bg-[#121826] rounded-2xl md:rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/50 transition-all group">
              <h5 className="text-3xl md:text-5xl font-bold text-[#C9A24D] group-hover:scale-110 transition-transform">150+</h5>
              <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-[#9AA4B2] mt-2 font-bold">Scientific Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive Large Map Section */}
      <section className="mb-20 md:mb-32 animate-fade-in-up delay-3">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold serif text-[#C9A24D] mb-4">Venue & Location</h2>
          <div className="w-16 md:w-24 h-1 bg-[#C9A24D]/30 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-xs md:text-sm text-[#9AA4B2] max-w-2xl mx-auto italic px-4">Explore the exact location of our prestigious gathering in the heart of Deoghar.</p>
        </div>

        <div className="relative group w-full h-[400px] md:h-[700px] rounded-3xl md:rounded-[40px] overflow-hidden border border-[#1F2937] hover:border-[#C9A24D]/40 shadow-2xl transition-all duration-700">
          <iframe
            src={embedMapUrl}
            className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location Map"
          ></iframe>

          <div className="absolute top-4 right-4 left-4 md:left-auto md:w-96 glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl z-20 animate-slide-right delay-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A24D] text-[#0B0F14] rounded-xl shadow-xl shrink-0">
                <LocateFixed size={20} />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">Maihar Garden Resort</h3>
                <p className="text-[10px] md:text-xs text-[#9AA4B2] leading-relaxed mb-4 italic">Daburgram, Jasidhi Road, Deoghar, Jharkhand 814142</p>

                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#C9A24D] text-[#0B0F14] py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] shadow-xl group/btn"
                >
                  <Navigation size={12} className="group-hover/btn:animate-bounce" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 md:py-20 border-t border-[#1F2937] animate-fade-in-up delay-4">
        {[
          { title: 'Vision', icon: <Globe />, text: 'Establishing global benchmarks in obstetric excellence.' },
          { title: 'Knowledge', icon: <Info />, text: 'Curating evidence-based clinical insights.' },
          { title: 'Ethics', icon: <ShieldCheck />, text: 'Upholding patient-centric medical integrity.' },
          { title: 'Network', icon: <Navigation />, text: 'Connecting medical pioneers across borders.' }
        ].map((item, i) => (
          <div key={i} className="text-center group p-4 h-full flex flex-col items-center transition-all">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-[#121826] rounded-full border border-[#1F2937] flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-[#0B0F14] transition-all duration-700 shadow-xl">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
            </div>
            <h4 className="text-xl md:text-2xl font-bold serif mb-2 md:mb-3 group-hover:text-[#C9A24D] transition-colors">
              {item.title}
            </h4>
            <p className="text-xs md:text-sm text-[#9AA4B2] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
