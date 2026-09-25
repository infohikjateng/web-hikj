import { useState, type FormEvent } from 'react'
import { CheckCircle2, ChevronRight, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'

const emailJsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send'
const whatsappUrl = 'https://wa.me/6281129019111?text=Halo%20HIK%20Jawa%20Tengah%2C%20saya%20ingin%20mendapatkan%20bantuan%20terkait%20pengaduan.'

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const categories = ['Keluhan layanan', 'Masalah produk', 'Masalah transaksi', 'Dugaan fraud atau kecurangan', 'Pelanggaran etika', 'Gratifikasi atau suap', 'Lainnya']

interface ComplaintForm {
  name: string
  email: string
  phone: string
  incidentDate: string
  category: string
  unit: string
  location: string
  description: string
  additionalInfo: string
  anonymous: boolean
  consent: boolean
}

const initialForm: ComplaintForm = {
  name: '',
  email: '',
  phone: '',
  incidentDate: '',
  category: '',
  unit: '',
  location: '',
  description: '',
  additionalInfo: '',
  anonymous: false,
  consent: false,
}

function createTicketNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `WBS-${date}-${random}`
}

export function PengaduanNasabah() {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean)

  function updateField<Key extends keyof ComplaintForm>(field: Key, value: ComplaintForm[Key]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    if (!form.anonymous && !form.name.trim()) {
      setStatus({ type: 'error', message: 'Isi nama lengkap atau pilih opsi pelaporan anonim.' })
      return
    }
    if (!form.category || !form.incidentDate || !form.description.trim() || !form.consent) {
      setStatus({ type: 'error', message: 'Lengkapi kategori, tanggal kejadian, uraian laporan, dan persetujuan data.' })
      return
    }
    if (!isEmailJsConfigured) {
      setStatus({ type: 'error', message: 'Form sudah siap, tetapi pengiriman email belum diaktifkan. Tim perlu mengisi konfigurasi EmailJS terlebih dahulu.' })
      return
    }

    setIsSubmitting(true)
    const ticketNumber = createTicketNumber()

    try {
      const response = await fetch(emailJsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            ticket_number: ticketNumber,
            reporter_name: form.anonymous ? 'Anonim' : form.name.trim(),
            reporter_email: form.email.trim() || 'Tidak dicantumkan',
            reporter_phone: form.phone.trim() || 'Tidak dicantumkan',
            incident_date: form.incidentDate,
            complaint_category: form.category,
            related_unit: form.unit.trim() || 'Tidak dicantumkan',
            incident_location: form.location.trim() || 'Tidak dicantumkan',
            complaint_description: form.description.trim(),
            additional_info: form.additionalInfo.trim() || 'Tidak ada',
          },
        }),
      })

      if (!response.ok) throw new Error('EmailJS menolak pengiriman laporan.')
      setForm(initialForm)
      setStatus({ type: 'success', message: `Laporan berhasil dikirim. Simpan nomor laporan Anda: ${ticketNumber}.` })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Laporan belum berhasil dikirim. Silakan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader title="Pengaduan nasabah" description="Sampaikan keluhan layanan atau laporan dugaan pelanggaran kepada HIK Jawa Tengah." />

      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-20">
          <div>
            <div className="mb-8 flex items-start gap-4 border-b border-line pb-6">
              <ShieldCheck className="mt-1 shrink-0 text-teal" size={27} aria-hidden="true" />
              <div>
                <h2 className="font-display text-2xl text-teal">Laporkan dengan aman</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">Isi informasi yang Anda ketahui. Anda dapat mengirimkan laporan secara anonim.</p>
              </div>
            </div>

            <form onSubmit={submitComplaint} className="space-y-7">
              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-teal">Identitas pelapor</legend>
                <label className="flex items-start gap-3 rounded-lg border border-line bg-sand/50 px-4 py-3 text-sm text-ink-soft">
                  <input type="checkbox" checked={form.anonymous} onChange={(event) => updateField('anonymous', event.target.checked)} className="mt-1 accent-teal" />
                  <span>Saya ingin mengirimkan laporan secara anonim.</span>
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nama lengkap" optional>
                    <input value={form.name} onChange={(event) => updateField('name', event.target.value)} disabled={form.anonymous} placeholder="Nama Anda" className="form-input" />
                  </Field>
                  <Field label="Alamat email" optional>
                    <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="email@contoh.com" className="form-input" />
                  </Field>
                  <Field label="Nomor telepon / WhatsApp" optional>
                    <input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="08xxxxxxxxxx" className="form-input" />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-teal">Detail laporan</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Tanggal kejadian">
                    <input type="date" required value={form.incidentDate} onChange={(event) => updateField('incidentDate', event.target.value)} className="form-input" />
                  </Field>
                  <Field label="Kategori laporan">
                    <select required value={form.category} onChange={(event) => updateField('category', event.target.value)} className="form-input">
                      <option value="">Pilih kategori</option>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </Field>
                  <Field label="Unit kerja terkait" optional>
                    <input value={form.unit} onChange={(event) => updateField('unit', event.target.value)} placeholder="Jika diketahui" className="form-input" />
                  </Field>
                  <Field label="Lokasi / kantor" optional>
                    <input value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Jika diketahui" className="form-input" />
                  </Field>
                </div>
                <Field label="Deskripsi laporan">
                  <textarea required rows={6} maxLength={5000} value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Jelaskan kronologi, waktu, pihak terkait, dan dampak yang Anda ketahui." className="form-input resize-y" />
                </Field>
                <Field label="Informasi tambahan" optional>
                  <textarea rows={4} maxLength={2000} value={form.additionalInfo} onChange={(event) => updateField('additionalInfo', event.target.value)} placeholder="Informasi lain yang dapat membantu pemeriksaan." className="form-input resize-y" />
                </Field>
              </fieldset>

              <label className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                <input type="checkbox" required checked={form.consent} onChange={(event) => updateField('consent', event.target.checked)} className="mt-1 accent-teal" />
                <span>Saya menyatakan informasi yang disampaikan benar dan menyetujui pemrosesan data untuk penanganan laporan ini.</span>
              </label>

              {status && <div role="status" className={`flex gap-3 rounded-lg px-4 py-3 text-sm leading-6 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.type === 'success' && <CheckCircle2 className="mt-1 shrink-0" size={17} aria-hidden="true" />}
                <span>{status.message}</span>
              </div>}

              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-light disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? 'Mengirim laporan...' : 'Kirim laporan'}
                {!isSubmitting && <ChevronRight size={17} aria-hidden="true" />}
              </button>
            </form>
          </div>

          <aside className="space-y-8 self-start">
            <div className="border-t-2 border-gold pt-4">
              <h2 className="font-display text-xl text-teal">Sebelum mengirim</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
                <li>Jangan tulis PIN, OTP, password, atau nomor rekening lengkap.</li>
                <li>Gunakan kronologi yang jelas dan sesuai fakta.</li>
                <li>Laporan anonim tetap dapat diproses, tetapi kontak membantu tindak lanjut.</li>
                <li>Jangan gunakan form ini untuk keadaan darurat atau pemblokiran transaksi.</li>
              </ul>
            </div>
            <div className="border-t border-line pt-4">
              <h2 className="font-display text-xl text-teal">Kanal bantuan</h2>
              <div className="mt-4 space-y-3 text-sm text-ink-soft">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-teal hover:text-teal-light"><MessageCircle size={17} aria-hidden="true" /> WhatsApp 0811-2901-9111</a>
                <a href="mailto:cs@hikjateng.co.id" className="flex items-center gap-2 font-bold text-teal hover:text-teal-light"><Mail size={17} aria-hidden="true" /> cs@hikjateng.co.id</a>
                <p>Senin - Jumat, 08:00 - 17:00 WIB</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-3">
          <ProcessStep number="01" title="Lengkapi laporan" text="Berikan informasi yang relevan dan kronologi kejadian." />
          <ProcessStep number="02" title="Pemeriksaan" text="Tim terkait meninjau laporan dan informasi pendukung." />
          <ProcessStep number="03" title="Tindak lanjut" text="Kami menghubungi Anda bila kontak disertakan dan diperlukan." />
        </div>
      </Section>
    </>
  )
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return <label className="block text-sm font-bold text-teal">{label}{optional && <span className="ml-1 font-normal text-ink-soft">(opsional)</span>}<span className="mt-2 block">{children}</span></label>
}

function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="border-t-2 border-gold pt-4"><p className="text-xs font-bold tracking-[0.18em] text-teal/60">{number}</p><h2 className="mt-2 font-display text-xl text-teal">{title}</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p></div>
}