import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Guestbook() {
  const [messages] = useState([
    { name: "Ali", msg: "Sayting juda zo‘r bo‘libdi!" },
    { name: "Vali", msg: "15 yoshda buncha zo‘r ish qilasanmi?!" },
    { name: "Sardor", msg: "Respect bro, davom et!" }
  ])

  return (
    <section className="min-h-screen pt-32 px-6 bg-gradient-to-br from-[#0a0a0a]/95 via-purple-900/20 to-cyan-900/20">
      <h1 className="text-9xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Guestbook
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-10 hover:border-cyan-400 transition-all"
          >
            <div className="text-3xl font-bold text-cyan-400 mb-3">{m.name}</div>
            <p className="text-xl text-gray-300">{m.msg}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}