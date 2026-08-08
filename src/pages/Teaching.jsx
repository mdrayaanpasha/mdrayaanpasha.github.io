import { PageShell, Card } from '../components/PageShell.jsx'

export default function Teaching() {
  return (
    <PageShell
      active="/teaching"
      cover="/homepage-imgs/cover.png"
      title="SPREADING MATH & CS"
      subtitle="Helping high schoolers discover the power of math and computer science"
    >
      <section className="mt-20 px-4">
        <Card img="/teaching/imgs/cs.jpg">
          <h3 className="text-2xl font-bold">Computer Science</h3>
          <p className="mt-2 text-gray-400">
            I introduce the world of programming, especially OOP with Java for
            freshmen and sophomores studying in the ICSE curriculum in their high
            school. My goal is to spark algorithmic thinking while considering
            ethical computing responsibilities.
          </p>
        </Card>

        <Card img="/teaching/imgs/math.jpg" reverse>
          <h3 className="text-2xl font-bold">Mathematics</h3>
          <p className="mt-2 text-gray-400">
            I teach a wide range of Math topics from Pre-calculas, geometry,
            statistics, and probability, tailored to meet the needs of students
            across ICSE, CBSE, and KSEAB systems.
          </p>
        </Card>
      </section>
    </PageShell>
  )
}
