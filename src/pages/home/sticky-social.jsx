import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/mdrayaanpasha',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    accent: 'hover:text-cyan-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mdrayaanpasha/',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 0 0-1.48 1.48c0 .82.66 1.48 1.48 1.48a1.48 1.48 0 0 0 1.48-1.48c0-.82-.66-1.48-1.48-1.48z" />
      </svg>
    ),
    accent: 'hover:text-pink-400 hover:border-pink-400/40 hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]',
  },
  {
    name: 'LeetCode',
    url: 'http://leetcode.com/u/mdrayaanpasha',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.606-2.636a4.994 4.994 0 00-3.853-1.448c-1.35 0-2.618.527-3.567 1.476l-4.318 4.38a5.038 5.038 0 000 7.135l4.332 4.363c.949.95 2.217 1.477 3.567 1.477s2.618-.527 3.567-1.477l2.607-2.62c.514-.515.496-1.366-.039-1.902-.535-.535-1.386-.553-1.901-.038zM13.447 3.105c-.71-.711-1.862-.711-2.573 0l-1.39 1.391a1.353 1.353 0 000 1.913 1.352 1.352 0 001.913 0l1.39-1.391c.182-.182.478-.182.66 0l5.807 5.807c.182.182.182.478 0 .66l-1.39 1.391a1.352 1.352 0 000 1.913 1.353 1.353 0 001.913 0l1.39-1.391c.711-.711.711-1.863 0-2.574l-5.807-5.807z"/>
      </svg>
    ),
    accent: 'hover:text-amber-300 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]',
  },
];

export default function FloatingBottomDock() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reveal on up-scroll or near top, hide on down-scroll
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-6 sm:left-10 z-50 flex items-center gap-2.5"
        >
         

          {/* Separated Floating Link Pills */}
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 font-mono text-xs text-zinc-400 backdrop-blur-xl transition-all duration-300 active:scale-95 ${link.accent}`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {link.icon}
              </span>
              <span className="hidden sm:inline-block">{link.name}</span>
              <span className="text-[10px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
                ↗
              </span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}