import Navbar from '../components/Navbar.jsx'
import HomeHero from './home/hero.jsx'
import SelectedWorkCatalog from './home/projects.jsx'
import ScrollReveal from '../components/scrollReveal.jsx'
import FloatingBottomDock from './home/sticky-social.jsx'
import ExperienceSection from './home/experience.jsx'

function Lemon({ color, children }) {
  return (
    <span
      className="mt-2 inline-block rounded-full px-4 py-0.5 text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  )
}



export default function Home() {
  return (
    <div className="bg-zinc-950 text-white selection:bg-pink-500 selection:text-white">
      <Navbar variant="light" />

      {/* Hero */}
      <HomeHero />

      <section className="relative w-full bg-[#09090B] px-6 py-28 sm:py-36 flex items-center justify-center ">
        <div className="mx-auto max-w-5xl ">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={5}
            blurStrength={10}
            textClassName="text-zinc-100 font-light"
          >
            I design & build scalable systems. 1+ yr experience in fundamental system design (distributed systems, CI/CD, data pipelines,etc) across startups. currently interning @ manaverse. 
          </ScrollReveal>
        </div>
      </section>

      <ExperienceSection />
      <SelectedWorkCatalog />
      <FloatingBottomDock />
    </div>
  )
}
