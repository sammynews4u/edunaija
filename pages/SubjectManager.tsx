
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProgress, Subject, DepartmentType } from '../types';
import { SUBJECTS } from '../constants';

interface SubjectManagerProps {
  progress: UserProgress;
  onUpdateSubjects: (ids: string[]) => void;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({ progress, onUpdateSubjects }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!progress.selectedDept) return;
    // Initial auto-selection based on department
    const recommended = SUBJECTS.filter(s => 
      s.isCompulsory || s.departments.includes(progress.selectedDept!)
    ).map(s => s.id);
    setSelected(recommended);
  }, [progress.selectedDept]);

  const toggleSubject = (id: string) => {
    const s = SUBJECTS.find(subj => subj.id === id);
    if (s?.isCompulsory) return; // Can't remove compulsory

    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    onUpdateSubjects(selected);
    navigate('/dashboard');
  };

  if (!progress.selectedDept) {
    navigate('/department');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12 text-center">
        <span className="inline-block py-1 px-3 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase mb-4">Step 3: Subjects</span>
        <h2 className="text-3xl font-bold text-slate-900">Your Study Bundle</h2>
        <p className="text-slate-600 mt-2">Customize the subjects you want to focus on for your exam.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((subject) => {
            const isSelected = selected.includes(subject.id);
            const isRelevant = subject.departments.includes(progress.selectedDept!) || subject.isCompulsory;
            
            return (
              <div 
                key={subject.id}
                onClick={() => toggleSubject(subject.id)}
                className={`
                  relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-300'}
                  ${!isRelevant && !isSelected ? 'opacity-60' : 'opacity-100'}
                `}
              >
                <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-slate-200'}`}>
                        {isSelected && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <div>
                        <span className="font-semibold block">{subject.name}</span>
                        {subject.isCompulsory && <span className="text-[10px] uppercase font-bold text-emerald-600">Compulsory</span>}
                        {!subject.isCompulsory && !isRelevant && <span className="text-[10px] uppercase font-bold text-slate-400">Elective</span>}
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
            <div className="text-slate-500 text-sm">
                Selected <strong>{selected.length} subjects</strong> for your <strong>{progress.selectedExam}</strong> journey.
            </div>
            <button 
                onClick={handleFinish}
                className="w-full md:w-auto px-10 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
            >
                Confirm and Start Studying
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectManager;
