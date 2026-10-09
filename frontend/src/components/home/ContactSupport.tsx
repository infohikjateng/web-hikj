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

export function ContactSupport({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={
        compact
          ? 'rounded-3xl bg-forest p-4 shadow-[0_8px_24px_rgba(7,59,42,0.16)] sm:p-5'
          : 'bg-sand px-4 py-12 sm:px-6 md:px-10 md:py-16'
      }
    >
      <div className={compact ? '' : 'mx-auto max-w-6xl'}>
        <div className={compact ? '' : 'mx-auto max-w-2xl text-center'}>
          <h2 className={compact ? 'text-xl font-bold tracking-tight text-white' : 'mt-2 text-3xl font-bold tracking-tight text-teal md:text-4xl'}>
            Butuh bantuan?
          </h2>
        </div>

        <dl
          className={`grid ${
            compact ? 'mt-4 grid-cols-2 gap-2.5 sm:gap-3' : 'mt-8 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            const content = (
              compact ? (
                <span className="flex min-w-0 items-start gap-2.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <dt className="text-[11px] font-bold text-teal sm:text-xs">{item.label}</dt>
                    <dd className="mt-0.5 wrap-break-words text-[10px] leading-4 text-ink-soft sm:text-xs sm:leading-5">{item.value}</dd>
                  </span>
                </span>
              ) : (
                <>
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sand text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Icon size={21} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <dt className="mt-4 text-lg font-bold text-teal">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink-soft">{item.value}</dd>
                </>
              )
            )

            return (
              <div
                key={item.label}
                className={
                  compact
                    ? 'min-w-0 rounded-2xl border border-white/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md'
                    : 'group rounded-2xl border border-teal/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lg'
                }
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
