import { Component, type ErrorInfo, type ReactNode } from 'react';

type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-space px-6 text-white">
        <section className="glass max-w-xl rounded-[2rem] p-8 text-center">
          <p className="text-sm uppercase tracking-[.3em] text-rose-200">Runtime interrupted</p>
          <h1 className="mt-4 font-display text-4xl font-bold">Something snapped out of alignment.</h1>
          <p className="mt-4 text-white/70">{this.state.message}</p>
          <button className="mt-7 rounded-full bg-white px-5 py-3 font-semibold text-slate-950" onClick={() => location.reload()}>
            Reload experience
          </button>
        </section>
      </main>
    );
  }
}
