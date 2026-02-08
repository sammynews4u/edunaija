
import React, { useState, useEffect } from 'react';
import { SUBJECTS, SYLLABUS_TOPICS } from '../constants';
import { SubscriptionTier, ExamType, UserProgress, Question } from '../types';
import { QuestionProvider } from '../services/contentProvider';
import { 
  ShieldCheck, 
  Users, 
  Database, 
  BrainCircuit, 
  Lock, 
  Eye, 
  EyeOff, 
  Edit3, 
  Sliders, 
  BookOpen, 
  Plus, 
  Search, 
  Trash2,
  Layout,
  Globe,
  RefreshCw,
  Zap,
  ChevronRight,
  Code,
  Award,
  History
} from 'lucide-react';

interface AdminProps {
  isAuthenticated: boolean;
  onAuth: (status: boolean) => void;
  studentProgress: UserProgress;
  updateStudentProgress: (updates: Partial<UserProgress>) => void;
}

const Admin: React.FC<AdminProps> = ({ isAuthenticated, onAuth, studentProgress, updateStudentProgress }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'landing' | 'heritage' | 'repository' | 'cbt'>('overview');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  
  // Landing Page Editor State
  const [landingConfig, setLandingConfig] = useState(() => {
    const saved = localStorage.getItem('edunaija_landing_config');
    return saved ? JSON.parse(saved) : {
      heroHeading: "Unlock Your Academic Potential with EduNaija Prep",
      heroSubtext: "Nigeria's biggest library of past questions and lessons. We've collected 25 years of exams to help you succeed in JAMB, WAEC, and NECO.",
      founderQuote: "Samuel Oluwatosin Adesanya is a top software engineer who created this platform to make sure every Nigerian student can access high-quality study materials easily.",
      educationalFacts: [
        "The University of Ibadan was founded in 1948 as Nigeria's first degree-awarding institution.",
        "Nigeria has over 170 recognized universities across Federal, State, and Private sectors.",
        "Wole Soyinka was the first Nigerian and African to win the Nobel Prize in Literature."
      ],
      competitions: [
        { name: "Cowbellpedia Math Competition", winner: "Oghenerukevwe Patrick", year: "2023" },
        { name: "National Spelling Bee Nigeria", winner: "Favour Oluchi", year: "2024" },
        { name: "Interswitch SPAK Science Contest", winner: "Oreofe Daniel", year: "2023" }
      ]
    };
  });

  // Repository Explorer State
  const [repositorySearch, setRepositorySearch] = useState('1000000');
  const [repositoryResults, setRepositoryResults] = useState<Question[]>([]);
  const [isSearchingRepository, setIsSearchingRepository] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      handleRepositorySearch();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@edunaija.prep' && loginPass === 'ROOT_ACCESS_2025') {
      onAuth(true);
      setError('');
    } else {
      setError('Invalid root credentials. Access denied.');
    }
  };

  const saveLandingConfig = () => {
    localStorage.setItem('edunaija_landing_config', JSON.stringify(landingConfig));
    alert("Platform Meta-Data Updated Successfully.");
    window.location.reload(); 
  };

  const handleRepositorySearch = async () => {
    setIsSearchingRepository(true);
    const offset = parseInt(repositorySearch) || 0;
    const data = await QuestionProvider.getMockQuestions('math', { count: 10, offset });
    setRepositoryResults(data);
    setIsSearchingRepository(false);
  };

  const updateFact = (idx: number, val: string) => {
    const newFacts = [...landingConfig.educationalFacts];
    newFacts[idx] = val;
    setLandingConfig({...landingConfig, educationalFacts: newFacts});
  };

  const updateComp = (idx: number, field: string, val: string) => {
    const newComps = [...landingConfig.competitions];
    newComps[idx] = { ...newComps[idx], [field]: val };
    setLandingConfig({...landingConfig, competitions: newComps});
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-900 overflow-hidden relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)] pointer-events-none"></div>
         <div className="max-w-md w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-indigo-600 rounded-[30px] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-indigo-500/20">
                  <Lock size={36} />
               </div>
               <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Gateway</h1>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Authorized Access Only</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Secure Email</label>
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all font-bold" placeholder="admin@edunaija.prep" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Root Password</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all font-bold" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-4 text-slate-500 hover:text-white">
                       {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
               </div>
               {error && <p className="text-rose-500 text-[10px] font-black uppercase text-center">{error}</p>}
               <button className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/40">Initialize Command</button>
            </form>
         </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Super Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col sticky top-0 h-screen border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-lg shadow-xl">Ω</div>
            <span className="text-xl font-black tracking-tighter uppercase">SUPER ROOT</span>
          </div>
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Platform Omniscience</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<ShieldCheck size={20} />} label="Mainframe" />
          <SidebarLink active={activeTab === 'landing'} onClick={() => setActiveTab('landing')} icon={<Layout size={20} />} label="UI Directives" />
          <SidebarLink active={activeTab === 'heritage'} onClick={() => setActiveTab('heritage')} icon={<History size={20} />} label="Heritage Matrix" />
          <SidebarLink active={activeTab === 'repository'} onClick={() => setActiveTab('repository')} icon={<Database size={20} />} label="Repository" />
          <SidebarLink active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={20} />} label="Scholars" />
        </nav>
        <div className="p-8">
           <button onClick={() => onAuth(false)} className="w-full py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg">Sign Out Root</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <header className="flex justify-between items-center mb-16">
           <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase">
                {activeTab === 'overview' && 'System Vitality'}
                {activeTab === 'landing' && 'Brand Directive'}
                {activeTab === 'heritage' && 'Heritage Matrix'}
                {activeTab === 'repository' && '10M Node Explorer'}
                {activeTab === 'users' && 'Scholar Directory'}
              </h1>
           </div>
           <button onClick={saveLandingConfig} className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-emerald-500">
             <Save className="size-5" /> Push Changes
           </button>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <KpiCard label="Nodes Active" value="10,000,000+" trend="Stable" icon={<Database className="text-indigo-400" size={24} />} />
               <KpiCard label="Total Scholars" value="1.2M" trend="+12%" icon={<Users className="text-emerald-400" size={24} />} />
               <KpiCard label="Neural Latency" value="12ms" trend="Optimal" icon={<Zap className="text-amber-400" size={24} />} />
               <KpiCard label="System Integrity" value="99.99%" trend="Pure" icon={<ShieldCheck className="text-rose-400" size={24} />} />
            </div>
          </div>
        )}

        {activeTab === 'landing' && (
          <div className="max-w-4xl space-y-10 animate-in slide-in-from-bottom-6 duration-500">
            <div className="bg-slate-900 p-10 rounded-[50px] border border-white/5 space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3"><Layout className="text-indigo-400" /> UI Directive</h2>
              <div className="space-y-6">
                <AdminField label="Hero Heading" value={landingConfig.heroHeading} onChange={(v: string) => setLandingConfig({...landingConfig, heroHeading: v})} />
                <AdminField label="Hero Subtext" value={landingConfig.heroSubtext} onChange={(v: string) => setLandingConfig({...landingConfig, heroSubtext: v})} textarea />
                <AdminField label="Founder Quote" value={landingConfig.founderQuote} onChange={(v: string) => setLandingConfig({...landingConfig, founderQuote: v})} textarea />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'heritage' && (
          <div className="max-w-4xl space-y-10 animate-in slide-in-from-bottom-6 duration-500">
            <div className="bg-slate-900 p-10 rounded-[50px] border border-white/5 space-y-12">
               <section>
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8"><Award className="text-indigo-400" /> Educational Facts</h2>
                  <div className="space-y-4">
                     {landingConfig.educationalFacts.map((fact: string, i: number) => (
                       <AdminField key={i} label={`Fact #${i+1}`} value={fact} onChange={(v: string) => updateFact(i, v)} textarea />
                     ))}
                  </div>
               </section>

               <section>
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8"><Zap className="text-amber-400" /> Competition Winners</h2>
                  <div className="space-y-10">
                     {landingConfig.competitions.map((comp: any, i: number) => (
                       <div key={i} className="p-6 bg-slate-950 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <AdminField label="Competition Name" value={comp.name} onChange={(v: string) => updateComp(i, 'name', v)} />
                          <AdminField label="Winner Name" value={comp.winner} onChange={(v: string) => updateComp(i, 'winner', v)} />
                          <AdminField label="Year" value={comp.year} onChange={(v: string) => updateComp(i, 'year', v)} />
                       </div>
                     ))}
                  </div>
               </section>
            </div>
          </div>
        )}

        {activeTab === 'repository' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="bg-slate-900 p-10 rounded-[50px] border border-white/5">
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-2xl font-black uppercase tracking-tight">Node Address Space Search</h2>
                   <div className="flex gap-4">
                      <input 
                        type="number" 
                        value={repositorySearch} 
                        onChange={(e) => setRepositorySearch(e.target.value)} 
                        className="bg-slate-950 border-2 border-white/10 rounded-2xl px-6 py-3 font-black text-indigo-400 outline-none w-64"
                        placeholder="Coord 0 - 9,999,999"
                      />
                      <button onClick={handleRepositorySearch} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-2">
                        {isSearchingRepository ? <RefreshCw className="animate-spin" size={18} /> : <Search size={18} />} Jump Node
                      </button>
                   </div>
                </div>

                <div className="space-y-6">
                   {repositoryResults.map((q, idx) => (
                      <div key={q.id} className="p-8 bg-slate-950 rounded-[32px] border border-white/5 hover:border-indigo-600/50 transition-all group">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{q.id} • Topic: {q.topic}</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-400">Board Verified</span>
                         </div>
                         <p className="text-lg font-black text-white mb-6 leading-tight">{q.prompt}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-8 py-5 rounded-[24px] transition-all ${active ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
    {icon} <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const KpiCard = ({ label, value, trend, icon }: any) => (
  <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5">
    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 shadow-inner">{icon}</div>
    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
       <span className="text-3xl font-black">{value}</span>
       <span className="text-[10px] font-black text-emerald-400">{trend}</span>
    </div>
  </div>
);

const AdminField = ({ label, value, onChange, textarea }: any) => (
  <div className="space-y-2">
     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>
     {textarea ? (
       <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-sm font-bold text-white outline-none focus:border-indigo-600 transition-all resize-none" />
     ) : (
       <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-sm font-bold text-white outline-none focus:border-indigo-600 transition-all" />
     )}
  </div>
);

const Save = ({ className }: any) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
);

export default Admin;
