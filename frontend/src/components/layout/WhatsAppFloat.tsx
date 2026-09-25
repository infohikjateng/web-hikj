import { useState, type FormEvent } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'

const whatsappUrl = 'https://wa.me/6281129019111?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan%20BPRS%20HIK%20Jawa%20Tengah.'
const apiUrl = import.meta.env.VITE_API_URL || '/api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: 'Halo, saya asisten informasi HIK Jawa Tengah. Silakan tanyakan produk atau layanan perbankan syariah kami.',
}

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = message.trim()
    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user' as const, content }]
    setMessages(nextMessages)
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-6),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Chatbot sedang tidak tersedia.')
      setMessages((current) => [...current, { role: 'assistant', content: result.answer }])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Maaf, chatbot sedang mengalami kendala.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {isOpen && (
        <section className="mb-4 flex h-[min(32rem,calc(100vh-8rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-teal/20" aria-label="Chat AI HIK Jawa Tengah">
          <header className="flex items-center justify-between bg-teal px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} aria-hidden="true" />
              <div>
                <p className="text-sm font-bold">Asisten HIK Jawa Tengah</p>
                <p className="text-[11px] text-white/75">Informasi perbankan syariah</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Tutup chat" className="rounded-md p-1 hover:bg-white/10">
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-sand/40 p-3" aria-live="polite">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-5 ${item.role === 'user' ? 'rounded-br-sm bg-teal text-white' : 'rounded-bl-sm bg-white text-ink shadow-sm'}`}>
                  {item.content}
                </p>
              </div>
            ))}
            {isLoading && <p className="text-xs text-ink-soft">Asisten sedang mengetik...</p>}
          </div>

          <form onSubmit={sendMessage} className="border-t border-line bg-white p-3">
            <div className="flex items-end gap-2">
              <label className="sr-only" htmlFor="chat-message">Pertanyaan untuk asisten</label>
              <textarea
                id="chat-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tulis pertanyaan..."
                maxLength={500}
                rows={2}
                className="min-h-10 flex-1 resize-none rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-teal"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !message.trim()} aria-label="Kirim pertanyaan" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal text-white hover:bg-teal-light disabled:cursor-not-allowed disabled:opacity-40">
                <Send size={17} aria-hidden="true" />
              </button>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-teal underline underline-offset-2">
              <MessageCircle size={14} aria-hidden="true" /> Hubungi kantor lewat WhatsApp
            </a>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Tutup asisten chat' : 'Buka asisten chat'}
        title="Buka asisten chat"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-white"
      >
        {isOpen ? <X size={27} strokeWidth={2.2} aria-hidden="true" /> : <MessageCircle size={27} strokeWidth={2.2} aria-hidden="true" />}
        <span className="sr-only">Asisten chat HIK Jawa Tengah</span>
      </button>
    </div>
  )
}