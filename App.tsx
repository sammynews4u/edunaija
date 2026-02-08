
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserProgress, SubscriptionTier } from './types';

// Pages & Components
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';
import PracticeEngine from './pages/PracticeEngine';
import TextbookView from './pages/TextbookView';
import QuestionBankHub from './pages/QuestionBankHub';
import PastQuestionsBrowser from './pages/PastQuestionsBrowser';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ExamHistory from './pages/ExamHistory';
import ScientificCalculator from './components/ScientificCalculator';
import { Calculator, ShieldAlert, Menu, X, Home, Book, CreditCard, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('edunaija_v3_progress');
    return saved ? JSON.parse(saved) : {
      selectedExam: null,
      selectedDept: null,
      selectedTrack: null,
      selectedSubjects: [],
      mastery: {},
      onboarded: false,
      attendance: [],
      subscription: SubscriptionTier.MONTHLY,
      trialStartDate: null,
      tickets: [],
      profile: {
        fullName: 'Candidate',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        location: 'Lagos, Nigeria',
        schoolName: '',
        targetInstitution: '',
        targetCourse: '',
        studyLevel: 'SS3'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('edunaija_v3_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] relative overflow-x-hidden">
        <Navbar 
          onboarded={progress.onboarded} 
          profile={progress.profile} 
          tier={progress.subscription} 
          isAdmin={isAdminAuthenticated} 
        />
        <main className="flex-1 w-full relative">
          <Routes>
            <Route path="/" element={progress.onboarded ? <Navigate to="/dashboard" /> : <Navigate to="/landing" />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={updateProgress} />} />
            <Route path="/onboarding" element={<Onboarding onComplete={updateProgress} />} />
            <Route path="/dashboard" element={progress.onboarded ? <Dashboard progress={progress} updateProgress={updateProgress} /> : <Navigate to="/login" />} />
            <Route path="/subject/:subjectId" element={<SubjectDetail progress={progress} />} />
            <Route path="/learn/:subjectId" element={<TextbookView />} />
            <Route path="/practice/:subjectId/:mode" element={<PracticeEngine progress={progress} isAdmin={isAdminAuthenticated} />} />
            <Route path="/past-questions/:subjectId" element={<PastQuestionsBrowser />} />
            <Route path="/past-questions" element={progress.onboarded ? <QuestionBankHub progress={progress} /> : <Navigate to="/" />} />
            <Route path="/pricing" element={<Pricing progress={progress} updateProgress={updateProgress} />} />
            <Route path="/support" element={<Support progress={progress} updateProgress={updateProgress} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/history" element={<ExamHistory />} />
            <Route path="/root-admin-gate-2025" element={<Admin isAuthenticated={isAdminAuthenticated} onAuth={setIsAdminAuthenticated} studentProgress={progress} updateStudentProgress={updateProgress} />} />
            <Route path="/profile" element={progress.onboarded ? <Profile progress={progress} updateProgress={updateProgress} isAdmin={isAdminAuthenticated} /> : <Navigate to="/" />} />
          </Routes>
        </main>

        {progress.onboarded && (
          <div className="fixed bottom-6 right-6 sm:left-6 sm:right-auto flex flex-col gap-4 z-[90]">
            <button 
              onClick={() => setShowCalculator(!showCalculator)}
              className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${showCalculator ? 'bg-indigo-600 text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white text-black hover:bg-indigo-50'}`}
              title="Toggle Calculator"
            >
              <Calculator size={24} />
            </button>
          </div>
        )}

        {showCalculator && <ScientificCalculator onClose={() => setShowCalculator(false)} />}
      </div>
    </Router>
  );
};

const Navbar: React.FC<{ onboarded: boolean, profile: any, tier: SubscriptionTier, isAdmin: boolean }> = ({ onboarded, profile, tier, isAdmin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/landing' || location.pathname === '/login' || location.pathname === '/history';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`sticky top-0 z-[100] w-full transition-all border-b-4 border-black ${isLanding ? 'bg-white' : 'bg-white shadow-sm'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3 group relative z-[110]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] group-hover:rotate-6 transition-transform">E</div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">EduNaija<span className="text-indigo-600">Prep</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {onboarded ? (
              <>
                <NavLink to="/dashboard" label="Study Room" active={location.pathname === '/dashboard'} />
                <NavLink to="/past-questions" label="Archives" active={location.pathname.startsWith('/past-questions')} />
                <NavLink to="/pricing" label="Plans" active={location.pathname === '/pricing'} />
                <Link to="/profile" className="flex items-center gap-4 bg-slate-50 border-4 border-black p-2 pr-6 rounded-[24px] hover:bg-indigo-50 transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-black text-sm">
                      {profile.fullName && profile.fullName.split(' ').map((n: string) => n[0]).join('')}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase text-indigo-600 tracking-widest">{isAdmin ? 'SUPER ADMIN' : tier}</span>
                      <span className="text-xs font-black uppercase">{profile.fullName.split(' ')[0]}</span>
                   </div>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-8">
                <Link to="/history" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">History</Link>
                <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Contact</Link>
                <Link to="/login" className="px-6 py-2.5 bg-white border-4 border-black rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Log In</Link>
                <Link to="/onboarding" className="px-8 py-3 bg-black text-white border-4 border-black rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(79,70,229,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  Join Scholars
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-[110] w-12 h-12 flex items-center justify-center bg-black text-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-white lg:hidden flex flex-col pt-32 px-8 gap-8"
          >
            {onboarded ? (
              <div className="space-y-6">
                <MobileNavLink to="/dashboard" icon={<Home />} label="Study Room" />
                <MobileNavLink to="/past-questions" icon={<Book />} label="Bank Archives" />
                <MobileNavLink to="/pricing" icon={<CreditCard />} label="Membership" />
                <MobileNavLink to="/profile" icon={<UserCircle />} label="My Account" />
                <hr className="border-2 border-black my-8" />
                <Link to="/login" className="block w-full py-5 bg-rose-600 text-white text-center rounded-[24px] border-4 border-black font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Sign Out</Link>
              </div>
            ) : (
              <div className="space-y-6">
                <Link to="/login" className="block w-full py-5 bg-white text-black text-center rounded-[24px] border-4 border-black font-black uppercase tracking-widest">Sign In</Link>
                <Link to="/onboarding" className="block w-full py-5 bg-black text-white text-center rounded-[24px] border-4 border-black font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">Join Platform</Link>
                <div className="pt-10 flex justify-center gap-8">
                  <Link to="/history" className="text-[10px] font-black uppercase tracking-widest">History</Link>
                  <Link to="/about" className="text-[10px] font-black uppercase tracking-widest">About</Link>
                  <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest">Contact</Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, label, active }: any) => (
  <Link to={to} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 group ${active ? 'text-black' : 'text-slate-400 hover:text-black'}`}>
    {label}
    <span className={`absolute bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </Link>
);

const MobileNavLink = ({ to, icon, label }: any) => (
  <Link to={to} className="flex items-center gap-6 p-6 bg-slate-50 border-4 border-black rounded-[32px] hover:bg-indigo-50 transition-all">
     <div className="text-indigo-600">{React.cloneElement(icon, { size: 28, strokeWidth: 3 })}</div>
     <span className="text-xl font-black uppercase tracking-tight">{label}</span>
  </Link>
);

export default App;
