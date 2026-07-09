export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  gallery: string[];
  github_url: string;
  live_url: string;
  features: string[];
  challenges: string;
  architecture: string;
  status: 'Live' | 'Building' | 'Archived';
  featured: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming Languages' | 'Databases' | 'AI / ML' | 'Cloud' | 'Tools';
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Learning';
  icon: string;
  years: number;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  published_at: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issued_at: string;
  image_url: string;
  credential_url: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  impact: string[];
};

export type Message = {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  is_read?: boolean;
};
