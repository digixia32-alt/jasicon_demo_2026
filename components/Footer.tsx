
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121826] border-t border-[#1F2937] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold serif text-[#C9A24D] mb-4">JASICON 2026</h3>
            <p className="text-[#9AA4B2] max-w-md leading-relaxed">
              The premier national gathering for obstetrics and gynecology professionals. Dedicated to advancing clinical practice, research, and surgical excellence in women's healthcare.
            </p>

          </div>

          <div>
            <h4 className="text-[#E6EAF0] font-semibold mb-6 uppercase tracking-wider text-sm">Contact Secretariate</h4>
            <ul className="space-y-4 text-[#9AA4B2] text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#C9A24D] shrink-0" />
                <span>SHIVOLIK SURGICAL HOSPITAL, Netaji Subhash Road, Caster Town, Deoghar - 814112</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#C9A24D] shrink-0" />
                <span>9431361778, 9973765585</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#C9A24D] shrink-0" />
                <span>jasicon2026@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#E6EAF0] font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-[#9AA4B2] text-sm">
              <li><Link to="/program" className="hover:text-[#C9A24D]">Scientific Program</Link></li>
              <li><Link to="/registration" className="hover:text-[#C9A24D]">Registration Guidelines</Link></li>
              <li><Link to="/downloads" className="hover:text-[#C9A24D]">Abstract Submission</Link></li>
              <li><Link to="/committee" className="hover:text-[#C9A24D]">Organizing Committee</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9A24D]">Exhibition & Sponsorship</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1F2937] flex flex-col md:flex-row justify-between items-center text-[#9AA4B2] text-xs">
          <p>© 2026 JASICON. All Rights Reserved. Managed by <a href="https://digixea.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Digixea</a>.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
