
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamType } from '../types';

interface HomeProps {
  onSelectExam: (exam: ExamType) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectExam }) => {
  const navigate = useNavigate();

  const handleSelect = (exam: ExamType) => {
    onSelectExam(exam);
    navigate('/department');
  };

  const exams = [
    { type: ExamType.JAMB, title: 'JAMB UTME', subtitle: 'University Entrance', color: 'bg-emerald-600' },
    { type: ExamType.WAEC, title: 'WAEC SSCE', subtitle: 'Senior Secondary Certificate', color: 'bg-blue-600' },
    { type: ExamType.NECO, title: 'NECO SSCE', subtitle: 'National Examination Council', color: 'bg-orange-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
        Master Your Exams with <span className="text-emerald-600">NaijaPrep</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-12">
        Choose your target exam and start your journey towards academic excellence with Nigeria's best learning platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {exams.map((exam) => (
          <button
            key={exam.type}
            onClick={() => handleSelect(exam.type)}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-emerald-600 transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1"
          >
            <div className={`${exam.color} w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform`}>
              {exam.type[0]}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{exam.title}</h3>
            <p className="text-slate-500">{exam.subtitle}</p>
            <div className="mt-8 flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-400 font-medium">
        <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900">50K+</span>
            <span>Past Questions</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900">100%</span>
            <span>Syllabus Covered</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900">24/7</span>
            <span>AI Tutoring</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900">Free</span>
            <span>Resources</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
