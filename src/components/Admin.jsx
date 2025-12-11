import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
    if (password === "12345") {
      setLoggedIn(true)
    } else {
      alert("Parol noto‘g‘ri! Maslahat: 12345 😉")
    }
  }

  if (!loggedIn) {
    return (
      <section className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/10 backdrop-blur-3xl border border-red-500/50 rounded-3xl p-16 text-center shadow-2xl"
        >
          <h1 className="text-7xl font-black mb-10 text-red-500">ADMIN PANEL</h1>
          <input
            type="password"
            placeholder="Parol..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="px-10 py-6 text-2xl rounded-xl bg-white/10 border border-red-500/50 focus:border-red-400 outline-none mb-8 w-80"
          />
          <br />
          <button 
            onClick={login}
            className="px-16 py-6 bg-red-600 hover:bg-red-700 rounded-xl text-2xl font-bold transition"
          >
            KIRISH
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-32 px-6">
      <h1 className="text-9xl font-black text-center mb-20 text-green-400">XUSH KELIBSIZ, BOSS!</h1>
      <div className="text-center text-4xl space-y-6">
        <p>Saytga kirganlar: <span className="text-cyan-400">0</span></p>
        <p>Yuborilgan xabarlar: <span className="text-cyan-400">0</span></p>
        <p>Status: <span className="text-green-400">ONLINE</span></p>
      </div>
    </section>
  )
}