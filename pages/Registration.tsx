
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { Check, CreditCard, User, Briefcase, Settings, AlertCircle, Info, Loader2, Hospital, Microscope, Download, FileText } from 'lucide-react';
import { WORKSHOPS } from '../constants';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const Registration: React.FC = () => {
  const { user, completeRegistration } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    age: '',
    mobile: '',
    institution: '',
    designation: '',
    medicalRegNo: '',
    category: 'Doctor',
    selectedWorkshops: [] as string[]
  });

  const delegateId = `DOC26-10${user?.uid.slice(-3) || '000'}`;

  const pricingData = [
    { cat: 'Doctor', reg: '₹8500', late: '₹9500', spot: '₹11,000' },
    { cat: 'Delegate < 40 Years', reg: '₹7500', late: '₹8500', spot: '₹10,000' },
    { cat: 'Delegate > 40 Years', reg: '₹8500', late: '₹9500', spot: '₹11,000' },
    { cat: 'PG Student', reg: '₹6000', late: '₹7000', spot: '₹8000' },
  ];

  useEffect(() => {
    if (user && !user.regDetails) {
        setFormData(prev => ({ ...prev, fullName: user.displayName }));
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get('start') === 'true' && user) {
      setShowForm(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [user, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Strict Mobile Number Logic: Only digits, max 10
    if (name === 'mobile') {
        newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        
        const ageNum = parseInt(formData.age);
        if (!formData.age) newErrors.age = "Age is required";
        else if (isNaN(ageNum) || ageNum < 18 || ageNum > 60) newErrors.age = "Age must be between 18 and 60";
        
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        else if (formData.mobile.length !== 10) newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (step === 2) {
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.medicalRegNo.trim()) newErrors.medicalRegNo = "License number is required";
        if (!formData.institution.trim()) newErrors.institution = "Institution is required";
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleWorkshop = (id: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedWorkshops.includes(id);
      return {
        ...prev,
        selectedWorkshops: isSelected 
          ? prev.selectedWorkshops.filter(wId => wId !== id)
          : [...prev.selectedWorkshops, id]
      };
    });
  };

  const handleNext = () => {
    if (!validateStep()) {
        const firstErrorField = Object.keys(errors)[0];
        console.log("Validation failed", errors);
        return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setStep(prev => Math.min(prev + 1, 4));
      setIsProcessing(false);
      window.scrollTo({ top: (formRef.current?.offsetTop || 0) - 100, behavior: 'smooth' });
    }, 400);
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const calculateTotal = () => {
    const basePrice = formData.category === 'PG Student' ? 6000 : 8500;
    const workshopPrice = formData.selectedWorkshops.reduce((acc, id) => {
      const workshop = WORKSHOPS.find(w => w.id === id);
      return acc + (workshop?.price || 0);
    }, 0);
    return basePrice + workshopPrice;
  };

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

  const renderDetails = user?.regDetails || formData;

  if (user?.registrationStatus === 'completed' && !showForm) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-20 h-20 bg-[#2EC4B6]/10 text-[#2EC4B6] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Check size={40} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold serif text-white mb-4">Registration Confirmed</h1>
        <p className="text-[#9AA4B2] mb-12">Your official Delegate Pass is ready for download. Please present this at the venue.</p>
        
        <div className="max-w-2xl mx-auto mb-12 animate-blur-fade">
          <div 
            ref={passRef}
            className="bg-[#0B0F14] border-4 border-[#C9A24D]/30 rounded-[40px] p-10 md:p-14 text-left relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24D]/5 blur-[100px]"></div>
            
            <div className="flex justify-between items-center mb-12 border-b border-[#1F2937] pb-8">
              <div>
                <h2 className="text-[#C9A24D] text-3xl font-black serif uppercase tracking-tighter">DOCON 2026</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#9AA4B2] mt-1 font-bold">National Conference of OBGYN</p>
              </div>
              <div className="text-right">
                <span className="bg-[#2EC4B6]/10 text-[#2EC4B6] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#2EC4B6]/20">Status: Confirmed</span>
                <p className="text-xs text-[#9AA4B2] mt-3 font-medium">ID: <span className="text-white font-bold">{delegateId}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Delegate Name</p>
                    <p className="text-xl font-bold text-white serif">{renderDetails.fullName}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Medical Reg No / License</p>
                    <p className="text-lg font-bold text-white uppercase">{renderDetails.medicalRegNo}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Institution</p>
                    <p className="text-sm font-medium text-[#E6EAF0] leading-relaxed">{renderDetails.institution}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Designation</p>
                    <p className="text-sm font-medium text-[#E6EAF0]">{renderDetails.designation}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Contact Particulars</p>
                    <p className="text-xs text-[#E6EAF0]">{renderDetails.mobile}</p>
                    <p className="text-xs text-[#9AA4B2] italic">{user?.email}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#9AA4B2] font-black">Registration Class</p>
                    <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest">{renderDetails.category}</p>
                    <p className="text-[9px] text-[#9AA4B2] mt-1">Age: {renderDetails.age} Years</p>
                </div>
            </div>

            <div className="bg-[#121826] p-6 rounded-2xl mb-12 border border-[#1F2937]">
                <p className="text-[9px] uppercase tracking-widest text-[#C9A24D] font-black mb-3">Academic Curriculum</p>
                {renderDetails.selectedWorkshops.length > 0 ? (
                    <ul className="space-y-2">
                        {renderDetails.selectedWorkshops.map(wId => {
                            const workshop = WORKSHOPS.find(w => w.id === wId);
                            return (
                                <li key={wId} className="flex items-center gap-3 text-xs text-[#E6EAF0]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                                    {workshop?.title}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-xs text-[#9AA4B2] italic">Conference Attendance Only</p>
                )}
            </div>

            <div className="text-center pt-8 border-t border-[#1F2937]/50">
               <p className="text-[10px] text-[#E6EAF0] font-medium leading-relaxed mb-4 italic">
                  "Access to all scientific halls, networking hub, and gala dinner is activated."
               </p>
               <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#9AA4B2]">Oct 15-18, 2026 • Baidyanath Dham, Deoghar</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full sm:w-auto bg-[#C9A24D] text-[#0B0F14] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-70"
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
            {isDownloading ? 'Generating PDF...' : 'Download Pass (PDF)'}
          </button>
          <Link to="/dashboard" className="w-full sm:w-auto bg-white/5 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl sm:text-6xl font-bold serif text-[#C9A24D] mb-4">Registration</h1>
        <p className="text-[#9AA4B2] italic max-w-2xl mx-auto text-sm sm:text-base">Join the national elite in medical excellence.</p>
      </div>

      {!showForm ? (
        <div className="space-y-10 md:space-y-16">
          <div className="hidden md:block glass-card rounded-3xl overflow-hidden border border-[#1F2937] shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F2937]/50 border-b border-[#1F2937] text-[#C9A24D] text-[10px] uppercase tracking-widest">
                  <th className="p-6">Category</th>
                  <th className="p-6 text-center">Regular</th>
                  <th className="p-6 text-center">Late</th>
                  <th className="p-6 text-center">Spot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-sm">
                {pricingData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold">{row.cat}</td>
                    <td className="p-6 text-center text-[#9AA4B2]">{row.reg}</td>
                    <td className="p-6 text-center text-[#9AA4B2]">{row.late}</td>
                    <td className="p-6 text-center font-bold text-[#C9A24D]">{row.spot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {pricingData.map((row, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-[#1F2937] shadow-lg">
                <h3 className="text-[#C9A24D] font-bold serif text-base mb-4 border-b border-[#1F2937] pb-2">{row.cat}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center bg-white/5 p-2 rounded-xl border border-white/5">
                    <p className="text-[7px] uppercase tracking-widest text-[#9AA4B2] mb-1">Regular</p>
                    <p className="text-[10px] font-bold text-white">{row.reg}</p>
                  </div>
                  <div className="text-center bg-white/5 p-2 rounded-xl border border-white/5">
                    <p className="text-[7px] uppercase tracking-widest text-[#9AA4B2] mb-1">Late</p>
                    <p className="text-[10px] font-bold text-white">{row.late}</p>
                  </div>
                  <div className="text-center bg-[#C9A24D]/10 p-2 rounded-xl border border-[#C9A24D]/20">
                    <p className="text-[7px] uppercase tracking-widest text-[#C9A24D] mb-1 font-black">Spot</p>
                    <p className="text-[10px] font-black text-[#C9A24D]">{row.spot}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center py-6 md:py-10">
            <button 
              onClick={() => { if(!user) navigate('/login?redirect=registration&start=true'); else setShowForm(true); }}
              className="w-full sm:w-auto bg-[#C9A24D] text-[#0B0F14] px-12 py-5 rounded-full font-bold text-lg hover:bg-white shadow-xl transition-all transform hover:scale-105"
            >
              Begin Registration
            </button>
          </div>
        </div>
      ) : (
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-hide">
            {[
              { n: 1, label: 'Profile', icon: <User size={16} /> },
              { n: 2, label: 'Scientific', icon: <Briefcase size={16} /> },
              { n: 3, label: 'Curriculum', icon: <Settings size={16} /> },
              { n: 4, label: 'Summary', icon: <CreditCard size={16} /> },
            ].map((s) => (
              <div key={s.n} className="flex items-center space-x-3 shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                  step === s.n 
                    ? 'border-[#C9A24D] bg-[#C9A24D] text-[#0B0F14]' 
                    : step > s.n 
                      ? 'border-[#2EC4B6] bg-[#2EC4B6] text-white shadow-[0_0_15px_rgba(46,196,182,0.3)]' 
                      : 'border-[#1F2937] text-[#9AA4B2]'
                }`}>
                  {step > s.n ? <Check size={16} /> : s.icon}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest hidden sm:block ${
                  step === s.n ? 'text-[#C9A24D]' : step > s.n ? 'text-[#2EC4B6]' : 'text-[#9AA4B2]'
                }`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-12 rounded-[32px] border border-[#1F2937] min-h-[450px] flex flex-col justify-between relative overflow-hidden">
                {isProcessing && (
                  <div className="absolute inset-0 bg-[#0B0F14]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                    <Loader2 size={40} className="text-[#C9A24D] animate-spin mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24D]">Processing...</p>
                  </div>
                )}

                <div className="flex-grow">
                  {step === 1 && (
                    <div className="space-y-6 md:space-y-8 animate-blur-fade">
                      <div className="flex items-center gap-4 mb-6">
                        <User className="text-[#C9A24D]" size={32} />
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold serif">Delegate Profile</h3>
                          <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Compulsory Fields</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Full Name *</label>
                          <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName} 
                            onChange={handleInputChange}
                            placeholder="Dr. Name Surname"
                            className={`w-full bg-[#0B0F14]/50 border ${errors.fullName ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm transition-all`} 
                          />
                          {errors.fullName && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.fullName}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Age (18-60) *</label>
                          <input 
                            type="number" 
                            name="age"
                            min="18"
                            max="60"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="e.g. 35"
                            className={`w-full bg-[#0B0F14]/50 border ${errors.age ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`} 
                          />
                          {errors.age && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.age}</p>}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Mobile Number (10 Digits) *</label>
                          <input 
                            type="text" 
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="1234567890"
                            className={`w-full bg-[#0B0F14] border ${errors.mobile ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`} 
                          />
                          {errors.mobile && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.mobile}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 md:space-y-8 animate-blur-fade">
                      <div className="flex items-center gap-4 mb-6">
                        <Hospital className="text-[#C9A24D]" size={32} />
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold serif">Scientific Details</h3>
                          <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Professional Credentials</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Delegate Category *</label>
                          <select 
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`w-full bg-[#0B0F14]/50 border ${errors.category ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm appearance-none`}
                          >
                            <option value="Doctor">Doctor</option>
                            <option value="Consultant">Consultant</option>
                            <option value="PG Student">PG Student</option>
                            <option value="International">International</option>
                          </select>
                          {errors.category && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.category}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Medical Reg No / License *</label>
                          <input 
                            type="text" 
                            name="medicalRegNo"
                            value={formData.medicalRegNo}
                            onChange={handleInputChange}
                            className={`w-full bg-[#0B0F14] border ${errors.medicalRegNo ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`} 
                            placeholder="MCI / State Council No"
                          />
                          {errors.medicalRegNo && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.medicalRegNo}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Institution *</label>
                          <input 
                            type="text" 
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            placeholder="e.g. AIIMS Delhi"
                            className={`w-full bg-[#0B0F14] border ${errors.institution ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`} 
                          />
                          {errors.institution && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.institution}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-[#9AA4B2]">Designation *</label>
                          <input 
                            type="text" 
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            placeholder="e.g. Senior Resident"
                            className={`w-full bg-[#0B0F14] border ${errors.designation ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-5 py-4 focus:border-[#C9A24D] outline-none text-sm`} 
                          />
                          {errors.designation && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.designation}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 md:space-y-8 animate-blur-fade">
                      <div className="flex items-center gap-4 mb-6">
                        <Microscope className="text-[#C9A24D]" size={32} />
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold serif">Curriculum Selection</h3>
                          <p className="text-[10px] uppercase tracking-widest text-[#9AA4B2]">Academic Workshops</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {WORKSHOPS.map(workshop => (
                          <button
                            key={workshop.id}
                            onClick={() => toggleWorkshop(workshop.id)}
                            className={`flex items-start text-left p-6 rounded-2xl border transition-all ${
                              formData.selectedWorkshops.includes(workshop.id)
                                ? 'bg-[#C9A24D]/10 border-[#C9A24D]'
                                : 'bg-[#0B0F14] border-[#1F2937] hover:border-[#C9A24D]/50'
                            }`}
                          >
                            <div className="flex-grow">
                              <h4 className="font-bold text-sm text-[#E6EAF0] mb-1">{workshop.title}</h4>
                              <p className="text-[10px] text-[#9AA4B2] leading-relaxed mb-3">{workshop.description}</p>
                              <span className="text-xs font-bold text-[#C9A24D]">₹{workshop.price.toLocaleString()}</span>
                            </div>
                            {formData.selectedWorkshops.includes(workshop.id) && (
                              <Check className="text-[#C9A24D] shrink-0" size={18} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="text-center py-6 md:py-10 space-y-6 md:space-y-8 animate-blur-fade">
                      <div className="w-20 h-20 bg-[#C9A24D]/10 text-[#C9A24D] rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <CreditCard size={32} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold serif">Checkout Summary</h3>
                      <div className="max-w-xs mx-auto space-y-4 text-xs sm:text-sm font-medium">
                        <div className="flex justify-between text-[#9AA4B2]">
                          <span>Conference Fee ({formData.category})</span>
                          <span>₹{formData.category === 'PG Student' ? '6,000' : '8,500'}</span>
                        </div>
                        {formData.selectedWorkshops.length > 0 && (
                          <div className="flex justify-between text-[#9AA4B2]">
                            <span>Workshops ({formData.selectedWorkshops.length})</span>
                            <span>
                              ₹{formData.selectedWorkshops.reduce((acc, id) => {
                                const w = WORKSHOPS.find(w => w.id === id);
                                return acc + (w?.price || 0);
                              }, 0).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-xl md:text-2xl font-bold text-[#C9A24D] pt-4 border-t border-[#1F2937]">
                          <span>Total</span>
                          <span>₹{calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 md:mt-12 flex justify-between items-center pt-8 border-t border-[#1F2937]">
                  {step > 1 ? (
                    <button onClick={handleBack} className="text-[#9AA4B2] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                       &larr; Back
                    </button>
                  ) : <div />}
                  <button 
                    onClick={step === 4 ? () => { setIsProcessing(true); setTimeout(() => { completeRegistration(formData); navigate('/dashboard?registered=true'); }, 1500); } : handleNext} 
                    className="bg-[#C9A24D] text-[#0B0F14] px-8 md:px-12 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white shadow-xl transition-all transform active:scale-95"
                  >
                    {step === 4 ? 'Confirm & Pay' : 'Next Step'}
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
