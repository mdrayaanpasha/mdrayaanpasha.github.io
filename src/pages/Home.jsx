import Navbar from '../components/Navbar.jsx'
import HomeHero from './home/hero.jsx'
import SelectedWorkCatalog from './home/projects.jsx'
import ScrollRevealSection from './home/scroll-about.jsx'
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

const PROJECTS = [
  {
    title: "🚢 Route Optimization Algorithm for Safer, Faster Shipping | '24",
    img: '/projects/imgs/ship-algo.jpg',
    href: 'https://github.com/mdrayaanpasha/MIT-DAA/blob/main/route.py',
  },
  {
    title: "🫂 Social Networking [MERN] | '24",
    img: '/projects/imgs/skillflix.jpeg',
    href: 'https://github.com/mdrayaanpasha/Skill-Flix-MERN',
  },
  {
    title: "👨🏻‍💼 Service MarketPlace [MERN] | '24",
    img: '/projects/imgs/market-place.jpeg',
    href: 'https://github.com/mdrayaanpasha/finder',
  },
  { 
    title: "🛍️ E-Commerce Website [PHP-SQL] | '24",
    img: '/projects/imgs/pritts.jpg',
    href: 'https://github.com/mdrayaanpasha/pritchetts',
  },
  {
    title: "🏫 College Application [PHP SQL] | '24",
    img: '/projects/imgs/collply.jpeg',
    href: 'https://github.com/mdrayaanpasha/collply',
  },
  {
    title: "🧩 Fully Confluent Retro-Active Data Structure | '24",
    img: '/projects/imgs/retro-active.jpeg',
    href: 'https://www.linkedin.com/pulse/innovating-data-structures-introducing-fully-confluent-rayaan-pasha-kezqf/',
  },
]

export default function Home() {
  return (
    <div className="bg-white text-black">
      <Navbar variant="light" />

      {/* Hero */}
      <HomeHero />
      <ScrollRevealSection />
      <ExperienceSection />
      <SelectedWorkCatalog />
      <FloatingBottomDock />

    
    
    </div>
  )
}
