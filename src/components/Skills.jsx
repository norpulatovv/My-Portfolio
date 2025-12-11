import { motion } from 'framer-motion'

export default function Skills() {
  const skills = [
    { name: "React", level: 92, color: "from-cyan-400 to-blue-600" },
    { name: "Next.js", level: 88, color: "from-purple-400 to-pink-600" },
    { name: "Java SCript", level: 95, color: "from-green-400 to-teal-600" },
    { name: "Node.js", level: 75, color: "from-yellow-400 to-orange-600" },
    { name: "TypeScript", level: 80, color: "from-blue-400 to-indigo-600" }
  ]

  return (
    <section className="min-h-screen pt-32 px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-8xl md:text-9xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Skills Matrix
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl group-hover:blur-xl transition-all" />
            <div className="relative bg-white/5 backdrop-blur-3xl border border-cyan-500/50 rounded-3xl p-10 text-center">
              <motion.div
                className="text-6xl font-black mb-6"
                style={{ background: `conic-gradient(${skill.color} ${skill.level}%, transparent ${skill.level}%)` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="bg-black rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                  <span className="text-4xl text-cyan-400">{skill.level}%</span>
                </div>
              </motion.div>
              <h3 className="text-3xl font-bold text-cyan-300">{skill.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}