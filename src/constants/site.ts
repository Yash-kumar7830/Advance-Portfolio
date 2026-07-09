import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import type { Blog, Certificate, Experience, Project, Skill } from '../types';
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export const site = {
  name: 'Yash Kumar',
  title: 'AI Engineer and Full Stack Developer',
  email: 'hello@yashkumar.dev',
  location: 'India',
  resumeUrl: '/resume-yash-kumar.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/yash-kumar7830', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yash-kumar-9801912b0', icon: Linkedin },
    { label: 'Leetcode', href: 'https://leetcode.com/u/Yash_Kumar7830/', icon: SiLeetcode },
    { label: 'GeeksforGreeks', href: 'https://www.geeksforgeeks.org/profile/yashkumatbv6', icon: SiGeeksforgeeks }
  ],
  nav: ['about', 'skills', 'projects', 'blogs', 'certificates', 'resume', 'contact']
};

export const metrics = [
  { label: 'Projects', value: '24+', detail: 'AI, SaaS, data, and full stack builds' },
  { label: 'Technologies', value: '42', detail: 'Modern frontend, cloud, and ML tools' },
  { label: 'LeetCode', value: '450+', detail: 'Algorithmic problem solving practice' },
  { label: 'GitHub Repos', value: '20+', detail: 'Experiments, apps, and reusable systems' },
  { label: 'Experience', value: 'fresher', detail: 'Shipping polished product workflows' }
];

export const demoProjects: Project[] = [
  {
    id: 'p1',
    title: 'NeuroDesk AI Workspace',
    slug: 'neurodesk-ai-workspace',
    description: 'A collaborative AI cockpit for research, documents, and data-heavy decision workflows.',
    tech_stack: ['React', 'TypeScript', 'Supabase', 'RAG', 'Vector Search'],
    gallery: ['https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80'],
    github_url: 'https://github.com/yashkumar/neurodesk',
    live_url: 'https://neurodesk.vercel.app',
    features: ['Realtime document rooms', 'Semantic search', 'Citation-aware AI answers', 'Role-based access'],
    challenges: 'Balancing retrieval quality, latency, and explainability for complex research material.',
    architecture: 'React client talks directly to Supabase Auth, Postgres, Storage, Realtime, and Edge-compatible vector APIs.',
    status: 'Live',
    featured: true
  },
  {
    id: 'p2',
    title: 'SignalFlow Analytics',
    slug: 'signalflow-analytics',
    description: 'A premium KPI dashboard with forecasting, anomaly detection, and executive-ready summaries.',
    tech_stack: ['React', 'TanStack Query', 'PostgreSQL', 'Charts', 'ML'],
    gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
    github_url: 'https://github.com/yashkumar/signalflow',
    live_url: 'https://signalflow.vercel.app',
    features: ['Forecast cards', 'Realtime metrics', 'Interactive drilldowns', 'AI-generated insights'],
    challenges: 'Making dense analytics feel fast, calm, and readable across desktop and mobile screens.',
    architecture: 'Supabase read models power cached React Query resources with optimistic dashboard preferences.',
    status: 'Building',
    featured: true
  },
  {
    id: 'p3',
    title: 'CodeMentor Lab',
    slug: 'codementor-lab',
    description: 'An adaptive coding practice platform that generates hints and learning paths from submissions.',
    tech_stack: ['React', 'Zod', 'Supabase Auth', 'Realtime', 'LLM'],
    gallery: ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80'],
    github_url: 'https://github.com/yashkumar/codementor-lab',
    live_url: 'https://codementor-lab.vercel.app',
    features: ['Adaptive hints', 'Submission timeline', 'Concept maps', 'Peer rooms'],
    challenges: 'Designing AI feedback that teaches without giving away the solution immediately.',
    architecture: 'Client-side app with Supabase-protected learning data and realtime collaboration channels.',
    status: 'Live',
    featured: false
  }
];

export const demoSkills: Skill[] = [
  'React|Frontend|Expert|Atom|3',
  'TypeScript|Programming Languages|Expert|Code2|3',
  'Node.js|Backend|Advanced|Server|3',
  'Supabase|Databases|Advanced|Database|2',
  'PostgreSQL|Databases|Advanced|DatabaseZap|3',
  'Python|Programming Languages|Advanced|FileCode2|4',
  'Machine Learning|AI / ML|Advanced|BrainCircuit|3',
  'TensorFlow|AI / ML|Proficient|Network|2',
  'AWS|Cloud|Proficient|Cloud|2',
  'Docker|Tools|Proficient|Container|2',
  'Framer Motion|Frontend|Advanced|Sparkles|2',
  'Git|Tools|Expert|GitBranch|4'
].map((item, index) => {
  const [name, category, level, icon, years] = item.split('|');
  return { id: `s${index}`, name, category, level, icon, years: Number(years) } as Skill;
});

export const demoExperience: Experience[] = [
  {
    id: 'e1',
    role: 'AI Engineer',
    company: 'Product Labs',
    period: '2025 - Present',
    summary: 'Building production-grade AI workflows for search, automation, and analytics.',
    impact: ['Reduced research turnaround by 68%', 'Designed reusable prompt and eval pipelines', 'Shipped realtime AI interfaces']
  },
  {
    id: 'e2',
    role: 'Full Stack Developer',
    company: 'Independent',
    period: '2023 - 2025',
    summary: 'Created full stack SaaS, portfolio, and analytics products with polished user experiences.',
    impact: ['Launched 20+ web projects', 'Built Supabase-first architectures', 'Led frontend performance tuning']
  }
];

export const demoBlogs: Blog[] = [
  {
    id: 'b1',
    title: 'Designing AI Interfaces That Feel Trustworthy',
    slug: 'trustworthy-ai-interfaces',
    excerpt: 'A practical lens for latency, explainability, and controls in AI-powered products.',
    content: '## Trust is designed\n\nAI interfaces need visible state, recoverable actions, and source-aware answers.\n\n```ts\nconst answer = await retrieveThenGenerate(question);\n```\n\nThe best products make uncertainty legible.',
    category: 'AI Product',
    tags: ['AI', 'UX', 'Frontend'],
    views: 1840,
    likes: 126,
    published_at: '2026-04-12'
  },
  {
    id: 'b2',
    title: 'Supabase as a Complete Portfolio Backend',
    slug: 'supabase-portfolio-backend',
    excerpt: 'Auth, Storage, Realtime, and Postgres can carry far more than a contact form.',
    content: '## A backend without a server\n\nFor many portfolios, Supabase gives you enough backend surface without operating an API server.',
    category: 'Architecture',
    tags: ['Supabase', 'React'],
    views: 1215,
    likes: 88,
    published_at: '2026-05-03'
  }
];

export const demoCertificates: Certificate[] = [
  {
    id: 'c1',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    issued_at: '2025-11-10',
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    credential_url: 'https://coursera.org'
  },
  {
    id: 'c2',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issued_at: '2025-07-21',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    credential_url: 'https://aws.amazon.com/certification'
  },
  {
    id: 'c3',
    title: 'Frontend Performance',
    issuer: 'Google Developers',
    issued_at: '2026-01-18',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    credential_url: 'https://web.dev'
  }
];
