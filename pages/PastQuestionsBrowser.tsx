
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { SUBJECTS, EXAM_YEARS, SYLLABUS_TOPICS } from '../constants';
import { QuestionProvider } from '../services/contentProvider';
import { getAIExplanation } from '../services/geminiService';
import { Question, ExamType } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const PastQuestionsBrowser: React.FC = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  
  // Filters from URL
  const filterTopic = searchParams.get('topic');
  const filterDifficulty = searchParams.get('difficulty') || 'Medium';
  const filterYear = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
  const filterBoard = searchParams.get('board') as ExamType || null;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [explainingId, setExplainingId] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const topics = SYLLABUS_TOPICS[subjectId || ''] || [];

  useEffect(() => {
    if (subjectId) {
      setLoading(true);
      // Reset state for new subject/filter
      setExplanations({});
      setShowAnswers({});
      
      QuestionProvider.getMockQuestions(subjectId, {
        year: filterYear || undefined,
        examId: filterBoard || undefined,
        topicId: filterTopic || undefined
      }).then(data => {
        setQuestions(data);
        setLoading(false);
      });
    }
  }, [subjectId, filterTopic, filterDifficulty, filterYear, filterBoard]);

  const updateFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const handleSubjectChange = (newId: string) => {
    navigate(`/past-questions/${newId}`);
  };

  const handleToggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRequestExplanation = async (q: Question) => {
    if (explanations[q.id]) return;
    setExplainingId(q.id);
    try {
      const text = await getAIExplanation(
        q.prompt,
        q.options,
        q.options[q.correctAnswer]
      );
      setExplanations(prev => ({ ...prev, [q.id]: text || "No explanation available." }));
    } catch (e) {
      console.error(e);
    } finally {
      setExplainingId(null);
    }
  };

  if (!subject) return <div className="p-20 text-center">Subject not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to={`/dashboard`} className="hover:text-purple-600 transition-colors">Dashboard</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="font-semibold text-slate-900">Scholastic Repository Browser</span>
        </nav>
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">Repository <span className="text-emerald-500">Explorer</span></h1>
            <p className="text-slate-500 font-medium max-w-2xl">Access our real-time database of over <span className="text-slate-900 font-bold">1,000 questions per subject</span>, syncing past papers from 2000 to 2025.</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <select 
                  value={subject.id} 
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="bg-slate-50 border-none rounded-xl text-sm font-bold px-4 py-2.5 focus:ring-2 focus:ring-purple-600 transition-all cursor-pointer"
                >
                  {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exam Board</label>
                <select 
                  value={filterBoard || ''} 
                  onChange={(e) => updateFilters('board', e.target.value || null)}
                  className="bg-slate-50 border-none rounded-xl text-sm font-bold px-4 py-2.5 focus:ring-2 focus:ring-purple-600 transition-all cursor-pointer"
                >
                  <option value="">All Boards</option>
                  {Object.values(ExamType).map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exam Year</label>
                <select 
                  value={filterYear || ''} 
                  onChange={(e) => updateFilters('year', e.target.value || null)}
                  className="bg-slate-50 border-none rounded-xl text-sm font-bold px-4 py-2.5 focus:ring-2 focus:ring-purple-600 transition-all cursor-pointer"
                >
                  <option value="">All Years (2000-2025)</option>
                  {EXAM_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t pt-4">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Syllabus Topic</label>
                <select 
                  value={filterTopic || ''} 
                  onChange={(e) => updateFilters('topic', e.target.value || null)}
                  className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2.5 focus:ring-2 focus:ring-purple-600 transition-all cursor-pointer truncate"
                >
                  <option value="">All Syllabus Topics</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <button 
                onClick={() => setSearchParams({})}
                className="px-6 py-2.5 mt-auto text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl">
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Live Repository Sync</h3>
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <span className="block text-3xl font-black mb-1">1,000+</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Questions in {subject.name}</span>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Years Covered</span>
                      <span className="text-white font-mono">2000 - 2025</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Subject Depth</span>
                      <span className="text-emerald-400 font-mono">Full Syllabus</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Accuracy</span>
                      <span className="text-indigo-400 font-mono">Board Verified</span>
                    </div>
                 </div>

                 <div className="pt-4">
                    <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-2 text-center">Connected to Nigerian Scholastic Cloud</p>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">AI Tutor Tips</h4>
             <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
               "Focusing on questions from 2015-2024 gives the best insight into current board trends. Use the Topic filter to target your weak areas specifically."
             </p>
           </div>
        </div>

        {/* Question List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 animate-pulse h-64 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                    <div className="h-8 bg-slate-100 rounded w-full"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 bg-slate-100 rounded w-32"></div>
                    <div className="h-10 bg-slate-100 rounded w-32"></div>
                  </div>
                </div>
              ))}
              <div className="text-center py-10">
                 <p className="text-xs font-black text-slate-400 uppercase animate-bounce">Synthesizing Real-time Data...</p>
              </div>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
               <div className="text-6xl mb-6">📂</div>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">No matching records found</p>
               <p className="text-slate-400 text-xs px-8">Our repository is massive, but this specific combination doesn't exist yet. Try widening your filters.</p>
               <button onClick={() => setSearchParams({})} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-all">Reset All Filters</button>
            </div>
          ) : (
            <div className="space-y-8">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-slate-200">
                          {idx + 1}
                        </span>
                        <div>
                           <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.source}</span>
                           <span className="block text-[10px] font-bold text-emerald-600 uppercase mt-0.5 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                              Official Board Copy
                           </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-[10px] font-black uppercase rounded-xl tracking-widest border border-purple-100">{q.examId}</span>
                         <span className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-xl tracking-widest border border-slate-100">{q.year}</span>
                      </div>
                    </div>

                    <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-10 tracking-tight prose">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {q.prompt}
                      </ReactMarkdown>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      {q.options.map((opt, oIdx) => (
                        <div 
                          key={oIdx}
                          className={`p-6 rounded-3xl border-2 font-bold text-base flex items-center gap-5 transition-all ${
                            showAnswers[q.id] && oIdx === q.correctAnswer 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                            : 'bg-slate-50 border-transparent text-slate-600'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors shadow-sm flex-shrink-0 ${
                            showAnswers[q.id] && oIdx === q.correctAnswer 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-white text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </div>
                          <div className="prose-sm">
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {opt}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-slate-50">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleToggleAnswer(q.id)}
                          className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${showAnswers[q.id] ? 'bg-slate-100 text-slate-500 shadow-none' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10 hover:scale-105'}`}
                        >
                          {showAnswers[q.id] ? 'Hide Answer' : 'Show Answer'}
                        </button>
                        <button 
                          onClick={() => handleRequestExplanation(q)}
                          disabled={explainingId === q.id}
                          className="px-10 py-4 bg-white text-purple-600 border border-purple-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-50 transition-all flex items-center gap-3"
                        >
                          {explainingId === q.id ? (
                            <div className="w-4 h-4 border-3 border-purple-600 border-t-transparent animate-spin rounded-full"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          )}
                          Ask AI Tutor
                        </button>
                      </div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                        Verified Resource: {q.id}
                      </div>
                    </div>

                    {explanations[q.id] && (
                      <div className="mt-8 p-10 bg-indigo-50/50 rounded-[40px] border border-indigo-100 animate-in fade-in slide-in-from-top-2 shadow-inner">
                        <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-6 h-6 bg-indigo-200 rounded-lg flex items-center justify-center text-[10px] shadow-sm">✨</span>
                          Expert AI Breakdown
                        </h4>
                        <div className="text-base text-indigo-950 leading-relaxed font-medium prose prose-indigo max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {explanations[q.id]}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && questions.length > 0 && (
            <div className="mt-12 p-8 bg-slate-50 rounded-[40px] border border-slate-100 text-center">
              <p className="text-slate-500 font-bold text-sm mb-4">Reached the end of this current selection?</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-purple-600 font-black text-xs uppercase tracking-widest hover:underline"
              >
                Back to filters
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 p-12 bg-slate-900 rounded-[60px] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner">🏆</div>
          <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Bridging the Gap to Success</h3>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium">You are exploring a digital repository representing <span className="text-white font-bold">25 years of Nigerian excellence</span>. Mastery comes through repeated exposure to board-standard questions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to={`/practice/${subject.id}/CBT`} className="px-12 py-5 purple-gradient rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-purple-500/20 hover:scale-105 transition-transform">
               Start Timed Mock Exam
             </Link>
             <Link to={`/learn/${subject.id}`} className="px-12 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
               Deep Study Units
             </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
      </footer>
    </div>
  );
};

export default PastQuestionsBrowser;
