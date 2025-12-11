import { motion } from 'framer-motion'

export default function About() {
  const skills = ["React", "Next.js", "Java Script", "Node.js", "TypeScript", "Framer Motion", "Git"]

  return (
    <section className="min-h-screen pt-32 px-6 max-w-5xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Men haqimda
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-10 shadow-2xl"
      >
        <p className="text-xl leading-relaxed text-gray-300 text-center mb-10">
          Salom! Men Miraziz, 15 yoshdaman. 14 yoshimdan dasturlash bilan shug‘ullanyapman.<br/>
          Hozirda React va Java Script da epik loyihalar qilaman.<br/>
          Kelajakda kuchli Fullstack Developer bolib o‘z startupimni ochib, Dunyoga foyda keltirmoqchiman!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full text-cyan-300 font-medium hover:scale-110 transition"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}