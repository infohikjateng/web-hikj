import { useRef, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
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
const steps = [
  { title: 'Jenis laporan', description: 'Pilih kategori dan waktu kejadian.' },
  { title: 'Ceritakan kejadian', description: 'Tuliskan kronologi yang Anda ketahui.' },
  { title: 'Identitas & kontak', description: 'Pilih apakah ingin melapor secara anonim.' },
  { title: 'Periksa & kirim', description: 'Pastikan informasi sudah sesuai.' },
]

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
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean)

  function updateField<Key extends keyof ComplaintForm>(field: Key, value: ComplaintForm[Key]) {
    setForm((current) => ({ ...current, [field]: value }))
    setStatus(null)
  }

  function continueToNextStep() {
    if (!formRef.current?.reportValidity()) return

    if (currentStep === 1 && !form.description.trim()) {
      setStatus({ type: 'error', message: 'Tuliskan kronologi kejadian sebelum melanjutkan.' })
      return
    }
    if (currentStep === 2 && !form.anonymous && !form.name.trim()) {
      setStatus({ type: 'error', message: 'Isi nama lengkap atau pilih opsi pelaporan anonim.' })
      return
    }

    setStatus(null)
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
  }

  async function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    if (currentStep < steps.length - 1) {
      continueToNextStep()
      return
    }

    if (!formRef.current?.reportValidity()) return
    if (!form.anonymous && !form.name.trim()) {
      setCurrentStep(2)
      setStatus({ type: 'error', message: 'Isi nama lengkap atau pilih opsi pelaporan anonim.' })
      return
    }
    if (!form.category || !form.incidentDate || !form.description.trim() || !form.consent) {
      setCurrentStep(!form.category || !form.incidentDate ? 0 : !form.description.trim() ? 1 : 3)
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
      setCurrentStep(0)
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
                <p className="mt-2 text-sm leading-6 text-ink-soft">Isi informasi yang Anda ketahui. Form dibagi menjadi beberapa langkah dan laporan dapat dikirim secara anonim.</p>
                <p className="mt-2 text-xs text-ink-soft"><span className="font-bold text-teal">*</span> Wajib diisi. Kolom lain bersifat opsional.</p>
              </div>
            </div>

            {status?.type === 'success' ? (
              <div className="border-t-2 border-teal bg-sand/50 px-5 py-7 sm:px-7" role="status" aria-live="polite">
                <CheckCircle2 className="text-teal" size={30} aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-teal">Laporan berhasil dikirim</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{status.message}</p>
                <button
                  type="button"
                  onClick={() => setStatus(null)}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-teal px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  Buat laporan baru
                </button>
              </div>
            ) : (
              <>
                <ol
                  className="grid grid-cols-4 gap-2"
                  aria-label="Tahapan pengaduan"
                >
                  {steps.map((step, index) => {
                    const isComplete = index < currentStep
                    const isCurrent = index === currentStep

                    return (
                      <li key={step.title}>
                        <button
                          type="button"
                          disabled={!isComplete}
                          aria-current={isCurrent ? 'step' : undefined}
                          aria-label={`${step.title}${isComplete ? ', kembali ke langkah ini' : isCurrent ? ', langkah saat ini' : ', belum tersedia'}`}
                          onClick={() => {
                            setStatus(null)
                            setCurrentStep(index)
                          }}
                          className="group flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
                        >
                          <span className={`h-1 w-full rounded-full ${isComplete || isCurrent ? 'bg-teal' : 'bg-line'}`} />
                          <span className="flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                            <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] ${isComplete || isCurrent ? 'bg-teal text-white' : 'bg-sand text-ink-soft'}`}>
                              {isComplete ? <Check size={12} aria-hidden="true" /> : index + 1}
                            </span>
                            <span className={isCurrent ? 'text-teal' : isComplete ? 'text-ink' : 'text-ink-soft'}>
                              <span className="hidden sm:inline">{step.title}</span>
                              <span className="sm:hidden">{index + 1} / 4</span>
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>

                <div className="mt-7 border-b border-line pb-5" aria-live="polite">
                  <p className="text-xs font-semibold text-ink-soft">Langkah {currentStep + 1} dari {steps.length}</p>
                  <h3 className="mt-1 font-display text-2xl text-teal">{steps[currentStep].title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{steps[currentStep].description}</p>
                </div>

                <form ref={formRef} onSubmit={submitComplaint} noValidate className="mt-6">
                  {status?.type === 'error' && (
                    <div role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
                      {status.message}
                    </div>
                  )}

                  {currentStep === 0 && (
                    <fieldset className="space-y-5">
                      <legend className="sr-only">Jenis laporan</legend>
                      <Field label="Kategori laporan">
                        <select required value={form.category} onChange={(event) => updateField('category', event.target.value)} className="form-input">
                          <option value="">Pilih kategori laporan</option>
                          {categories.map((category) => <option key={category}>{category}</option>)}
                        </select>
                      </Field>
                      <Field label="Tanggal kejadian">
                        <input type="date" required value={form.incidentDate} onChange={(event) => updateField('incidentDate', event.target.value)} className="form-input" />
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Unit kerja terkait" optional>
                          <input value={form.unit} onChange={(event) => updateField('unit', event.target.value)} placeholder="Contoh: layanan nasabah" className="form-input" />
                        </Field>
                        <Field label="Lokasi / kantor" optional>
                          <input value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Jika diketahui" className="form-input" />
                        </Field>
                      </div>
                    </fieldset>
                  )}

                  {currentStep === 1 && (
                    <fieldset className="space-y-5">
                      <legend className="sr-only">Ceritakan kejadian</legend>
                      <Field label="Kronologi kejadian">
                        <p className="mb-2 text-xs font-normal leading-5 text-ink-soft">Ceritakan apa yang terjadi, kapan, siapa yang terlibat, dan dampaknya. Tulis yang Anda ketahui saja.</p>
                        <textarea required rows={7} maxLength={5000} value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Contoh: Pada tanggal..., saya menghubungi/mengunjungi... lalu..." className="form-input resize-y" />
                        <span className="mt-1 block text-right text-xs font-normal text-ink-soft">{form.description.length}/5000 karakter</span>
                      </Field>
                      <Field label="Informasi tambahan" optional>
                        <textarea rows={4} maxLength={2000} value={form.additionalInfo} onChange={(event) => updateField('additionalInfo', event.target.value)} placeholder="Informasi lain yang mungkin membantu pemeriksaan." className="form-input resize-y" />
                        <span className="mt-1 block text-right text-xs font-normal text-ink-soft">{form.additionalInfo.length}/2000 karakter</span>
                      </Field>
                    </fieldset>
                  )}

                  {currentStep === 2 && (
                    <fieldset className="space-y-5">
                      <legend className="sr-only">Identitas dan kontak</legend>
                      <label className="flex items-start gap-3 border border-line bg-sand/50 px-4 py-3 text-sm leading-6 text-ink-soft">
                        <input type="checkbox" checked={form.anonymous} onChange={(event) => updateField('anonymous', event.target.checked)} className="mt-1 accent-teal" />
                        <span><strong className="text-ink">Saya ingin mengirimkan laporan secara anonim.</strong><span className="mt-1 block">Nama tidak akan dicantumkan. Kosongkan email dan nomor telepon jika Anda tidak ingin memberikan informasi kontak.</span></span>
                      </label>
                      <Field label="Nama lengkap" optional={form.anonymous}>
                        <input autoComplete="name" required={!form.anonymous} value={form.name} onChange={(event) => updateField('name', event.target.value)} disabled={form.anonymous} placeholder="Nama lengkap Anda" className="form-input disabled:cursor-not-allowed disabled:bg-sand" />
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Alamat email" optional>
                          <input type="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="nama@contoh.com" className="form-input" />
                        </Field>
                        <Field label="Nomor telepon / WhatsApp" optional>
                          <input type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="08xxxxxxxxxx" className="form-input" />
                        </Field>
                      </div>
                      <p className="text-xs leading-5 text-ink-soft">Kontak bersifat opsional, tetapi membantu petugas menghubungi Anda jika diperlukan.</p>
                    </fieldset>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <dl className="divide-y divide-line border-y border-line">
                        <ReviewRow label="Kategori" value={form.category} step={0} onEdit={setCurrentStep} />
                        <ReviewRow label="Tanggal kejadian" value={form.incidentDate} step={0} onEdit={setCurrentStep} />
                        <ReviewRow label="Unit kerja" value={form.unit || 'Tidak dicantumkan'} step={0} onEdit={setCurrentStep} />
                        <ReviewRow label="Lokasi" value={form.location || 'Tidak dicantumkan'} step={0} onEdit={setCurrentStep} />
                        <ReviewRow label="Kronologi" value={form.description} step={1} onEdit={setCurrentStep} multiline />
                        <ReviewRow label="Informasi tambahan" value={form.additionalInfo || 'Tidak ada'} step={1} onEdit={setCurrentStep} multiline />
                        <ReviewRow label="Pelapor" value={form.anonymous ? 'Anonim' : form.name} step={2} onEdit={setCurrentStep} />
                        <ReviewRow label="Email" value={form.email || 'Tidak dicantumkan'} step={2} onEdit={setCurrentStep} />
                        <ReviewRow label="Telepon" value={form.phone || 'Tidak dicantumkan'} step={2} onEdit={setCurrentStep} />
                      </dl>
                      <label className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                        <input type="checkbox" required checked={form.consent} onChange={(event) => updateField('consent', event.target.checked)} className="mt-1 accent-teal" />
                        <span>Saya menyatakan informasi yang disampaikan benar dan menyetujui pemrosesan data untuk penanganan laporan ini.</span>
                      </label>
                    </div>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
                    {currentStep > 0 ? (
                      <button type="button" onClick={() => { setStatus(null); setCurrentStep((step) => step - 1) }} className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-sand hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
                        <ArrowLeft size={17} aria-hidden="true" /> Kembali
                      </button>
                    ) : <span />}
                    {currentStep < steps.length - 1 ? (
                      <button type="button" onClick={continueToNextStep} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-teal px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
                        Lanjut <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-teal px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-50">
                        {isSubmitting ? 'Mengirim laporan...' : 'Kirim laporan'}
                        {!isSubmitting && <Send size={16} aria-hidden="true" />}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
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
  return <label className="block text-sm font-bold text-teal">{label}{optional ? <span className="ml-1 font-normal text-ink-soft">(opsional)</span> : <span className="ml-1 text-red-700" aria-hidden="true">*</span>}<span className="mt-2 block">{children}</span></label>
}

function ReviewRow({ label, value, step, onEdit, multiline = false }: { label: string; value: string; step: number; onEdit: (step: number) => void; multiline?: boolean }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-4">
      <dt className="text-xs font-semibold text-ink-soft">{label}</dt>
      <dd className={`min-w-0 wrap-break-word text-sm leading-6 text-ink ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</dd>
      <button type="button" onClick={() => onEdit(step)} className="justify-self-start text-xs font-semibold text-teal underline underline-offset-2 hover:text-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:justify-self-end">Ubah</button>
    </div>
  )
}

function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="border-t-2 border-gold pt-4"><p className="text-xs font-bold tracking-[0.18em] text-teal/60">{number}</p><h2 className="mt-2 font-display text-xl text-teal">{title}</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p></div>
}