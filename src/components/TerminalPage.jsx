import { useState } from 'react'

export default function TerminalPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState(['$ whoami', 'norpulatovv – 15 yoshli frontend developer'])

  const commands = {
    whoami: 'norpulatovv – 15 yoshli frontend ninja',
    projects: '3 ta loyiha tez orada qo‘shiladi...',
    skills: 'React, Next.js, Tailwind, Node.js, Framer Motion',
    clear: () => setOutput([])
  }

  const runCommand = () => {
    if (commands[input]) {
      if (typeof commands[input] === 'function') {
        commands[input]()
      } else {
        setOutput([...output, `$ ${input}`, commands[input]])
      }
    } else {
      setOutput([...output, `$ ${input}`, 'command not found: ' + input])
    }
    setInput('')
  }

  return (
    <section className="min-h-screen pt-32 px-6 bg-black text-green-400 font-mono">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-2xl border border-green-500">
        <div className="text-4xl mb-8">~ norpulatovv@dev-terminal</div>
        <div className="space-y-2">
          {output.map((line, i) => <div key={i}>{line}</div>)}
          <div className="flex">
            <span>$ </span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runCommand()}
              className="bg-transparent outline-none flex-1 ml-2"
              autoFocus
            />
          </div>
        </div>
      </div>
    </section>
  )
}