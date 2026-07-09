import { supabase } from '../lib/supabase';
import { demoBlogs, demoCertificates, demoExperience, demoProjects, demoSkills } from '../constants/site';
import type { Blog, Certificate, Experience, Message, Project, Skill } from '../types';

async function fromTable<T>(table: string, fallback: T[], order = 'created_at') {
  if (!supabase) return fallback;
  const { data, error } = await supabase.from(table).select('*').order(order, { ascending: false });
  if (error) {
    console.warn(`Supabase ${table} fallback:`, error.message);
    return fallback;
  }
  return (data ?? fallback) as T[];
}

export const getProjects = () => fromTable<Project>('projects', demoProjects);
export const getSkills = () => fromTable<Skill>('skills', demoSkills, 'category');
export const getBlogs = () => fromTable<Blog>('blogs', demoBlogs, 'published_at');
export const getCertificates = () => fromTable<Certificate>('certificates', demoCertificates, 'issued_at');
export const getExperience = () => fromTable<Experience>('experience', demoExperience, 'period');

export async function saveMessage(message: Message) {
  if (!supabase) {
    console.warn('Supabase not configured — returning fallback, no DB insert');
    const fallback = { ...message, id: crypto.randomUUID(), created_at: new Date().toISOString(), _localFallback: true } as unknown as Message & { _localFallback: true };
    return fallback;
  }
  try {
    const { data, error } = await supabase.from('messages').insert(message).select('*').single();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase insert error:', error);
      throw error;
    }
    return data as Message;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveMessage unexpected error:', err);
    throw err;
  }
}

export async function upsertRecord<T extends { id?: string }>(table: string, record: T) {
  if (!supabase) return record;
  const payload = record.id ? record : { ...record, id: crypto.randomUUID() };
  const { data, error } = await supabase.from(table).upsert(payload).select('*').single();
  if (error) throw error;
  return data as T;
}

export async function deleteRecord(table: string, id: string) {
  if (!supabase) return;
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export function getResumeUrl() {
  const bucket = import.meta.env.VITE_RESUME_BUCKET as string | undefined;
  const path = import.meta.env.VITE_RESUME_PATH as string | undefined;
  if (supabase && bucket && path) {
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
  return '/resume-yash-kumar.pdf';
}

export async function uploadFile(bucket: string, path: string, file: File) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
