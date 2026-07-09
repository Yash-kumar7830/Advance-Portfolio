import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CommandPalette } from '../components/CommandPalette';
import { CustomCursor } from '../components/CustomCursor';
import { NavBar } from '../components/NavBar';
import { useMouseGlow } from '../hooks/useMouseGlow';

export function SiteLayout({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  useMouseGlow();

  useEffect(() => {
    const open = () => setCommandOpen(true);
    document.addEventListener('open-command', open);
    return () => document.removeEventListener('open-command', open);
  }, []);

  return (
    <div className="app-shell noise min-h-screen">
      <NavBar onCommand={() => setCommandOpen(true)} />
      <CustomCursor />
      {children}
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
