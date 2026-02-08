
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProgress, PracticeMode, Subject } from '../types';
import { SUBJECTS } from '../constants';
import QuestionBankHub from './QuestionBankHub';
import AcademicFact from '../components/AcademicFact';
import { GoogleGenAI } from "@google/genai";
import { Mic, Sparkles, Database, BookOpen, Clock, Award, ShieldQuestion, ExternalLink, Activity, ArrowRight, Layout, Settings, Flame } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, updateProgress }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'questions'>('learning');
  const [liveStudents, setLiveStudents] = useState(14502);
  const [commandText, setCommandText] = useState('');
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);
  const navigate = useNavigate();

  const selectedSubjects = SUBJECTS.filter(s => progress.selectedSubjects.includes(s.id));
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = progress.attendance.some(a => a.date === today);

  const masteryArray = Object.values(progress.mastery) as number[];
  const avgMastery = masteryArray.length > 0 
    ? Math.round(masteryArray.reduce((a: number, b: number) => a + b, 0) / masteryArray.length) 
    : 0;
  
  const estimatedCreditHours = progress.attendance.length * 1.5; 

  const handleAttendance = () => {
    if (!hasCheckedIn) {
      const newAttendance = [...progress.attendance, { date: today, status: 'present' as const }];
      updateProgress({ attendance: newAttendance });
    }
  };

  const formulas = [
    { name: "Quadratic Formula", latex: "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$" },
    { name: "Ideal Gas Law", latex: "$$PV = nRT$$" },
    { name: "Energy-Mass Equivalence", latex: "$$E = mc^2$$" }
  ];
  const [formulaIndex, setFormulaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStudents(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    const formulaInterval = setInterval(() => {
      setFormulaIndex(prev => (prev + 1) % formulas.length);
    }, 12000);
    return () => { clearInterval(interval); clearInterval(formulaInterval); };
  }, [formulas.length]);

  const processCommand = async (text: string) => {
    if (!text.trim()) return;
    setIsProcessingCommand(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Academic Assistant for Nigerian students. User query: "${text}". Exam: ${progress.selectedExam}. Current path: /dashboard. Respond with JSON ONLY: {"path": "/target", "message": "Confirmation"}. Valid paths: /dashboard, /past-questions, /pricing, /support, /profile, /learn/[id], /practice/[id]/CBT.`,
      });
      const res = JSON.parse(response.text || '{"path": "/dashboard", "message": "Thinking..."}');
      setCommandText(res.message);
      setTimeout(() => {
        navigate(res.path);
        setIsProcessingCommand(false);
        setCommandText('');
      }, 1200);
    } catch (e) {
      setIsProcessingCommand(false);
    }
  };

  return (
    <div className="page-container pb-32">
      {/* 1. TOP HEADER SECTION */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-widest border border-emerald-200">
               Live: {liveStudents.toLocaleString()} Scholars Online
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
            Study <span className="text-indigo-600">Room</span>.
          </h1>
          <p className="text-black/40 font-bold text-sm">Hello, {progress.profile.fullName.split(' ')[0]}. Focus on your 2025 goals.</p>
        </div>

        {/* AI AI Command Hub */}
        <div className="w-full md:w-[400px] relative">
           <div className="flex items-center bg-white border-4 border-black rounded-3xl overflow-hidden p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <div className="pl-4 text-indigo-600">
               <Sparkles size={18} className={isProcessingCommand ? 'animate-spin' : ''} />
             </div>
             <input 
               type="text" 
               value={commandText}
               onChange={(e) => setCommandText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && processCommand(commandText)}
               placeholder="What should we open?"
               className="flex-1 py-3 px-3 text-sm font-bold outline-none bg-transparent placeholder:text-black/10"
             />
             <button 
                onClick={() => processCommand(commandText)}
                className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center hover:bg-indigo-600 transition-colors"
             >
               <ArrowRight size={18} />
             </button>
           </div>
        </div>
      </header>

      {/* 2. SCHOLAR ESSENTIALS (Moved to Top) */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Stats Widget */}
           <div className="b-card p-6 rounded-[32px] bg-white flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 border-2 border-black flex items-center justify-center text-indigo-600">
                    <Award size={20} />
                 </div>
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Mastery Level</span>
              </div>
              <div>
                 <p className="text-4xl font-black">{avgMastery}%</p>
                 <p className="text-[10px] font-bold text-black/40 uppercase mt-1">Average Across Subjects</p>
              </div>
           </div>

           {/* Streak Widget */}
           <div className="b-card p-6 rounded-[32px] bg-white flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                 <div className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center ${hasCheckedIn ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
                    <Flame size={20} />
                 </div>
                 <button 
                  onClick={handleAttendance} 
                  disabled={hasCheckedIn} 
                  className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border-2 border-black transition-all ${hasCheckedIn ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default' : 'bg-black text-white hover:bg-white hover:text-black'}`}
                 >
                    {hasCheckedIn ? 'Synced' : 'Check In'}
                 </button>
              </div>
              <div>
                 <p className="text-4xl font-black">{progress.attendance.length} Days</p>
                 <p className="text-[10px] font-bold text-black/40 uppercase mt-1">Current Study Streak</p>
              </div>
           </div>

           {/* Dynamic Fact Widget */}
           <div className="lg:col-span-1">
             <div className="h-full b-card rounded-[32px] overflow-hidden">
                <AcademicFact />
             </div>
           </div>

           {/* Formula Widget */}
           <div className="b-card p-6 rounded-[32px] bg-slate-950 text-white min-h-[160px] flex flex-col justify-between border-slate-900">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{formulas[formulaIndex].name}</span>
                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
              </div>
              <div className="flex-1 flex items-center justify-center overflow-x-auto custom-scrollbar">
                 <div className="text-sm font-mono transform scale-110">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {formulas[formulaIndex].latex}
                    </ReactMarkdown>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. MAIN NAVIGATION TABS */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-3xl border-2 border-black/5">
           <button 
            onClick={() => setActiveTab('learning')} 
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'learning' ? 'bg-white text-black shadow-md border-2 border-black' : 'text-black/40 hover:text-black'}`}
           >
             <Layout size={14} /> My Textbooks
           </button>
           <button 
            onClick={() => setActiveTab('questions')} 
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'questions' ? 'bg-white text-black shadow-md border-2 border-black' : 'text-black/40 hover:text-black'}`}
           >
             <Database size={14} /> Question Bank
           </button>
        </div>
      </div>

      {/* 4. SUBJECT CONTENT GRID */}
      {activeTab === 'learning' ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedSubjects.map(s => (
              <div key={s.id} className="b-card p-8 rounded-[40px] flex flex-col justify-between min-h-[300px] hover:translate-y-[-4px] transition-all group">
                <div className="space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-black flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                        <BookOpen size={24} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border-2 border-black ${s.isCompulsory ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                        {s.isCompulsory ? 'Core Subject' : 'Elective'}
                      </span>
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-black tracking-tight uppercase leading-none mb-2">{s.name}</h3>
                      <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">Official Curriculum Node</p>
                   </div>
                   
                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase">
                        <span className="text-black/40">Knowledge Mastery</span>
                        <span className="text-indigo-600">{progress.mastery[s.id] || 0}%</span>
                      </div>
                      <div className="h-3 w-full bg-slate-50 border-2 border-black rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.mastery[s.id] || 5}%` }}
                          className="h-full bg-indigo-500" 
                        />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t-2 border-slate-50">
                  <Link to={`/learn/${s.id}`} className="py-4 bg-white border-2 border-black rounded-2xl text-[9px] font-black uppercase tracking-widest text-center hover:bg-slate-50 transition-all">
                    Open Book
                  </Link>
                  <Link to={`/practice/${s.id}/${PracticeMode.CBT}`} className="py-4 bg-black text-white border-2 border-black rounded-2xl text-[9px] font-black uppercase tracking-widest text-center hover:bg-indigo-600 transition-all shadow-lg">
                    Practice
                  </Link>
                </div>
              </div>
            ))}

            {/* Managed Subjects Card */}
            <Link to="/onboarding" className="group p-8 rounded-[40px] border-4 border-black border-dashed flex flex-col items-center justify-center text-center gap-4 hover:bg-indigo-50 transition-all min-h-[300px]">
               <div className="w-14 h-14 rounded-full bg-white border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-md">
                 <Settings size={28} />
               </div>
               <h4 className="text-lg font-black text-black uppercase tracking-tight">Edit Subjects</h4>
               <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Add or Remove Topics</p>
            </Link>
          </div>

          {/* Help Center Shortcut Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
             <Link to="/pricing" className="p-8 bg-black text-white rounded-[32px] flex items-center justify-between border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">
                <div>
                   <h4 className="text-lg font-black uppercase tracking-tighter mb-1">Upgrade Scholar Plan</h4>
                   <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Get unlimited AI teacher access</p>
                </div>
                <ArrowRight size={24} />
             </Link>
             <Link to="/support" className="p-8 bg-white text-black rounded-[32px] flex items-center justify-between border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                   <h4 className="text-lg font-black uppercase tracking-tighter mb-1">Contact Support</h4>
                   <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">24/7 Academic Liaison</p>
                </div>
                <ShieldQuestion size={24} />
             </Link>
          </div>
        </div>
      ) : (
        <QuestionBankHub progress={progress} compact={true} />
      )}
    </div>
  );
};

export default Dashboard;
