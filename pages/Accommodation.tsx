
import React from 'react';
import { Star, MapPin, Coffee, Car, Wifi, Shield } from 'lucide-react';

const HOTELS = [
  {
    id: 'h1',
    name: 'The Taj Mahal Hotel',
    location: 'Mansingh Road, New Delhi',
    distance: '3.2 km from Venue',
    rating: 5,
    price: '₹18,500',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    amenities: ['Spa', 'Pool', 'Fine Dining']
  },
  {
    id: 'h2',
    name: 'The Oberoi New Delhi',
    location: 'Dr. Zakir Hussain Marg',
    distance: '4.5 km from Venue',
    rating: 5,
    price: '₹22,000',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    amenities: ['Butler Service', 'Luxury Spa', 'Lounge']
  },
  {
    id: 'h3',
    name: 'Le Méridien New Delhi',
    location: 'Windsor Place',
    distance: '2.1 km from Venue',
    rating: 5,
    price: '₹14,500',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    amenities: ['Gym', 'Bar', 'Valet Parking']
  },
  {
    id: 'h4',
    name: 'The Lodhi',
    location: 'Lodhi Road',
    distance: '5.0 km from Venue',
    rating: 5,
    price: '₹28,000',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
    amenities: ['Private Pool', 'Library', 'Tennis']
  }
];

const Accommodation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Accommodation</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto leading-relaxed">
          We have partnered with Delhi's most prestigious hotels to provide you with a comfortable and elite stay during the conference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {HOTELS.map((hotel) => (
          <div key={hotel.id} className="glass-card rounded-[40px] overflow-hidden group flex flex-col md:flex-row border border-[#1F2937]">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img 
                src={hotel.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
                alt={hotel.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] to-transparent opacity-60"></div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#C9A24D] text-[#C9A24D]" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold serif text-[#E6EAF0] group-hover:text-[#C9A24D] transition-colors">{hotel.name}</h3>
                <div className="flex items-center space-x-2 text-[#9AA4B2] text-xs mt-3">
                  <MapPin size={14} className="text-[#C9A24D]" />
                  <span>{hotel.location}</span>
                </div>
                <p className="text-[#C9A24D] text-[10px] uppercase tracking-widest font-bold mt-2">{hotel.distance}</p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {hotel.amenities.map(a => (
                    <span key={a} className="bg-white/5 border border-[#1F2937] text-[10px] text-[#9AA4B2] px-3 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1F2937] flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA4B2] tracking-widest">Starts from</p>
                  <p className="text-xl font-bold text-[#E6EAF0]">{hotel.price}<span className="text-xs font-normal text-[#9AA4B2]">/night</span></p>
                </div>
                <button className="bg-[#C9A24D] text-[#0B0F14] px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 glass-card p-12 rounded-[40px] border border-[#C9A24D]/20 bg-gradient-to-br from-[#121826] to-[#0B0F14]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4">
              <Car size={24} />
            </div>
            <h4 className="font-bold serif mb-2">Shuttle Service</h4>
            <p className="text-sm text-[#9AA4B2]">Complementary luxury shuttle to the convention centre every 30 mins.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4">
              <Coffee size={24} />
            </div>
            <h4 className="font-bold serif mb-2">Early Breakfast</h4>
            <p className="text-sm text-[#9AA4B2]">Specially curated menu for delegates starting from 6:30 AM.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mx-auto mb-4">
              <Shield size={24} />
            </div>
            <h4 className="font-bold serif mb-2">Concierge Desk</h4>
            <p className="text-sm text-[#9AA4B2]">Dedicated DOCON 2026 concierge desk at all partner hotels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
