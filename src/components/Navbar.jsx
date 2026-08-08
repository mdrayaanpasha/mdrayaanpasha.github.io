import React, { useState } from 'react';
import { useScroll } from './userHook'; // or inline

export default function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled, isVisible } = useScroll(30);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'pt-3' : 'pt-6'}`}
    >
      <nav
        className={`w-full max-w-4xl rounded-2xl border transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
          isScrolled
            ? 'border-white/15 bg-zinc-950/70 p-1.5 backdrop-blur-3xl'
            : 'border-white/10 bg-zinc-950/40 p-2 backdrop-blur-2xl'
        }`}
      >
        <div className="flex items-center justify-between px-3 py-1.5">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 text-white group">
         
            <span className="font-mono text-xs font-semibold tracking-widest text-zinc-200 uppercase transition-colors group-hover:text-white">
              RAYAAN
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1 backdrop-blur-md">
            {['Who Am I?', 'Experience', 'Work'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`rounded-full font-medium text-zinc-400 transition-all duration-200 hover:bg-white/10 hover:text-white ${
                  isScrolled ? 'px-3 py-1 text-[11px]' : 'px-4 py-1.5 text-xs'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1T16iaa0RY_B-cIaqbXvnhOdpXmxpQ-iW/view?usp=sharing"
              className={`relative inline-flex items-center justify-center rounded-xl bg-white font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] ${
                isScrolled ? 'px-3 py-1 text-[11px]' : 'px-4 py-1.5 text-xs'
              }`}
            >
              Grab My Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="flex flex-col gap-1 border-t border-white/10 pt-3 pb-2 px-2 mt-2 md:hidden">
            {['Who Am I?', 'Experience', 'Work'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}