import Navbar from './Navbar.jsx'

/** Dark page wrapper with hero used by inner content pages. */
export function PageShell({ active, cover, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dark" active={active} />
      <main className="px-2">
        <div className="flex flex-col items-center text-center">
          <img
            src={cover}
            alt=""
            className="h-[60vh] w-[98vw] rounded-3xl object-cover"
          />
          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">{title}</h1>
          <p className="mt-2 text-gray-400">{subtitle}</p>
        </div>
      </main>
      {children}
    </div>
  )
}

/** Alternating image / description row. */
export function Card({ img, reverse = false, children }) {
  return (
    <div
      className={`mb-16 flex flex-col items-center justify-evenly gap-6 md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {img && (
        <img
          src={img}
          alt=""
          className="w-[80vw] rounded-2xl object-cover md:w-[30vw]"
        />
      )}
      <div className="max-w-[80vw] p-2 md:max-w-[55vw]">{children}</div>
    </div>
  )
}
