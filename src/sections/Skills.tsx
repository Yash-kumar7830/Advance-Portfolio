import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import type { Skill } from '../types';

export function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] ?? []), skill];
    return acc;
  }, {});

  return (
    <section id="skills" className="section">
      <SectionHeader eyebrow="Skills" title="A toolkit tuned for intelligent products." copy="No static progress bars: each system skill is grouped by where it creates leverage in a production application." />
      <div className="grid gap-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-4 font-display text-2xl font-bold text-white">{category}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((skill) => {
                const Icon = (Icons as unknown as Record<string, ComponentType<{ size?: number; className?: string }>>)[skill.icon] ?? Icons.Sparkles;
                return (
                  <motion.article key={skill.id} whileHover={{ y: -8, rotateX: 7, rotateY: -5 }} className="glass group rounded-[1.5rem] p-5 transition will-change-transform hover:shadow-glow">
                    <div className="flex items-start justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100 transition group-hover:scale-110">
                        <Icon size={23} />
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/65">{skill.years} yrs</span>
                    </div>
                    <h4 className="mt-5 text-xl font-bold text-white">{skill.name}</h4>
                    <p className="mt-2 text-sm text-white/55">{skill.level}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
