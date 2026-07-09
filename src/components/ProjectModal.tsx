import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '../types';

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[70] overflow-y-auto bg-black/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.article
            className="glass mx-auto my-12 max-w-5xl rounded-[2rem] p-4 md:p-8"
            initial={{ y: 30, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[.3em] text-secondary">{project.status}</p>
                <h3 className="mt-3 font-display text-4xl font-extrabold text-white md:text-6xl">{project.title}</h3>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">{project.description}</p>
              </div>
              <button aria-label="Close project modal" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <X size={20} />
              </button>
            </div>
            <img src={project.gallery[0]} alt="" className="mt-8 h-[340px] w-full rounded-[1.5rem] object-cover" loading="lazy" />
            <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
              <div className="grid gap-5">
                <div>
                  <h4 className="font-semibold text-white">Features</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <span key={feature} className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-white/72">{feature}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Architecture</h4>
                  <p className="mt-2 text-white/65">{project.architecture}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Challenge</h4>
                  <p className="mt-2 text-white/65">{project.challenges}</p>
                </div>
              </div>
              <aside className="rounded-[1.4rem] border border-white/10 bg-white/[.04] p-5">
                <h4 className="font-semibold text-white">Stack</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => <span key={tech} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/75">{tech}</span>)}
                </div>
                <div className="mt-6 grid gap-3">
                  <a href={project.github_url} className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-slate-950"><Github size={18} /> GitHub</a>
                  <a href={project.live_url} className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 font-semibold text-white hover:bg-white/10"><ExternalLink size={18} /> Live Demo</a>
                </div>
              </aside>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
