import { ArrowUp } from 'lucide-react';
import { site } from '../constants/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <p className="text-white/50">© {new Date().getFullYear()} Yash Kumar. Built with React, Supabase, and a lot of polish.</p>
        <div className="flex items-center gap-3">
          {site.social.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
              <Icon size={18} />
            </a>
          ))}
          <a href="#home" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
