import { motion } from 'framer-motion'

export default function Experience() {
  const events = [
    { year: "2023", title: "HTML/CSS boshladim", desc: "Birinchi sayt – Minecraft server" },
    { year: "2024", title: "JavaScript + React", desc: "Dinamik ilovalar yaratdim" },
    { year: "2025", title: "Next.js + Tailwind", desc: "Zamonaviy loyihalar" },
    { year: "2025", title: "Norpulatov Dev", desc: "O‘zbekistondagi #1 15 yoshli portfolio" },
    { year: "Kelajak", title: "Fullstack + Startup", desc: "Million dollarlik loyiha" }
  ]

  return (
    <section className="min-h-screen pt-32 px-6">
      <h1 className="text-9xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Timeline
      </h1>
      <div className="max-w-4xl mx-auto">
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} mb-20`}
          >
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? -5 : 5 }}
                className="bg-white/10 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-8 shadow-2xl"
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">{e.year}</div>
                <h3 className="text-3xl font-bold mb-3">{e.title}</h3>
                <p className="text-xl text-gray-300">{e.desc}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}