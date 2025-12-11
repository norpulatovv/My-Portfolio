import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Admin from './components/Admin'
import NotFound from './components/NotFound'

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <Router>
      <div className="min-h-screen relative bg-gradient-to-br from-[#0a0a0a] via-purple-900/40 to-cyan-900/40 text-white overflow-x-hidden">
        
        {/* Sichqoncha orqasidan nur */}
        <div 
          className="pointer-events-none fixed inset-0 z-10"
          style={{
            background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 255, 0.25), transparent 80%)`
          }}
        />

        {/* Navbar – faqat kerakli sahifalar */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-black/90 border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <Link to="/" className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Norpulatov Dev
            </Link>
            <div className="flex gap-10 text-lg">
              <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
              <Link to="/about" className="hover:text-cyan-400 transition">About</Link>
              <Link to="/skills" className="hover:text-cyan-400 transition">Skills</Link>
              <Link to="/experience" className="hover:text-cyan-400 transition">Experience</Link>
              <Link to="/projects" className="hover:text-cyan-400 transition">Projects</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
              <Link to="/admin" className="hover:text-red-400 transition font-bold">Admin</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}