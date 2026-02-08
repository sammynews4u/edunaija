
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

const FACTS = [
  "University of Ibadan was the first university in Nigeria (1948).",
  "WAEC was established in 1952 across West Africa.",
  "JAMB UTME went fully Computer-Based (CBT) in 2015.",
  "NECO was created in 1999 as a localized WAEC alternative.",
  "Wole Soyinka won the Nobel Prize for Literature in 1986.",
  "The word 'JAMB' is often used as a verb in Nigeria.",
  "Nigeria has over 170 recognized universities today."
];

const AcademicFact: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % FACTS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white p-6 h-full flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
          <Sparkles size={16} />
        </div>
        <button onClick={() => setIndex(prev => (prev + 1) % FACTS.length)} className="text-white/20 hover:text-white transition-colors">
          <RefreshCw size={12} />
        </button>
      </div>
      
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute inset-0"
          >
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1">Knowledge Drop</p>
            <p className="text-xs sm:text-sm font-black leading-tight italic tracking-tight line-clamp-3">"{FACTS[index]}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-1">
        {FACTS.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full transition-all ${i === index ? 'bg-indigo-500' : 'bg-white/10'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default AcademicFact;
