import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'

const kanal = [
  { label: 'Jam layanan', value: 'Senin - Jumat, 08:00 - 17:00 WIB' },
  { label: 'Email', value: 'cs@hikjateng.co.id' },
  { label: 'Whatsapp center', value: '0811-2901-9111' },
  { label: 'Telepon', value: '(0281) 6843115' },
]

export function HubungiKami() {
  return (
    <>
      <PageHeader title="Hubungi kami" description="Tim kami siap membantu pertanyaan seputar produk dan layanan." />
      <Section tone="canvas">
        <dl className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {kanal.map((k) => (
            <div key={k.label} className="border-t-2 border-gold pt-4">
              <dt className="text-xs uppercase tracking-wide text-ink-soft">{k.label}</dt>
              <dd className="mt-2 font-display text-lg text-teal">{k.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
