import { FormEvent, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BarChart3, Database, LogOut, Plus, Shield, Trash2, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { deleteRecord, getBlogs, getCertificates, getExperience, getProjects, getSkills, upsertRecord, uploadFile } from '../services/portfolio';
import { hasSupabaseConfig } from '../lib/supabase';

type TableId = 'projects' | 'skills' | 'experience' | 'blogs' | 'certificates';
type GenericRecord = Record<string, unknown> & { id?: string; title?: string; name?: string; role?: string };
type TableEntry = { id: TableId; label: string; query: () => Promise<GenericRecord[]> };

const tables: TableEntry[] = [
  { id: 'projects', label: 'Projects', query: async () => getProjects() },
  { id: 'skills', label: 'Skills', query: async () => getSkills() },
  { id: 'experience', label: 'Experience', query: async () => getExperience() },
  { id: 'blogs', label: 'Blogs', query: async () => getBlogs() },
  { id: 'certificates', label: 'Certificates', query: async () => getCertificates() }
];

export default function Admin() {
  const auth = useAuth();
  const { push } = useToast();
  const queryClient = useQueryClient();
  const [active, setActive] = useState<TableId>('projects');
  const [draft, setDraft] = useState('{\n  "title": "New Launch",\n  "slug": "new-launch"\n}');
  const [uploading, setUploading] = useState(false);
  const table = tables.find((item) => item.id === active)!;
  const { data = [] } = useQuery<GenericRecord[]>({ queryKey: [active], queryFn: () => table.query() });
  const records = data as GenericRecord[];
  const stats = useMemo(() => tables.map((item) => ({ label: item.label, value: item.id === active ? records.length : 'Live' })), [active, records.length]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const fileName = `${active}/${Date.now()}-${file.name}`;
      const publicUrl = await uploadFile('portfolio', fileName, file);
      push(`File uploaded: ${publicUrl}`, 'success');
      
      // Auto-populate image_url in draft for certificates
      if (active === 'certificates') {
        try {
          const parsed = JSON.parse(draft);
          parsed.image_url = publicUrl;
          setDraft(JSON.stringify(parsed, null, 2));
        } catch {
          // If draft is not valid JSON, just show the URL
          push(`Copy this URL: ${publicUrl}`, 'info');
        }
      }
    } catch (error) {
      push(error instanceof Error ? error.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
      event.currentTarget.value = '';
    }
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await auth.signIn(String(form.get('email')), String(form.get('password')));
      push('Signed in successfully.', 'success');
    } catch (error) {
      push(error instanceof Error ? error.message : 'Unable to sign in.', 'error');
    }
  };

  const save = async () => {
    try {
      const parsed = JSON.parse(draft) as GenericRecord;
      await upsertRecord(active, parsed);
      await queryClient.invalidateQueries({ queryKey: [active] });
      push(`${table.label} saved.`, 'success');
    } catch (error) {
      push(error instanceof Error ? error.message : 'Invalid JSON payload.', 'error');
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    await deleteRecord(active, id);
    await queryClient.invalidateQueries({ queryKey: [active] });
    push(`${table.label} record deleted.`, 'success');
  };

  if (!auth.isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-space px-4 text-white">
        <form onSubmit={signIn} className="glass w-full max-w-md rounded-[2rem] p-8">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100"><Shield /></div>
          <h1 className="mt-6 font-display text-4xl font-black">Admin Dashboard</h1>
          <p className="mt-3 text-white/58">{hasSupabaseConfig ? 'Sign in with the admin Supabase account.' : 'Supabase is not configured yet. Add .env values to enable protected login.'}</p>
          <label className="mt-6 grid gap-2 text-sm text-white/70">Email<input name="email" type="email" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-white" /></label>
          <label className="mt-4 grid gap-2 text-sm text-white/70">Password<input name="password" type="password" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-white" /></label>
          <button className="mt-6 w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950">Sign in</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-space px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="glass flex flex-col justify-between gap-4 rounded-[2rem] p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[.3em] text-cyan-200">Protected</p>
            <h1 className="mt-2 font-display text-4xl font-black">Portfolio Control Center</h1>
          </div>
          <button onClick={auth.signOut} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-white/75 hover:bg-white/10"><LogOut size={18} /> Sign out</button>
        </header>
        <section className="mt-6 grid gap-4 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-[1.4rem] p-5">
              <BarChart3 className="text-cyan-200" />
              <p className="mt-4 text-3xl font-black">{stat.value}</p>
              <p className="text-white/55">{stat.label}</p>
            </div>
          ))}
        </section>
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="glass rounded-[1.5rem] p-3">
            {tables.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ${active === item.id ? 'bg-white text-slate-950' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}>
                <Database size={18} /> {item.label}
              </button>
            ))}
          </aside>
          <section className="grid gap-6">
            <div className="glass rounded-[1.5rem] p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="font-display text-2xl font-bold">{table.label}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-950"><Plus size={18} /> Upsert JSON</button>
                  {active === 'certificates' && (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/75 hover:bg-white/10">
                      <Upload size={18} />
                      <span>Upload Image</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
              <label htmlFor="record-draft" className="mb-2 block text-sm font-medium text-white/70">JSON payload</label>
              <textarea id="record-draft" value={draft} onChange={(event) => setDraft(event.target.value)} rows={8} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-mono text-sm text-cyan-50" />
            </div>
            <div className="grid gap-3">
              {records.map((record) => (
                <article key={record.id ?? JSON.stringify(record).slice(0, 24)} className="glass flex flex-col justify-between gap-4 rounded-[1.3rem] p-5 md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold">{record.title ?? record.name ?? record.role ?? record.id}</p>
                    <p className="mt-1 max-w-3xl truncate text-sm text-white/50">{JSON.stringify(record)}</p>
                  </div>
                  <button onClick={() => remove(record.id)} aria-label={`Delete ${record.title ?? record.name ?? record.role ?? record.id ?? 'record'}`} title={`Delete ${record.title ?? record.name ?? record.role ?? record.id ?? 'record'}`} className="grid h-10 w-10 place-items-center rounded-full border border-rose-300/20 text-rose-200 hover:bg-rose-400/10"><Trash2 size={18} /></button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
