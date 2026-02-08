
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExamType, DepartmentType, UserProgress, SubscriptionTier, UserProfile } from '../types';
import { SUBJECTS, DEPARTMENT_DEFAULTS, PRICING_PLANS } from '../constants';
import { User, Mail, Lock, Phone, Calendar, School, Target, BookOpen, ChevronRight, ChevronLeft, ShieldCheck, Database, Eye, EyeOff, GraduationCap, Award, Book, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (updates: Partial<UserProgress>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [showPassword, setShowPassword] = useState(false);

  const [dobParts, setDobParts] = useState({ day: '', month: '', year: '' });
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    location: '',
    schoolName: '',
    targetInstitution: '',
    targetCourse: '',
    studyLevel: 'SS3'
  });

  const [exam, setExam] = useState<ExamType | null>(null);
  const [dept, setDept] = useState<DepartmentType | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [plan, setPlan] = useState<SubscriptionTier>(SubscriptionTier.MONTHLY);

  const navigate = useNavigate();

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newDobParts = { ...dobParts, [name]: value };
    setDobParts(newDobParts);
    if (newDobParts.day && newDobParts.month && newDobParts.year) {
      setProfile(prev => ({ ...prev, dob: `${newDobParts.year}-${newDobParts.month}-${newDobParts.day}` }));
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFinish = () => {
    if (!exam || !dept || subjects.length === 0) {
      alert("Please fill in all sections before you start studying.");
      return;
    }
    const userData = {
      selectedExam: exam,
      selectedDept: dept,
      selectedSubjects: subjects,
      subscription: plan,
      trialStartDate: Date.now(),
      profile: { ...profile },
      onboarded: true,
      mastery: {},
      attendance: [],
      tickets: []
    };

    const globalRegistry = JSON.parse(localStorage.getItem('edunaija_global_registry') || '[]');
    const updatedRegistry = [
      ...globalRegistry.filter((u: any) => u.profile.email !== profile.email),
      userData
    ];
    localStorage.setItem('edunaija_global_registry', JSON.stringify(updatedRegistry));

    onComplete(userData);
    navigate('/dashboard');
  };

  const toggleSubject = (id: string) => {
    setSubjects(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { v: '01', l: 'Jan' }, { v: '02', l: 'Feb' }, { v: '03', l: 'Mar' }, { v: '04', l: 'Apr' },
    { v: '05', l: 'May' }, { v: '06', l: 'Jun' }, { v: '07', l: 'Jul' }, { v: '08', l: 'Aug' },
    { v: '09', l: 'Sep' }, { v: '10', l: 'Oct' }, { v: '11', l: 'Nov' }, { v: '12', l: 'Dec' }
  ];
  const years = Array.from({ length: 35 }, (_, i) => (2020 - i).toString());

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 min-h-screen relative overflow-hidden bg-slate-50">
      {/* Decorative Elements */}
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none"
      >
        <GraduationCap size={400} />
      </motion.div>

      <div className="mb-12 relative z-10">
        <div className="flex justify-between items-end mb-6">
           <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-2 flex items-center gap-2">
                <Sparkles size={12} className="animate-pulse" />
                Setting up Step {step}/{totalSteps}
              </p>
              <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter leading-none">
                 {step === 1 && "Create Your Account"}
                 {step === 2 && "Personal Details"}
                 {step === 3 && "School Information"}
                 {step === 4 && "Choose Your Exam"}
                 {step === 5 && "University Goals"}
                 {step === 6 && "Pick Your Subjects"}
                 {step === 7 && "Pick a Study Plan"}
              </h1>
           </div>
           <div className="text-right hidden sm:block">
              <span className="text-5xl font-black text-black/5 tabular-nums">{Math.round((step / totalSteps) * 100)}%</span>
           </div>
        </div>
        <div className="h-3 w-full bg-white border-2 border-black rounded-full overflow-hidden shadow-sm">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            className="h-full bg-black" 
          />
        </div>
      </div>

      <motion.div 
        layout
        className="bg-white rounded-[32px] sm:rounded-[60px] border-[4px] border-black p-6 sm:p-12 md:p-20 relative overflow-hidden min-h-[550px] flex flex-col shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {step === 1 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <User size={24} />
                     </div>
                     Account Setup
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-indigo-100 pl-4">Create your login details to start studying.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                   <InputField label="Your Full Name" name="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Enter your name" icon={<User size={16}/>} />
                   <InputField label="Email Address" name="email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="example@email.com" icon={<Mail size={16}/>} />
                   <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                        <Lock size={12}/> Choose a Password
                      </label>
                      <div className="relative">
                        <input 
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={profile.password || ''}
                          onChange={handleProfileChange}
                          placeholder="Create a password"
                          className="w-full bg-white border-2 sm:border-4 border-black rounded-2xl px-6 py-4 text-sm font-bold focus:bg-indigo-50 outline-none text-black transition-all placeholder:text-black/10"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:scale-110 transition-transform p-2"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                   </div>
                   <InputField label="Phone Number" name="phone" value={profile.phone} onChange={handleProfileChange} placeholder="0803XXXXXXX" icon={<Phone size={16}/>} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <Award size={24} />
                     </div>
                     Personal Details
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-emerald-100 pl-4">Tell us a bit about yourself.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Calendar size={12}/> Birthday
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <select name="day" value={dobParts.day} onChange={handleDobChange} className="bg-white border-4 border-black rounded-xl p-3 text-sm font-bold outline-none appearance-none focus:bg-emerald-50">
                          <option value="">Day</option>
                          {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select name="month" value={dobParts.month} onChange={handleDobChange} className="bg-white border-4 border-black rounded-xl p-3 text-sm font-bold outline-none appearance-none focus:bg-emerald-50">
                          <option value="">Month</option>
                          {months.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                        </select>
                        <select name="year" value={dobParts.year} onChange={handleDobChange} className="bg-white border-4 border-black rounded-xl p-3 text-sm font-bold outline-none appearance-none focus:bg-emerald-50">
                          <option value="">Year</option>
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Gender</label>
                      <select name="gender" value={profile.gender} onChange={handleProfileChange} className="w-full bg-white border-4 border-black rounded-2xl p-4 text-sm font-bold outline-none text-black appearance-none focus:bg-emerald-50">
                         <option value="">Select Gender</option>
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                      </select>
                   </div>
                   <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Where do you live? (State)</label>
                      <select name="location" value={profile.location} onChange={handleProfileChange} className="w-full bg-white border-4 border-black rounded-2xl p-4 text-sm font-bold outline-none text-black appearance-none focus:bg-emerald-50">
                         <option value="">Select Your State</option>
                         {nigerianStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                   </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <School size={24} />
                     </div>
                     Your School
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-orange-100 pl-4">Tell us about where you are currently studying.</p>
                </header>
                <div className="grid grid-cols-1 gap-10">
                   <InputField label="Name of Your Current School" name="schoolName" value={profile.schoolName} onChange={handleProfileChange} placeholder="e.g. King's College, Lagos" icon={<School size={16}/>} />
                   <div className="space-y-5">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Your Current Class</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {['SS1', 'SS2', 'SS3', 'Preparing for JAMB'].map(level => (
                           <button 
                            key={level} 
                            onClick={() => setProfile({...profile, studyLevel: level})}
                            className={`py-6 rounded-3xl text-xs font-black uppercase tracking-widest border-4 transition-all ${profile.studyLevel === level ? 'bg-black text-white border-black shadow-xl scale-105' : 'bg-white text-black border-black hover:bg-black/5'}`}
                           >
                             {level}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <Target size={24} />
                     </div>
                     Target Exam
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-purple-100 pl-4">Which exam are you preparing for in 2025?</p>
                </header>
                <div className="space-y-10">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Exam Type</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {Object.values(ExamType).map(e => (
                            <button key={e} onClick={() => setExam(e)} className={`p-8 rounded-[32px] border-4 text-left transition-all flex justify-between items-center ${exam === e ? 'bg-indigo-50 border-black shadow-xl scale-105' : 'bg-white text-slate-600 border-black hover:bg-black/5'}`}>
                               <span className="font-black uppercase tracking-widest text-xs">{e} Exam</span>
                               {exam === e && <ShieldCheck className="text-black" size={24} />}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Your Department</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {Object.values(DepartmentType).map(d => (
                            <button key={d} onClick={() => { setDept(d); setSubjects(DEPARTMENT_DEFAULTS[d]); }} className={`p-8 rounded-[32px] border-4 text-left transition-all flex justify-between items-center ${dept === d ? 'bg-emerald-50 border-black shadow-xl scale-105' : 'bg-white text-slate-600 border-black hover:bg-black/5'}`}>
                               <span className="font-black uppercase tracking-widest text-xs">{d}</span>
                               {dept === d && <Database className="text-black" size={24} />}
                            </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <GraduationCap size={24} />
                     </div>
                     University Goals
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-rose-100 pl-4">Tell us where you want to go after secondary school.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <InputField label="Which University do you want to join?" name="targetInstitution" value={profile.targetInstitution} onChange={handleProfileChange} placeholder="e.g. UNILAG" icon={<Target size={16}/>} />
                   <InputField label="What Course do you want to study?" name="targetCourse" value={profile.targetCourse} onChange={handleProfileChange} placeholder="e.g. Medicine" icon={<BookOpen size={16}/>} />
                </div>
                <div className="p-10 bg-slate-950 rounded-[48px] text-white flex items-center gap-8 mt-10 border-4 border-black">
                   <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center text-3xl shadow-inner">💡</div>
                   <p className="text-sm font-bold leading-relaxed text-slate-400 italic">"Knowing your target university helps us show you exactly the score you need to get into your dream course."</p>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 flex-1">
                <header>
                   <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg border-2 border-black">
                        <BookOpen size={24} />
                     </div>
                     Study Subjects
                   </h2>
                   <p className="text-slate-500 font-medium text-sm border-l-4 border-blue-100 pl-4">Pick the subjects you want to practice and learn.</p>
                </header>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar p-2">
                   {SUBJECTS.map(s => {
                     const isSelected = subjects.includes(s.id);
                     return (
                       <button 
                        key={s.id} 
                        onClick={() => toggleSubject(s.id)}
                        className={`p-5 rounded-[24px] border-4 text-[10px] font-black uppercase tracking-widest transition-all text-center flex flex-col items-center justify-center gap-2 ${isSelected ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white text-black border-black hover:bg-black/5'}`}
                       >
                         {s.name}
                         {s.isCompulsory && <span className="text-[7px] bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">Core</span>}
                       </button>
                     );
                   })}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-10 flex-1">
                <header className="text-center">
                   <h2 className="text-4xl font-black text-black mb-2 uppercase tracking-tighter">Choose Your Plan</h2>
                   <p className="text-slate-500 font-medium text-sm">All plans start with a 3-day free trial. Try before you pay!</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {PRICING_PLANS.map(p => (
                     <button key={p.tier} onClick={() => setPlan(p.tier)} className={`p-10 rounded-[40px] border-4 text-left relative transition-all ${plan === p.tier ? 'bg-black text-white border-black scale-105 shadow-2xl' : 'bg-white text-black border-black hover:bg-black/5'}`}>
                        <div className="flex justify-between items-start mb-6">
                           <h3 className="text-xl font-black uppercase tracking-tighter">{p.tier} Plan</h3>
                           {plan === p.tier && <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center border-4 border-black shadow-lg"><ShieldCheck size={24}/></div>}
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                           <span className="text-4xl font-black">{p.price}</span>
                           <span className={`text-[11px] font-black uppercase tracking-widest ${plan === p.tier ? 'text-white/40' : 'text-black/40'}`}>{p.period}</span>
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-4 ${plan === p.tier ? 'text-emerald-400' : 'text-emerald-600'}`}>{p.trial}</p>
                     </button>
                   ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-12 flex items-center justify-between gap-6 border-t-4 border-black pt-12">
           <button onClick={prevStep} disabled={step === 1} className={`flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-6 rounded-[28px] font-black uppercase tracking-widest text-[10px] sm:text-[11px] transition-all border-4 border-black ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
              <ChevronLeft size={18}/> Back
           </button>
           
           {step < totalSteps ? (
             <button onClick={nextStep} className="flex items-center gap-3 px-10 sm:px-16 py-4 sm:py-6 bg-black text-white rounded-[28px] font-black uppercase tracking-widest text-[10px] sm:text-[11px] border-4 border-black hover:bg-white hover:text-black transition-all shadow-xl">
                Continue <ChevronRight size={18}/>
             </button>
           ) : (
             <button onClick={handleFinish} className="flex items-center gap-4 px-12 sm:px-20 py-4 sm:py-6 bg-black text-white rounded-[28px] font-black uppercase tracking-widest text-[11px] sm:text-[12px] border-4 border-black hover:bg-emerald-600 transition-all shadow-2xl group">
                Start Studying <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
             </button>
           )}
        </footer>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", placeholder = "", icon }: any) => (
  <div className="space-y-3 group">
    <label className="text-[10px] font-black text-black uppercase tracking-widest block ml-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <input 
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border-2 sm:border-4 border-black rounded-2xl px-6 py-4 text-base font-bold focus:bg-indigo-50 outline-none text-black transition-all placeholder:text-black/10 shadow-inner"
    />
  </div>
);

export default Onboarding;
