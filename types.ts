export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: string; // Added for filtering
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  level?: number; // 1-100 for progress bars
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  services: Service[];
  faqs: FAQ[];
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: number;
  isError?: boolean;
}