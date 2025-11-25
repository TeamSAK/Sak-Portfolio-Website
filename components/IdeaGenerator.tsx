import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Lightbulb, Target, Code2, DollarSign } from 'lucide-react';
import { generateProjectIdea, ProjectIdea, GeminiError } from '../services/geminiService';
import Reveal from './Reveal';

const IdeaGenerator: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [idea, setIdea] = useState<ProjectIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim()) return;

    setLoading(true);
    setError('');
    setIdea(null);

    try {
      const result = await generateProjectIdea(industry);
      if (result) {
        setIdea(result);
      } else {
        setError("Couldn't spark an idea right now. Try a different topic!");
      }
    } catch (err: any) {
      console.error(err);
      if (err instanceof GeminiError && err.code === 'MISSING_API_KEY') {
        setError("API Key missing. If on Vercel, set 'VITE_API_KEY' in Environment Variables.");
      } else if (err instanceof GeminiError && err.code === 'RATE_LIMIT') {
        setError("Too many requests. Please wait a moment.");
      } else {
        setError("AI Service unavailable. Check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookCall = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-spark" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Input Section */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6 border border-accent/20">
                <Sparkles size={14} /> AI Project Spark
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-text mb-6">
                Don't have an idea? <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Let's generate one.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Not sure what to build? Enter an industry or passion below, and I'll use Gemini AI to architect a unique SaaS concept for you instantly.
              </p>

              <form onSubmit={handleGenerate} className="relative max-w-md">
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Fitness, Real Estate, Crypto..."
                  className="w-full bg-background border-2 border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-32 text-lg focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none shadow-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !industry.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent/90 text-white px-6 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'Spark'}
                </button>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium animate-pulse flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {error}
                    </p>
                </div>
              )}
            </Reveal>
          </div>

          {/* Right: Result Card */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {!idea && !loading && (
              <div className="text-center opacity-30">
                <Lightbulb size={64} className="mx-auto mb-4" />
                <p className="text-xl font-bold">Your next unicorn awaits</p>
              </div>
            )}

            {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-accent">
                  <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
                  <p className="font-mono text-sm animate-pulse">Consulting the neural network...</p>
               </div>
            )}

            {idea && !loading && (
              <div className="w-full animate-fade-in-up">
                 <div className="relative bg-background border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-accent/20 transition-all duration-500 group">
                    {/* Floating Badge */}
                    <div className="absolute -top-4 right-8 bg-gradient-to-r from-accent to-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                       Generated for You
                    </div>

                    <h3 className="text-3xl font-black text-text mb-2">{idea.title}</h3>
                    <p className="text-accent font-medium mb-6">{idea.tagline}</p>

                    <div className="space-y-6 mb-8">
                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/5 text-gray-500">
                             <Target size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-text uppercase tracking-wide mb-1">Concept</h4>
                             <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{idea.description}</p>
                          </div>
                       </div>

                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/5 text-gray-500">
                             <Code2 size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-text uppercase tracking-wide mb-1">Tech Stack</h4>
                             <div className="flex flex-wrap gap-2">
                                {idea.techStack.map((tech, i) => (
                                   <span key={i} className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                                      {tech}
                                   </span>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/5 text-gray-500">
                             <DollarSign size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-text uppercase tracking-wide mb-1">Monetization</h4>
                             <p className="text-sm text-gray-600 dark:text-gray-400">{idea.monetization}</p>
                          </div>
                       </div>
                    </div>

                    <button 
                       onClick={handleBookCall}
                       className="w-full py-4 rounded-xl bg-text text-background font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group/btn"
                    >
                       Let's Build "{idea.title}" <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator;