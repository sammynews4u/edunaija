import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, AlertCircle, CreditCard, BrainCircuit, Users, Lock } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 py-1 px-4 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Scale size={14} />
          Legal Framework v1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 uppercase">Terms of <span className="text-indigo-600">Service</span>.</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Effective Date: January 1, 2025. Please read these terms carefully before accessing the EduNaija Scholar Halls.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Navigation</h3>
            <nav className="flex flex-col gap-1">
              <ToSLink href="#acceptance" label="Acceptance" />
              <ToSLink href="#eligibility" label="Scholar Eligibility" />
              <ToSLink href="#accounts" label="Account Security" />
              <ToSLink href="#subscriptions" label="Trial & Payments" />
              <ToSLink href="#ai-usage" label="AI Content Usage" />
              <ToSLink href="#liability" label="Board Disclaimer" />
            </nav>
            <div className="mt-8 p-6 bg-slate-900 rounded-[32px] text-white">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Need Help?</p>
              <p className="text-xs font-medium leading-relaxed mb-4">Questions about our legal policy?</p>
              <Link to="/support" className="text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors">Contact Liaison →</Link>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-20">
          <section id="acceptance" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-inner">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">1. Acceptance of Terms</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              By accessing or using the EduNaija Prep platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately cease usage of our digital scholar halls and archives.
            </p>
          </section>

          <section id="eligibility" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <Users size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">2. Scholar Eligibility</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              This platform is primarily intended for students preparing for the West African Senior School Certificate Examination (WASSCE), National Examination Council (NECO), and Joint Admissions and Matriculation Board (JAMB) UTME. Users under the age of 18 must use the platform under the supervision of a parent or legal guardian who agrees to these terms.
            </p>
          </section>

          <section id="accounts" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Lock size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">3. Account Security</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              You are responsible for maintaining the confidentiality of your login credentials. Each account is intended for a single scholar. Sharing of accounts across multiple users is strictly prohibited and may result in permanent suspension of access to the neural archives without refund.
            </p>
          </section>

          <section id="subscriptions" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CreditCard size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">4. Trial Period & Subscriptions</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              New scholars may be granted a 3-day unlimited free trial. Following the trial period, access requires a valid subscription processed via our payment partner, Paystack. Subscriptions are billed in Nigerian Naira (NGN). You may cancel your subscription at any time; however, we do not provide partial refunds for remaining time in a billing cycle.
            </p>
          </section>

          <section id="ai-usage" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                <BrainCircuit size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">5. AI Content & Logic Proofs</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              EduNaija Prep utilizes advanced Neural Synthesis (powered by Google Gemini API) to generate step-by-step logic proofs and syllabus explanations. While we strive for 99.9% board accuracy, these materials are for educational guidance only. Scholars are encouraged to cross-reference AI-generated derivations with official board textbooks.
            </p>
          </section>

          <section id="liability" className="prose prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight m-0">6. Limitation of Liability</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              EduNaija Prep is an independent educational platform and is not affiliated with WAEC, NECO, or JAMB. We do not guarantee admission to any institution or specific examination grades. We are not liable for any direct or indirect damages resulting from the use or inability to use the platform.
            </p>
          </section>

          <footer className="pt-20 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-8">End of Scholar Directives</p>
            <Link to="/onboarding" className="inline-flex px-12 py-5 purple-gradient text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-purple-200 hover:scale-105 transition-all">
              Agree & Continue to Onboarding
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

const ToSLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    className="px-4 py-3 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all border-l-2 border-transparent hover:border-indigo-600"
  >
    {label}
  </a>
);

export default TermsOfService;