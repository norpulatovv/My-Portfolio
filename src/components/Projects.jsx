import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, X } from 'lucide-react'

const projects = [
  {
    title: "Weather App",
    desc: "Real-time ob-havo ilovasi – shaharni kiritsangiz, harorat, namlik, shamol darrov chiqadi",
    live: "https://norpulatovv.github.io/Weather-App/",     // ← bu yerda ochiladi
    code: "https://github.com/norpulatovv/Weather-App",     // ← bu yerda GitHub ochiladi
    tags: ["React", "OpenWeather API", "Tailwind"],
    color: "from-cyan-400 to-blue-600"
  },
  {
    title: "Loyiha 2 (tez orada)",
    desc: "Keyingi zo‘r loyiham shu yerda bo‘ladi...",
    live: null,
    code: null,
    tags: ["Next.js", "TypeScript"],
    color: "from-purple-400 to-pink-600"
  },
  {
    title: "Loyiha 3 (tez orada)",
    desc: "Yana biri kelyapti, kuting...",
    live: null,
    code: null,
    tags: ["Node.js", "Socket.io"],
    color: "from-green-400 to-teal-600"
  }
]

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="min-h-screen pt-32 px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-8xl md:text-9xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Mening Loyihalarim
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="group relative bg-white/5 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl overflow-hidden hover:border-cyan-400 transition-all duration-500 shadow-2xl"
          >

            {/* Live Demo iframe */}
            {selected === i && p.live ? (
              <div className="relative h-96 bg-black">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
                >
                  <X size={28} />
                </button>
                <iframe
                  src={p.live}
                  className="w-full h-full border-0"
                  title={p.title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className={`h-64 bg-gradient-to-br ${p.color}/50 flex items-center justify-center`}>
                <div className="text-9xl font-black text-white/20">{i + 1}</div>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-3xl font-bold mb-3 text-cyan-300">{p.title}</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">{p.desc}</p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {p.tags.map(t => (
                  <span key={t} className="px-5 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {p.live ? (
                  <button
                    onClick={() => setSelected(i)}
                    className="flex-1 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl hover:scale-105 transition flex items-center justify-center gap-3"
                  >
                    <ExternalLink size={28} />
                    Live Demo
                  </button>
                ) : (
                  <div className="flex-1 py-5 bg-gray-700 rounded-2xl text-center text-gray-400 text-xl font-medium">
                    Tez orada...
                  </div>
                )}

                {p.code ? (
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-5 bg-white/10 border border-cyan-500/50 rounded-2xl hover:bg-white/20 transition flex items-center gap-3 font-bold"
                  >
                    <Github size={28} />
                    Kod
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}