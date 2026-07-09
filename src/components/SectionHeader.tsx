import { motion } from 'framer-motion';

export function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[.35em] text-secondary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-extrabold text-white light:text-slate-950 md:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-white/62 light:text-slate-600">{copy}</p>
    </motion.div>
  );
}
