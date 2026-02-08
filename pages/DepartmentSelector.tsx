
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamType, DepartmentType } from '../types';

interface DepartmentSelectorProps {
  selectedExam: ExamType | null;
  onSelectDept: (dept: DepartmentType) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ selectedExam, onSelectDept }) => {
  const navigate = useNavigate();

  if (!selectedExam) {
    navigate('/');
    return null;
  }

  const handleSelect = (dept: DepartmentType) => {
    onSelectDept(dept);
    navigate('/subjects');
  };

  const departments = [
    { 
        type: DepartmentType.SCIENCE, 
        icon: '🧬', 
        desc: 'For future Doctors, Engineers, and Scientists.',
        subjects: 'Physics, Chemistry, Biology, Further Maths...' 
    },
    { 
        type: DepartmentType.ART, 
        icon: '🎭', 
        desc: 'For future Lawyers, Writers, and Diplomats.',
        subjects: 'Literature, Government, CRS/IRS, History...' 
    },
    { 
        type: DepartmentType.COMMERCIAL, 
        icon: '📈', 
        desc: 'For future Accountants, CEOs, and Economists.',
        subjects: 'Accounting, Commerce, Economics, Office Practice...' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12 text-center">
        <span className="inline-block py-1 px-3 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase mb-4">Step 2: Department</span>
        <h2 className="text-3xl font-bold text-slate-900">What is your area of study?</h2>
        <p className="text-slate-600 mt-2">We'll recommend subjects based on your chosen track for {selectedExam}.</p>
      </div>

      <div className="space-y-4">
        {departments.map((dept) => (
          <button
            key={dept.type}
            onClick={() => handleSelect(dept.type)}
            className="w-full flex items-center gap-6 p-6 bg-white border-2 border-slate-100 hover:border-emerald-600 rounded-2xl transition-all group text-left"
          >
            <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
              {dept.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{dept.type}</h3>
              <p className="text-slate-500 text-sm mb-1">{dept.desc}</p>
              <p className="text-xs text-slate-400 font-medium">Core: {dept.subjects}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Change Exam Type
        </button>
      </div>
    </div>
  );
};

export default DepartmentSelector;
