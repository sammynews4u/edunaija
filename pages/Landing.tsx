
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRICING_PLANS, PLATFORM_FEATURES, PLATFORM_BENEFITS, FAQS, EDUCATIONAL_FACTS, COMPETITIONS } from '../constants';
import { getTopInstitutions, Institution } from '../services/institutionService';
import { 
  School, Trophy, MapPin, Zap, ExternalLink, History, 
  Database, BrainCircuit, ShieldCheck, Layers, BarChart3, Plus, Minus,
  Send, Mail, Phone, Activity, CheckCircle2, GraduationCap, Book, Pencil, Star, Award, BookOpen, Sparkles, Target
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050335192-ce1dee0a804e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
];

const FOUNDER_IMAGE = "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=800"; 

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

const FloatingElement = ({ icon: Icon, delay = 0, size = 40, color = "text-indigo-600" }: any) => {
  const { x, y } = useMousePosition();
  const springX = useSpring(x / 50, { stiffness: 50, damping: 20 });
  const springY = useSpring(y / 50, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -20, 0],
        x: springX.get(),
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
      }}
      style={{ translateX: springX, translateY: springY }}
      className={`absolute opacity-10 pointer-events-none ${color}`}
    >
      <Icon size={size} />
    </motion.div>
  );
};

const Landing: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Dynamic Content Rotation States
  const [factIndex, setFactIndex] = useState(0);
  const [compOffset, setCompOffset] = useState(0);

  const [landingConfig] = useState(() => {
    const saved = localStorage.getItem('edunaija_landing_config');
    return saved ? JSON.parse(saved) : {
      heroHeading: "Unlock Your Academic Potential with EduNaija Prep",
      heroSubtext: "Nigeria's biggest library of past questions and lessons. We've collected 25 years of exams to help you succeed in JAMB, WAEC, and NECO.",
      founderQuote: "Samuel Oluwatosin Adesanya is a top software engineer who created this platform to make sure every Nigerian student can access high-quality study materials easily."
    };
  });

  useEffect(() => {
    getTopInstitutions().then(data => {
      setInstitutions(data);
      setLoading(false);
    });

    const timer = setInterval(() => setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length), 5000);
    const factTimer = setInterval(() => setFactIndex(prev => (prev + 1) % EDUCATIONAL_FACTS.length), 7000);
    const compTimer = setInterval(() => setCompOffset(prev => (prev + 3) % COMPETITIONS.length), 9000);
    
    return () => {
      clearInterval(timer);
      clearInterval(factTimer);
      clearInterval(compTimer);
    };
  }, []);

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  const benefitIcons: any = {
    Target: <Target size={32} />,
    Sparkles: <Sparkles size={32} />,
    Zap: <Zap size={32} />,
    ShieldCheck: <ShieldCheck size={32} />,
    BarChart3: <BarChart3 size={32} />,
    Database: <Database size={32} />,
    GraduationCap: <GraduationCap size={32} />,
    Layers: <Layers size={32} />,
    Activity: <Activity size={32} />
  };

  const featureIcons: any = {
    BookOpen: <BookOpen size={32} />,
    Database: <Database size={32} />,
    Layers: <Layers size={32} />,
    BrainCircuit: <BrainCircuit size={32} />
  };

  const currentComps = COMPETITIONS.slice(compOffset, compOffset + 3);
  // Handle wrapping for competitions
  if (currentComps.length < 3) {
    currentComps.push(...COMPETITIONS.slice(0, 3 - currentComps.length));
  }

  return (
    <div className="overflow-x-hidden bg-white text-black font-sans selection:bg-indigo-600 selection:text-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingElement icon={GraduationCap} delay={0} size={120} style={{ top: '10%', left: '5%' }} />
        <FloatingElement icon={Book} delay={1} size={80} style={{ top: '40%', right: '10%' }} />
        <FloatingElement icon={Pencil} delay={2} size={60} style={{ bottom: '20%', left: '15%' }} />
        <FloatingElement icon={Award} delay={0.5} size={90} style={{ top: '70%', right: '5%' }} />
        <FloatingElement icon={Star} delay={1.5} size={40} style={{ top: '20%', right: '40%' }} />
        <FloatingElement icon={BookOpen} delay={2.5} size={100} style={{ bottom: '10%', right: '30%' }} />
      </div>

      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white border-b-8 border-black overflow-hidden z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center gap-10">
            <div className="lg:w-[65%] text-center lg:text-left z-20">
              <motion.div 
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 py-2 px-6 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border-2 border-black"
              >
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                Latest 2025 Study Updates Ready
              </motion.div>
              <h1 className="text-5xl lg:text-[100px] font-black leading-[0.9] mb-12 tracking-tighter uppercase break-words">
                Get Your <br className="hidden md:block"/>Best Grades <br className="hidden md:block"/> with <span className="text-indigo-600 inline-block md:block">EduNaija Prep</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 font-bold leading-relaxed italic border-l-8 border-black pl-6">
                {landingConfig.heroSubtext || "Nigeria's biggest library of past questions and lessons. We've collected 25 years of exams to help you succeed in JAMB, WAEC, and NECO."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link to="/onboarding" className="bg-black text-white px-12 py-6 rounded-none text-[12px] font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-4 border-black">
                  Try It For Free
                </Link>
                <Link to="/history" className="bg-white border-4 border-black text-black px-12 py-6 rounded-none text-[12px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  See Past Questions <History size={16} />
                </Link>
              </div>
            </div>
            
            <div className="lg:w-[35%] mt-20 lg:mt-0 relative">
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="border-8 border-black p-4 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden aspect-[4/5] lg:aspect-square"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroIndex}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    src={HERO_IMAGES[heroIndex]} 
                    alt="Nigerian Scholars" 
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay"></div>
              </motion.div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600 border-4 border-black -z-0"></div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="bg-black py-16 border-b-8 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Questions", val: "10M+" },
                { label: "Daily Users", val: "50,000+" },
                { label: "Success Rate", val: "99.2%" },
                { label: "Exam Boards", val: "3" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <p className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">{stat.val}</p>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">{stat.label}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-32 bg-indigo-600 text-white border-b-8 border-black relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <header className="mb-20 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-indigo-200">Heritage & Pride</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Nigerian <span className="text-black">Learning Facts</span>.</h2>
           </header>
           <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={factIndex} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-10 md:p-16 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-black max-w-3xl w-full text-center"
                >
                   <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center font-black rounded-full mb-8 border-2 border-black mx-auto text-xl">?</div>
                   <p className="text-2xl md:text-3xl font-black leading-tight italic tracking-tight">"{EDUCATIONAL_FACTS[factIndex]}"</p>
                   <div className="mt-10 flex justify-center gap-2">
                     {EDUCATIONAL_FACTS.map((_, i) => (
                       <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === factIndex ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                     ))}
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </section>

      <section className="py-32 bg-white border-b-8 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-4">
           <header className="mb-20 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">National <span className="text-indigo-600">Scholar Hall</span>.</h2>
              <p className="text-lg font-bold text-slate-500 uppercase tracking-widest italic">Celebrating excellence across Nigeria's top student competitions</p>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {currentComps.map((comp: any, i: number) => (
                  <motion.div 
                    key={`${comp.name}-${comp.year}`}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="p-8 border-4 border-black hover:bg-indigo-50 transition-all group bg-white"
                  >
                     <Trophy className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
                     <h3 className="text-xl font-black uppercase mb-2 leading-none">{comp.name}</h3>
                     <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-black text-white">Winner {comp.year}</span>
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-indigo-100 text-indigo-600 border border-indigo-200">{comp.city}</span>
                     </div>
                     <p className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 uppercase tracking-tighter italic">{comp.winner}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 border-b-8 border-black overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-24 text-center">
             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">9 Core Benefits</p>
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">The EduNaija <span className="text-indigo-600">Advantage</span>.</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {PLATFORM_BENEFITS.map((benefit, i) => (
               <motion.div 
                key={i} 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-all group"
               >
                  <div className="w-16 h-16 bg-slate-50 border-4 border-black rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                     {benefitIcons[benefit.icon]}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">{benefit.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm italic">{benefit.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-black text-white border-b-8 border-black overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {PLATFORM_FEATURES.map((feature, i) => (
              <motion.div 
                key={i} 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-12 border-4 border-white/20 bg-white/5 rounded-[40px] hover:bg-indigo-600/20 transition-all group"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <div className="text-indigo-400 group-hover:scale-110 transition-transform">
                      {featureIcons[feature.icon]}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">{feature.title}</h3>
                </div>
                <p className="text-base text-slate-400 font-medium leading-relaxed italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 border-b-8 border-black overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              initial={{ opacity: 0, rotateY: 20, x: -50 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] bg-black border-8 border-black shadow-[24px_24px_0px_0px_rgba(79,70,229,1)] overflow-hidden relative">
                <img 
                  src={FOUNDER_IMAGE} 
                  alt="Samuel Oluwatosin Adesanya - Founder" 
                  className="w-full h-full object-cover grayscale contrast-125" 
                />
                <div className="absolute inset-0 bg-indigo-600/5 mix-blend-multiply"></div>
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white border-4 border-black shadow-2xl">
                   <p className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-1">Our Founder</p>
                   <p className="text-2xl font-black text-black leading-none uppercase tracking-tighter italic">Samuel O. Adesanya</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 block">Meet the Team</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">Why we built <span className="text-indigo-600">EduNaija</span>.</h2>
              <div className="space-y-6 text-slate-600 text-lg font-bold italic leading-relaxed">
                <p>"{landingConfig.founderQuote}"</p>
                <p className="not-italic text-sm text-slate-500 uppercase tracking-widest font-black pt-6 border-t border-slate-200">25+ Years of Questions checked by real teachers.</p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <a href="https://samueloadesanya.com.ng" target="_blank" className="bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-4 border-black hover:bg-white hover:text-black transition-all">
                  See Founder's Work <ExternalLink size={14} />
                </a>
                <div className="p-5 bg-white border-4 border-black flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Office: Lagos, NGA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white border-b-8 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none text-center lg:text-left">Top <span className="text-indigo-600">Universities</span>.</h2>
            <p className="text-lg font-bold text-slate-500 uppercase tracking-widest text-center lg:text-left italic">Check the 2025 JAMB Cut-off Marks</p>
          </header>
          <div className="grid grid-cols-1 gap-4">
            {institutions.map((uni, idx) => (
              <motion.div 
                key={uni.rank} 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border-4 border-black p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-indigo-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-black text-white flex items-center justify-center text-xl font-black shrink-0 border-4 border-black">
                  {uni.rank}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-none">{uni.name}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={12} /> {uni.location}
                  </div>
                </div>
                <div className="flex items-center gap-10">
                   <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">JAMB Score Needed</p>
                     <p className="text-3xl font-black">{uni.jambCutOff}</p>
                   </div>
                   <a href={`https://${uni.website}`} target="_blank" className="p-4 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all"><ExternalLink size={20}/></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 border-b-8 border-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <header className="mb-24">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Simple <span className="text-indigo-600">Pricing</span>.</h2>
             <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto italic">Everything you need to succeed, without the high cost.</p>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {PRICING_PLANS.map((plan, i) => (
               <motion.div 
                key={plan.tier}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 60 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className={`p-10 border-4 border-black transition-all relative flex flex-col text-left ${plan.highlight ? 'bg-black text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)] scale-105 z-10' : 'bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}
               >
                  <h3 className="text-xl font-black uppercase mb-2 leading-none">{plan.tier} Plan</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-[10px] font-black uppercase opacity-60">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-tight leading-tight">
                        <Zap size={14} className="text-indigo-600 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/onboarding" className={`w-full py-5 border-4 border-black text-[10px] font-black uppercase text-center transition-all ${plan.highlight ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-white hover:text-black'}`}>
                    {plan.cta}
                  </Link>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <section className="py-32 bg-white border-b-8 border-black overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border-8 border-black p-8 md:p-20 shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Talk to <span className="text-indigo-600">Us</span>.
                </h2>
                <p className="text-lg text-slate-500 font-bold mb-10 leading-relaxed italic">Have questions? Parents or teachers looking for bulk school accounts can send us a message here.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-indigo-50 border-4 border-black flex items-center justify-center shadow-inner text-black"><Mail size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-600">help@edunaija.prep</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-indigo-50 border-4 border-black flex items-center justify-center shadow-inner text-black"><Phone size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-600">+234 703 733 4371</span>
                  </div>
                </div>
              </div>

              <div>
                {formStatus === 'sent' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-emerald-500 bg-emerald-50"
                  >
                    <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
                    <h3 className="text-3xl font-black uppercase mb-2 leading-none">Message Sent!</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">We will get back to you within 2 hours.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-8 text-[10px] font-black uppercase underline hover:text-indigo-600 transition-colors">Send Another Message</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEnquiry} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</label>
                        <input required type="text" className="w-full bg-slate-50 border-4 border-black p-4 text-sm font-bold outline-none focus:bg-white transition-all shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                        <input required type="email" className="w-full bg-slate-50 border-4 border-black p-4 text-sm font-bold outline-none focus:bg-white transition-all shadow-inner" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">How can we help?</label>
                      <textarea required rows={4} className="w-full bg-slate-50 border-4 border-black p-4 text-sm font-bold outline-none focus:bg-white resize-none transition-all shadow-inner" />
                    </div>
                    <button type="submit" className="w-full py-6 bg-black text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 border-4 border-black hover:bg-indigo-600 transition-all shadow-2xl">
                      {formStatus === 'sending' ? "Sending..." : <>Send Message <Send size={18}/></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 border-b-8 border-black relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">Common <span className="text-indigo-600">Questions</span>.</h2>
          </header>
          
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <motion.div 
                key={i} 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-black uppercase tracking-tight pr-8 leading-tight">{faq.q}</span>
                  {openFaq === i ? <Minus size={24} strokeWidth={4} /> : <Plus size={24} strokeWidth={4} />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 border-t-2 border-black/5 text-slate-500 font-bold leading-relaxed italic">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-24 border-t-8 border-black text-center relative z-10">
         <Link to="/" className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-14 h-14 bg-black flex items-center justify-center text-white font-black text-3xl shadow-xl">E</div>
            <span className="text-4xl font-black tracking-tighter">EduNaija<span className="text-indigo-600">Prep</span></span>
         </Link>
         <div className="mb-10 flex flex-col items-center gap-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600">
               Proudly developed by <span className="text-indigo-600">Samuel Oluwatosin Adesanya</span> for Nigeria Scholars
            </p>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
               © 2025 Scholar Hub. Certified study platform.
            </p>
         </div>
         <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/history" className="hover:text-black">History</Link>
            <Link to="/pricing" className="hover:text-black">Pricing</Link>
            <Link to="/support" className="hover:text-black">Help Center</Link>
            <Link to="/terms" className="hover:text-black">Terms</Link>
         </div>
      </footer>
    </div>
  );
};

export default Landing;
