import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-space px-6 text-white">
      <section className="glass max-w-xl rounded-[2rem] p-8 text-center">
        <p className="text-sm uppercase tracking-[.35em] text-cyan-200">404</p>
        <h1 className="mt-4 font-display text-5xl font-black">This route drifted away.</h1>
        <p className="mt-4 text-white/62">The portfolio is still here, just one click back to the main experience.</p>
        <Link to="/" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-slate-950">Return home</Link>
      </section>
    </main>
  );
}
