import { Download } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { getResumeUrl } from '../services/portfolio';

export function Resume() {
  const url = getResumeUrl();
  return (
    <section id="resume" className="section">
      <SectionHeader eyebrow="Resume" title="A focused snapshot of impact." copy="The resume is served from Supabase Storage when configured, with a direct download action for recruiters." />
      <div className="glass overflow-hidden rounded-[2rem]">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 p-5 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Yash Kumar Resume</h3>
            <p className="mt-1 text-white/55"> Get the PDF.</p>
          </div>
          <a href={url} download className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950"><Download size={18} /> Download</a>
        </div>
        <iframe title="Yash Kumar resume" src={url} className="h-[640px] w-full bg-slate-950" />
      </div>
    </section>
  );
}
