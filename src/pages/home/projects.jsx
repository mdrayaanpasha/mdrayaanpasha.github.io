import React, { useCallback, useRef } from 'react';
import img1 from '../../../homepage-imgs/project-1.png';
import img2 from '../../../homepage-imgs/project-2.png';

const PROJECTS = [
  {
    id: '01',
    title: 'Quantiva',
    category: 'Distributed Systems · Real-Time',
    description:
      'A distributed stock analysis engine built around RabbitMQ RPC, Redis caching, and independent analysis services.',
    tags: ['RabbitMQ RPC', 'Redis', 'Node.js', 'Distributed Systems'],
    ctaText: 'Live Demo',
    ctaLink: 'https://quantiva.rayaanpasha.dev',
    image: img1,
    accent: '56, 189, 248',
  },
  {
    id: '02',
    title: 'Arbit',
    category: 'Event-Driven Architecture',
    description:
      'An event-driven pipeline using Kafka, Redis, PostgreSQL, and isolated Node.js services for real-time financial processing, anomaly detection, and technical analysis.',
    tags: ['Kafka', 'Redis', 'PostgreSQL', 'Event-Driven'],
    ctaText: 'Live Demo',
    ctaLink: 'https://arbit.rayaanpasha.dev',
    image: img2,
    accent: '167, 139, 250',
  },
];

/* ------------------------------------------------------------------ */
/*  Dotted overlay — lives INSIDE each card, follows that card's cursor */
/* ------------------------------------------------------------------ */
function CardDottedOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[28px]"
      style={{
        // Soft fade so dots dissolve near the card edges
        maskImage:
          'radial-gradient(ellipse 100% 90% at 50% 50%, #000 55%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 100% 90% at 50% 50%, #000 55%, transparent 100%)',
      }}
    >
      {/* Base faint dots — parallax with cursor */}
      <div
        className="absolute -inset-10 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1.5px)',
          backgroundSize: '22px 22px',
          transform: 'translate3d(var(--ox, 0px), var(--oy, 0px), 0)',
        }}
      />

      {/* Brighter accent dots — revealed around the cursor */}
      <div
        className="absolute -inset-10 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(var(--accent), 0.6) 1px, transparent 1.6px)',
          backgroundSize: '22px 22px',
          transform: 'translate3d(var(--ox, 0px), var(--oy, 0px), 0)',
          maskImage:
            'radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project card                                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Cursor for glows + dots spotlight
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    // 3D tilt
    card.style.setProperty('--rx', `${(y / rect.height - 0.5) * -5}deg`);
    card.style.setProperty('--ry', `${(x / rect.width - 0.5) * 5}deg`);

    // Parallax drift for the dotted layers inside the card
    card.style.setProperty('--ox', `${(x / rect.width - 0.5) * 18}px`);
    card.style.setProperty('--oy', `${(y / rect.height - 0.5) * 18}px`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--ox', '0px');
    card.style.setProperty('--oy', '0px');
  }, []);

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        '--accent': project.accent,
        transform:
          'perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
      }}
      className="group relative isolate flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/40 p-2.5 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-white/20 hover:shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)] focus-within:border-white/25"
    >
      {/* Dotted background INSIDE the card */}
      <CardDottedOverlay />

      {/* Cursor-following ambient accent light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle 380px at var(--mx, 50%) var(--my, 50%), rgba(var(--accent), 0.10), transparent 70%)',
        }}
      />

      {/* Cursor-following border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: '1px',
          background:
            'radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(var(--accent), 0.75), transparent 65%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
        }}
      />

      {/* Media */}
      <div className="relative z-10 overflow-hidden rounded-[20px] border border-white/[0.06] bg-zinc-900">
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top opacity-75 grayscale-[35%] transition-[transform,opacity,filter] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[11px] tracking-widest text-zinc-300 backdrop-blur-md">
          {project.id}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-500">
          {project.category}
        </span>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
          {project.title}
        </h3>

        <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400 transition-colors duration-300 group-hover:border-white/[0.14] group-hover:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-medium text-white outline-none"
        >
          <span className="relative">
            {project.ctaText}
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100" />
          </span>

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden border-t border-white/10 bg-zinc-950 px-5 py-28 font-sans sm:px-8 sm:py-40"
    >
      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 flex flex-col gap-6 sm:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-zinc-500" />
              Portfolio
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Selected Work
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
            Systems built around event-driven messaging, caching layers, and
            isolated services.
          </p>
        </header>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}