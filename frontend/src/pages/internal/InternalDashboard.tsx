import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  ChevronLeft,
  CircleDollarSign,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

type DashboardSection = 'overview' | 'rates' | 'profile' | 'settings'

const navigation: { id: DashboardSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'rates', label: 'Tarif deposito', icon: CircleDollarSign },
  { id: 'profile', label: 'Profil', icon: UserRound },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
]

export function InternalDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!supabase) {
      navigate('/internal/login', { replace: true })
      return
    }

    let isMounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      if (!session) {
        navigate('/internal/login', { replace: true })
        return
      }
      setUser(session.user)
      setIsCheckingSession(false)
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return
      if (error || !data.session) {
        navigate('/internal/login', { replace: true })
        return
      }
      setUser(data.session.user)
      setIsCheckingSession(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  async function signOut() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) setErrorMessage(error.message)
  }

  const currentSection = navigation.find((item) => item.id === activeSection) ?? navigation[0]
  const initials = user?.email?.slice(0, 1).toUpperCase() ?? 'H'

  if (isCheckingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-sand px-5 text-sm text-ink-soft" role="status">
        Memeriksa sesi Supabase...
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Tutup menu dashboard"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-ink/50 lg:hidden"
        />
      )}

      <button
        type="button"
        aria-label={isMobileOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen((open) => !open)}
        className="fixed left-4 top-4 z-50 inline-flex size-11 items-center justify-center bg-teal text-white shadow-md lg:hidden"
      >
        {isMobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-teal-light bg-teal text-white shadow-xl transition-[transform,width] duration-200 ease-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} lg:translate-x-0`}
        aria-label="Navigasi dashboard internal"
      >
        <div className="flex min-h-20 items-center justify-between border-b border-white/15 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center border border-white/25 bg-white/10 font-display text-lg font-bold" aria-hidden="true">H</span>
            {!isCollapsed && <span className="truncate text-sm font-semibold">HIK Internal</span>}
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            aria-label={isCollapsed ? 'Lebarkan sidebar' : 'Ciutkan sidebar'}
            title={isCollapsed ? 'Lebarkan sidebar' : 'Ciutkan sidebar'}
            className="hidden size-9 shrink-0 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white lg:inline-flex"
          >
            <ChevronLeft className={isCollapsed ? 'rotate-180' : ''} size={19} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Menu utama">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
                onClick={() => {
                  setActiveSection(item.id)
                  setIsMobileOpen(false)
                }}
                className={`group flex min-h-11 w-full items-center gap-3 border-l-2 px-3 text-left text-sm transition-colors focus-visible:outline-white ${
                  isActive
                    ? 'border-white bg-white/15 font-semibold text-white'
                    : 'border-transparent text-white/75 hover:bg-white/10 hover:text-white'
                } ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`}
              >
                <Icon size={19} className="shrink-0" aria-hidden="true" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {isActive && !isCollapsed && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />}
              </button>
            )
          })}
        </nav>

        <div className="space-y-1 border-t border-white/15 px-3 py-4">
          <button
            type="button"
            title={isCollapsed ? 'Kembali ke situs' : undefined}
            onClick={() => navigate('/')}
            className={`flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`}
          >
            <House size={19} className="shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Kembali ke situs</span>}
          </button>
          <button
            type="button"
            title={isCollapsed ? 'Keluar' : undefined}
            onClick={signOut}
            className={`flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`}
          >
            <LogOut size={19} className="shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Keluar</span>}
          </button>
          {!isCollapsed && user?.email && (
            <div className="mt-3 flex items-center gap-3 border-t border-white/15 px-3 pt-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold" aria-hidden="true">{initials}</span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium">{user.email}</span>
                <span className="mt-0.5 block text-[11px] text-white/60">Pengguna Supabase</span>
              </span>
            </div>
          )}
        </div>
      </aside>

      <main className={`min-h-screen transition-[padding] duration-200 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:px-10 lg:pt-10">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div className="pl-12 lg:pl-0">
              <p className="text-xs font-semibold uppercase text-ink-soft">HIK Jateng · Area internal</p>
              <h1 className="mt-2 font-display text-2xl text-teal sm:text-3xl">{currentSection.label}</h1>
            </div>
            <div className="flex items-center gap-2 border border-line px-3 py-2 text-xs font-medium text-ink-soft">
              <span className="size-2 rounded-full bg-green-600" aria-hidden="true" />
              Sesi Supabase aktif
            </div>
          </header>

          {errorMessage && (
            <p className="mt-5 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800" role="alert">
              {errorMessage}
            </p>
          )}

          {activeSection === 'overview' && <Overview user={user} onOpenRates={() => setActiveSection('rates')} />}
          {activeSection === 'rates' && <RatePlaceholder />}
          {activeSection === 'profile' && <Profile user={user} />}
          {activeSection === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  )
}

function Overview({ user, onOpenRates }: { user: User | null; onOpenRates: () => void }) {
  return (
    <section className="pt-7 sm:pt-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">Selamat datang,</p>
          <h2 className="mt-1 break-all font-display text-xl text-ink">{user?.email ?? 'Pengguna'}</h2>
        </div>
        <p className="text-xs text-ink-soft">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}</p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="border border-line p-5">
          <div className="flex items-center justify-between text-sm text-ink-soft">
            Status autentikasi <ShieldCheck size={18} className="text-teal" aria-hidden="true" />
          </div>
          <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-ink">
            <Check size={17} className="text-green-700" aria-hidden="true" /> Sesi aktif
          </p>
        </div>
        <div className="border border-line p-5">
          <div className="flex items-center justify-between text-sm text-ink-soft">
            Data tarif deposito <ChartNoAxesCombined size={18} className="text-teal" aria-hidden="true" />
          </div>
          <p className="mt-4 text-lg font-semibold text-ink">Belum terhubung</p>
        </div>
        <button
          type="button"
          onClick={onOpenRates}
          className="flex min-h-28 items-center justify-between border border-line p-5 text-left transition-colors hover:border-teal hover:bg-sand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:col-span-2 xl:col-span-1"
        >
          <span>
            <span className="block text-sm text-ink-soft">Pengelolaan rate</span>
            <span className="mt-4 block text-lg font-semibold text-teal">Lihat status</span>
          </span>
          <ArrowUpRight size={19} className="text-teal" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-8 border-t border-line pt-5">
        <h3 className="font-display text-lg text-ink">Status setup</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          Login Supabase sudah tersambung. Data dan formulir pengelolaan tarif belum disiapkan, jadi belum ada angka yang dapat diubah dari dashboard ini.
        </p>
      </div>
    </section>
  )
}

function RatePlaceholder() {
  return (
    <section className="pt-7 sm:pt-9">
      <div className="border-l-4 border-teal bg-sand/60 px-5 py-5 sm:px-6">
        <p className="text-sm font-semibold text-teal">Tahap berikutnya</p>
        <h2 className="mt-2 font-display text-xl text-ink">Tabel tarif belum tersedia</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          Setelah struktur tabel dan kebijakan RLS Supabase dibuat, bagian ini dapat digunakan untuk melihat dan mengubah rate deposito.
        </p>
      </div>
    </section>
  )
}

function Profile({ user }: { user: User | null }) {
  return (
    <section className="max-w-2xl pt-7 sm:pt-9">
      <h2 className="font-display text-xl text-ink">Profil akun</h2>
      <dl className="mt-5 divide-y divide-line border-y border-line">
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-5">
          <dt className="text-sm text-ink-soft">Email</dt>
          <dd className="break-all text-sm font-medium text-ink">{user?.email ?? 'Tidak tersedia'}</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-5">
          <dt className="text-sm text-ink-soft">Metode masuk</dt>
          <dd className="text-sm font-medium text-ink">{String(user?.app_metadata?.provider ?? 'email')}</dd>
        </div>
      </dl>
    </section>
  )
}

function SettingsPanel() {
  return (
    <section className="max-w-2xl pt-7 sm:pt-9">
      <h2 className="font-display text-xl text-ink">Pengaturan akses</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Sesi login dikelola oleh Supabase Auth. Peran admin dan izin pengelolaan tabel belum dikonfigurasi.
      </p>
      <div className="mt-5 flex items-start gap-3 border border-line p-4 text-sm leading-6 text-ink-soft">
        <ShieldCheck className="mt-0.5 shrink-0 text-teal" size={18} aria-hidden="true" />
        Akses data tarif nantinya perlu dibatasi melalui Row Level Security (RLS), bukan hanya dengan menyembunyikan halaman.
      </div>
    </section>
  )
}