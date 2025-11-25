import React from 'react';
import { Star, Quote, BadgeCheck, MessageCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import Reveal from './Reveal';

// Extend data locally to create a "full" wall of love effect
const EXTRA_TESTIMONIALS = [
  ...PORTFOLIO_DATA.testimonials,
  {
    id: "t4",
    name: "David Kim",
    role: "Product Manager",
    company: "InnovateLabs",
    content: "The animation work Sak did for our landing page increased conversions by 15%. Absolutely stunning work.",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5
  },
  {
    id: "t5",
    name: "Elena Rodriguez",
    role: "Director of Engineering",
    company: "CloudScale",
    content: "Clean architecture, great communication, and zero technical debt. A rare find in the freelance world.",
    avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5
  },
  {
    id: "t6",
    name: "James Wilson",
    role: "CEO",
    company: "TechStar",
    content: "He didn't just write code; he helped us refine our product strategy. Truly a senior-level partner.",
    avatarUrl: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5
  }
];

// Duplicate data to ensure seamless looping
const TESTIMONIALS_SET = [...EXTRA_TESTIMONIALS, ...EXTRA_TESTIMONIALS, ...EXTRA_TESTIMONIALS];

const TestimonialCard: React.FC<{ data: typeof EXTRA_TESTIMONIALS[0] }> = ({ data }) => (
  <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm mb-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10"
          />
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
            <BadgeCheck size={10} fill="currentColor" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-text leading-tight">{data.name}</h4>
          <p className="text-xs text-gray-500 font-medium">{data.company}</p>
        </div>
      </div>
      <Quote size={16} className="text-primary/40 group-hover:text-primary transition-colors" />
    </div>
    
    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 font-medium">
      "{data.content}"
    </p>

    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-3">
       <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
             <Star key={i} size={12} className={`${i < data.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `} />
          ))}
       </div>
       <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
          Verified Review
       </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm text-primary">
                <MessageCircle size={14} /> Client Feedback
             </div>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Innovators</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Don't just take my word for it. Here is what industry leaders have to say about our collaborations.
            </p>
          </Reveal>
        </div>

        {/* Masonry Scroll Container */}
        <div className="relative h-[600px] overflow-hidden -mx-4 md:mx-0">
            {/* Top Fade Gradient */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none"></div>
            
            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full px-4 md:px-0">
                
                {/* Column 1 - Scroll Up */}
                <div className="group flex flex-col gap-0 animate-scroll-up hover:paused">
                   {TESTIMONIALS_SET.map((t, i) => (
                      <TestimonialCard key={`c1-${i}`} data={t} />
                   ))}
                </div>

                {/* Column 2 - Scroll Down (Hidden on mobile) */}
                <div className="hidden md:flex group flex-col gap-0 animate-scroll-down hover:paused">
                   {TESTIMONIALS_SET.slice().reverse().map((t, i) => (
                      <TestimonialCard key={`c2-${i}`} data={t} />
                   ))}
                </div>

                {/* Column 3 - Scroll Up (Hidden on tablet) */}
                <div className="hidden lg:flex group flex-col gap-0 animate-scroll-up hover:paused">
                   {TESTIMONIALS_SET.slice(2).concat(TESTIMONIALS_SET.slice(0, 2)).map((t, i) => (
                      <TestimonialCard key={`c3-${i}`} data={t} />
                   ))}
                </div>

            </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
        }
        .animate-scroll-up {
            animation: scrollUp 40s linear infinite;
        }
        .animate-scroll-down {
            animation: scrollDown 45s linear infinite;
        }
        .hover\\:paused:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;