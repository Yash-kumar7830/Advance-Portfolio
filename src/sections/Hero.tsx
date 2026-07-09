import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Download, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site } from '../constants/site';
import { ThreeScene } from '../components/ThreeScene';

const roles = ['AI Engineer', 'Full Stack Developer', 'Machine Learning Enthusiast', 'Problem Solver', 'Future Entrepreneur'];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const role = roles[index % roles.length];
    if (typed.length < role.length) {
      const timeout = window.setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 52);
      return () => window.clearTimeout(timeout);
    }
    const timeout = window.setTimeout(() => {
      setTyped('');
      setIndex((current) => current + 1);
    }, 1300);
    return () => window.clearTimeout(timeout);
  }, [index, typed]);

  useEffect(() => {
    if (!orbitRef.current) return;
    const tween = gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 38,
      ease: 'none',
      repeat: -1
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32">
      <div className="aurora absolute left-1/2 top-12 h-[32rem] w-[64rem] -translate-x-1/2 animate-aurora opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-4 py-2 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-cyan" /> Available for Software Developer roles
          </div>
          <p className="mt-8 text-xl font-medium text-white/72">Hi, I'm</p>
          <h1 className="mt-2 font-display text-6xl font-black leading-[.95] text-white md:text-8xl">
            <span className="text-gradient animate-shimmer">{site.name}</span>
          </h1>
          <div className="mt-6 h-14 font-display text-3xl font-bold text-cyan-100 md:text-5xl">
            {typed}
            <span className="ml-1 inline-block h-8 w-[3px] translate-y-1 bg-secondary" />
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            I design and ship intelligent, high-polish web products where AI systems, frontend craft, and scalable data architecture meet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 shadow-glow transition hover:-translate-y-1">
              View Projects <ArrowDown size={18} className="transition group-hover:translate-y-1" />
            </a>
            <a href={site.resumeUrl} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              <Download size={18} /> Download Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
              <Send size={18} /> Contact Me
            </a>
          </div>
          <div className="mt-8 flex gap-3">
            {site.social.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white/70 transition hover:-translate-y-1 hover:bg-white/10 hover:text-white">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative h-[32rem] min-h-[420px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
          <div ref={orbitRef} className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10" />
          <ThreeScene />
        </motion.div>
      </div>
    </section>
  );
}
