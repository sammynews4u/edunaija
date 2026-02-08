
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProgress, PracticeMode, Question, ExamType } from '../types';
import { SUBJECTS } from '../constants';
import { QuestionProvider } from '../services/contentProvider';
import { getAIExplanation } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { RefreshCw, Zap, ShieldAlert } from 'lucide-react';

const PracticeEngine: React.FC<{ progress: UserProgress, isAdmin?: boolean }> = ({ progress, isAdmin = false }) => {
  const { subjectId, mode } = useParams();
  const navigate = useNavigate();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(mode === PracticeMode.CBT ? 3600 : 0);
  const [finished, setFinished] = useState(false);
  const [aiExplaining, setAiExplaining] = useState(false);
  const [aiExplanationMd, setAiExplanationMd] = useState<string | null>(null);
  
  // Question ID Offset
  const [repositoryOffset, setRepositoryOffset] = useState(Math.floor(Math.random() * 5000000));

  const loadQuestions = async (offset: number) => {
    setLoading(true);
    const data = await QuestionProvider.getMockQuestions(subjectId!, {
      examId: progress.selectedExam || ExamType.WAEC,
      year: 2024,
      offset: offset
    });
    setQuestions(data);
    setAnswers({});
    setCurrentIndex(0);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions(repositoryOffset);
  }, [subjectId, progress.selectedExam]);

  const handleRefreshRepository = () => {
    if (!isAdmin) return;
    const newOffset = repositoryOffset + 1000;
    setRepositoryOffset(newOffset);
    loadQuestions(newOffset);
  };

  useEffect(() => {
    if (mode === PracticeMode.CBT && timeLeft > 0 && !finished) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && mode === PracticeMode.CBT) setFinished(true);
  }, [timeLeft, mode, finished]);

  useEffect(() => {
    setAiExplanationMd(null);
  }, [currentIndex]);

  const handleFinish = () => setFinished(true);
  
  const handleAskAI = async () => {
    if (currentQ.explanation) {
      setAiExplanationMd(currentQ.explanation);
      return;
    }
    setAiExplaining(true);
    setAiExplanationMd(null);
    try {
      const explanation = await getAIExplanation(
        currentQ.prompt, 
        currentQ.options, 
        currentQ.options[currentQ.correctAnswer]
      );
      setAiExplanationMd(explanation || "Sorry, I couldn't explain this right now.");
    } catch (e) {
      setAiExplanationMd("Please check your internet connection.");
    } finally {
      setAiExplaining(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="w-24 h-24 border-8 border-indigo-100 border-t-indigo-600 animate-spin rounded-[40px] mb-10 shadow-2xl"></div>
      <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Setting Up Your Practice</h2>
      <p className="text-slate-500 font-black text-xs uppercase tracking-[0.3em]">Getting your questions ready...</p>
    </div>
  );

  const currentQ = questions[currentIndex];
  const hasAnswered = answers[currentQ.id] !== undefined;

  if (finished) {
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="bg-white p-12 md:p-24 rounded-[60px] border shadow-2xl text-center">
            <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center text-white text-4xl font-black mx-auto mb-10 shadow-2xl ${percentage >= 50 ? 'bg-emerald-500' : 'bg-rose-500'} animate-bounce`}>
              {percentage}%
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase">Practice Results</h1>
            <p className="text-slate-500 mb-12 font-medium text-lg italic">Subject: {subject?.name}</p>
            <div className="flex gap-6 justify-center">
               <button onClick={() => window.location.reload()} className="px-10 py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl">Try Again</button>
               <button onClick={() => navigate(`/dashboard`)} className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl">Back to Study Room</button>
            </div>
        </div>
      </div>
    );
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8 border-slate-100">
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{subject?.name} <span className="text-indigo-600">Practice Session</span></h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
               <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                 Question ID: {repositoryOffset + currentIndex}
               </p>
               {isAdmin && (
                 <button 
                    onClick={handleRefreshRepository}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-[8px] font-black uppercase transition-all border border-amber-200"
                 >
                    <RefreshCw size={10} /> Reset Questions
                 </button>
               )}
            </div>
         </div>
         {mode === PracticeMode.CBT && (
            <div className={`px-10 py-5 rounded-[32px] font-mono text-3xl font-black border-4 transition-all ${timeLeft < 300 ? 'border-rose-500 text-rose-500 animate-pulse bg-rose-50' : 'border-slate-100 text-slate-900 bg-white shadow-2xl shadow-slate-200/50'}`}>
               {formatTime(timeLeft)}
            </div>
         )}
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div className="bg-white p-10 md:p-16 rounded-[60px] border border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-center mb-12">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Question {currentIndex + 1} of {questions.length}</span>
               <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified Question</span>
               </div>
            </div>

            <div className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-12 tracking-tight syllabus-content prose">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {currentQ.prompt}
              </ReactMarkdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentQ.id] === i;
                const isCorrect = currentQ.correctAnswer === i;
                const showFeedback = mode === PracticeMode.QUIZ && hasAnswered;

                let classes = 'border-slate-50 bg-slate-50/50 hover:bg-white';
                if (showFeedback) {
                  if (isCorrect) classes = 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-100';
                  else if (isSelected) classes = 'border-rose-500 bg-rose-50 text-rose-900 shadow-lg shadow-rose-100';
                } else if (isSelected) {
                  classes = 'border-indigo-500 bg-indigo-50 shadow-xl shadow-indigo-100';
                }

                return (
                  <button
                    key={i}
                    disabled={mode === PracticeMode.QUIZ && hasAnswered}
                    onClick={() => setAnswers({ ...answers, [currentQ.id]: i })}
                    className={`flex items-center gap-6 p-8 rounded-[32px] border-4 transition-all text-left group/opt ${classes}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-xl transition-all ${
                      showFeedback && isCorrect ? 'bg-emerald-500 text-white border-emerald-600' :
                      showFeedback && isSelected ? 'bg-rose-500 text-white border-rose-600' :
                      isSelected ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg' : 
                      'border-slate-200 text-slate-400 bg-white group-hover/opt:border-indigo-200'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="font-bold text-lg text-slate-800 tracking-tight prose-sm">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{opt}</ReactMarkdown>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-6">
            <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(c => c - 1)} className="px-10 py-5 text-slate-400 font-black uppercase tracking-widest text-[10px] disabled:opacity-30 hover:text-slate-900 transition-colors">Previous</button>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => { const next = new Set(flags); if (next.has(currentQ.id)) next.delete(currentQ.id); else next.add(currentQ.id); setFlags(next); }} className={`px-10 py-5 font-black uppercase tracking-widest text-[10px] rounded-3xl transition-all border-2 ${flags.has(currentQ.id) ? 'bg-amber-600 text-white border-amber-700 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}>
                {flags.has(currentQ.id) ? 'Remove Flag' : 'Flag Question'}
              </button>
              {currentIndex === questions.length - 1 ? (
                <button onClick={handleFinish} className="px-12 py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl animate-pulse">Finish Test</button>
              ) : (
                <button onClick={() => setCurrentIndex(c => c + 1)} className="px-12 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl">Next Question</button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96 space-y-8">
          <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-2xl">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 border-b pb-4">Test Progress</h3>
            <div className="grid grid-cols-5 gap-3">
               {questions.map((q, idx) => {
                 let colorClass = 'bg-slate-50 text-slate-400 border-slate-50';
                 if (flags.has(q.id)) colorClass = 'bg-amber-500 text-white border-amber-600';
                 else if (answers[q.id] !== undefined) {
                   if (mode === PracticeMode.QUIZ) {
                     colorClass = answers[q.id] === q.correctAnswer ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600';
                   } else {
                     colorClass = 'bg-slate-900 text-white border-slate-900';
                   }
                 }
                 
                 return (
                   <button key={idx} onClick={() => setCurrentIndex(idx)} className={`aspect-square rounded-2xl text-[10px] font-black transition-all border-2 ${currentIndex === idx ? 'ring-4 ring-indigo-500/20 border-indigo-500' : ''} ${colorClass}`}>
                     {idx + 1}
                   </button>
                 );
               })}
            </div>
          </div>

          <div className="bg-slate-900 p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
               <h3 className="font-black text-2xl mb-6 flex items-center gap-4 tracking-tighter uppercase">
                 <span className="w-12 h-12 bg-white/10 rounded-[20px] flex items-center justify-center text-xl shadow-inner">💡</span>
                 AI Teacher
               </h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">Need help understanding why an answer is correct? Get a clear explanation here.</p>
               
               {(aiExplanationMd || (mode === PracticeMode.QUIZ && hasAnswered && currentQ.explanation)) && (
                 <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[40px] text-sm text-slate-200 leading-relaxed mb-8 border border-white/5 shadow-inner overflow-hidden custom-scrollbar max-h-96 prose prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {aiExplanationMd || currentQ.explanation || ""}
                    </ReactMarkdown>
                 </div>
               )}

               <button 
                onClick={handleAskAI} 
                disabled={aiExplaining || (mode === PracticeMode.QUIZ && hasAnswered && !!currentQ.explanation && !aiExplanationMd)} 
                className={`w-full py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  mode === PracticeMode.QUIZ && hasAnswered && currentQ.explanation && !aiExplanationMd ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 hover:bg-emerald-500 hover:text-white'
                }`}
               >
                 {aiExplaining ? 'Thinking...' : (mode === PracticeMode.QUIZ && hasAnswered && currentQ.explanation && !aiExplanationMd) ? 'Show Explanation' : 'Explain This to Me'}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeEngine;
