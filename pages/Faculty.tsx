
import React from 'react';
import { FACULTY } from '../constants';
import { Mail, Linkedin } from 'lucide-react';

const Faculty: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-24 animate-blur-fade">
        <h1 className="text-5xl md:text-6xl font-bold serif text-[#C9A24D] mb-6">Scientific Faculty</h1>
        <div className="w-20 h-1 bg-[#C9A24D]/30 mx-auto mb-6"></div>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-lg leading-relaxed">
          The global vanguard of surgical excellence and obstetric research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {FACULTY.map((member, index) => (
          <div 
            key={member.id} 
            className={`group relative animate-blur-fade`}
            style={{ animationDelay: `${0.2 + index * 0.15}s` }}
          >
            <div className="relative overflow-hidden rounded-[40px] h-[550px] border border-[#1F2937] shadow-2xl bg-[#121826]">
              <img 
                src={member.imageUrl} 
                className="w-full h-full object-cover hover-reveal-img grayscale filter" 
                alt={member.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent"></div>
              
              <div className="absolute top-8 left-8">
                <span className="bg-[#C9A24D] text-[#0B0F14] px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                  {member.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out">
                <h3 className="text-4xl font-bold serif text-[#E6EAF0] mb-3 group-hover:text-[#C9A24D] transition-colors">{member.name}</h3>
                <p className="text-[#C9A24D] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{member.designation}</p>
                <p className="text-[#9AA4B2] text-xs font-medium leading-relaxed opacity-80 mb-8">{member.institution}</p>
                
                <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all shadow-lg">
                    <Linkedin size={20} />
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all shadow-lg">
                    <Mail size={20} />
                  </button>
                  <button className="flex-grow bg-[#1F2937] hover:bg-white hover:text-[#0B0F14] transition-all px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    Full Bio
                  </button>
                </div>
              </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -inset-6 bg-[#C9A24D]/5 rounded-[60px] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
