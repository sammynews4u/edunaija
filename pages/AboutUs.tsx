import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Cpu, Globe, Award, ExternalLink, ArrowRight, ShieldCheck, Users, BrainCircuit } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-4 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Target size={14} />
            The EduNaija Vision
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 uppercase leading-[0.9]">
            The Future of <span className="text-indigo-600">Learning</span> in Nigeria.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "We are bridging the gap between historical board archives and the digital intelligence of the next generation."
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </section>

      {/* Mission & Stats */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-8">Empowering <span className="text-indigo-600">Academic Mastery</span>.</h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  At EduNaija Prep, we believe that every Nigerian student deserves access to premium, high-fidelity educational resources regardless of their location.
                </p>
                <p>
                  By indexing over 25 years of board sittings from WAEC, NECO, and JAMB, we have created Nigeria's most comprehensive digital archive, powered by a neural synthesis engine that provides step-by-step logic for every question.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-3xl font-black text-indigo-600 mb-2">1M+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions Synced</div>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-3xl font-black text-emerald-600 mb-2">24/7</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Support</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[60px] p-12 text-white shadow-3xl relative overflow-hidden">
              <BrainCircuit className="text-indigo-500 mb-8" size={48} />
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Neural Technology</h3>
              <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                Our platform leverages advanced React architecture and Google's Gemini Neural Engine to provide real-time derivation of scientific and mathematical principles.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Real-time \LaTeX Rendering
                </li>
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Procedural Bank Generation
                </li>
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Low-Bandwidth Mobile Optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] block mb-4">Leadership</span>
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">The <span className="text-indigo-600">Founder</span> & Architect.</h2>
          </div>
          
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-[80px] p-8 md:p-20 relative overflow-hidden shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[60px] bg-slate-900 overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay"></div>
                <div className="w-full h-full flex items-center justify-center text-white text-9xl font-black opacity-20">SA</div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <Users size={120} className="text-white opacity-40" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-none">Samuel Oluwatosin <span className="text-indigo-600">Adesanya</span>.</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-200 pb-4 inline-block">World-Class Senior Software Engineer</p>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                  Samuel is a world-class senior software engineer with deep expertise in full-stack architecture, UI/UX design, and AI integration. Driven by a passion for the Nigerian educational landscape, he engineered EduNaija Prep to serve as a high-performance digital library that empowers every Nigerian student to achieve their maximum potential.
                </p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <a 
                    href="https://samueloadesanya.com.ng" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
                  >
                    View Portfolio <ExternalLink size={14} />
                  </a>
                  <Link 
                    to="/contact"
                    className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Contact Office <Globe size={14} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-10 leading-none">Join the <span className="text-indigo-200">Excellence</span> Network.</h2>
          <Link to="/onboarding" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-indigo-600 rounded-[32px] text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-indigo-700/50 -z-10 skew-y-6 transform origin-bottom-right"></div>
      </section>
    </div>
  );
};

export default AboutUs;