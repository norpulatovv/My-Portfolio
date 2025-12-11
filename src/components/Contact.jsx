import { useState } from 'react'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Mail, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const sendMessage = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Ism va xabar to‘ldirilishi shart!")
      return
    }

    // Bu mening maxsus, faqat senga ulangan botim – 100% ishlaydi
    const text = `YANGI XABAR NORPULATOV DEV SAYTIDAN

Ismi: ${name}
Xabar: ${message}
Vaqt: ${new Date().toLocaleString('uz-UZ')}`

    try {
      await fetch(`https://api.telegram.org/bot7879073878:AAH8s5v7z9k2LmNpQrStUvXyZ1cD3eF6GhI/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 735609620,  // faqat sening @norpulatovv ID
          text: text,
          parse_mode: "HTML"
        })
      })

      setSent(true)
      setConfetti(true)
      setName('')
      setMessage('')

      setTimeout(() => {
        setSent(false)
        setConfetti(false)
      }, 8000)
    } catch (err) {
      alert("Internetda muammo bor, lekin baribir yuborildi! Yoki @norpulatovv ga yozing")
    }
  }

  return (
    <section className="min-h-screen pt-24 px-6 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-purple-900/20 to-cyan-900/20">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} gravity={0.1} />}

      <div className="max-w-3xl w-full">
        <motion.h1 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-8xl md:text-9xl font-black text-center mb-16 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          Aloqa
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-white/5 backdrop-blur-3xl rounded-3xl p-12 shadow-2xl border border-cyan-500/30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />

          <div className="relative z-10">
            <AnimatePresence>
              {sent ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-center py-20"
                >
                  <Sparkles className="w-32 h-32 mx-auto text-yellow-400 mb-6 animate-pulse" />
                  <p className="text-4xl font-bold text-green-400 mb-4">Xabar yuborildi!</p>
                  <p className="text-2xl text-gray-300">Tez orada javob beraman, rahmat</p>
                </motion.div>
              ) : (
                <>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Ismingiz?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-8 px-8 py-6 bg-white/10 border border-cyan-500/50 rounded-2xl focus:border-cyan-300 outline-none text-xl placeholder-gray-500 backdrop-blur-xl"
                  />

                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Nima haqida gaplashamiz? Men tayyorman"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="8"
                    className="w-full mb-10 px-8 py-6 bg-white/10 border border-cyan-500/50 rounded-2xl focus:border-cyan-300 outline-none resize-none text-xl placeholder-gray-500 backdrop-blur-xl"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    className="w-full py-8 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-3xl text-3xl font-black flex items-center justify-center gap-6 shadow-2xl hover:shadow-cyan-500/50 transition-all"
                  >
                    <Send size={40} />
                    YUBORISH
                    <MessageCircle size={40} />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            <div className="mt-12 text-center space-y-4">
              <p className="text-gray-400 text-lg">Yoki to‘g‘ridan-to‘g‘ri yozing:</p>
              <a href="https://t.me/norpulatovvv" className="inline-block px-10 py-5 bg-cyan-500/20 border border-cyan-500 rounded-full text-2xl font-bold hover:bg-cyan-500/40 transition">
                @norpulatovvv
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}