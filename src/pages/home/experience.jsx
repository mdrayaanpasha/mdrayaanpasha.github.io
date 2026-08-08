import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

const EXPERIENCES = [
  {
    id: '01',
    role: 'SDE Intern - Backend',
    company: 'Manaverse',
    type: 'INTERNSHIP',

    period: 'JUN 2026 — PRESENT',
    duration: '3 MOS',
    location: 'Remote',
    badge: 'M',

    accentColor: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.35)',
    description: [
      'Designed end-to-end CI/CD pipelines to automate production deployments.',
      'Provisioned DigitalOcean infrastructure with SSL, Nginx reverse proxies, and DNS configuration to enable zero-downtime deployments.',
      'Containerized microservices using Docker to standardize dev/prod parity; integrated API-layer content moderation.',
    ],
    skills: ['CI/CD', 'DigitalOcean', 'Nginx', 'Docker', 'Backend Security'],
    isCurrent: true,
  },
  {
    id: '02',
    role: 'Backend Developer Intern',
    company: 'LeXi AI',
    type: 'INTERNSHIP',
    period: 'APR 2026 — JUN 2026',
    duration: '3 MOS',
    location: 'REMOTE',

    badge: 'LX',
    accentColor: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.35)',
    description: [
      'Built REST APIs and mobile features for an AI legal platform including litigation workspace, contract review, and LeXi AI chat.',
      'Engineered case management modules and granular team permissions control.',
      'Refactored onboarding, authentication, and core mobile screen flows for optimal responsive UX.',
    ],
    skills: ['React Native', 'Django', 'REST APIs', 'AI Integration'],
    isCurrent: false,
  },
  {
    id: '03',
    role: 'Developer Intern',
    company: "St Joseph's University",
    type: 'INTERNSHIP',
    period: 'MAY 2026 — JUN 2026',
    duration: '2 MOS',
    location: 'BENGALURU, INDIA',
    badge: 'SJU',
    accentColor: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.35)',
    description: [
      'Spearheaded full design overhaul and frontend modernization for two core institutional web portals.',
      'Audited, refactored, and maintained legacy production codebases to resolve critical rendering bottlenecks.',
    ],
    skills: ['UI/UX Redesign', 'JavaScript', 'Frontend Performance'],
    isCurrent: false,
  },
  {
    id: '04',
    role: 'Full-Stack Developer Intern',
    company: 'Gauge.ro',
    type: 'INTERNSHIP',
    period: 'APR 2025 — NOV 2025',
    duration: '8 MOS',
    location: 'REMOTE',
    badge: 'G8',
    accentColor: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.35)',
    description: [
      'Engineered WhatsApp automation workflows using LangChain agents and LangGraph for outreach and lead qualification.',
      'Migrated backend architecture from Strapi CMS to a custom Express.js API, removing third-party dependencies.',
      'Constructed an internal CRM module with automated workflow triggers for marketing operations.',
    ],
    skills: ['LangChain', 'LangGraph', 'Express.js', 'PostgreSQL', 'Prisma ORM'],
    isCurrent: false,
  },
  {
    id: '05',
    role: 'Full Stack Developer Intern',
    company: 'Royal & Co',
    type: 'INTERNSHIP',
    period: 'DEC 2024 — FEB 2025',
    duration: '3 MOS',
    location: 'BENGALURU, INDIA',
    badge: 'R&C',
    accentColor: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.35)',
    description: [
      'Built a Natural Language to SQL execution tool using LLMs, enabling non-technical teams to query databases directly.',
      'Implemented PostgreSQL table partitioning strategies to boost query performance on large analytical datasets.',
      'Developed a billing forecasting system leveraging gradient descent to predict client costs and flag usage anomalies.',
    ],
    skills: ['LLMs', 'PostgreSQL', 'Table Partitioning', 'Gradient Descent', 'SQL'],
    isCurrent: false,
  },
];

/*
 * Build a useTransform input range that is safe for framer-motion's scroll
 * acceleration path. When a useTransform is driven directly by a scroll
 * progress value, framer-motion offloads it to a WAAPI ScrollTimeline
 * animation and passes the input range straight through as keyframe *offsets*.
 * WAAPI requires those offsets to be within [0, 1] and strictly increasing —
 * anything negative (start - fade for the first card) or > 1 (end + fade for
 * the last card) throws "Offsets must be … in the range [0,1]". So clamp every
 * breakpoint into [0, 1] and nudge any collisions apart to keep it monotonic.
 */
function inputRange(points) {
  const eps = 1e-4;
  const out = points.map((n) => Math.min(1, Math.max(0, n)));
  for (let i = 1; i < out.length; i++) {
    if (out[i] <= out[i - 1]) {
      out[i] = Math.min(1, out[i - 1] + eps);
    }
  }
  return out;
}

/*
 * One card per scroll segment, driven off a single smoothed scroll value.
 *
 * The motion is intentionally calm: a gentle fade + slight scale + a small
 * vertical slide. Adjacent cards cross-fade at their shared boundary so a
 * new card is arriving while the previous one leaves — no blur, no 3D
 * rotation, no overshoot. That combination is what made the old version
 * feel jumpy and broken.
 */
function KineticCardItem({ exp, index, total, progress }) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // How far before/after the segment the card fades. A generous fade window
  // gives a smooth cross-fade with the neighbouring card.
  const fade = step * 0.5;

  const opacity = useTransform(
    progress,
    inputRange([start - fade, start + step * 0.18, end - step * 0.18, end + fade]),
    [0, 1, 1, 0],
    { clamp: true }
  );

  const scale = useTransform(
    progress,
    inputRange([start - fade, start + step * 0.2, end - step * 0.2, end + fade]),
    [0.94, 1, 1, 0.96],
    { clamp: true }
  );

  const y = useTransform(
    progress,
    inputRange([start - fade, start + step * 0.2, end - step * 0.2, end + fade]),
    [36, 0, 0, -36],
    { clamp: true }
  );

  // Active card sits on top so it always renders above the fading ones.
  const zIndex = useTransform(
    opacity,
    [0, 1],
    [index + 1, total + 10]
  );

  return (
    <motion.div
    id="experience"
      style={{
        scale,
        opacity,
        y,
        zIndex,
        pointerEvents: 'none',
      }}
      className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-zinc-900 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.85)] [transform:translateZ(0)] will-change-[transform,opacity]"
    >
      {/* Laser top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${exp.accentColor}, transparent)`,
          boxShadow: `0 0 18px ${exp.glow}`,
        }}
      />

      {/* Ambient light */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[100px] opacity-60">
        <div
          className="h-full w-full rounded-full"
          style={{ background: exp.glow }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl border font-mono text-sm font-black shadow-2xl"
              style={{
                backgroundColor: `${exp.accentColor}20`,
                color: exp.accentColor,
                borderColor: `${exp.accentColor}50`,
                boxShadow: `0 0 20px ${exp.glow}`,
              }}
            >
              {exp.badge}
            </div>

            <div>
            
              <h4 className="text-2xl font-black text-white">{exp.company}</h4>
            </div>
          </div>

          <div className="font-mono text-left sm:text-right">
            <span className="block text-xs font-bold text-zinc-200">
              {exp.period}
            </span>
            
          </div>
        </div>

        <div className="mt-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            ASSIGNED ROLE
          </span>
          <h3
            className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: exp.accentColor }}
          >
            {exp.role}
          </h3>
        </div>

        <div className="mt-6 space-y-2.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            KEY DELIVERABLES & IMPACT
          </span>

          <ul className="space-y-2.5 text-xs font-normal text-zinc-300 sm:text-sm">
            {exp.description.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{
                    backgroundColor: exp.accentColor,
                    color: exp.accentColor,
                  }}
                />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          SYSTEM STACK / TOOLING
        </span>

        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[10px] text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceNode({ exp, index, total, progress }) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  const nodeRange = inputRange([start - step * 0.15, start, end - step * 0.1, end]);

  const opacity = useTransform(
    progress,
    nodeRange,
    [0.4, 1, 1, 0.4],
    { clamp: true }
  );

  const scale = useTransform(
    progress,
    nodeRange,
    [0.98, 1.02, 1.02, 0.98],
    { clamp: true }
  );

  // Accent highlight that lights up only while this node is the active one.
  const active = useTransform(
    progress,
    nodeRange,
    [0, 1, 1, 0],
    { clamp: true }
  );

  const borderColor = useTransform(
    active,
    [0, 1],
    ['rgba(255,255,255,0.1)', `${exp.accentColor}80`]
  );

  const boxShadow = useTransform(
    active,
    [0, 1],
    ['0 0 0 rgba(0,0,0,0)', `0 0 24px ${exp.glow}`]
  );

  return (
    <motion.div
      style={{ opacity, scale, borderColor, boxShadow }}
      className="relative flex w-full items-center justify-between rounded-2xl border bg-zinc-900 p-4 text-left [transform:translateZ(0)] will-change-[transform,opacity]"
    >
      <div className="flex items-center gap-4 pl-1">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-black shadow-lg"
          style={{
            backgroundColor: `${exp.accentColor}18`,
            color: exp.accentColor,
            borderColor: `${exp.accentColor}40`,
          }}
        >
          {exp.badge} 
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-500">
              [{exp.id}]
            </span>
            <h3 className="text-sm font-bold text-white">{exp.company}</h3>
          </div>
          <p className="text-xs text-zinc-400">{exp.role}</p>
        </div>
      </div>

      <div className="pr-2 text-right font-mono">
        <span className="block text-[10px] font-semibold text-zinc-400">
          {exp.duration}
        </span>

        {exp.isCurrent && (
          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            Present
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function KineticStickyExperience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /*
   * Bind directly to the scroll position — no spring. A spring lags behind
   * the wheel and then snaps to catch up, which reads as "laggy then too
   * quick". Direct binding maps the animation 1:1 to the scroll, so cards
   * move exactly as fast as the user scrolls.
   */
  const progress = scrollYProgress;

  const progressScale = useTransform(progress, [0, 1], [0.01, 1]);

  const backgroundColor = useTransform(
    progress,
    EXPERIENCES.map((_, index) => index / (EXPERIENCES.length - 1)),
    EXPERIENCES.map((experience) => experience.accentColor)
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-zinc-950 font-sans"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden border-t border-white/10 px-6 py-12">
        {/* Background color follows the active experience */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            backgroundColor,
            opacity: 0.18,
          }}
        />

        {/* Fine grain / vignette layer */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.42)_100%)]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
            <div>
       

              <h2 className="mt-2 text-3xl font-extrabold tracking-tighter text-white sm:text-5xl">
                Experience 
              </h2>
            </div>

            <div className="flex items-center gap-4">
            

              <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  style={{ scaleX: progressScale }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-5">
             

              {EXPERIENCES.map((exp, index) => (
                <ExperienceNode
                  key={exp.id}
                  exp={exp}
                  index={index}
                  total={EXPERIENCES.length}
                  progress={progress}
                />
              ))}
            </div>

            <div
              className="relative h-[500px] w-full lg:col-span-7"
              style={{ perspective: 1400 }}
            >
              {EXPERIENCES.map((exp, index) => (
                <KineticCardItem
                  key={exp.id}
                  exp={exp}
                  index={index}
                  total={EXPERIENCES.length}
                  progress={progress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
