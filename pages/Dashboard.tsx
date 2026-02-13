
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../App';
import { Navigate, Link, useSearchParams } from 'react-router-dom';
import { FileText, MapPin, Calendar, CreditCard, Award, ArrowRight, Download, Settings, CheckCircle, QrCode, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { WORKSHOPS } from '../constants';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const passRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const justRegistered = searchParams.get('registered') === 'true';

  if (!user) return <Navigate to="/login" />;

  const isRegistered = user.registrationStatus === 'completed';
  const delegateId = `DOC26-10${user.uid.slice(-3)}`;
  const details = user.regDetails;

  const handleDownloadPDF = async () => {
    if (passRef.current) {
      setIsDownloading(true);
      try {
        const dataUrl = await toPng(passRef.current, { 
            cacheBust: true, 
            pixelRatio: 2,
            backgroundColor: '#0B0F14'
        });
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`DOCON2026_Registration_Pass_${delegateId}.pdf`);
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {justRegistered && (
        <div className="mb-10 p-6 bg-[#2EC4B6]/10 border border-[#2EC4B6]/30 rounded-3xl flex items-center gap-4 animate-fade-in-up">
          <div className="w-12 h-12 bg-[#2EC4B6]/20 rounded-2xl flex items-center justify-center text-[#2EC4B6]">
            <CheckCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#E6EAF0]">Success!</h4>
            <p className="text-sm text-[#9AA4B2]">Your payment has been verified. Welcome to DOCON 2026.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold serif text-[#E6EAF0]">Delegate Hub</h1>
          <p className="text-[#9AA4B2] mt-2 italic">Welcome back, {user.displayName}</p>
        </div>
        <div className="flex space-x-4">
          <Link 
            to="/registration" 
            className={`${isRegistered ? 'bg-white/5 text-[#E6EAF0]' : 'bg-[#C9A24D] text-[#0B0F14]'} px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:scale-105 transition-all border border-[#1F2937]`}
          >
            <span>{isRegistered ? 'Registration Details' : 'Complete Registration'}</span>
            <ArrowRight size={18} />
          </Link>
          <button className="bg-[#1F2937] text-white p-3 rounded-full hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="glass-card p-8 rounded-[40px] text-center border-[#1F2937] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/5 blur-3xl"></div>
            <div className="w-24 h-24 rounded-full border-4 border-[#C9A24D] mx-auto mb-6 p-1 overflow-hidden shadow-2xl">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} className="w-full h-full object-cover rounded-full bg-[#121826]" alt="Profile" />
            </div>
            <h3 className="text-xl font-bold serif">{user.displayName}</h3>
            <p className="text-[10px] text-[#9AA4B2] uppercase tracking-[0.2em] mt-1 font-black">{details?.designation || 'Specialist Delegate'}</p>
            
            <div className="mt-8 flex justify-center space-x-4 border-t border-[#1F2937] pt-8">
               <div className="text-center">
                  <span className="block text-xl font-bold text-[#C9A24D]">0</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Papers</span>
               </div>
               <div className="w-[1px] h-10 bg-[#1F2937]"></div>
               <div className="text-center">
                  <span className="block text-xl font-bold text-[#C9A24D]">{isRegistered ? details?.selectedWorkshops.length : '0'}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Workshops</span>
               </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px] border-[#1F2937]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9AA4B2] mb-6">Scientific Itinerary</h4>
            <div className="space-y-6">
               {[
                 { time: '15 Oct, 09:00 AM', title: 'Inaugural Ceremony', type: 'Event' },
                 { time: '16 Oct, 11:30 AM', title: 'Laparoscopy Masterclass', type: 'Workshop' }
               ].map((item, i) => (
                 <div key={i} className="flex space-x-4 items-start group">
                    <div className="w-2 h-2 rounded-full bg-[#C9A24D] mt-2 group-hover:scale-150 transition-transform"></div>
                    <div>
                       <p className="text-[10px] text-[#C9A24D] font-bold uppercase tracking-widest">{item.time}</p>
                       <p className="text-sm font-medium text-[#E6EAF0] group-hover:text-white transition-colors">{item.title}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           {isRegistered && details ? (
             <div className="flex flex-col gap-6">
               {/* High-Resolution VIP Pass Wrapper */}
               <div 
                 ref={passRef}
                 className="bg-[#0B0F14] border-4 border-[#C9A24D]/30 p-10 md:p-12 rounded-[40px] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
               >
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C9A24D]/5 rounded-full blur-[100px]"></div>
                  
                  <div className="flex justify-between items-start mb-10 border-b border-[#1F2937] pb-8">
                    <div>
                        <h3 className="text-[#C9A24D] text-3xl font-black serif uppercase tracking-tighter">DOCON 2026</h3>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#9AA4B2] font-bold">National Delegate Pass</p>
                    </div>
                    <div className="text-right">
                        <span className="bg-[#2EC4B6]/10 text-[#2EC4B6] px-4 py-1 text-[9px] font-black uppercase tracking-widest border border-[#2EC4B6]/20 rounded-full">Status: Confirmed</span>
                        <p className="text-[10px] text-white font-bold mt-2 uppercase tracking-widest">ID: {delegateId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-10">
                    <div className="col-span-2 md:col-span-1 space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Full Name</p>
                        <p className="text-xl font-bold text-white serif">{details.fullName}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Registration / License</p>
                        <p className="text-lg font-bold text-white uppercase">{details.medicalRegNo}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Designation</p>
                        <p className="text-sm font-medium text-[#E6EAF0]">{details.designation}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Affiliation</p>
                        <p className="text-sm font-medium text-[#E6EAF0] leading-tight">{details.institution}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Mobile</p>
                        <p className="text-sm font-medium text-[#E6EAF0]">{details.mobile}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] uppercase tracking-widest text-[#9AA4B2] font-black">Category</p>
                        <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest">{details.category} (Age: {details.age})</p>
                    </div>
                  </div>

                  {details.selectedWorkshops.length > 0 && (
                    <div className="bg-[#121826] p-6 rounded-2xl mb-10 border border-[#1F2937]">
                        <p className="text-[8px] uppercase tracking-widest text-[#C9A24D] font-black mb-3">Allocated Workshops</p>
                        <div className="flex flex-wrap gap-2">
                            {details.selectedWorkshops.map(wId => {
                                const w = WORKSHOPS.find(item => item.id === wId);
                                return (
                                    <span key={wId} className="bg-[#C9A24D]/10 text-[#C9A24D] border border-[#C9A24D]/20 px-3 py-1 rounded-full text-[9px] font-bold">
                                        {w?.title}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                  )}

                  <div className="text-center pt-8 border-t border-[#1F2937]/50">
                    <p className="text-[9px] text-[#E6EAF0] font-medium leading-relaxed mb-4 italic">
                        Access to all scientific halls, networking hub, and gala dinner is activated.
                    </p>
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#9AA4B2]">Baidyanath Dham • Deoghar • 2026</span>
                  </div>
               </div>
               
               <button 
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full bg-[#C9A24D] text-[#0B0F14] p-5 rounded-3xl hover:bg-white transition-all transform hover:translate-y-[-2px] shadow-xl btn-shine flex items-center justify-center gap-4 disabled:opacity-70"
                >
                   {isDownloading ? <Loader2 className="animate-spin" size={24} /> : <FileText size={24} />}
                   <span className="text-xs font-black uppercase tracking-widest">
                     {isDownloading ? 'Finalizing PDF Document...' : 'Download Official Registration Pass (PDF)'}
                   </span>
                </button>
             </div>
           ) : !isRegistered ? (
             <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <span className="text-[10px] uppercase tracking-[0.3em] text-red-400 font-black">Action Required</span>
                   <h3 className="text-3xl font-bold serif mt-3">Registration Incomplete</h3>
                   <p className="text-sm text-[#9AA4B2] mt-2 max-w-sm">Complete your fee payment to unlock your delegate dashboard and secure workshop slots.</p>
                </div>
                <Link to="/registration?start=true" className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-red-500 transition-all shadow-xl shrink-0">
                   Finish Now
                </Link>
             </div>
           ) : null}

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-[40px] border-[#1F2937] hover:border-[#C9A24D]/40 transition-all group">
                 <div className="p-4 bg-white/5 w-fit rounded-2xl mb-6 text-[#C9A24D] group-hover:scale-110 transition-transform"><CreditCard size={28} /></div>
                 <h4 className="font-bold text-xl serif">Financials</h4>
                 <p className="text-sm text-[#9AA4B2] mt-2">Manage your receipts and sponsorship documents.</p>
                 <button className="mt-6 text-[10px] font-black text-[#C9A24D] uppercase tracking-widest flex items-center space-x-2 group-hover:gap-4 transition-all">
                    <span>Invoices</span>
                    <ArrowRight size={16} />
                 </button>
              </div>
              <div className="glass-card p-8 rounded-[40px] border-[#1F2937] hover:border-[#C9A24D]/40 transition-all group">
                 <div className="p-4 bg-white/5 w-fit rounded-2xl mb-6 text-[#C9A24D] group-hover:scale-110 transition-transform"><FileText size={28} /></div>
                 <h4 className="font-bold text-xl serif">Submissions</h4>
                 <p className="text-sm text-[#9AA4B2] mt-2">Submit your scientific papers for peer-review.</p>
                 <button className="mt-6 text-[10px] font-black text-[#C9A24D] uppercase tracking-widest flex items-center space-x-2 group-hover:gap-4 transition-all">
                    <span>Submit Abstract</span>
                    <ArrowRight size={16} />
                 </button>
              </div>
           </div>

           <div className="glass-card overflow-hidden rounded-[40px] border-[#1F2937]">
              <div className="p-8 border-b border-[#1F2937] flex justify-between items-center bg-white/5">
                 <h4 className="font-bold serif text-lg">Knowledge Hub</h4>
                 <Link to="/program" className="text-[10px] text-[#C9A24D] font-black uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-[#1F2937]">
                 {[
                   { name: 'Full Scientific Program.pdf', size: '2.4 MB' },
                   { name: 'Delegate Handbook.pdf', size: '8.1 MB' },
                   { name: 'Abstract Submission Guidelines.doc', size: '450 KB' }
                 ].map((file, i) => (
                   <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center space-x-5">
                         <div className="p-3 bg-white/5 rounded-xl text-[#9AA4B2]"><Award size={20} /></div>
                         <div>
                            <p className="text-sm font-bold text-[#E6EAF0]">{file.name}</p>
                            <p className="text-[10px] text-[#9AA4B2] uppercase tracking-widest mt-1">{file.size}</p>
                         </div>
                      </div>
                      <button className="text-[#C9A24D] hover:text-white transition-all transform hover:scale-125"><Download size={22} /></button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
