import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset after showing success message
      setTimeout(() => {
        setFormStatus('idle');
        // Optional: Reset form fields here if using controlled inputs
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Have a project in mind? Let's talk.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal direction="right" delay={200} fullWidth>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-text">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm currently open to new opportunities and collaborations. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-text">{PORTFOLIO_DATA.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-text">{PORTFOLIO_DATA.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={400} fullWidth>
            <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-gray-300 dark:hover:border-white/10 transition-all">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                  <input required type="text" className="w-full bg-background border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                  <input required type="email" className="w-full bg-background border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Message</label>
                <textarea required rows={4} className="w-full bg-background border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className={`w-full font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 transform shadow-lg 
                  ${formStatus === 'success' 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white hover:-translate-y-1 shadow-primary/25'
                  } disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {formStatus === 'idle' && (
                  <>Send Message <Send size={18} /></>
                )}
                {formStatus === 'sending' && (
                  <>Sending... <Loader2 size={18} className="animate-spin" /></>
                )}
                {formStatus === 'success' && (
                  <>Message Sent! <CheckCircle size={18} /></>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;