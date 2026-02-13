
import React from 'react';
import { FileText, Download, Award, FileCode, CheckCircle } from 'lucide-react';

const FILES = [
  { id: 1, title: 'Official Conference Brochure', size: '4.2 MB', category: 'General', icon: <FileText className="text-blue-400" /> },
  { id: 2, title: 'Scientific Program Schedule (Day 1-4)', size: '1.8 MB', category: 'Academic', icon: <FileCode className="text-purple-400" /> },
  { id: 3, title: 'Abstract Submission Guidelines', size: '540 KB', category: 'Research', icon: <Award className="text-amber-400" /> },
  { id: 4, title: 'Workshop Manual & Prerequisite List', size: '2.1 MB', category: 'Training', icon: <CheckCircle className="text-emerald-400" /> },
  { id: 5, title: 'Travel & Accommodation Guide', size: '3.5 MB', category: 'Logistics', icon: <Download className="text-pink-400" /> },
];

const Downloads: React.FC = () => {
  /**
   * Generates a unique dummy PDF (text-based blob) for each file title.
   */
  const handleDownload = (title: string) => {
    const filename = `${title.replace(/\s+/g, '_')}_DOCON2026.pdf`;
    const content = `
      DOCON 2026 - NATIONAL CONFERENCE OF OBSTETRICS & GYNECOLOGY
      ---------------------------------------------------------
      DOCUMENT: ${title}
      DATE: ${new Date().toLocaleDateString()}
      AUTHORITY: DOCON 2026 Organizing Committee
      
      This is a secure academic document intended for registered delegates.
      Content: Guidelines, schedules, and clinical resources for the conference.
      
      Verify this document at the conference secretariat if needed.
    `.trim();
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-5xl font-bold serif text-[#C9A24D] mb-4">Downloads</h1>
        <p className="text-[#9AA4B2] italic">Access essential documents and clinical resources for DOCON 2026.</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[#1F2937] animate-fade-in-up delay-1 shadow-2xl">
        <div className="divide-y divide-[#1F2937]">
          {FILES.map((file, index) => (
            <div 
              key={file.id} 
              className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {file.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold serif text-[#E6EAF0] group-hover:text-[#C9A24D] transition-colors">{file.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24D]">{file.category}</span>
                    <span className="text-[10px] text-[#9AA4B2]">|</span>
                    <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest">{file.size}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleDownload(file.title)}
                className="mt-6 md:mt-0 bg-[#1F2937] hover:bg-[#C9A24D] hover:text-[#0B0F14] text-[#C9A24D] px-8 py-3 rounded-full font-bold flex items-center space-x-2 transition-all transform hover:scale-105 active:scale-95 border border-[#C9A24D]/20"
              >
                <Download size={18} />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 p-10 bg-[#C9A24D]/5 border border-[#C9A24D]/20 rounded-3xl animate-fade-in-up delay-4">
        <h4 className="text-[#C9A24D] font-bold serif text-lg mb-2 flex items-center gap-2">
          <CheckCircle size={20} />
          Technical Assistance
        </h4>
        <p className="text-sm text-[#9AA4B2] leading-relaxed">
          If you encounter any issues while downloading the files, please contact our technical desk at <span className="text-[#E6EAF0] font-medium">support@docon2026.com</span>. All documents are encrypted and safe for download.
        </p>
      </div>
    </div>
  );
};

export default Downloads;
