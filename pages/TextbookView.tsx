
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { SUBJECTS, SYLLABUS_TOPICS } from '../constants';
import { getSyllabusContent, getSubNodes } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { RefreshCw, BookOpen, Clock, Sparkles, ChevronLeft, Edit3, Trash2, Save, ArrowRight, Zap, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TextbookView: React.FC = () => {
  const { subjectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  
  const [selectedNode, setSelectedNode] = useState<{id: string, name: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [sources, setSources] = useState<any[]>([]);
  const [subNodes, setSubNodes] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Note state
  const [notes, setNotes] = useState('');
  const [showNotepad, setShowNotepad] = useState(false);

  useEffect(() => {
    const nodeName = searchParams.get('topic');
    const nodeId = searchParams.get('nodeId') || 'ROOT-001';
    
    if (nodeName) {
      setSelectedNode({ id: nodeId, name: nodeName });
    } else {
      const defaultTopic = SYLLABUS_TOPICS[subjectId || '']?.[0] || 'Introduction';
      setSelectedNode({ id: 'ROOT-001', name: defaultTopic });
    }
  }, [searchParams, subjectId]);

  useEffect(() => {
    if (selectedNode && subject) {
      loadContent();
      loadNavigationNodes();
    }
  }, [selectedNode, subject]);

  const loadContent = async () => {
    setLoading(true);
    setMarkdownContent("");
    setSources([]);
    try {
      await getSyllabusContent(subjectId!, selectedNode!.name, (text, src) => {
        setMarkdownContent(text);
        setSources(src);
        setLoading(false);
      });
    } catch (e) {
      setMarkdownContent("### Sync Error\n\nFailed to fetch board data for this node. Please check your connection.");
      setLoading(false);
    }
  };

  const loadNavigationNodes = async () => {
    setIsSyncing(true);
    try {
      const result = await getSubNodes(subjectId!, selectedNode!.name);
      setSubNodes(result.nodes || []);
    } catch (e) {
      setSubNodes([]);
    } finally {
      setIsSyncing(false);
    }
  };

  if (!subject) return <div className="p-20 text-center uppercase font-black">Library Node Not Found</div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      {/* 1,000,000-NODE NAVIGATION BAR */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-50 h-20 flex items-center px-6 gap-6">
        <Link to={`/subject/${subject.id}`} className="p-3 bg-black text-white rounded-xl hover:rotate-6 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <div className="flex-1">
          <p className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.3em]">Node: {selectedNode?.id}</p>
          <h1 className="text-sm font-black uppercase truncate max-w-xs md:max-w-md">{selectedNode?.name}</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowNotepad(!showNotepad)}
            className={`p-3 rounded-xl border-4 border-black transition-all ${showNotepad ? 'bg-indigo-600 text-white' : 'bg-white text-black'}`}
          >
            <Edit3 size={18} />
          </button>
          <button onClick={loadContent} className="p-3 bg-black text-white rounded-xl border-4 border-black hover:bg-indigo-600">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SYLLABUS EXPLORER (Deep Search) */}
        <aside className="w-[320px] bg-white border-r-4 border-black hidden xl:flex flex-col p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div className="p-5 bg-slate-900 text-white rounded-[32px] border-4 border-black">
               <div className="flex items-center gap-3 mb-4">
                  <Globe size={16} className="text-indigo-400" />
                  <h2 className="text-[10px] font-black uppercase tracking-widest">Board Sync</h2>
               </div>
               <p className="text-[10px] text-slate-400 font-bold italic leading-relaxed">
                 Every node is cross-referenced with 2025 WAEC/JAMB guidelines in real-time.
               </p>
            </div>

            <div className="space-y-2">
               <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest px-2">Sub-concepts in this Module</h3>
               {subNodes.length > 0 ? subNodes.map((node, i) => (
                 <button 
                  key={node.id}
                  onClick={() => {
                    setSearchParams({ nodeId: node.id, topic: node.name });
                    setSelectedNode(node);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left p-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-indigo-50 transition-all group"
                 >
                   <p className="text-[8px] font-black text-indigo-600 uppercase mb-1">{node.id}</p>
                   <p className="text-[10px] font-black uppercase group-hover:translate-x-1 transition-transform">{node.name}</p>
                 </button>
               )) : (
                 <div className="py-10 text-center animate-pulse">
                   <p className="text-[9px] font-black uppercase text-black/10">Calculating Neural Nodes...</p>
                 </div>
               )}
            </div>
          </div>
        </aside>

        {/* MAIN TEXTBOOK BODY */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-20 relative bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Board Verification Evidence */}
            {sources.length > 0 && (
              <div className="mb-12 p-6 bg-emerald-50 border-4 border-black rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 border-2 border-black">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase">Verified Board Source</h3>
                    <p className="text-[10px] font-bold text-emerald-800 italic">Content grounded in 2025 curriculum news.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {sources.slice(0, 2).map((s, idx) => (
                    s.web && (
                      <a 
                        key={idx} 
                        href={s.web.uri} 
                        target="_blank" 
                        className="p-3 bg-white border-2 border-black rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-black hover:text-white transition-all"
                      >
                        <ExternalLink size={12} /> Board Link
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-48 text-center">
                 <div className="w-16 h-16 border-8 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-8"></div>
                 <p className="text-slate-400 font-black uppercase tracking-[0.4em] animate-pulse">Accessing Scholastic Cloud...</p>
              </div>
            ) : (
              <article className="prose syllabus-content max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-black uppercase border-b-8 border-black pb-4 mt-20 mb-8" {...props} />,
                    p: ({node, ...props}) => <p className="text-base text-slate-800 font-bold leading-relaxed mb-8" {...props} />,
                    li: ({node, ...props}) => (
                      <li className="p-4 bg-slate-50 border-4 border-black rounded-2xl mb-4 font-bold list-none flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 bg-indigo-600 rounded-full shrink-0" />
                        <div>{props.children}</div>
                      </li>
                    )
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>

                {/* DYNAMIC NEXT NODE EXPLORER */}
                <div className="mt-32 p-12 bg-slate-950 text-white rounded-[60px] border-8 border-black shadow-[16px_16px_0px_0px_rgba(79,70,229,1)]">
                   <header className="mb-12">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 block mb-4">Procedural Path Expansion</span>
                     <h3 className="text-4xl font-black uppercase tracking-tight leading-none">Explore Next <span className="text-indigo-400">Nodes</span>.</h3>
                   </header>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {subNodes.map((node, i) => (
                       <button 
                        key={node.id}
                        onClick={() => {
                          setSearchParams({ nodeId: node.id, topic: node.name });
                          setSelectedNode(node);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-6 bg-white/5 border-2 border-white/10 rounded-3xl text-left hover:bg-white hover:text-black transition-all flex items-center justify-between group"
                       >
                         <div>
                            <p className="text-[8px] font-black uppercase text-indigo-400 mb-1">{node.id}</p>
                            <p className="text-xs font-black uppercase tracking-widest">{node.name}</p>
                         </div>
                         <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                       </button>
                     ))}
                   </div>
                </div>

                <div className="h-64"></div>
              </article>
            )}
          </div>
        </main>

        {/* DRAGGABLE NOTEPAD OVERLAY */}
        <AnimatePresence>
          {showNotepad && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-[380px] bg-white border-l-4 border-black flex flex-col hidden lg:flex"
            >
              <header className="p-6 border-b-4 border-black bg-indigo-50 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase">Scholar Notes</h3>
                <button onClick={() => setShowNotepad(false)}><Zap size={18}/></button>
              </header>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write key syllabus points here..."
                className="flex-1 p-8 bg-slate-50 text-sm font-bold outline-none resize-none"
              />
              <footer className="p-6 border-t-4 border-black flex justify-between">
                <button className="text-[10px] font-black uppercase text-rose-500">Clear</button>
                <button className="text-[10px] font-black uppercase text-emerald-600">Sync Cloud</button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TextbookView;
