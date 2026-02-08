
import React from 'react';
import { motion } from 'framer-motion';
import { History, ShieldCheck, Award, Zap, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamHistory: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen animate-in fade-in duration-700">
      {/* Header */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b-8 border-black bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <Clock size={14} />
            Academic Chronicles
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter mb-8 uppercase leading-[0.85]">
            Legacy of <span className="text-indigo-600">Excellence</span>.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-black uppercase tracking-widest italic border-t-4 border-black pt-8">
            Tracing the evolution of the Nigerian educational assessment framework.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 max-w-5xl mx-auto px-4">
        <div className="space-y-32">
          
          <HistoryMilestone 
            year="1952" 
            title="WAEC Foundation" 
            board="West African Examinations Council"
            desc="Established following the Jeffrey Report, WAEC was created to harmonize exams across West African countries. It remains the oldest and most prestigious secondary school certificate board in the region."
            icon={<ShieldCheck size={32} />}
            color="bg-blue-600"
          />

          <HistoryMilestone 
            year="1978" 
            title="JAMB Inception" 
            board="Joint Admissions and Matriculation Board"
            desc="Created to solve the problem of multiple university applications and varied admission standards. JAMB introduced the Unified Tertiary Matriculation Examination (UTME) to create a single path to higher education."
            icon={<Zap size={32} />}
            color="bg-emerald-600"
          />

          <HistoryMilestone 
            year="1999" 
            title="NECO Emergence" 
            board="National Examination Council"
            desc="Established by the Federal Government to provide a local alternative to WAEC. NECO was designed to reduce the exam burden on students and provide a truly national certificate for Nigerian secondary school leavers."
            icon={<Award size={32} />}
            color="bg-orange-600"
          />

        </div>
      </section>

      {/* Modern Transition */}
      <section className="py-24 bg-black text-white border-t-8 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white">
            <BookOpen size={36} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">The Digital <span className="text-indigo-400">Era</span></h2>
          <p className="text-lg font-bold text-slate-400 leading-relaxed mb-12 uppercase tracking-widest italic">
            "In 2025, EduNaija Prep continues this legacy by migrating these historical archives into an AI-powered neural library accessible to every Nigerian student."
          </p>
          <Link to="/onboarding" className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all border-4 border-white">
            Start Your Legend
          </Link>
        </div>
      </section>
    </div>
  );
};

const HistoryMilestone = ({ year, title, board, desc, icon, color }: any) => (
  <div className="relative pl-12 md:pl-0">
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2 opacity-10"></div>
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 order-2 md:order-1 text-center md:text-right">
        <h3 className="text-6xl font-black text-black mb-2 tabular-nums">{year}</h3>
        <h4 className="text-2xl font-black text-indigo-600 uppercase tracking-tighter mb-4">{title}</h4>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">{board}</p>
        <p className="text-lg text-slate-600 font-bold leading-tight italic">{desc}</p>
      </div>
      <div className={`w-24 h-24 rounded-full ${color} text-white flex items-center justify-center shrink-0 z-10 border-8 border-white shadow-[0_0_0_8px_black] order-1 md:order-2 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1 order-3 hidden md:block"></div>
    </div>
  </div>
);

export default ExamHistory;
