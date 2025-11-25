import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import Reveal from './Reveal';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Reveal>
             <div className="flex justify-center mb-4">
                <HelpCircle className="text-primary w-8 h-8" />
             </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to know before we start working together.</p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {PORTFOLIO_DATA.faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} fullWidth>
              <div 
                className={`group bg-surface border rounded-2xl overflow-hidden transition-all shadow-sm ${
                    openIndex === idx ? 'border-primary shadow-lg shadow-primary/5' : 'border-gray-200 dark:border-white/5 hover:border-primary/30'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-medium text-lg transition-colors ${openIndex === idx ? 'text-primary' : 'text-text'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                      openIndex === idx 
                        ? 'rotate-180 bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-white/5 text-text group-hover:bg-gray-200 dark:group-hover:bg-white/10'
                  }`}>
                     {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;