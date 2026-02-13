
import React from 'react';
import { Plane, Globe, MapPin, ShieldCheck, Car, Train } from 'lucide-react';

const Travel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Travel Guide</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto">
          Essential information for international and national delegates visiting New Delhi for DOCON 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Visa Section */}
        <div className="space-y-8 animate-fade-in-up delay-1">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D]">
              <Globe size={24} />
            </div>
            <h2 className="text-3xl font-bold serif">International Delegates</h2>
          </div>
          <div className="glass-card p-10 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all duration-500">
            <h3 className="text-xl font-bold serif text-[#C9A24D] mb-4">Visa Requirements</h3>
            <p className="text-[#9AA4B2] leading-relaxed mb-6 text-sm">
              All foreign nationals entering India are required to possess a valid international travel document in the form of a national passport with a valid visa.
            </p>
            <ul className="space-y-4">
              {[
                'Apply for e-Conference Visa at least 30 days in advance.',
                'Download the official invitation letter from your dashboard.',
                'Ensure your passport has at least 6 months validity.',
                'Contact global@docon2026.com for personalized visa assistance.'
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-[#E6EAF0]">
                  <ShieldCheck size={18} className="text-[#C9A24D] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Airport Section */}
        <div className="space-y-8 animate-fade-in-up delay-2">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D]">
              <Plane size={24} />
            </div>
            <h2 className="text-3xl font-bold serif">Arrival & Logistics</h2>
          </div>
          <div className="glass-card p-10 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all duration-500">
            <h3 className="text-xl font-bold serif text-[#C9A24D] mb-4">IGI Airport (DEL)</h3>
            <p className="text-[#9AA4B2] leading-relaxed mb-6 text-sm">
              Indira Gandhi International Airport is the primary aviation hub for Delhi. It is approximately 15km from the conference venue.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-[#1F2937]">
                <div className="flex items-center space-x-2 text-[#C9A24D] mb-2">
                  <Car size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Taxi / Uber</span>
                </div>
                <p className="text-xs text-[#9AA4B2]">Available 24/7 at Terminal 3. Approx. cost: ₹800 - ₹1200.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-[#1F2937]">
                <div className="flex items-center space-x-2 text-[#C9A24D] mb-2">
                  <Train size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Metro Express</span>
                </div>
                <p className="text-xs text-[#9AA4B2]">Fastest way to central Delhi. 20 mins to Shivaji Stadium.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Fixed Image */}
      <div className="relative h-[650px] rounded-[40px] overflow-hidden border border-[#1F2937] group animate-fade-in-up delay-3 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1548013146-72479768b921?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover filter brightness-[0.5] grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-out animate-ken-burns" 
          alt="New Delhi Cinematic Heritage" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent"></div>
        
        <div className="absolute top-12 right-12 bg-[#C9A24D]/10 backdrop-blur-md border border-[#C9A24D]/30 px-8 py-3 rounded-full hidden md:block">
           <span className="text-[#C9A24D] text-xs font-bold uppercase tracking-widest">Host City: New Delhi</span>
        </div>

        <div className="absolute bottom-16 left-16 right-16 flex flex-col md:flex-row justify-between items-end gap-12">
           <div className="max-w-2xl">
              <h4 className="text-5xl font-bold serif mb-6 text-[#E6EAF0]">Discover the Capital</h4>
              <p className="text-[#9AA4B2] italic leading-relaxed text-xl">
                Immerse yourself in the rich tapestry of India's capital city. Experience the majestic architecture and vibrant spirit of Delhi during DOCON 2026.
              </p>
           </div>
           <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
             <button className="shrink-0 bg-[#C9A24D] text-[#0B0F14] px-12 py-5 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                <MapPin size={22} />
                <span>Venue Map</span>
             </button>
             <button className="shrink-0 bg-white/5 border border-white/20 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-md">
                Download City Guide
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
