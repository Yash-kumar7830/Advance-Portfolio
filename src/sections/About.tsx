import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { metrics } from '../constants/site';
import type { Experience } from '../types';
import { SectionHeader } from '../components/SectionHeader';

export function About({ experience }: { experience: Experience[] }) {
  const strengths: Array<[LucideIcon, string]> = [
    [BrainCircuit, 'AI workflows with explainable, human-centered interactions'],
    [Code2, 'Type-safe frontend architecture built for iteration'],
    [Rocket, 'End-to-end product delivery from concept to launch']
  ];

  return (
    <section id="about" className="section">
      <SectionHeader eyebrow="About" title="Product instincts with engineering depth." copy="Yash works across AI, frontend systems, and full stack architecture with a bias toward usable, beautiful outcomes." />
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <motion.div whileHover={{ y: -6 }} className="glass rounded-[2rem] p-6">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary via-secondary to-accent p-[1px]">
            <div className="grid h-full place-items-center rounded-[1.45rem] bg-slate-950">
              <div className="text-center">
                <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-white text-5xl font-black text-slate-950">YK</div>
                <p className="mt-6 text-lg text-white/70">AI Engineer · Full Stack Developer</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {strengths.map(([Icon, text]) => (
              <div key={String(text)} className="flex items-center gap-3 rounded-2xl bg-white/[.04] p-4 text-white/70">
                <Icon className="text-cyan-200" size={21} /> {text}
              </div>
            ))}
          </div>
        </motion.div>
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <motion.div key={metric.label} whileHover={{ y: -6, rotateX: 4 }} className="glass rounded-[1.5rem] p-5">
                <p className="font-display text-4xl font-extrabold text-white">{metric.value}</p>
                <p className="mt-2 font-semibold text-cyan-100">{metric.label}</p>
                <p className="mt-2 text-sm text-white/55">{metric.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="glass rounded-[2rem] p-6">
            <h3 className="font-display text-2xl font-bold text-white">Timeline</h3>
            <div className="mt-6 grid gap-5">
              {experience.map((item) => (
                <div key={item.id} className="relative border-l border-white/10 pl-5">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-secondary shadow-cyan" />
                  <p className="text-sm uppercase tracking-[.25em] text-white/42">{item.period}</p>
                  <h4 className="mt-2 text-xl font-bold text-white">{item.role} · {item.company}</h4>
                  <p className="mt-2 text-white/62">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.impact.map((impact) => <span key={impact} className="rounded-full bg-white/[.06] px-3 py-1 text-sm text-white/60">{impact}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
