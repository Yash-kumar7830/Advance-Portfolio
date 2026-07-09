import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - last) > 12) {
        setDirection(current > last && current > 120 ? 'down' : 'up');
        last = current;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}
