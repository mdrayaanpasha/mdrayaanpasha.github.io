import Navbar from '../components/Navbar.jsx'

const SECTIONS = [
  {
    title: 'MIT 6.046J: Design & Analysis of Algorithms',
    posts: [
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xRaJpBeWLND5FsvCjRw7NQ.png',
        title: 'Distributed Algorithms',
        desc: 'Discover how synchronous distributed algorithms can help you tackle complex challenges and improve your problem-solving skills.',
        href: 'https://medium.com/@mohdrayaanpasha/synchronous-distributed-algorithms-e1398a04fd3a',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kGRz_-TuaNLA_J7Md-lnjA.png',
        title: 'Approximation Algorithms',
        desc: 'Learn approximation algorithms for solving Set Partition, Vertex Cover, and more complex problems with efficient solutions.',
        href: 'https://medium.com/@mohdrayaanpasha/surviving-the-algorithm-apocalypse-approximation-algorithms-3d7eb90c2d6b',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-Q7HKeDLZAwXiNwMyWl8qg.png',
        title: 'Network Flow Algorithms',
        desc: 'Enhance Ford-Fulkerson algorithm with DFS to find augmenting paths in network flow graphs, improving maximum flow problem solutions.',
        href: 'https://medium.com/@mohdrayaanpasha/incremental-improvement-in-network-flow-algorithms-ford-fulkerson-with-dfs-e15c117cf077',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZX3hdAawPJqRq0kmwN264A.png',
        title: 'Advance Dynamic Programming',
        desc: "Unlock advanced dynamic programming techniques with MIT's expert guidance and solve complex problems like Longest Sub Palindrome and Coin Game!",
        href: 'https://medium.com/@mohdrayaanpasha/advance-dynamic-programming-with-mit-18c110cc32a7',
      },
    ],
  },
  {
    title: 'MIT 6.S095 Programming for the puzzled',
    posts: [
      {
        img: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*_fmNHKBN28Vq1IDH.png',
        title: 'Puzzle 1: Are we conformed?',
        desc: "Solve the 'Hat Orientation' puzzle with Prof. Srini Devadas and discover three efficient solutions to align hats in a row!",
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-1-are-we-conformed-3b3c6aed37c2',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:828/format:webp/0*tZxWXWpinNcBOjiV.png',
        title: 'Puzzle 2: The Best Time to Party',
        desc: 'Discover the optimal time to party with celebrities! Learn efficient algorithms to maximize celebrity presence in a given hour.',
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-2-the-best-time-to-party-e93f5755113d',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:962/format:webp/0*t8ThXA-K7QOV3jK7.png',
        title: 'Puzzle 3: Can I read minds now?',
        desc: 'Crack the mind-reading puzzle! Learn the algorithm to guess the 5th card from a deck of 52 cards.',
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-3-can-i-read-minds-now-dbc8fcfe3f7c',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*iv8Vo-aye3l3lVp1.png',
        title: 'Puzzle 5 & 6: PLEASE STAY QUEEN!',
        desc: 'Solve the N Queens puzzle! Learn backtracking and optimize solutions to place N queens safely on a chessboard.',
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-5-6-please-stay-queen-e681840fb8f0',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1054/format:webp/0*o-zKV3buU4XrvLQ4.png',
        title: 'Puzzle 7: Tile That Courtyard Please',
        desc: 'Learn to tile a 2^n x 2^n courtyard with trominoes! Discover the recursive algorithm and code implementation.',
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-7-tile-that-courtyard-please-d0aa0086d93e',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*eNMxCzv0gpxOWhGj.png',
        title: 'Puzzle 10: A weekend to remember!',
        desc: "Learn to schedule parties without conflicts! Discover the DFS algorithm to separate guests who don't get along.",
        href: 'https://medium.com/@mohdrayaanpasha/puzzle-10-a-weekend-to-remember-d9e4e8874c8d',
      },
    ],
  },
  {
    title: 'MIT 6.042J Mathematics for Computer Science',
    posts: [
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Diq92sgQWwaKZIlzvF5RCg.png',
        title: 'Counting - I',
        desc: 'Unlock the fundamentals of math for CS! Explore counting principles, functions, relations, and pigeonhole theory with engaging examples.',
        href: 'https://medium.com/@mohdrayaanpasha/counting-i-math-for-cs-6c22c6c44641',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-k8MUhbzJ_1xPX6pSjF2A.png',
        title: 'Mounty Hall & Probability',
        desc: 'Explore the Monty Hall problem! Discover the probability of winning and losing through sample spaces and probability functions.',
        href: 'https://medium.com/@mohdrayaanpasha/mounty-hall-probability-e825baff0667',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-93tc2bZVE1ZX0EeM0kizQ.png',
        title: 'Conditional Probability',
        desc: 'Discover independence in probability! Learn how events can be independent or dependent through examples and calculations.',
        href: 'https://medium.com/@mohdrayaanpasha/conditional-probability-f43d81657778',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oViMQ-08W1iXBv9UMkdjnQ.png',
        title: 'Independence in probability',
        desc: 'Unlock the power of independence in probability! Discover how events can be connected or separate through real-life examples.',
        href: 'https://medium.com/@mohdrayaanpasha/independence-in-probability-03878845067a',
      },
    ],
  },
]

function PostCard({ post }) {
  return (
    <div className="flex w-[90vw] shrink-0 flex-col rounded-xl border border-gray-700 p-4 md:w-[30vw]">
      <img src={post.img} alt="" className="h-48 w-full rounded-xl object-cover" />
      <h2 className="mt-4 text-xl font-bold">{post.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">
        {post.desc}
      </p>
      <a
        href={post.href}
        className="mt-4 inline-block self-start rounded-lg bg-white px-6 py-3 font-bold text-black"
      >
        Read Now →
      </a>
    </div>
  )
}

export default function Blogs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dark" active="/blogs" />

      <main className="px-2">
        <div className="text-center">
          <img
            src="https://images.ctfassets.net/kftzwdyauwt9/4HGPvb9dhHOzl8BVIah0ZG/af1d09bade2e153599c6c7d7c04bc33c/apple-art-2a-2x1.jpg?w=1920&q=90&fm=webp"
            alt=""
            className="h-[60vh] w-[98vw] rounded-3xl object-cover"
          />
          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
            ALGORITHMS & MATH
          </h1>
          <p className="mt-2 text-gray-400">
            Insights and learnings from my journey in computer science.
          </p>
        </div>
      </main>

      {SECTIONS.map((section, i) => (
        <div key={section.title}>
          {i > 0 && <hr className="my-8 border-gray-700" />}
          <h2 className="m-8 text-2xl font-bold md:text-3xl">{section.title}</h2>
          <div className="flex gap-8 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {section.posts.map((post) => (
              <PostCard key={post.title + post.href} post={post} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
