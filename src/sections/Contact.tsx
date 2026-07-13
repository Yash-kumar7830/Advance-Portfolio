import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { saveMessage } from '../services/portfolio';
import { useToast } from '../contexts/ToastContext';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Use a valid email'),
  subject: z.string().min(4, 'Subject is too short'),
  message: z.string().min(12, 'Message should include a little context')
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const { push } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    // Debug: log payload before sending
    // eslint-disable-next-line no-console
    console.log('sendMessage payload:', values);
    try {
      const res = await saveMessage(values) as any;
      if (res && res._localFallback) {
        push('Message saved locally — set Supabase env vars to persist to DB.', 'info');
      } else {
        push('Message sent. Yash will see it in the admin dashboard.', 'success');
      }
      reset();
    } catch (rawErr) {
      const err = rawErr as any;
      // log and notify with detailed fields
      // eslint-disable-next-line no-console
      console.error('saveMessage error:', err);
      if (err?.message) console.error('error.message:', err.message);
      if (err?.code) console.error('error.code:', err.code);
      if (err?.details) console.error('error.details:', err.details);
      push('Failed to send message. Check console for details.', 'error');
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeader eyebrow="Contact" title="Let’s build the next intelligent interface." copy="Validated with Zod and stored directly in Supabase messages when environment variables are configured." />
      <form onSubmit={handleSubmit(onSubmit)} className="glass mx-auto grid max-w-3xl gap-4 rounded-[2rem] p-5 md:p-8">
        {(['name', 'email', 'subject'] as const).map((field) => (
          <label key={field} className="grid gap-2">
            <span className="text-sm font-semibold capitalize text-white/70">{field}</span>
            <input {...register(field)} className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/35" />
            {errors[field] && <span className="text-sm text-rose-200">{errors[field]?.message}</span>}
          </label>
        ))}
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white/70">Message</span>
          <textarea {...register('message')} rows={6} className="resize-none rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/35" />
          {errors.message && <span className="text-sm text-rose-200">{errors.message.message}</span>}
        </label>
        <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 disabled:opacity-60">
          <Send size={18} /> {isSubmitting ? 'Sending' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
