import Navbar from '../components/Navbar.jsx'

function Section({ img, reverse = false, bg, textColor, btnColor, children }) {
  return (
    <section
      className={`flex flex-col items-center justify-around gap-6 p-8 md:min-h-[70vh] ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
      style={{ backgroundColor: bg, color: textColor }}
    >
      <img
        src={img}
        alt=""
        className="max-h-[80vh] rounded-xl object-cover shadow-2xl md:h-[80%]"
      />
      <div className="max-w-[90%] p-4">{children}</div>
    </section>
  )
}

function ViewBtn({ href, color }) {
  return (
    <a
      href={href}
      className="mt-4 inline-block rounded-lg bg-white px-5 py-2 font-bold"
      style={{ color: color || '#171717' }}
    >
      View Source Code →
    </a>
  )
}

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dark" active="/projects" />

      <main className="px-2">
        <div className="text-center">
          <p className="text-2xl font-semibold" style={{ color: '#85B9C7' }}>
            Web & DSA
          </p>
          <p className="mt-2 text-gray-400">
            My Projects Cover Dynamic Websites built with MERN or PHP-SQL. They
            also include Data Structures.
          </p>
          <h1 className="mt-2 text-3xl font-bold" style={{ color: '#85B9C7' }}>
            Scroll ⇓
          </h1>
        </div>
        <img
          src="/projects/imgs/cover.jpeg"
          alt=""
          className="mt-4 h-[60vh] w-[98vw] rounded-3xl object-cover"
        />
      </main>

      <div className="mt-8">
        <Section img="/projects/imgs/ship-algo.jpg">
          <h2 className="text-3xl font-bold">Ship Route Optimization Algorithm</h2>
          <p className="mt-2 text-gray-400">
            Optimize routes between 5 major Indian ports with an augmented
            Dijkstra algorithm, considering distance and risk factors for
            efficient navigation.
          </p>
          <ViewBtn href="https://github.com/mdrayaanpasha/MIT-DAA/blob/main/route.py" />
        </Section>

        <Section img="/projects/imgs/skillflix.jpeg" reverse bg="#8FB2C3" textColor="white">
          <h2 className="text-3xl font-bold">Social Networking - MERN | '24</h2>
          <p className="mt-2">
            Skillflix is a Social Networking site, made with MERN, featuring
            authentication, messaging, notifications Systems & More.
          </p>
          <ViewBtn href="https://github.com/mdrayaanpasha/Skill-Flix-MERN" color="#85B9C7" />
        </Section>

        <Section img="/projects/imgs/retro-active.jpeg">
          <h2 className="text-3xl font-bold">
            Fully Confluent Retro-Active Data Structure | '24
          </h2>
          <p className="mt-2 text-gray-400">
            A novel data structure that combines retroactivity with confluence,
            enabling dynamic management of historical data and merging divergent
            histories.
          </p>
          <ViewBtn href="https://www.linkedin.com/pulse/innovating-data-structures-introducing-fully-confluent-rayaan-pasha-kezqf/" />
        </Section>

        <Section img="/projects/imgs/market-place.jpeg" reverse bg="#451A13" textColor="white">
          <h2 className="text-3xl font-bold">Service Market Place - MERN | '24</h2>
          <p className="mt-2">
            Created a platform where people can find doctors & Teachers, had
            authentication system & intuitive appointment algorithm.
          </p>
          <ViewBtn href="https://github.com/mdrayaanpasha/finder" color="#451A13" />
        </Section>

        <Section img="/projects/imgs/pritts.jpg">
          <h2 className="text-3xl font-bold">E-Commerce Website - PHP SQL | '24</h2>
          <p className="mt-2 text-gray-400">
            Drawing inspiration from popular sit-com "Modern Family" created an
            e-com store for fictional Prittchets Closet.
          </p>
          <ViewBtn href="https://github.com/mdrayaanpasha/pritchetts" />
        </Section>

        <Section img="/projects/imgs/collply.jpeg" reverse bg="#C77C47" textColor="white">
          <h2 className="text-3xl font-bold">College Application - PHP SQL | '24</h2>
          <p className="mt-2">
            Created a platform where prospect college students could apply to
            multiple colleges on one platform, featuring dynamic forms,
            authemticaton & search systems.
          </p>
          <ViewBtn href="https://github.com/mdrayaanpasha/collply" color="#C77C47" />
        </Section>
      </div>
    </div>
  )
}
