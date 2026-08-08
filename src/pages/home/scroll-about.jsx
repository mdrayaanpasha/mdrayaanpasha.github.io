import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Word — brightens + un-blurs as it passes through the scroll range  */
/* ------------------------------------------------------------------ */
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, ['#3f3f46', '#fafafa']);
  const blur = useTransform(progress, range, ['blur(8px)', 'blur(0px)']);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <motion.span
      style={{ opacity, color, filter: blur, y }}
      className="mr-[0.28em] inline-block will-change-transform"
    >
      {children}
    </motion.span>
  );
};

/* Reusable entrance reveal */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ScrollRevealSection() {
  const containerRef = useRef(null);

  // Raw scroll position tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.2'],
  });

  // Spring physics physics layer for butter-smooth, delayed interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    mass: 0.8,
  });

  const statement =
  'I work on designing & building systems that scale. 1+ yr experience across startups.. where i worked on fundemental systems that incl: distrubuted systems, CI/CD, data pipelines & more. currently im interning @ manaverse while completing my BCA @ SJU'

  const words = statement.split(' ');

  return (
    <section
    id="who am i?"
      ref={containerRef}
      className="relative w-full overflow-hidden border-t border-white/10 bg-zinc-950 px-6 py-40 sm:py-52"
    >
      {/* Ambient theme glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Eyebrow */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-pink-400/70" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-pink-400">
            About ⚡
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-pink-400/70" />
        </motion.div>

        {/* Scroll-reveal statement with smooth spring transition */}
        <p className="text-center text-2xl font-bold leading-relaxed tracking-tight sm:text-4xl sm:leading-relaxed md:text-[2.5rem]">
          {words.map((word, i) => {
            const step = 1 / words.length;
            const start = i * step * 0.8;
            const end = Math.min(start + step * 3.2, 1);

            return (
              <Word key={i} progress={smoothProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}