
import React from 'react';
import { useAuth } from '../App';
import { Navigate } from 'react-router-dom';
import { Users, BarChart3, Settings, TrendingUp, AlertCircle, FileSpreadsheet } from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold serif text-[#C9A24D]">Admin Control Center</h1>
          <p className="text-[#9AA4B2] mt-2 italic">Real-time oversight for DOCON 2026</p>
        </div>
        <button className="bg-[#121826] border border-[#1F2937] text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-[#C9A24D] hover:text-[#0B0F14] transition-all">
           <FileSpreadsheet size={18} />
           <span>Export Data to Excel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         {[
           { label: 'Total Registration', val: '1,452', icon: <Users size={20} />, change: '+12%' },
           { label: 'Total Revenue', val: '₹42,50,000', icon: <TrendingUp size={20} />, change: '+5%' },
           { label: 'Workshop Slots', val: '80/150', icon: <BarChart3 size={20} />, change: '-2%' },
           { label: 'Pending Approvals', val: '12', icon: <AlertCircle size={20} />, change: '+3' },
         ].map((stat, i) => (
           <div key={i} className="glass-card p-6 rounded-2xl border border-[#1F2937]">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-3 bg-white/5 rounded-xl text-[#C9A24D]">{stat.icon}</div>
                 <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-[#2EC4B6]' : 'text-red-400'}`}>{stat.change}</span>
              </div>
              <h4 className="text-[10px] uppercase tracking-widest text-[#9AA4B2] mb-1">{stat.label}</h4>
              <p className="text-2xl font-bold text-[#E6EAF0]">{stat.val}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden border border-[#1F2937]">
            <div className="p-6 border-b border-[#1F2937] flex justify-between items-center">
               <h4 className="font-bold serif text-lg">Recent Transactions</h4>
               <button className="text-xs text-[#C9A24D] font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="text-[10px] uppercase tracking-widest text-[#9AA4B2] bg-white/5 border-b border-[#1F2937]">
                     <tr>
                        <th className="p-4">Delegate Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2937] text-sm">
                     {[
                       { name: 'Dr. Ramesh Kumar', cat: 'Consultant', status: 'Paid', amt: '₹12,000' },
                       { name: 'Dr. Priya Sharma', cat: 'PG Student', status: 'Pending', amt: '₹8,000' },
                       { name: 'Dr. John Doe', cat: 'Faculty', status: 'Paid', amt: '₹15,000' },
                       { name: 'Dr. Sara Lee', cat: 'Corporate', status: 'Paid', amt: '₹25,000' }
                     ].map((row, i) => (
                       <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium">{row.name}</td>
                          <td className="p-4 text-[#9AA4B2]">{row.cat}</td>
                          <td className="p-4">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'Paid' ? 'bg-[#2EC4B6]/20 text-[#2EC4B6]' : 'bg-red-500/20 text-red-400'}`}>
                                {row.status}
                             </span>
                          </td>
                          <td className="p-4 font-bold text-[#C9A24D]">{row.amt}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-6 rounded-2xl">
               <h4 className="font-bold serif text-lg mb-6">Management Tools</h4>
               <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-xl border border-[#1F2937] hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all flex items-center justify-between group">
                     <div>
                        <p className="text-sm font-bold">Manage Faculty</p>
                        <p className="text-[10px] text-[#9AA4B2]">Update profiles and speakers</p>
                     </div>
                     <Settings className="text-[#1F2937] group-hover:text-[#C9A24D]" size={20} />
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border border-[#1F2937] hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all flex items-center justify-between group">
                     <div>
                        <p className="text-sm font-bold">Scientific Program</p>
                        <p className="text-[10px] text-[#9AA4B2]">Live hall & session updates</p>
                     </div>
                     <Settings className="text-[#1F2937] group-hover:text-[#C9A24D]" size={20} />
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border border-[#1F2937] hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all flex items-center justify-between group">
                     <div>
                        <p className="text-sm font-bold">Bulk Messaging</p>
                        <p className="text-[10px] text-[#9AA4B2]">Send SMS/Email to delegates</p>
                     </div>
                     <Settings className="text-[#1F2937] group-hover:text-[#C9A24D]" size={20} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Admin;
