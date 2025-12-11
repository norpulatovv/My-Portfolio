export default function Blog() {
    const posts = [
      { title: "React 19 yangiliklari", date: "11.12.2025" },
      { title: "Tailwind bilan 10 daqiqada sayt", date: "10.12.2025" },
      { title: "15 yoshda dasturchi bo‘lish", date: "09.12.2025" }
    ]
  
    return (
      <section className="min-h-screen pt-32 px-6 bg-gradient-to-br from-[#0a0a0a]/95 via-purple-900/20 to-cyan-900/20">
        <h1 className="text-9xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 cursor-pointer hover:border-cyan-400 transition-all"
            >
              <h3 className="text-3xl font-bold text-cyan-300 mb-4">{p.title}</h3>
              <p className="text-gray-400 text-lg">{p.date}</p>
            </motion.div>
          ))}
        </div>
      </section>
    )
  }