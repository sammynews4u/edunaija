
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserProgress } from '../types';
import { Mail, Lock, LogIn, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (updates: Partial<UserProgress>) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const globalRegistry = JSON.parse(localStorage.getItem('edunaija_global_registry') || '[]');
    const user = globalRegistry.find((u: any) => u.profile.email === email && u.profile.password === password);

    setTimeout(() => {
      if (user) {
        onLogin({
          ...user,
          onboarded: true
        });
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white rounded-[40px] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 md:p-14 relative overflow-hidden">
          <div className="relative z-10">
            <header className="text-center mb-10">
              <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                <LogIn size={28} />
              </div>
              <h1 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">Student Login</h1>
              <p className="text-black font-medium text-sm">Access your academic dashboard</p>
            </header>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-black">
                    <Mail size={18} />
                  </div>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border-4 border-black rounded-2xl pl-14 pr-6 py-4 text-sm font-bold focus:bg-slate-50 outline-none text-black transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-black">
                    <Lock size={18} />
                  </div>
                  <input 
                    required
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border-4 border-black rounded-2xl pl-14 pr-12 py-4 text-sm font-bold focus:bg-slate-50 outline-none text-black transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:scale-110 transition-transform"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-rose-50 border-4 border-rose-500 rounded-2xl text-rose-600 animate-in shake duration-300">
                  <AlertCircle size={16} className="shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-black text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest border-4 border-black shadow-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <>Sign In Now <ChevronRight size={14} /></>
                )}
              </button>
            </form>

            <footer className="mt-10 text-center">
              <p className="text-black text-xs font-bold">New scholar? <Link to="/onboarding" className="underline font-black">Create Account</Link></p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
