
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: "/assets/a.png",
    title: "The Gateway",
    sub: "Deoghar International Airport"
  },
  {
    url: "/assets/b.png",
    title: "Our Heritage",
    sub: "Baidyanath Jyotirlinga Mandir"
  },
  {
    url: "/assets/c.jpg",
    title: "The Destination",
    sub: "Scenic Beauty of Deoghar"
  }
];

const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-[#121826]/80 backdrop-blur-md border border-[#1F2937] rounded-xl w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center mb-1 shadow-lg">
      <span className="text-lg sm:text-3xl font-bold serif text-[#C9A24D]">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-[#9AA4B2] font-bold">{label}</span>
  </div>
);

const Home: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-11-12T00:00:00") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-[90vh] w-full overflow-hidden bg-[#0B0F14] flex flex-col justify-center">

        {/* Sliding Background */}
        <div className="absolute inset-0 flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {HERO_IMAGES.map((item, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-[0.4] saturate-[1.1] animate-ken-burns"
              />
            </div>
          ))}
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]/40 pointer-events-none"></div>

        {/* Content Layer */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-24 md:py-20 text-center lg:text-left">
          <div className="animate-blur-fade">
            <div className="inline-flex items-center space-x-2 bg-[#C9A24D]/30 border border-[#C9A24D]/50 px-4 py-1.5 rounded-full mb-6 backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] animate-pulse"></span>
              <span className="text-white text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Nov 20-22, 2026 • Deoghar</span>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl sm:text-6xl md:text-9xl font-bold serif leading-tight text-white animate-blur-fade drop-shadow-2xl">
              JASICON <span className="text-[#C9A24D]">2026</span>
            </h1>
            <p className="text-base sm:text-2xl md:text-5xl text-[#E6EAF0] font-light italic serif tracking-tight opacity-90 animate-blur-fade">
              Advancing Clinical Excellence Together
            </p>
          </div>

          <p className="max-w-xl text-[12px] sm:text-lg md:text-xl text-[#E6EAF0]/90 mt-6 md:mt-8 mb-10 md:mb-12 mx-auto lg:mx-0 leading-relaxed animate-blur-fade font-medium">
            Join the convergence of medical innovation and cultural heritage in Baidyanath Dham. Secure your place at India's most prestigious forum.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 animate-blur-fade">
            <Link
              to="/registration"
              className="w-full sm:w-auto bg-[#C9A24D] text-[#0B0F14] px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center btn-shine shadow-xl"
            >
              Secure Your Seat
            </Link>
            <Link
              to="/program"
              className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#0B0F14] transition-all flex items-center justify-center group backdrop-blur-md"
            >
              Program Guide
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-[#C9A24D]' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative px-4 -mt-10 sm:-mt-16 z-30 max-w-5xl mx-auto mb-16 md:mb-20">
        <div className="bg-[#121826]/95 backdrop-blur-3xl border border-[#1F2937] rounded-2xl sm:rounded-[40px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-2xl font-bold serif text-[#C9A24D]">Registration Deadline</h3>
            <p className="text-[9px] sm:text-xs text-[#9AA4B2] font-medium tracking-wide">Secure Early Bird benefits before they expire.</p>
          </div>
          <div className="flex space-x-3 sm:space-x-8">
            <CountdownBox value={timeLeft.days} label="Days" />
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <CountdownBox value={timeLeft.minutes} label="Min" />
            <CountdownBox value={timeLeft.seconds} label="Sec" />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-5xl font-bold serif mb-4">Pillars of Excellence</h2>
          <div className="w-12 h-1 bg-[#C9A24D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Academic Brilliance', img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" },
            { title: 'Hands-on Mastery', img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop" },
            { title: 'Global Connectivity', img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop" },
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl h-[350px] md:h-[400px] border border-[#1F2937]">
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover hover-reveal-img grayscale" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold serif text-[#E6EAF0] group-hover:text-[#C9A24D] transition-colors">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
