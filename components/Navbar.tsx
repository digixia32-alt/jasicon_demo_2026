
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { Menu, X, User as UserIcon, LogOut, ChevronDown, LayoutDashboard, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Committee', path: '/committee' },
    { name: 'Program', path: '/program' },
    { name: 'Registration', path: '/registration' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0B0F14]/95 backdrop-blur-xl border-b border-[#1F2937]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center group shrink-0">
            <img src="/public/assets/logo.png" alt="Jasicon 2026" className="h-16 sm:h-16 w-auto object-contain transition-opacity hover:opacity-90" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center flex-1 justify-end space-x-4">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] uppercase tracking-[0.1em] font-bold py-2 transition-all hover:text-[#C9A24D] relative group whitespace-nowrap ${location.pathname === link.path ? 'text-[#C9A24D]' : 'text-[#9AA4B2]'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A24D] transition-transform ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-[#1F2937] mx-2"></div>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#1F2937] bg-white/5 hover:bg-white/10"
                >
                  <UserIcon size={12} />
                  <span>{user.displayName.split(' ')[1]}</span>
                  <ChevronDown size={12} className={isUserMenuOpen ? 'rotate-180' : ''} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-56 py-3 bg-[#121826] border border-[#1F2937] rounded-2xl shadow-2xl animate-fade-in-up">
                    <Link to="/dashboard" className="flex items-center space-x-3 px-5 py-3 text-sm text-[#9AA4B2] hover:text-[#C9A24D]"><LayoutDashboard size={14} /><span>Dashboard</span></Link>
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-5 py-3 text-sm text-red-400 hover:bg-red-500/5"><LogOut size={14} /><span>Logout</span></button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-[#C9A24D] text-[#0B0F14] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Register/Login</Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#9AA4B2]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#121826] border-b border-[#1F2937] px-4 py-8 space-y-3 animate-fade-in-up fixed top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] ${location.pathname === link.path ? 'bg-[#C9A24D] text-[#0B0F14]' : 'text-[#9AA4B2] bg-white/5'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#1F2937] flex flex-col gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="w-full text-center bg-[#C9A24D] text-[#0B0F14] py-4 rounded-xl font-bold uppercase text-[10px]">Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-center bg-red-500/10 text-red-400 py-4 rounded-xl font-bold uppercase text-[10px]">Logout</button>
              </>
            ) : (
              <Link to="/login" className="w-full text-center bg-[#C9A24D] text-[#0B0F14] py-4 rounded-xl font-bold uppercase text-[10px]">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
