import { PageShell, Card } from '../components/PageShell.jsx'

export default function Research() {
  return (
    <PageShell
      active="/research"
      cover="/research/imgs/cover.jpg"
      title="RE-IMAGINING DATA STRUCTURES."
      subtitle="Discover My insights and findings in the field of data structures."
    >
      <section className="mt-12 px-4">
        <h2 className="p-4 text-3xl font-extrabold">RECENT WORK</h2>

        <Card img="/research/imgs/DPB-BSTS.jpeg">
          <h3 className="text-2xl font-bold">Dynamic Pointer-Based BST's.</h3>
          <p className="mt-2 text-gray-400">
            This research presents a new data structure that combines pointer
            machines and binary search trees to efficiently manage and search
            large numerical data. By dynamically partitioning data and using
            separate BSTs for each sub-range, it enhances the average time
            complexity to O( 2 * floor(log(Query Number))).
          </p>
          <a
            href="https://zenodo.org/records/13899127"
            className="mt-4 inline-block rounded-lg bg-white px-6 py-2 font-bold text-black"
          >
            Access Paper →
          </a>
        </Card>

        <Card img="/projects/imgs/retro-active.jpeg" reverse>
          <h3 className="text-2xl font-bold">
            Fully Retroactive Confluent Data Structure
          </h3>
          <p className="mt-2 text-gray-400">
            The Fully Retroactive Confluent Data Structure is an innovative
            solution for managing historical data. It enables retroactive
            modifications of past data without affecting future states and
            supports confluent merging of divergent versions into a coherent new
            version.
          </p>
          <a
            href="https://www.linkedin.com/pulse/innovating-data-structures-introducing-fully-confluent-rayaan-pasha-kezqf/"
            className="mt-4 inline-block rounded-lg bg-white px-6 py-2 font-bold text-black"
          >
            Access Paper →
          </a>
        </Card>
      </section>
    </PageShell>
  )
}
