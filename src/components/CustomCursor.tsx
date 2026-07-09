import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 220, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 28 });

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!finePointer) return null;
  return <motion.div aria-hidden className="pointer-events-none fixed z-[90] h-9 w-9 rounded-full border border-cyan-200/50 mix-blend-screen" style={{ x: smoothX, y: smoothY }} />;
}
