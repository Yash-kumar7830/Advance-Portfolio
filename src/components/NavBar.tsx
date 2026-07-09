import { motion } from 'framer-motion';
import { Command, Moon, Sun } from 'lucide-react';
import { site } from '../constants/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useTheme } from '../contexts/ThemeContext';

export function NavBar({ onCommand }: { onCommand: () => void }) {
  const active = useActiveSection(site.nav);
  const direction = useScrollDirection();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: direction === 'down' ? -96 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-4 z-50 px-4"
    >
      <nav className="glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-4">
        <a href="#home" className="flex items-center gap-3 font-display font-extrabold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-950">YK</span>
          <span className="hidden sm:block">Yash Kumar</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`rounded-full px-3 py-2 text-sm capitalize transition ${active === item ? 'bg-white text-slate-950' : 'text-white/64 hover:text-white'}`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Open command palette" onClick={onCommand} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/75 hover:bg-white/10 hover:text-white">
            <Command size={18} />
          </button>
          <button aria-label="Toggle theme" onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/75 hover:bg-white/10 hover:text-white">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
