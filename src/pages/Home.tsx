import { useQueries } from '@tanstack/react-query';
import { SiteLayout } from '../layouts/SiteLayout';
import { getBlogs, getCertificates, getExperience, getProjects, getSkills } from '../services/portfolio';
import { About } from '../sections/About';
import { Blogs } from '../sections/Blogs';
import { Certificates } from '../sections/Certificates';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Resume } from '../sections/Resume';
import { Skills } from '../sections/Skills';
import type { Blog, Certificate, Experience, Project, Skill } from '../types';

export default function Home() {
  const [projects, skills, blogs, certificates, experience] = useQueries({
    queries: [
      { queryKey: ['projects'], queryFn: getProjects },
      { queryKey: ['skills'], queryFn: getSkills },
      { queryKey: ['blogs'], queryFn: getBlogs },
      { queryKey: ['certificates'], queryFn: getCertificates },
      { queryKey: ['experience'], queryFn: getExperience }
    ]
  });

  return (
    <SiteLayout>
      <main>
        <Hero />
        <About experience={(experience.data ?? []) as Experience[]} />
        <Skills skills={(skills.data ?? []) as Skill[]} />
        <Projects projects={(projects.data ?? []) as Project[]} />
        <Blogs blogs={(blogs.data ?? []) as Blog[]} />
        <Certificates certificates={(certificates.data ?? []) as Certificate[]} />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </SiteLayout>
  );
}
