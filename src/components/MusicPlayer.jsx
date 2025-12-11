export default function MusicPlayer() {
    const tracks = [
      { title: "Daft Punk – Get Lucky", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Imagine Dragons – Believer", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { title: "The Weeknd – Blinding Lights", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ]
  
    return (
      <section className="min-h-screen pt-32 px-6 bg-gradient-to-br from-[#0a0a0a]/95 via-purple-900/20 to-cyan-900/20 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-3xl border border-cyan-500/50 rounded-3xl p-12 shadow-2xl max-w-3xl w-full">
          <h1 className="text-7xl font-black text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            My Playlist
          </h1>
          <div className="space-y-8">
            {tracks.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl"
              >
                <div className="text-2xl font-bold text-cyan-300">{t.title}</div>
                <audio controls className="w-72 accent-cyan-500">
                  <source src={t.url} type="audio/mpeg" />
                </audio>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }