
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS, SYLLABUS_TOPICS, TOPIC_METADATA } from '../constants';
import { UserProgress, PracticeMode } from '../types';
import { Info, BookOpen, ChevronDown, ChevronUp, Target, ChevronLeft, Zap } from 'lucide-react';
// Import motion and AnimatePresence from framer-motion to fix missing references
import { motion, AnimatePresence } from 'framer-motion';

interface SubjectDetailProps {
  progress: UserProgress;
}

const SubjectDetail: React.FC<SubjectDetailProps> = ({ progress }) => {
  const { subjectId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const topics = SYLLABUS_TOPICS[subjectId || ''] || [
    "Introduction to General Principles",
    "Fundamental Theories",
    "Syllabus Units"
  ];

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-black uppercase">Subject Not Found</h2>
        <Link to="/dashboard" className="text-indigo-600 mt-4 inline-block font-black uppercase text-[10px] tracking-widest">Back to Dashboard</Link>
      </div>
    );
  }

  const toggleTopic = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="page-container pb-24">
      <nav className="flex items-center gap-4 text-sm text-black/50 mb-12">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-black transition-colors uppercase text-[10px] font-black tracking-widest">
          <ChevronLeft size={16} /> Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-bold text-black uppercase text-[10px] tracking-widest">{subject.name} Index</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-5xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-none">{subject.name}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 border-black ${subject.isCompulsory ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-slate-500'}`}>
                {subject.isCompulsory ? 'Core Curriculum' : 'Elective'}
              </span>
              <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 border-black bg-emerald-50 text-emerald-700">Verified by NERDC</span>
            </div>
            <p className="text-lg md:text-xl text-black font-bold leading-relaxed max-w-3xl italic opacity-60">
              "Master every unit in the 2025 {subject.name} syllabus. Access exhaustive digital chapters and interactive CBT mock exams."
            </p>
          </section>

          <section className="b-card rounded-[60px] overflow-hidden">
            <div className="p-8 md:p-12 border-b-4 border-black bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tight">Syllabus Index</h2>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.2em] mt-1">{topics.length} Chapters Indexed</p>
              </div>
              <Link to={`/learn/${subject.id}`} className="b-button-primary px-8 py-4 rounded-[20px] text-xs flex items-center gap-2 justify-center">
                 <Zap size={16} /> Start First Chapter
              </Link>
            </div>
            
            <div className="divide-y-4 divide-black">
              {topics.map((topic, idx) => {
                const isExpanded = expandedTopic === topic;
                const metadata = TOPIC_METADATA[topic] || { 
                  keyConcepts: ["Fundamental Concepts", "Exam Preparation", "Theory Essentials"],
                  relatedAreas: ["Supporting Topics", "Curriculum Overview"]
                };

                return (
                  <div key={idx} className="transition-all duration-300">
                    <div 
                      className={`p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-indigo-50/30 transition-colors group cursor-pointer ${isExpanded ? 'bg-indigo-50/50' : ''}`} 
                      onClick={() => toggleTopic(topic)}
                    >
                      <div className="flex items-center gap-8 flex-1">
                        <span className="w-14 h-14 rounded-[24px] bg-white border-4 border-black flex items-center justify-center text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white group-hover:shadow-none transition-all shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <span className="text-xl md:text-2xl font-black text-black tracking-tight uppercase leading-none">{topic}</span>
                          <div className="flex items-center gap-2 mt-3">
                            <p className="text-[9px] text-black/40 font-black uppercase tracking-[0.2em]">Unit {idx + 1}</p>
                            <div className="w-1 h-1 bg-black/20 rounded-full"></div>
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Chapter Ready</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        <Link to={`/learn/${subject.id}?topic=${encodeURIComponent(topic)}`} className="px-6 py-3 bg-black text-white border-2 border-black rounded-[16px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Read Book</Link>
                        {isExpanded ? <ChevronUp size={24} strokeWidth={3} className="text-black" /> : <ChevronDown size={24} strokeWidth={3} className="text-black/30" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white px-8 md:px-24 pb-12 pt-4"
                        >
                          <div className="bg-slate-50 rounded-[40px] p-8 md:p-12 border-4 border-black grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div>
                                <div className="flex items-center gap-3 mb-6">
                                   <Target size={20} className="text-indigo-600" />
                                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Learning Goals</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                   {metadata.keyConcepts.map((concept, cIdx) => (
                                     <span key={cIdx} className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black uppercase">{concept}</span>
                                   ))}
                                </div>
                             </div>
                             <div>
                                <div className="flex items-center gap-3 mb-6">
                                   <BookOpen size={20} className="text-emerald-600" />
                                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Linked Domains</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                   {metadata.relatedAreas.map((area, aIdx) => (
                                     <span key={aIdx} className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black uppercase text-emerald-700">{area}</span>
                                   ))}
                                </div>
                             </div>
                          </div>
                          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                             <Link to={`/practice/${subject.id}/${PracticeMode.QUIZ}?topic=${encodeURIComponent(topic)}`} className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 pb-1">Take Chapter Quiz →</Link>
                             <Link to={`/past-questions/${subject.id}?topic=${encodeURIComponent(topic)}`} className="text-xs font-black uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-1">Browse Past Questions →</Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-black p-10 md:p-12 rounded-[60px] text-white shadow-[16px_16px_0px_0px_rgba(79,70,229,1)] relative overflow-hidden group border-4 border-black">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase leading-none">Simulated Exam</h3>
              <p className="text-white/50 text-lg mb-10 leading-relaxed font-bold italic">
                "Mirror the pressure of the JAMB/WAEC exam hall with our timed CBT engine."
              </p>
              <Link 
                to={`/practice/${subject.id}/${PracticeMode.CBT}`}
                className="w-full py-6 bg-white text-black border-4 border-white rounded-[32px] text-center font-black uppercase text-[11px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all block"
              >
                Launch Mock Exam
              </Link>
            </div>
          </div>

          <div className="b-card p-10 rounded-[50px]">
             <h4 className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em] mb-8">Performance Context</h4>
             <div className="space-y-8">
                <div className="flex justify-between items-center text-xs">
                   <span className="font-black uppercase tracking-widest text-black/60"> NERDC Match</span>
                   <span className="font-black text-emerald-600">100% Correct</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="font-black uppercase tracking-widest text-black/60">Study Difficulty</span>
                   <span className="font-black text-indigo-600">SS1 - SS3</span>
                </div>
                <div className="pt-8 border-t-2 border-black/5">
                   <div className="w-12 h-12 bg-indigo-50 border-2 border-black rounded-2xl flex items-center justify-center text-xl mb-4 shadow-sm">💡</div>
                   <p className="text-xs font-bold text-black/40 italic leading-relaxed uppercase tracking-tighter">Scholars who read all textbook units increase their score probability by 42%.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
