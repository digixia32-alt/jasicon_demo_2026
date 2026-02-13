
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-blur-fade">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Contact Secretariat</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto leading-relaxed">
          Our dedicated team is here to assist you with registration or any other enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group animate-slide-left">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h4 className="text-lg font-bold serif mb-2">Office</h4>
            <p className="text-sm text-[#9AA4B2] leading-relaxed">SHIVOLIK SURGICAL HOSPITAL, Netaji Subhash Road, Caster Town, Deoghar - 814112</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#1F2937] hover:border-[#C9A24D]/30 transition-all group animate-slide-left delay-1">
            <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center text-[#C9A24D] mb-6 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <h4 className="text-lg font-bold serif mb-2">Email</h4>
            <p className="text-sm text-[#E6EAF0]">jasicon2026@gmail.com</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card p-10 md:p-14 rounded-[40px] border border-[#1F2937] h-full relative overflow-hidden animate-scale-in">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-blur-fade">
                <div className="w-24 h-24 bg-[#2EC4B6]/10 text-[#2EC4B6] rounded-full flex items-center justify-center mb-8">
                  <CheckCircle size={48} className="animate-pulse" />
                </div>
                <h3 className="text-4xl font-bold serif text-white mb-4">Enquiry Received</h3>
                <p className="text-[#9AA4B2] max-w-sm">A member of our scientific secretariat will respond to your medical query within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-10 text-[#C9A24D] font-bold uppercase tracking-widest text-xs hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold serif mb-10">Direct Enquiry</h3>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Full Name</label>
                      <input type="text" required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D]" placeholder="Dr. Jane Smith" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Email</label>
                      <input type="email" required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D]" placeholder="jane@hospital.com" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-[#9AA4B2] font-black">Message</label>
                    <textarea rows={5} required className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-8 py-5 focus:outline-none focus:border-[#C9A24D] resize-none" placeholder="How can we assist?"></textarea>
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    className="w-full md:w-auto bg-[#C9A24D] text-[#0B0F14] px-14 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /><span>Send Message</span></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
