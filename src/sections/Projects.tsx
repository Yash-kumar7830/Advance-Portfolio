import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';
import { SectionHeader } from '../components/SectionHeader';
import type { Project } from '../types';

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <SectionHeader eyebrow="Projects" title="Case studies that feel like products." copy="Fetched from Supabase when configured, with rich detail views for stack, features, architecture, and hard tradeoffs." />
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, rotateX: 3, rotateY: index % 2 ? -3 : 3 }}
            viewport={{ once: true }}
            className={`glass group overflow-hidden rounded-[2rem] p-0 text-left ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={project.gallery[0]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-950">{project.status}</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                <ExternalLink className="shrink-0 text-cyan-200 opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-3 text-white/62">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full bg-white/[.07] px-3 py-1 text-xs text-white/60">{tech}</span>)}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
