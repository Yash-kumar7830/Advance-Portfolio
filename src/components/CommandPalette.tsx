import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { site } from '../constants/site';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const commands = useMemo(
    () => [
      ...site.nav.map((id) => ({ label: `Go to ${id}`, action: () => (location.hash = id) })),
      { label: 'Open admin dashboard', action: () => (location.href = '/admin') },
      { label: 'Email Yash', action: () => (location.href = `mailto:${site.email}`) },
      { label: 'Download resume', action: () => window.open(site.resumeUrl, '_blank') }
    ],
    []
  );
  const filtered = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        open ? onClose() : document.dispatchEvent(new CustomEvent('open-command'));
      }
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[75] bg-black/55 px-4 pt-24 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="glass mx-auto max-w-2xl rounded-[1.6rem] p-3"
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <label className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="text-cyan-200" size={20} />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands" className="w-full bg-transparent text-lg text-white placeholder:text-white/35" />
            </label>
            <div className="grid gap-2 p-2">
              {filtered.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
