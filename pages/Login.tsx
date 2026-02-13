
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../App';
import { Mail, Lock, LogIn, Loader2, User, Phone, ArrowLeft, X, Check } from 'lucide-react';

const MOCK_GOOGLE_ACCOUNTS = [
  { name: 'Dr. Riya Sharma', email: 'dr.riya.sharma@gmail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya' },
  { name: 'Dr. Vikram Seth', email: 'v.seth.md@gmail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' }
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGoogleAuth, setShowGoogleAuth] = useState(false);
  const [googleStep, setGoogleStep] = useState<'select' | 'loading'>('select');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Use provided name or default if login
      const userEmail = formData.email || 'dr.riya@aiims.edu';
      login(userEmail);
      
      const redirectPath = searchParams.get('redirect') || 'dashboard';
      const isStartingReg = searchParams.get('start') === 'true';
      const normalizedPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
      const targetUrl = isStartingReg ? `${normalizedPath}?start=true` : normalizedPath;
        
      navigate(targetUrl, { replace: true });
    }, 1500);
  };

  const startGoogleAuth = () => {
    setShowGoogleAuth(true);
    setGoogleStep('select');
  };

  const selectGoogleAccount = (email: string) => {
    setGoogleStep('loading');
    setTimeout(() => {
      login(email);
      setShowGoogleAuth(false);
      navigate('/dashboard');
    }, 1800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 md:py-12">
      {/* Google Identity Simulation Modal */}
      {showGoogleAuth && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isProcessing && setShowGoogleAuth(false)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-blur-fade text-gray-800">
            {googleStep === 'select' ? (
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-10 h-10" alt="Google" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Choose an account</h3>
                <p className="text-sm text-gray-500 text-center mb-8">to continue to <span className="font-bold text-gray-700">DOCON 2026</span></p>
                
                <div className="space-y-1">
                  {MOCK_GOOGLE_ACCOUNTS.map((acc) => (
                    <button 
                      key={acc.email}
                      onClick={() => selectGoogleAccount(acc.email)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
                    >
                      <img src={acc.avatar} className="w-8 h-8 rounded-full bg-gray-100" alt={acc.name} />
                      <div className="text-left">
                        <p className="text-sm font-medium">{acc.name}</p>
                        <p className="text-xs text-gray-500">{acc.email}</p>
                      </div>
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors mt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Use another account</p>
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-400 mt-8 leading-relaxed">
                  To continue, Google will share your name, email address, language preference, and profile picture with DOCON 2026.
                </p>
              </div>
            ) : (
              <div className="p-20 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                   <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                   <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="Google" />
                </div>
                <p className="text-sm font-medium text-gray-600 animate-pulse">Authenticating...</p>
              </div>
            )}
            <button 
              onClick={() => setShowGoogleAuth(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-5xl flex flex-col md:flex-row bg-[#121826] rounded-[32px] md:rounded-[40px] overflow-hidden border border-[#1F2937] shadow-[0_50px_100px_rgba(0,0,0,0.6)] animate-blur-fade">
        
        {/* Left Side: Branding/Imagery */}
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
            alt="Medical Professional" 
            className="w-full h-full object-cover opacity-60 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14] via-transparent to-[#0B0F14]/90"></div>
          <div className="absolute bottom-16 left-16 right-16">
            <div className="w-12 h-1 bg-[#C9A24D] mb-6"></div>
            <h2 className="text-4xl font-bold serif text-[#E6EAF0] mb-4">
              {mode === 'login' ? 'Academic Excellence' : 'Join the Elite'}
            </h2>
            <p className="text-[#9AA4B2] text-lg italic leading-relaxed">
              {mode === 'login' 
                ? 'Join the largest network of OBGYN specialists in South Asia.' 
                : 'Register today to secure your place at the national congress of gynaecology.'}
            </p>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="w-full md:w-1/2 p-8 sm:p-16 lg:p-20 flex flex-col justify-center bg-[#121826]/50 backdrop-blur-3xl">
          <div className="mb-8 md:mb-12">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A24D] mb-3">
               {mode === 'login' ? 'Gateway to DOCON' : 'New Registration'}
             </div>
             <h3 className="text-3xl font-bold serif text-[#E6EAF0]">
               {mode === 'login' ? 'Member Access' : 'Create Delegate ID'}
             </h3>
          </div>

          <div className="space-y-6">
            {/* Google Authentication Option */}
            <button 
              onClick={startGoogleAuth}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-2xl transition-all transform active:scale-95 group relative overflow-hidden"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span className="text-[10px] font-black uppercase tracking-widest">Continue with Google</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="w-full h-px bg-[#1F2937]"></div>
              <span className="absolute bg-[#121826] px-4 text-[9px] font-bold uppercase tracking-widest text-[#9AA4B2]">Or use email</span>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleAuth} className="space-y-5">
              {mode === 'signup' && (
                <div className="animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-2xl px-16 py-4 focus:outline-none focus:border-[#C9A24D] transition-all text-xs font-medium"
                        placeholder="Dr. Full Name"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-2xl px-16 py-4 focus:outline-none focus:border-[#C9A24D] transition-all text-xs font-medium"
                    placeholder="name@institution.edu"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Mobile Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
                      <input 
                        type="tel" 
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-2xl px-16 py-4 focus:outline-none focus:border-[#C9A24D] transition-all text-xs font-medium"
                        placeholder="+91 00000 00000"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#9AA4B2] font-black">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1F2937] group-focus-within:text-[#C9A24D] transition-colors" size={18} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-[#0B0F14]/50 border border-[#1F2937] rounded-2xl px-16 py-4 focus:outline-none focus:border-[#C9A24D] transition-all text-xs font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-[#C9A24D] text-[#0B0F14] font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-white transition-all transform active:scale-95 shadow-2xl group"
              >
                {isProcessing ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>{mode === 'login' ? 'Authenticate' : 'Complete Registration'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-[#9AA4B2] font-medium">
                New to the platform? 
                <button 
                  onClick={() => setMode('signup')}
                  className="text-[#C9A24D] font-bold ml-2 hover:underline focus:outline-none"
                >
                  Create ID
                </button>
              </p>
            ) : (
              <button 
                onClick={() => setMode('login')}
                className="flex items-center justify-center gap-2 mx-auto text-xs text-[#9AA4B2] hover:text-[#C9A24D] transition-colors font-bold"
              >
                <ArrowLeft size={14} />
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
