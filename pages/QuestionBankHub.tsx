
import React from 'react';
import { Link } from 'react-router-dom';
import { UserProgress } from '../types';
import { SUBJECTS, SYLLABUS_TOPICS } from '../constants';
import { Database, BookOpen, Layers, ArrowRight, Zap } from 'lucide-react';

interface QuestionBankHubProps {
  progress: UserProgress;
  compact?: boolean;
}

const QuestionBankHub: React.FC<QuestionBankHubProps> = ({ progress, compact = false }) => {
  const selectedSubjects = SUBJECTS.filter(s => progress.selectedSubjects.includes(s.id));

  // Simulating the massive scale of the bank
  const getSubjectStats = (id: string) => {
    const topicCount = SYLLABUS_TOPICS[id]?.length || 0;
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const questionCount = (1000 + (hash * 5)).toLocaleString();
    return { topicCount, questionCount };
  };

  return (
    <div className={compact ? '' : 'max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700'}>
      {!compact && (
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-4 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
              <Database size={14} />
              Massive Question Bank (10,000,000+)
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Browse <span className="text-emerald-600">Questions</span>.</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Every subject you study has thousands of <span className="text-slate-900 font-bold">past and practice questions</span>. Never run out of things to practice.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
             <div className="px-8 py-4 bg-slate-900 rounded-3xl flex items-center gap-4 border border-white/10 shadow-2xl">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Question Bank Updated</span>
             </div>
          </div>
        </header>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedSubjects.map(subject => {
          const stats = getSubjectStats(subject.id);
          return (
            <div key={subject.id} className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                    {subject.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight uppercase leading-none mb-2">{subject.name}</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Practice Bank</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                   <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Layers size={10} className="text-emerald-500" />
                        Topics
                      </p>
                      <p className="text-2xl font-black text-slate-900 leading-none">{stats.topicCount}</p>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Database size={10} className="text-indigo-500" />
                        Total Qs
                      </p>
                      <p className="text-2xl font-black text-slate-900 leading-none">{stats.questionCount}</p>
                   </div>
                </div>

                <div className="space-y-4 mb-12">
                   <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Database Size</span>
                      <span className="text-slate-900 font-mono">1,000+ Topics</span>
                   </div>
                   <div className="w-full h-px bg-slate-100"></div>
                   <div className="flex justify-between items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      <span>Exam Sync</span>
                      <span className="flex items-center gap-1">Active <Zap size={10} /></span>
                   </div>
                </div>
              </div>

              <Link 
                to={`/past-questions/${subject.id}`}
                className="w-full py-6 bg-slate-900 text-white rounded-[32px] text-[11px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 group-hover:translate-y-[-4px]"
              >
                Open Question Bank <ArrowRight size={16} />
              </Link>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          );
        })}

        <div className="bg-slate-950 p-10 rounded-[50px] text-white flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-2xl border border-white/5">
           <div className="relative z-10">
              <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center text-4xl mb-8 mx-auto shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">Daily Question Updates</h4>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
                We add thousands of new practice variations every single day to make sure you're always learning something new.
              </p>
              <button onClick={() => window.location.reload()} className="text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                Refresh My Bank →
              </button>
           </div>
           <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-emerald-500/20 transition-colors"></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankHub;
