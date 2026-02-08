
import React, { useState } from 'react';
import { PRICING_PLANS } from '../constants';
import { UserProgress, SubscriptionTier } from '../types';

interface PricingProps {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

const Pricing: React.FC<PricingProps> = ({ progress, updateProgress }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaystackPayment = (plan: any) => {
    setIsProcessing(true);
    const amount = parseInt(plan.price.replace(/[^0-9]/g, ''), 10) * 100;

    const handler = (window as any).PaystackPop.setup({
      key: 'pk_live_cee6f3601a4f4fc1547dc8179adb99ddeb433acd', 
      email: progress.profile.email || 'student@edunaija.ng',
      amount: amount,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          { display_name: "Student Name", variable_name: "student_name", value: progress.profile.fullName },
          { display_name: "Membership Plan", variable_name: "plan_tier", value: plan.tier }
        ]
      },
      callback: function(response: any) {
        setIsProcessing(false);
        updateProgress({ subscription: plan.tier, trialStartDate: null });
        alert(`Payment successful! Reference: ${response.reference}. Your ${plan.tier} plan is now active.`);
      },
      onClose: function() {
        setIsProcessing(false);
      }
    });

    handler.openIframe();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <header className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6 uppercase">Membership <span className="text-indigo-600">Plans</span>.</h1>
        <p className="text-xl text-black/60 max-w-2xl mx-auto font-medium">Get full access to all syllabus lessons and millions of practice questions. Every plan starts with a <span className="text-indigo-600 font-bold">3-Day Free Trial</span>.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <div 
            key={plan.tier}
            className={`
              p-8 rounded-[50px] border-4 border-black transition-all relative flex flex-col
              ${plan.highlight ? 'bg-black text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)] scale-105 z-10' : 'bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}
            `}
          >
            {plan.highlight && (
               <div className="absolute top-6 right-6 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 border-white shadow-lg">Recommended</div>
            )}
            
            <h2 className={`text-xl font-black uppercase tracking-tighter mb-2 ${plan.highlight ? 'text-white' : 'text-black'}`}>{plan.tier} Plan</h2>
            <div className="flex items-baseline gap-2 mb-8">
               <span className="text-4xl font-black">{plan.price}</span>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${plan.highlight ? 'text-white/40' : 'text-black/40'}`}>{plan.period}</span>
            </div>

            <div className={`mb-8 p-3 rounded-2xl text-center text-[9px] font-black uppercase tracking-widest border-2 border-black ${plan.highlight ? 'bg-indigo-900/40 text-indigo-400' : 'bg-slate-50 text-black/60'}`}>
               {plan.trial}
            </div>

            <ul className="space-y-4 mb-10 flex-1">
               {plan.features.map((feat, i) => (
                 <li key={i} className="flex items-start gap-4 text-xs font-bold">
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-emerald-400' : 'text-indigo-600'}`} fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    {feat}
                 </li>
               ))}
            </ul>

            <button 
              onClick={() => handlePaystackPayment(plan)}
              disabled={isProcessing || (progress.subscription === plan.tier && !progress.trialStartDate)}
              className={`
                w-full py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all border-4 border-black flex items-center justify-center gap-3 shadow-md
                ${(progress.subscription === plan.tier && !progress.trialStartDate)
                  ? 'bg-slate-200 text-black/20 cursor-default border-slate-300 shadow-none' 
                  : plan.highlight 
                    ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' 
                    : 'bg-black text-white hover:bg-white hover:text-black'}
              `}
            >
              {isProcessing && <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>}
              {(progress.subscription === plan.tier && !progress.trialStartDate) ? 'Active Plan' : `Start ${plan.tier} Membership`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
