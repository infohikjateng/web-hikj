import type { LucideIcon } from 'lucide-react'
import { Clock3, Mail, MessageCircle, Phone } from 'lucide-react'

interface ContactItem {
  label: string
  value: string
  icon: LucideIcon
  href?: string
}

const contactItems: ContactItem[] = [
  {
    label: 'Jam layanan',
    value: 'Senin - Jumat, 08:00 - 17:00 WIB',
    icon: Clock3,
  },
  {
    label: 'Email',
    value: 'cs@hikjateng.co.id',
    href: 'mailto:cs@hikjateng.co.id',
    icon: Mail,
  },
  {
    label: 'Whatsapp center',
    value: '0811-2901-9111',
    href: 'https://wa.me/6281129019111',
    icon: MessageCircle,
  },
  {
    label: 'Nomor telepon',
    value: '(0281) 6843115',
    href: 'tel:+622816843115',
    icon: Phone,
  },
]

export function ContactSupport() {
  return (
    <section className="bg-sand px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-teal md:text-4xl">Butuh bantuan?</h2>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sand text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <Icon size={21} strokeWidth={2} aria-hidden="true" />
                </span>
                <dt className="mt-4 text-lg font-bold text-teal">{item.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-ink-soft">{item.value}</dd>
              </>
            )

            return (
              <div
                key={item.label}
                className="group rounded-2xl border border-teal/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lg"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="block h-full rounded-xl focus-visible:outline-teal"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
