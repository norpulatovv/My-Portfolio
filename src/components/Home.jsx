import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, -window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1 className="text-7xl md:text-9xl font-black mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            MIRAZIZ
          </span>
        </motion.h1>
        <motion.p className="text-3xl md:text-5xl mb-6 text-gray-200">
          15 yoshli <span className="text-cyan-400 font-bold">Frontend Dev</span>
        </motion.p>
        <p className="text-xl text-gray-400 mb-10">React • Next.js • Java Script • Node.js</p>

        <div className="flex gap-8 justify-center">
          <a href="#" className="p-5 bg-white/10 backdrop-blur-lg border border-cyan-500/50 rounded-2xl hover:scale-110 hover:bg-cyan-500/30 transition">
            <Github size={32} />
          </a>
          <a href="#" className="p-5 bg-white/10 backdrop-blur-lg border border-blue-500/50 rounded-2xl hover:scale-110 hover:bg-blue-500/30 transition">
            <Linkedin size={32} />
          </a>
          <a href="mailto:miraziz@example.com" className="p-5 bg-white/10 backdrop-blur-lg border border-purple-500/50 rounded-2xl hover:scale-110 hover:bg-purple-500/30 transition">
            <Mail size={32} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}