import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Toast = { id: string; message: string; tone: 'success' | 'error' | 'info' };
type ToastContextValue = { push: (message: string, tone?: Toast['tone']) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const value = useMemo(
    () => ({
      push: (message: string, tone: Toast['tone'] = 'info') => {
        const id = crypto.randomUUID();
        setToasts((items) => [...items, { id, message, tone }]);
        window.setTimeout(() => setToasts((items) => items.filter((toast) => toast.id !== id)), 3600);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[80] grid gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              className="glass max-w-sm rounded-2xl px-4 py-3 text-sm"
            >
              <span className={toast.tone === 'success' ? 'text-cyan-200' : toast.tone === 'error' ? 'text-rose-200' : 'text-white'}>
                {toast.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
