import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import img1 from '../../../homepage-imgs/project-1.png' 
import img2 from '../../../homepage-imgs/project-2.png' 
const PROJECTS = [
  {
    id: '01',
    title: 'Quantiva',
    category: 'DISTRIBUTED SYSTEMS · REAL-TIME',
    description:
      'A distributed stock analysis engine built around RabbitMQ RPC, Redis caching, and independent analysis services.',
    tags: ['RabbitMQ RPC', 'Redis', 'Node.js', 'Distributed Systems'],
    ctaText: 'EXPLORE ARCHITECTURE',
    ctaLink: 'https://quantiva-eight.vercel.app/links',
    image: img1,
    accent: 'cyan',
  },
  {
    id: '02',
    title: 'Arbit',
    category: 'EVENT-DRIVEN ARCHITECTURE',
    description:
      'An event-driven pipeline using Kafka, Redis, PostgreSQL, and isolated Node.js services for real-time financial processing, anomaly detection, and technical analysis.',
    tags: ['Kafka', 'Redis', 'PostgreSQL', 'Event-Driven'],
    ctaText: 'VIEW PIPELINE',
    ctaLink: 'https://arbit-finance.vercel.app/links',
    image: img2,
    accent: 'pink',
  },
];

const ACCENT = {
  pink: {
    text: 'group-hover:text-pink-400',
    border: 'group-hover:border-pink-500/30',
    dot: 'bg-pink-400',
    glowColor: 'rgba(244, 114, 182, 0.15)',
    beam: 'from-pink-500 via-rose-400 to-transparent',
  },
  cyan: {
    text: 'group-hover:text-cyan-300',
    border: 'group-hover:border-cyan-500/30',
    dot: 'bg-cyan-300',
    glowColor: 'rgba(34, 211, 238, 0.15)',
    beam: 'from-cyan-400 via-teal-300 to-transparent',
  },
};

/* Interactive Glass Card with Spotlight Hover Effect */
const ProjectCard = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const a = ACCENT[project.accent];

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={project.ctaLink}
      target="_blank"
     
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: '-80px' }}
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/20 p-4 backdrop-blur-2xl transition-all duration-700 hover:bg-zinc-900/40 ${a.border}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${a.glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Edge Light Beam Accent */}
      <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${a.beam} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      {/* Media Image Showcase Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-65 grayscale transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
        
        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

  
      </div>

      {/* Content Block */}
      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
     
        <h3 className={`mt-3 text-3xl font-extrabold tracking-tight text-white transition-colors duration-500 sm:text-4xl ${a.text}`}>
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400 font-normal">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 font-mono text-[10px] text-zinc-400 transition-colors duration-300 group-hover:border-white/20 group-hover:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Action Bar */}
        <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 transition-colors duration-300 group-hover:text-white">
            {project.ctaText}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default function SelectedWork() {
  return (
    <section  id="work" className="relative w-full overflow-hidden border-t border-white/10 bg-zinc-950 px-6 py-32 font-sans sm:py-48">
      {/* Background Ambient Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-20 h-[35rem] w-[35rem] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute bottom-10 right-0 h-[35rem] w-[35rem] rounded-full bg-pink-500/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"
        >
          <div>
         
            <h2 className="mt-3 text-4xl font-extrabold tracking-tighter text-white sm:text-6xl">
              Selected Work
            </h2>
          </div>
        
        </motion.div>

        {/* Interactive Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}