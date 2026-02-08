
import React, { useState } from 'react';
import { UserProgress, UserProfile } from '../types';
import { User, School, Shield, Mail, Lock, Phone, Calendar, MapPin, Target, BookOpen, Save, Edit3, X, Eye, EyeOff } from 'lucide-react';

interface ProfileProps {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  isAdmin?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ progress, updateProgress, isAdmin = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(progress.profile);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      updateProgress({ profile: formData });
      setIsEditing(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const initials = formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'C';

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {isAdmin && (
        <div className="mb-10 p-6 bg-rose-950/20 border-2 border-rose-600 rounded-[32px] flex items-center justify-between text-rose-500 shadow-2xl">
           <div className="flex items-center gap-4">
              <Shield size={24} className="animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Admin Mode Active</p>
           </div>
        </div>
      )}

      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex-1">
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-4">My <span className="text-indigo-600">Profile</span>.</h1>
           <p className="text-slate-500 font-bold text-xl italic max-w-2xl">Update your personal and school details.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {isEditing ? (
            <>
              <button 
                onClick={() => { setIsEditing(false); setFormData(progress.profile); }}
                className="px-10 py-5 rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all bg-white border-2 border-slate-900 text-slate-400 hover:bg-slate-50 flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="px-12 py-5 bg-emerald-600 text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl hover:bg-emerald-700 disabled:opacity-50"
              >
                {saveStatus === 'saving' ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : <><Save size={16} /> Save Changes</>}
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-12 py-5 bg-black text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl hover:bg-indigo-600"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-black p-12 rounded-[40px] text-white shadow-3xl relative overflow-hidden group border-4 border-slate-800">
              <div className="relative z-10">
                 <div className="w-28 h-28 bg-white/10 rounded-[40px] border-2 border-white/20 flex items-center justify-center text-5xl font-black mb-10 shadow-inner group-hover:scale-105 transition-transform">
                   {initials}
                 </div>
                 <h2 className="text-3xl font-black mb-2 tracking-tight uppercase leading-none">{formData.fullName}</h2>
                 <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-12">{progress.subscription} Member</p>
                 
                 <div className="space-y-6 pt-10 border-t border-white/10">
                    <StatItem label="Subjects" value={`${progress.selectedSubjects.length} Active`} />
                    <StatItem label="Joined" value="2025" />
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
           <section className="bg-white p-12 rounded-[40px] border-2 border-black shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-12 border-b-2 border-slate-100 pb-6">
                <User size={20} className="text-indigo-600" />
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <FormField label="Full Name" name="fullName" value={formData.fullName} editing={isEditing} onChange={handleChange} icon={<User size={16}/>} />
                 <FormField label="Date of Birth" name="dob" type="date" value={formData.dob} editing={isEditing} onChange={handleChange} icon={<Calendar size={16}/>} />
                 <FormField label="Gender" name="gender" value={formData.gender} editing={isEditing} onChange={handleChange} select={['Male', 'Female']} icon={<Shield size={16}/>} />
                 <FormField label="Phone Number" name="phone" value={formData.phone} editing={isEditing} onChange={handleChange} placeholder="0803XXXXXXX" icon={<Phone size={16}/>} />
              </div>
           </section>

           <section className="bg-white p-12 rounded-[40px] border-2 border-black shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-12 border-b-2 border-slate-100 pb-6">
                <School size={20} className="text-emerald-600" />
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Academic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <FormField label="School Name" name="schoolName" value={formData.schoolName} editing={isEditing} onChange={handleChange} icon={<School size={16}/>} />
                 <FormField label="Current Class" name="studyLevel" value={formData.studyLevel} editing={isEditing} onChange={handleChange} select={['SS1', 'SS2', 'SS3', 'JAMB-Prep']} icon={<Target size={16}/>} />
                 <FormField label="Target Institution" name="targetInstitution" value={formData.targetInstitution} editing={isEditing} onChange={handleChange} icon={<Target size={16}/>} />
                 <FormField label="Target Course" name="targetCourse" value={formData.targetCourse} editing={isEditing} onChange={handleChange} icon={<BookOpen size={16}/>} />
              </div>
           </section>

           <section className="bg-slate-900 p-12 rounded-[40px] text-white shadow-3xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-6">
                <Lock size={20} className="text-indigo-400" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Account Login</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <FormField label="Email" name="email" value={formData.email} editing={isEditing} onChange={handleChange} dark icon={<Mail size={16}/>} />
                 <div className="space-y-3 group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-500"><Lock size={16} /></span>
                      <label className="text-[9px] font-black uppercase tracking-widest block text-slate-500">Password</label>
                    </div>
                    {isEditing ? (
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password || ''}
                          onChange={handleChange}
                          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 text-sm font-bold text-white focus:ring-4 focus:ring-indigo-600/20 outline-none"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl text-sm font-black tracking-tight bg-white/5 border-2 border-white/5 text-white">
                        ••••••••
                      </div>
                    )}
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: any) => (
  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
    <span>{label}</span>
    <span className="text-white font-bold">{value}</span>
  </div>
);

const FormField = ({ label, name, value, editing, onChange, type = "text", placeholder = "", select, dark, icon }: any) => {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center gap-2 mb-1">
        <span className={dark ? 'text-slate-500' : 'text-indigo-400'}>{icon}</span>
        <label className={`text-[9px] font-black uppercase tracking-widest block ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</label>
      </div>
      {editing ? (
        select ? (
          <select 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            className={`w-full rounded-2xl p-5 text-sm font-bold border-2 transition-all focus:ring-4 ${dark ? 'bg-white/5 text-white border-white/10 focus:ring-indigo-600/20' : 'bg-white text-slate-900 border-slate-900 focus:ring-black/10'}`}
          >
            <option value="">Select</option>
            {select.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type={type} 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            placeholder={placeholder}
            className={`w-full rounded-2xl p-5 text-sm font-bold border-2 transition-all focus:ring-4 ${dark ? 'bg-white/5 text-white border-white/10 focus:ring-indigo-600/20' : 'bg-white text-slate-900 border-slate-900 focus:ring-black/10'}`}
          />
        )
      ) : (
        <div className={`p-5 rounded-2xl text-sm font-black tracking-tight border-2 ${dark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-50 text-slate-900'}`}>
          {value || <span className="text-slate-300 italic">Not set</span>}
        </div>
      )}
    </div>
  );
};

export default Profile;
