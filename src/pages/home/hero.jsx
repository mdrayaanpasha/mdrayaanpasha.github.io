import React from 'react';
import { Link } from 'react-router-dom';
import Galaxy from '../../components/Galaxy';

export default function AestheticHero() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 font-sans flex flex-col justify-between selection:bg-pink-500 selection:text-white"
    >

      {/* 0. GALAXY WEBGL STARFIELD BACKDROP */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      {/* 3. TRANSPARENT GLASS NAVBAR */}
      <header className="relative z-30 pt-6 px-4 flex justify-center">
        <nav className="flex items-center justify-between w-full max-w-4xl px-6 py-2.5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
          <a href="#" className="text-xs font-mono font-bold tracking-widest text-zinc-100 hover:text-cyan-300 transition-colors">
            VORTEX<span className="text-pink-400">.OS</span>
          </a>

          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-zinc-400">
            {['ABOUT', 'ARCHITECTURE', 'CHAOS', 'DOCS'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href="#init"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            INITIALIZE
          </a>
        </nav>
      </header>

      {/* 4. MAIN HERO CONTENT */}
      <main className="relative z-20 my-auto text-center px-4 py-12 flex flex-col items-center justify-center">
        
        {/* Title with Pastel Gradient Text & Glitch/Scale Hover Effect */}
        <h1 className="group relative font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl cursor-default select-none">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            RAYAAN
          </span>
          
          {/* Hover Animated Glow Gradient State */}
      
        </h1>

        {/* Interactive Subtitle */}
        <p className="mt-6 text-xs sm:text-sm md:text-base font-mono tracking-wide text-zinc-300 max-w-2xl">
          SOFTWARE ENGINEER <span className="text-pink-400">·</span> BACKEND & DISTRIBUTED SYSTEMS
        </p>

        {/* Backend Developer Mode — routes to the live API console */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/api"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] px-7 py-3 font-mono text-xs font-bold text-emerald-200 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10 hover:shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:scale-105 active:scale-95"
          >
            {/* Sweeping sheen on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="relative tracking-widest">$ BACKEND DEVELOPER MODE</span>
            <span className="relative text-emerald-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <span className="font-mono text-[10px] tracking-widest text-zinc-500">
            curl api.rayaan.dev/v1/profile
          </span>
        </div>

      </main>



    </div>
  );
}