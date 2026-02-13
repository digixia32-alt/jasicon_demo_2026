
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROGRAM } from '../constants';
import { Clock, User, MapPin, Search, Award } from 'lucide-react';

const Program: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-20 gap-8 md:gap-10 animate-blur-fade">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-6xl font-bold serif text-[#C9A24D] mb-4 md:mb-6">Scientific Program</h1>
          <p className="text-[#9AA4B2] max-w-xl italic text-sm md:text-lg leading-relaxed mx-auto lg:mx-0">
            A comprehensive curriculum spanning contemporary clinical research and innovative surgical techniques.
          </p>
        </div>
      </div>

      <div className="flex space-x-2 sm:space-x-6 mb-10 md:mb-16 border-b border-[#1F2937] pb-1 overflow-x-auto scrollbar-hide animate-blur-fade delay-2">
        {[
          { id: 1, label: '20 Nov, 2026' },
          { id: 2, label: '21 Nov, 2026' },
          { id: 3, label: '22 Nov, 2026' }
        ].map(day => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`px-6 sm:px-10 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] transition-all relative whitespace-nowrap ${activeDay === day.id ? 'text-[#C9A24D]' : 'text-[#9AA4B2] hover:text-white'
              }`}
          >
            {day.label}
            {activeDay === day.id && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#C9A24D] animate-scale-in"></div>
            )}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl md:rounded-[40px] overflow-hidden border border-[#1F2937] animate-scale-in delay-3 shadow-2xl">
        {/* Desktop Header */}
        <div className="hidden lg:grid grid-cols-5 bg-[#1F2937]/30 p-8 border-b border-[#1F2937] text-[10px] uppercase tracking-[0.3em] font-black text-[#9AA4B2]">
          <div className="col-span-1">Timeline</div>
          <div className="col-span-2">Academic Content</div>
          <div className="col-span-1">Faculty Member</div>
          <div className="col-span-1 text-right">Venue Hall</div>
        </div>

        {/* Sessions List */}
        <div className="divide-y divide-[#1F2937]">
          {PROGRAM.filter(session => session.day === activeDay).length > 0 ? (
            PROGRAM.filter(session => session.day === activeDay).map((session, index) => (
              <div
                key={session.id}
                className="p-6 md:p-10 hover:bg-white/5 transition-all animate-slide-left"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {/* Desktop Row Grid */}
                <div className="hidden lg:grid grid-cols-5 gap-6 items-center">
                  <div className="col-span-1 flex items-center space-x-4 text-[#C9A24D]">
                    <Clock size={20} className="animate-pulse" />
                    <span className="font-bold text-2xl serif">{session.time}</span>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-2xl font-bold serif text-[#E6EAF0] mb-2">{session.topic}</h4>
                    <span className="text-[9px] bg-[#C9A24D]/10 text-[#C9A24D] px-3 py-1 rounded-full uppercase tracking-widest font-black border border-[#C9A24D]/20">Expert Panel</span>
                  </div>
                  <div className="col-span-1 flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1F2937] overflow-hidden border border-[#1F2937]">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.speaker}`} alt={session.speaker} className="w-full h-full object-cover grayscale" />
                    </div>
                    <span className="text-sm font-bold text-[#E6EAF0]">{session.speaker}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-2 text-[#9AA4B2] text-sm font-medium italic">
                    <MapPin size={16} className="text-[#C9A24D]" />
                    <span>{session.hall}</span>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="lg:hidden space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#C9A24D]">
                      <Clock size={16} />
                      <span className="text-lg font-bold serif">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#9AA4B2] text-[10px] font-bold uppercase tracking-widest">
                      <MapPin size={12} className="text-[#C9A24D]" />
                      {session.hall}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold serif text-[#E6EAF0] leading-tight">{session.topic}</h4>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 overflow-hidden border border-[#1F2937]">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.speaker}`} alt={session.speaker} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold text-[#C9A24D]">{session.speaker}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-[#9AA4B2] italic">
              No sessions scheduled for this day yet.
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Program;
