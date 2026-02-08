import React, { useState } from 'react';
import { Mail, Phone, Globe, Send, CheckCircle2, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* Header */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-4 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Mail size={14} />
            Academic Liaison
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 uppercase leading-[0.9]">
            Get In <span className="text-indigo-600">Touch</span>.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Direct communication channel for scholars, parents, and institutional partners."
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 p-12 rounded-[60px] text-white shadow-3xl relative overflow-hidden group">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-10">Direct Contact</h3>
                
                <div className="space-y-10 relative z-10">
                  <ContactItem 
                    icon={<Mail className="text-indigo-400" />} 
                    label="Email Address" 
                    value="me@samueloadesanya.com.ng" 
                    href="mailto:me@samueloadesanya.com.ng"
                  />
                  <ContactItem 
                    icon={<Phone className="text-indigo-400" />} 
                    label="Call or WhatsApp" 
                    value="07037334371" 
                    href="tel:07037334371"
                  />
                  <ContactItem 
                    icon={<Globe className="text-indigo-400" />} 
                    label="Official Portfolio" 
                    value="samueloadesanya.com.ng" 
                    href="https://samueloadesanya.com.ng"
                    external
                  />
                  <ContactItem 
                    icon={<MapPin className="text-indigo-400" />} 
                    label="Headquarters" 
                    value="Lagos, Nigeria" 
                  />
                </div>
                
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mb-32"></div>
              </div>

              <div className="p-10 bg-indigo-50 rounded-[48px] border border-indigo-100">
                <p className="text-sm font-bold text-indigo-900 leading-relaxed italic">
                  "As the lead engineer, I personally oversee critical support requests to ensure the Million-Scale archive remains at peak performance."
                </p>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-4">Samuel O. Adesanya</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-12 md:p-16 rounded-[60px] border border-slate-100 shadow-xl">
                {status === 'sent' ? (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Message Synced!</h2>
                    <p className="text-slate-500 font-medium mb-10">Our academic liaison will respond within 1.2 minutes.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-10 py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
                    >
                      Send Another Directive
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-10">Send a <span className="text-indigo-600">Directive</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-600/10 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          placeholder="scholar@example.com"
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-600/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                      <input 
                        required
                        type="text" 
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                        placeholder="e.g. Question Bank Access Error"
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-600/10 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Detail</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we assist your scholarship?"
                        className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-bold focus:ring-4 focus:ring-indigo-600/10 transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full py-6 bg-slate-900 text-white rounded-[32px] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-50"
                    >
                      {status === 'sending' ? (
                        <div className="w-5 h-5 border-3 border-slate-400 border-t-white animate-spin rounded-full"></div>
                      ) : (
                        <>Transmit Message <Send size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactItem = ({ icon, label, value, href, external }: { icon: React.ReactNode, label: string, value: string, href?: string, external?: boolean }) => {
  const content = (
    <div className="flex items-center gap-6 group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:border-indigo-500 shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
};

export default Contact;