import { PortfolioData } from './types';

export const RECENT_ACTIVITIES = [
  "🚀 Project Delivered: E-Commerce Platform",
  "🎨 Redesigned the UI for FinTech client",
  "⚡ Improved site performance by 40%",
  "📝 Published article on React 19",
  "✨ Started new AI integration project"
];

export const TECH_STACK = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Three.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" }
];

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description: "We start by diving deep into your goals, user needs, and technical requirements to build a solid roadmap.",
    icon: "Search"
  },
  {
    id: 2,
    title: "Design & Architecture",
    description: "I craft high-fidelity interactive prototypes and design scalable system architectures before writing a line of code.",
    icon: "PenTool"
  },
  {
    id: 3,
    title: "Development & Test",
    description: "Agile development sprints with regular updates. I focus on clean code, performance, and automated testing.",
    icon: "Code"
  },
  {
    id: 4,
    title: "Launch & Scale",
    description: "Seamless deployment to the cloud, SEO optimization, and post-launch support to ensure your product grows.",
    icon: "Rocket"
  }
];

export const PORTFOLIO_DATA: PortfolioData = {
  name: "SAK DEV",
  role: "Senior Frontend Engineer",
  bio: "I'm Sak, a Senior Frontend Engineer specializing in React, high-performance animation, and AI-driven interfaces.",
  location: "San Francisco, CA",
  email: "sak.dev@example.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  stats: [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Delivered", value: "30+" },
    { label: "Happy Clients", value: "15+" },
    { label: "Honors & Awards", value: "08" },
  ],
  skills: [
    {
      name: "Modern Web Architecture",
      skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind", "Node.js", "Three.js", "PostgreSQL", "GraphQL"],
      level: 98
    },
    {
      name: "AI & Data Science",
      skills: ["Gemini 2.5", "TensorFlow.js", "Python", "RAG Systems", "LangChain", "Data Viz", "Pandas"],
      level: 90
    },
    {
      name: "Mobile Ecosystem",
      skills: ["React Native", "Expo", "SwiftUI", "Kotlin", "PWA", "Mobile DevOps"],
      level: 85
    },
    {
      name: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines", "Edge Functions"],
      level: 88
    },
    {
      name: "Cyber Security",
      skills: ["OAuth 2.0", "OWASP Top 10", "Zero Trust", "End-to-End Encryption", "Auth0", "Pen Testing"],
      level: 82
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechFlow Solutions",
      role: "Senior Frontend Engineer",
      period: "2021 - Present",
      description: [
        "Led the migration of a legacy monolith to a micro-frontend architecture using React and Module Federation.",
        "Improved core web vitals (LCP) by 40% through code splitting and asset optimization.",
        "Mentored a team of 5 junior developers and established code quality standards.",
      ],
      technologies: ["React", "TypeScript", "AWS", "Docker"],
    },
    {
      id: "exp-2",
      company: "Creative Pulse",
      role: "Frontend Developer",
      period: "2018 - 2021",
      description: [
        "Developed award-winning interactive marketing campaigns for Fortune 500 clients.",
        "Implemented a custom design system used across 12+ internal products.",
        "Integrated complex data visualizations using D3.js and Recharts.",
      ],
      technologies: ["Vue.js", "SCSS", "D3.js", "Firebase"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-Commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization, inventory management, and sales forecasting.",
      technologies: ["React", "Tremor", "Tailwind", "Supabase"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      demoUrl: "#",
      repoUrl: "#",
      category: "Web App"
    },
    {
      id: "proj-2",
      title: "AI Content Generator",
      description: "SaaS application utilizing Large Language Models to help marketers generate blog posts and social media captions instantly.",
      technologies: ["Next.js", "OpenAI API", "Stripe", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      demoUrl: "#",
      repoUrl: "#",
      category: "AI"
    },
    {
      id: "proj-3",
      title: "TaskMaster Pro",
      description: "A collaborative project management tool with drag-and-drop kanban boards, real-time updates, and team chat functionality.",
      technologies: ["React", "Redux", "Socket.io", "Express"],
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      demoUrl: "#",
      repoUrl: "#",
      category: "Web App"
    },
    {
      id: "proj-4",
      title: "HealthBeat",
      description: "Mobile-first wellness tracking app that syncs with wearable devices to monitor heart rate and sleep patterns.",
      technologies: ["React Native", "Expo", "HealthKit", "GraphQL"],
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      demoUrl: "#",
      repoUrl: "#",
      category: "Mobile"
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Dr. Michael Chen",
      role: "Computer Science Professor",
      company: "Tech University",
      content: "One of the most brilliant minds I've had the pleasure of teaching. His code is not just functional; it's elegant and highly optimized.",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: "t2",
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechFlow Solutions",
      content: "Sak is one of the most talented frontend engineers I've worked with. His ability to translate complex design requirements into performant code is unmatched.",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: "t3",
      name: "Jessica Williams",
      role: "Founder",
      company: "StartUp Inc",
      content: "Sak played a crucial role in our early stages. His dedication and problem-solving skills helped us scale our MVP to a full-fledged product.",
      avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4
    }
  ],
  services: [
    {
      id: "s1",
      title: "Custom Web Development",
      description: "Scalable, high-performance web applications built with React and Next.js. From complex dashboards to marketing sites.",
      features: ["Single Page Apps (SPA)", "Full-Stack Solutions", "CMS Integration", "SaaS Platforms"],
      icon: "code"
    },
    {
      id: "s2",
      title: "AI Integration & Automation",
      description: "Leverage the power of Gemini and OpenAI to build intelligent chatbots, content generators, and automated workflows.",
      features: ["Custom LLM Agents", "Chatbots & Assistants", "Data Analysis", "Process Automation"],
      icon: "cpu"
    },
    {
      id: "s3",
      title: "Performance Engineering",
      description: "Optimizing existing applications for speed, accessibility, and SEO. Faster sites convert better.",
      features: ["Core Web Vitals", "Code Splitting", "Server Side Rendering", "SEO Optimization"],
      icon: "zap"
    },
    {
      id: "s4",
      title: "UI/UX & Interactions",
      description: "Crafting buttery smooth animations and micro-interactions that delight users and elevate your brand perception.",
      features: ["Framer Motion", "3D WebGL (Three.js)", "Responsive Design", "Design Systems"],
      icon: "palette"
    },
    {
      id: "s5",
      title: "Mobile App Development",
      description: "Native-performance mobile apps for iOS and Android using React Native. Code once, deploy everywhere.",
      features: ["Cross-Platform", "App Store Deployment", "Native Modules", "Offline Mode"],
      icon: "smartphone"
    },
    {
      id: "s6",
      title: "Cloud Infrastructure",
      description: "Secure and scalable cloud architecture on AWS or Vercel. Serverless functions, databases, and content delivery.",
      features: ["AWS / Vercel", "CI/CD Pipelines", "Database Design", "Auto-scaling"],
      icon: "cloud"
    }
  ],
  faqs: [
    {
      question: "What is your typical hourly rate?",
      answer: "I typically work on a project basis rather than hourly. This allows me to focus on delivering value and results rather than just trading time. However, for consulting, my rates start at $150/hr."
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely! I love the energy and speed of startups. I have extensive experience helping early-stage companies build their MVPs and scale their technical infrastructure."
    },
    {
      question: "What is your preferred tech stack?",
      answer: "My go-to stack is the T3 Stack: React/Next.js, TypeScript, Tailwind CSS, and Postgres. However, I'm adaptable and have experience with a wide range of technologies including Vue, Python, and AWS."
    },
    {
      question: "Are you available for full-time roles?",
      answer: "I am currently open to discussing both freelance/contract opportunities and full-time senior engineering roles where I can make a significant impact."
    }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are an AI Assistant representing Sak Dev, a Senior Frontend Engineer.
Your goal is to answer questions about Sak's professional background, skills, and projects in a professional, friendly, and concise manner.

Here is Sak's Resume Data:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Guidelines:
1. Answer as if you are helpful support for a recruiter or client interested in hiring Sak.
2. Keep answers relatively short (under 100 words) unless asked for detail.
3. Highlight specific technologies (React, TypeScript, Tailwind) when relevant.
4. If asked about something not in the data, politely state you don't have that information but suggest contacting Sak directly.
5. Do not hallucinate projects or skills not listed.
`;