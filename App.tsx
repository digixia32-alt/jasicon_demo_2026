
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Committee from './pages/Committee';
import Program from './pages/Program';
import Faculty from './pages/Faculty';
import Accommodation from './pages/Accommodation';
import Travel from './pages/Travel';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Downloads from './pages/Downloads';
import Legal from './pages/Legal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  completeRegistration: (details: User['regDetails']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('docon_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string) => {
    const newUser: User = {
      uid: 'u123',
      email,
      displayName: 'Dr. Riya Sharma',
      role: email.includes('admin') ? 'admin' : 'user',
      registrationStatus: 'none'
    };
    setUser(newUser);
    localStorage.setItem('docon_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('docon_user');
  };

  const completeRegistration = (details: User['regDetails']) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        registrationStatus: 'completed',
        regDetails: details
      };
      setUser(updatedUser);
      localStorage.setItem('docon_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeRegistration }}>
      {children}
    </AuthContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#0B0F14] text-[#E6EAF0]">
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/program" element={<Program />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/privacy" element={<Legal type="privacy" />} />
              <Route path="/terms" element={<Legal type="terms" />} />
              <Route path="/refund" element={<Legal type="refund" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
