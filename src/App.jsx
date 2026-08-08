import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Research from './pages/Research.jsx'
import Projects from './pages/Projects.jsx'
import Teaching from './pages/Teaching.jsx'
import Education from './pages/Education.jsx'
import Blogs from './pages/Blogs.jsx'
import ApiConsole from './pages/api-console/ApiConsole.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/research" element={<Research />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/teaching" element={<Teaching />} />
      <Route path="/education" element={<Education />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/api" element={<ApiConsole />} />
      <Route path="/console" element={<ApiConsole />} />
    </Routes>
  )
}
