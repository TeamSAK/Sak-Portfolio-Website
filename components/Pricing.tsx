import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import Reveal from './Reveal';

const PRICING_PLANS = [
  {
    name: "MVP Starter",
    price: "2,500",
    description: "Perfect for startups needing a quick, high-quality launch.",
    icon: Zap,
    features: [
      "Custom React/Next.js Architecture",
      "Responsive Mobile-First Design",
      "Basic SEO Setup",
      "CMS Integration",
      "2 Weeks Support",
      "Standard Performance",
    ],
    recommended: false,
    color: "from-blue-400 to-cyan-400"
  },
  {
    name: "Growth Scale",
    price: "5,000",
    description: "For established businesses looking to dominate their market.",
    icon: Sparkles,
    features: [
      "Everything in MVP",
      "Advanced Animations & Interactions",
      "AI / Chatbot Integration",
      "Payment Gateway (Stripe)",
      "Analytics Dashboard",
      "1 Month Priority Support",
    ],
    recommended: true,
    color: "from-primary to-secondary"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale digital transformation and complex web apps.",
    icon: Shield,
    features: [
      "Full SaaS Development",
      "Custom Backend & Database",
      "Multiple User Roles",
      "Automated Testing (CI/CD)",
      "Security Audits",
      "Dedicated Slack Channel",
    ],
    recommended: false,
    color: "from-purple-500 to-indigo-600"
  }
];

const Pricing: React.FC = () => {
  const handleChoosePlan = (planName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Optional: You could pre-fill the contact form message here via state management
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-grid opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm text-primary">
                Investment
             </div>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pricing</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              No hidden fees. Choose the package that fits your stage of growth.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 200} className="h-full">
              <div 
                className={`relative h-full flex flex-col bg-surface rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.recommended 
                    ? 'border-primary/50 shadow-xl shadow-primary/10 scale-105 z-10' 
                    : 'border-gray-200 dark:border-white/10 hover:border-primary/30'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <plan.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-text">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500">/ project</span>}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-green-500" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleChoosePlan(plan.name)}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/25'
                      : 'bg-background border border-gray-200 dark:border-white/10 text-text hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  Choose {plan.name.split(' ')[0]} <ArrowRight size={16} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={600}>
            <p className="text-center text-sm text-gray-500 mt-12">
                Need a custom quote? <a href="#contact" className="text-primary font-bold hover:underline">Contact me</a> for a tailored proposal.
            </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;