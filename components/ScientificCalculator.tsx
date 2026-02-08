
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Move, Calculator, DollarSign, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorProps {
  onClose: () => void;
}

const ScientificCalculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'math' | 'currency'>('math');
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isDegree, setIsDegree] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Currency State
  const [naira, setNaira] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');
  const rates = { USD: 1650, GBP: 2100, EUR: 1800 }; // Parallel market rates

  useEffect(() => {
    if (activeTab !== 'math') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') append(e.key);
      if (e.key === '.') append('.');
      if (['+', '-', '*', '/'].includes(e.key)) append(e.key);
      if (e.key === 'Enter') calculate();
      if (e.key === 'Escape') onClose();
      if (e.key === 'Backspace') backspace();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, activeTab]);

  const append = (char: string) => {
    setDisplay(prev => {
      if (prev === '0' && !['.', '+', '-', '*', '/'].includes(char)) return char;
      if (prev === 'Error') return char;
      return prev + char;
    });
  };

  const calculate = () => {
    try {
      let sanitized = display
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, isDegree ? 'Math.sin(Math.PI/180*' : 'Math.sin(')
        .replace(/cos\(/g, isDegree ? 'Math.cos(Math.PI/180*' : 'Math.cos(')
        .replace(/tan\(/g, isDegree ? 'Math.tan(Math.PI/180*' : 'Math.tan(')
        .replace(/asin\(/g, isDegree ? '180/Math.PI*Math.asin(' : 'Math.asin(')
        .replace(/acos\(/g, isDegree ? '180/Math.PI*Math.acos(' : 'Math.acos(')
        .replace(/atan\(/g, isDegree ? '180/Math.PI*Math.atan(' : 'Math.atan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      const openCount = (sanitized.match(/\(/g) || []).length;
      const closeCount = (sanitized.match(/\)/g) || []).length;
      for (let i = 0; i < openCount - closeCount; i++) sanitized += ')';

      const result = eval(sanitized);
      const formattedResult = String(Number(result.toFixed(8))).replace(/\.?0+$/, '');
      
      setHistory(prev => [`${display} = ${formattedResult}`, ...prev].slice(0, 10));
      setExpression(display + ' =');
      setDisplay(formattedResult);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const backspace = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const func = (f: string) => {
    if (display === '0') setDisplay(`${f}(`);
    else setDisplay(prev => `${prev}${f}(`);
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="fixed inset-x-4 bottom-24 sm:inset-auto sm:bottom-10 sm:right-10 sm:w-[320px] bg-black border-[4px] border-white text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] z-[9999] flex flex-col overflow-hidden rounded-[24px]"
    >
      {/* Tab Switcher Header */}
      <div className="flex bg-white text-black border-b-[4px] border-white">
        <button onClick={() => setActiveTab('math')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'math' ? 'bg-black text-white' : 'hover:bg-slate-100'}`}>
          <Calculator size={14} /> Math
        </button>
        <button onClick={() => setActiveTab('currency')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'currency' ? 'bg-black text-white' : 'hover:bg-slate-100'}`}>
          <DollarSign size={14} /> Currency
        </button>
        <button onClick={onClose} className="px-4 border-l-2 border-black hover:bg-rose-500 hover:text-white transition-colors">
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'math' ? (
          <motion.div 
            key="math-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            {/* Display */}
            <div className="p-5 bg-black text-right min-h-[85px] flex flex-col justify-end border-b-[4px] border-white relative">
              <div className="text-[9px] font-black text-white/30 h-3 mb-1 truncate tabular-nums">{expression}</div>
              <div className="text-4xl font-black text-white overflow-x-auto whitespace-nowrap custom-scrollbar pb-1 tabular-nums">{display}</div>
              <button onClick={() => setShowHistory(!showHistory)} className="absolute top-2 left-2 text-[7px] font-black text-white/20 hover:text-white uppercase tracking-widest flex items-center gap-1">
                Logs {showHistory ? <ChevronDown size={8}/> : null}
              </button>
              {showHistory && (
                <div className="absolute inset-0 bg-black/95 z-20 p-4 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">History</span>
                    <button onClick={() => setShowHistory(false)}><X size={12}/></button>
                  </div>
                  <div className="space-y-2">
                    {history.map((h, i) => (
                      <div key={i} className="text-[10px] font-bold border-b border-white/5 pb-1 cursor-pointer hover:text-indigo-400 tabular-nums" onClick={() => { setDisplay(h.split(' = ')[1]); setShowHistory(false); }}>{h}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="p-1.5 grid grid-cols-5 gap-1 bg-white">
              {['sin', 'cos', 'tan', '(', ')', 'asin', 'acos', 'atan', 'π', 'e', 'log', 'ln', '√', 'x²', '^'].map((btn) => (
                <CalcBtn key={btn} label={btn} onClick={() => ['(', ')', 'π', 'e', '^'].includes(btn) ? append(btn) : btn === 'x²' ? append('^2') : func(btn.replace('√', 'sqrt'))} sm />
              ))}
              {['7', '8', '9', 'DEL', 'AC', '4', '5', '6', '*', '/', '1', '2', '3', '+', '-'].map((btn) => (
                <CalcBtn key={btn} label={btn} onClick={() => btn === 'DEL' ? backspace() : btn === 'AC' ? clear() : append(btn)} num={!isNaN(parseInt(btn))} action={isNaN(parseInt(btn))} />
              ))}
              <CalcBtn label="0" onClick={() => append('0')} num span={2} />
              <CalcBtn label="." onClick={() => append('.')} num />
              <CalcBtn label="ANS" onClick={() => history[0] && setDisplay(history[0].split(' = ')[1])} sm />
              <CalcBtn label="=" onClick={calculate} accent />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="currency-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-black flex flex-col gap-6"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Amount in Naira (NGN)</p>
              <input 
                type="number" 
                value={naira} 
                onChange={(e) => setNaira(e.target.value)} 
                className="w-full bg-white text-black p-4 rounded-xl font-black text-xl outline-none"
                placeholder="50,000"
              />
            </div>
            
            <div className="flex gap-2">
              {(['USD', 'GBP', 'EUR'] as const).map(c => (
                <button 
                  key={c} 
                  onClick={() => setCurrency(c)}
                  className={`flex-1 py-3 text-[10px] font-black border-2 border-white rounded-xl transition-all ${currency === c ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                <RefreshCw size={10} /> Estimated Conversion
              </p>
              <p className="text-4xl font-black tabular-nums">
                {naira ? (Number(naira) / rates[currency]).toFixed(2) : '0.00'}
                <span className="text-sm ml-2 text-indigo-400">{currency}</span>
              </p>
              <p className="text-[8px] font-black text-slate-600 mt-4 uppercase tracking-[0.2em]">Based on NGN Parallel Rate: {rates[currency]}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CalcBtn = ({ label, onClick, num, accent, action, span = 1, sm }: any) => (
  <button
    onClick={onClick}
    style={{ gridColumn: `span ${span}` }}
    className={`h-10 sm:h-11 rounded-lg text-[9px] font-black transition-all active:translate-y-0.5 border-[3px] border-black
      ${accent ? 'bg-black text-white' : action ? 'bg-indigo-50 text-black' : num ? 'bg-white text-black' : sm ? 'bg-slate-900 text-white text-[8px]' : 'bg-slate-800 text-white'}`}
  >
    {label}
  </button>
);

export default ScientificCalculator;
