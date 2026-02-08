
import React, { useState } from 'react';
import { UserProgress, SupportTicket } from '../types';

interface SupportProps {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

const Support: React.FC<SupportProps> = ({ progress, updateProgress }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    
    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
        subject: query,
        status: 'Open',
        timestamp: Date.now()
      };
      updateProgress({ tickets: [newTicket, ...progress.tickets] });
      setQuery('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
           <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6 uppercase">Help & <span className="text-indigo-600">Support</span>.</h1>
           <p className="text-xl text-black/60 font-medium">Questions about lessons or practice sessions? Our support team is here to help you succeed.</p>
        </div>
        <div className="bg-emerald-50 border-4 border-black px-8 py-5 rounded-[32px] flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-black uppercase tracking-widest">Support is Online</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
           <div className="bg-white p-12 rounded-[60px] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
              <h2 className="text-3xl font-black text-black mb-10 tracking-tight uppercase">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                 <div>
                    <label className="text-[10px] font-black text-black uppercase tracking-widest mb-3 block">Describe your request or question</label>
                    <textarea 
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       placeholder="Enter details here..."
                       className="w-full bg-white border-4 border-black rounded-[32px] p-8 text-lg font-bold placeholder:text-black/20 focus:bg-slate-50 transition-all min-h-[200px] outline-none"
                    />
                 </div>
                 <button 
                   disabled={loading}
                   className="px-12 py-6 bg-black text-white border-4 border-black rounded-[32px] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-4"
                 >
                   {loading ? <div className="w-4 h-4 border-4 border-white border-t-transparent animate-spin rounded-full"></div> : 'Send Help Request'}
                 </button>
              </form>
           </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <div className="bg-black p-10 rounded-[48px] text-white shadow-xl relative overflow-hidden border-4 border-black">
              <h3 className="text-xl font-black mb-8 uppercase tracking-tighter">Your Active Requests</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 {progress.tickets.length === 0 ? (
                   <p className="text-white/40 text-xs font-bold italic py-10">You have no active support requests.</p>
                 ) : (
                   progress.tickets.map(t => (
                     <div key={t.id} className="p-6 bg-white/5 border-2 border-white/10 rounded-[32px] hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">{t.id}</span>
                           <span className="px-2 py-0.5 bg-emerald-500 text-[8px] font-black uppercase rounded text-white">{t.status}</span>
                        </div>
                        <p className="text-sm font-bold text-white leading-relaxed line-clamp-2">{t.subject}</p>
                        <p className="text-[9px] font-black text-white/40 uppercase mt-4">{new Date(t.timestamp).toLocaleDateString()}</p>
                     </div>
                   ))
                 )}
              </div>
           </div>
           
           <div className="p-10 bg-white rounded-[48px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-[10px] font-black text-black uppercase tracking-widest mb-4">Contact Phone</h4>
              <p className="text-xs font-bold text-black/60 leading-relaxed mb-6">Our academic success team is available via phone during standard working hours.</p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-lg shadow-sm">📞</div>
                 <span className="text-[10px] font-black text-black">0800-EDUNAIJA</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
