import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import type { Certificate } from '../types';

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates" className="section">
      <SectionHeader eyebrow="Certificates" title="Credentials with a cinematic carousel." copy="Certificates can be stored in Supabase Storage and rendered here with fullscreen-friendly imagery." />
      <div className="flex snap-x gap-5 overflow-x-auto pb-5 [perspective:1200px]">
        {certificates.map((certificate, index) => (
          <motion.a
            key={certificate.id}
            href={certificate.credential_url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ rotateY: index % 2 ? -8 : 8, y: -8 }}
            className="glass group min-w-[300px] snap-center overflow-hidden rounded-[2rem] md:min-w-[380px]"
          >
            <img src={certificate.image_url} alt="" className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div className="p-5">
              <Award className="text-cyan-200" />
              <h3 className="mt-4 text-2xl font-bold text-white">{certificate.title}</h3>
              <p className="mt-2 text-white/58">{certificate.issuer} · {new Date(certificate.issued_at).getFullYear()}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
