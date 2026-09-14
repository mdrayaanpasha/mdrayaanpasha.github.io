import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CardFlip from '@/components/kokonutui/card-flip';

const EXPERIENCES = [
  {
    id: '01',
    role: 'SDE Intern - Backend',
    company: 'Manaverse - 3mo',
    type: 'INTERNSHIP',
    period: 'JUN 2026 — PRESENT',
    duration: '3 MOS',
    location: 'Remote',
    badge: 'M',
    accentColor: '#22d3ee',
    glow: 'rgba(229, 231, 235, 0.35)',
    description: [
    ],
    skills: ['Contributed ~500 commits across ~20 PRs.',
    'Shipped: multipart uploads & C2PA content provenance',
    'Core Work: authentication, messaging, CI/CD.',
    'More: content moderation, personalization systems, dwell-time signals.'
  ],
    isCurrent: true,
  },
  {
    id: '02',
    role: 'Backend Developer Intern',
    company: 'LeXi AI - 3mo',
    type: 'INTERNSHIP',
    period: 'APR 2026 — JUN 2026',
    duration: '3 MOS',
    location: 'REMOTE',
    badge: 'LX',
    accentColor: '#f472b6',
    glow: 'rgba(250, 204, 21, 0.35)',
    description: [
    ],


    skills: [
       'Worked on Client-Server Integration Compliance.',
     'Developed 30+ RESTAPIs',
     'Maintained & Upgraded: RAG Pipeline'
    ],
    isCurrent: false,
  },
  {
    id: '03',
    role: 'Developer Intern',
    company: "St Joseph's University - 2mo",
    type: 'INTERNSHIP',
    period: 'MAY 2026 — JUN 2026',
    duration: '2 MOS',
    location: 'BENGALURU, INDIA',
    badge: 'SJU',
    accentColor: '#38bdf8',
    glow: 'rgba(156, 163, 175, 0.35)',
    description: [
    
    ],
    skills: ['Redesigned 2 production websites',
      'Maintained & upgraded existing codebase.'
    ],
    isCurrent: false,
  },
  {
    id: '04',
    role: 'Full-Stack Developer Intern',
    company: 'Gauge.ro - 8mo',
    type: 'INTERNSHIP',
    period: 'APR 2025 — NOV 2025',
    duration: '8 MOS',
    location: 'REMOTE',
    badge: 'G8',
    accentColor: '#c084fc',
    glow: 'rgba(180, 83, 9, 0.35)',
    description: [
    ],

    skills: ['Built WhatsApp lead generation automation workflows.',
      'Migrated: 3rd party -> Custom CMS',
      'Built CRM with automated marketing workflows'
    ],
    isCurrent: false,
  },
  {
    id: '05',
    role: 'Full Stack Developer Intern',
    company: 'Royal & Co - 3mo',
    type: 'INTERNSHIP',
    period: 'DEC 2024 — FEB 2025',
    duration: '3 MOS',
    location: 'BENGALURU, INDIA',
    badge: 'R&C',
    accentColor: '#fbbf24',
    glow: 'rgba(96, 165, 250, 0.35)',
    description: [
    ],

    skills: ['Built: NL->SQL with custom RAG',
      'Optimized DB: partitioning, Sharding',
      'Billing System with predictive analysis'
    ],
    isCurrent: false,
  },
];

export default function Experience() {
  const scrollRef = useRef(null);

  const scrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll roughly one card (280px) plus the gap (32px) per click.
    el.scrollBy({ left: direction * 312, behavior: 'smooth' });
  };

  return (
    <section
      id="experience"
      className="dark relative w-full overflow-hidden bg-zinc-950 px-5 py-28 font-sans sm:px-8 sm:py-40"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <header className="mb-16 flex flex-col gap-6 sm:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Experience
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Scroll experiences left"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll experiences right"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex flex-row gap-8 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="w-[280px] shrink-0 snap-start">
              <CardFlip
                title={exp.role}
                subtitle={exp.company}
                description={exp.description[0]}
                features={exp.skills}
                glowColor={exp.glow}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
