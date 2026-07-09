import { useEffect } from 'react';

export function useMouseGlow() {
  useEffect(() => {
    const update = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', update);
    return () => window.removeEventListener('pointermove', update);
  }, []);
}
