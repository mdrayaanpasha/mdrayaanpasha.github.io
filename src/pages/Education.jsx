import { PageShell, Card } from '../components/PageShell.jsx'

export default function Education() {
  return (
    <PageShell
      active="/education"
      cover="/education/imgs/cover.jpg"
      title="GLIMPSE INTO MY FORMAL EDUCATION."
      subtitle="Discover My Educational Journey Traversing From Commerce to CS."
    >
      <section className="mt-20 px-4">
        <Card img="/education/imgs/sju-img.jpg">
          <h3 className="text-2xl font-bold">
            Bachelors of Computer Applications | St. Joseph's University | 24-27
          </h3>
          <p className="mt-2 text-gray-400">
            Freshman, Studying Computer Applications, Currently Exploring C
            Language, Mathematics, Unix System & Basic Computer Science Concepts.
          </p>
        </Card>

        <Card img="/education/imgs/cathedral-img.jpg" reverse>
          <h3 className="text-2xl font-bold">
            CS + Commerce | Class 12th | Cathedral Pre-Univeristy College | 22-24
          </h3>
          <p className="mt-2 text-gray-400">
            Pursued Computer Science, whereby i explored: C++ Language with
            fundamental Data structures & SQL. Explored Fundamental Micro & Macro
            Economics, Marketing & Management, Financial Statements & More.
            Participated in various inter-college events like Code Guru,
            Econ-Spire, Best Manager x 2 also co-ordinated Best Manager Event For
            intra-college fest.
          </p>
        </Card>

        <Card img="/education/imgs/stxaveiers-img.jpg">
          <h3 className="text-2xl font-bold">
            Class 10th | St. Xaveir's High School | 19-22
          </h3>
          <p className="mt-2 text-gray-400">
            Pursued English, Hindi, Kannada, Math, Biology, Chemistry, Physics,
            History & more. Participated in National Cadet Corps Group, Achieved
            2nd place in Science exhibition for demonstrating electrolysis of
            water on a budget of just ₹15.
          </p>
        </Card>
      </section>
    </PageShell>
  )
}
