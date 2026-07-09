import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { Heart, Search, Timer, Eye } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import type { Blog } from '../types';

export function Blogs({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(blogs.map((blog) => blog.category)))];
  const filtered = blogs.filter((blog) => (category === 'All' || blog.category === category) && `${blog.title} ${blog.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const featuredHtml = useMemo(() => marked.parse(filtered[0]?.content ?? '', { async: false }) as string, [filtered]);

  return (
    <section id="blogs" className="section">
      <SectionHeader eyebrow="Writing" title="Thoughtful notes on AI and product engineering." copy="Markdown-backed posts include search, categories, reading time, likes, views, and syntax-friendly content." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <label className="glass flex flex-1 items-center gap-3 rounded-full px-5 py-3">
          <Search size={18} className="text-cyan-200" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search writing" className="w-full bg-transparent text-white placeholder:text-white/40" />
        </label>
        <div className="glass flex gap-2 overflow-x-auto rounded-full p-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-white text-slate-950' : 'text-white/62 hover:text-white'}`}>{item}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="grid gap-4">
          {filtered.map((blog) => (
            <article key={blog.id} className="glass rounded-[1.5rem] p-5">
              <p className="text-sm text-cyan-100">{blog.category}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{blog.title}</h3>
              <p className="mt-2 text-white/58">{blog.excerpt}</p>
              <div className="mt-4 flex gap-4 text-sm text-white/45">
                <span className="flex items-center gap-1"><Timer size={15} /> {Math.max(2, Math.ceil(blog.content.length / 900))} min</span>
                <span className="flex items-center gap-1"><Eye size={15} /> {blog.views}</span>
                <span className="flex items-center gap-1"><Heart size={15} /> {blog.likes}</span>
              </div>
            </article>
          ))}
        </div>
        <article className="glass prose-lite rounded-[2rem] p-6 text-white/72">
          <div dangerouslySetInnerHTML={{ __html: featuredHtml }} />
        </article>
      </div>
    </section>
  );
}
