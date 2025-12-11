export default function NotFound() {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-9xl font-black bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">404</h1>
          <p className="text-5xl text-gray-400 mt-10">Sahifa yo‘q, lekin sen topilding</p>
          <p className="text-3xl text-cyan-400 mt-10">Tez orada Snake o‘yini qo‘shiladi</p>
          <a href="/" className="mt-16 inline-block px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-3xl font-bold hover:scale-110 transition">
            Uyga qaytish
          </a>
        </div>
      </section>
    )
  }