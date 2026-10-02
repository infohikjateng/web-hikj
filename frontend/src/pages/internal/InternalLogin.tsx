import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

export function InternalLogin() {
  const navigate = useNavigate()
  const [isCheckingSession, setIsCheckingSession] = useState(isSupabaseConfigured)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!supabase) return

    let isMounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return
      setIsCheckingSession(false)
      if (nextSession) navigate('/internal/dashboard', { replace: true })
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return
      if (data.session) navigate('/internal/dashboard', { replace: true })
      if (error) setErrorMessage(error.message)
      setIsCheckingSession(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    setErrorMessage('')
    setIsSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) setErrorMessage(error.message)
    else navigate('/internal/dashboard', { replace: true })
    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand px-5 py-10 sm:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden border border-line bg-white md:min-h-136 md:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-teal p-7 text-white sm:p-10 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 size-72 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-4 -top-1 size-40 rounded-full border border-white/10" />
          <div className="relative">
            <div className="flex size-12 items-center justify-center border border-white/20 bg-white/10">
              <ShieldCheck size={23} aria-hidden="true" />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase text-white/70">PT BPRS HIK Jawa Tengah</p>
            <h1 className="mt-3 max-w-sm font-display text-3xl leading-tight text-white sm:text-4xl">
              Area internal
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
              Masuk untuk menguji koneksi autentikasi Supabase. Halaman ini belum menyediakan pengelolaan data produk.
            </p>
          </div>
          <p className="relative mt-12 text-xs text-white/55">Akses terbatas untuk pengguna yang telah terdaftar.</p>
        </section>

        <section className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold text-teal">Supabase Auth</p>
            <h2 className="mt-2 font-display text-2xl text-ink">Masuk ke akun</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Gunakan email dan kata sandi akun yang sudah dibuat di Supabase.
            </p>
          </div>

          {!isSupabaseConfigured ? (
            <div className="border-l-4 border-gold bg-sand px-4 py-3 text-sm leading-6 text-ink-soft" role="alert">
              Konfigurasi Supabase belum tersedia. Atur <code>VITE_SUPABASE_URL</code> dan{' '}
              <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>, lalu mulai ulang dev server.
            </div>
          ) : isCheckingSession ? (
            <p className="text-sm text-ink-soft" role="status">Memeriksa sesi Supabase...</p>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-5">
              <label className="block text-sm font-semibold text-ink" htmlFor="login-email">
                Email
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@perusahaan.co.id"
                  className="form-input mt-2 min-h-12 font-normal"
                />
              </label>
              <label className="block text-sm font-semibold text-ink" htmlFor="login-password">
                Kata sandi
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="form-input mt-2 min-h-12 font-normal"
                />
              </label>

              {errorMessage && (
                <p className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isSupabaseConfigured}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Memeriksa akun...' : 'Masuk'}
                {!isSubmitting && <ArrowRight size={17} aria-hidden="true" />}
              </button>
              <p className="flex items-start gap-2 text-xs leading-5 text-ink-soft">
                <LockKeyhole className="mt-0.5 shrink-0" size={14} aria-hidden="true" />
                Pendaftaran akun tidak tersedia di halaman ini. Buat atau undang akun melalui Supabase Auth.
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}