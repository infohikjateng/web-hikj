import { useState } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav, type NavItem } from '../../data/navigation'
import logo from '../../assets/LogoHIKJateng.png'

const descriptions: Record<string, string> = {
  'Tentang kami': 'Kenali perjalanan dan nilai yang kami bawa.',
  Produk: 'Pilihan simpanan dan pembiayaan syariah.',
  Informasi: 'Laporan, berita, dan informasi perusahaan.',
  'Info kami': 'Temukan cara untuk terhubung dengan kami.',
}

function isNavItemActive(item: NavItem, pathname: string) {
  return item.href === pathname || item.children?.some((child) => child.href === pathname)
}

export function Navbar5() {
  const [openDesktop, setOpenDesktop] = useState<string | null>(null)
  const [openMobile, setOpenMobile] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const { pathname } = useLocation()

  const closeMobile = () => {
    setOpenMobile(false)
    setOpenMobileGroup(null)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label="BPRS HIK Jawa Tengah" className="shrink-0">
          <img src={logo} alt="BPRS HIK Jawa Tengah" className="h-12 w-auto" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {primaryNav.map((item) => {
            const active = isNavItemActive(item, pathname)

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDesktop(item.label)}
                onMouseLeave={() => item.children && setOpenDesktop(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={`inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-sand hover:text-teal ${
                      active || openDesktop === item.label ? 'bg-sand text-teal' : 'text-ink-soft'
                    }`}
                    onClick={() => setOpenDesktop(openDesktop === item.label ? null : item.label)}
                    aria-expanded={openDesktop === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform ${openDesktop === item.label ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <NavLink
                    to={item.href ?? '/'}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-sand hover:text-teal ${
                        isActive ? 'bg-sand text-teal' : 'text-ink-soft'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}

                {item.children && openDesktop === item.label && (
                  <div className="absolute right-0 top-full w-[min(90vw,42rem)] pt-3">
                    <div className="rounded-2xl border border-line bg-white p-3 shadow-xl shadow-teal/10">
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setOpenDesktop(null)}
                            className="group rounded-xl p-4 transition-colors hover:bg-sand"
                          >
                            <span className="flex items-center justify-between font-semibold text-teal">
                              {child.label}
                              <ChevronRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-ink-soft">
                              {descriptions[item.label]}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-teal transition-colors hover:bg-sand lg:hidden"
          onClick={() => setOpenMobile((current) => !current)}
          aria-expanded={openMobile}
          aria-label={openMobile ? 'Tutup menu' : 'Buka menu'}
        >
          {openMobile ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {openMobile && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6" aria-label="Navigasi mobile">
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-line last:border-none">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-teal"
                      onClick={() => setOpenMobileGroup(openMobileGroup === item.label ? null : item.label)}
                      aria-expanded={openMobileGroup === item.label}
                    >
                      {item.label}
                      <ChevronDown size={17} className={`transition-transform ${openMobileGroup === item.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {openMobileGroup === item.label && (
                      <div className="grid gap-1 pb-3 pl-3">
                        {item.children.map((child) => (
                          <Link key={child.href} to={child.href} onClick={closeMobile} className="rounded-lg px-3 py-3 text-sm text-ink-soft hover:bg-sand hover:text-teal">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.href ?? '/'} onClick={closeMobile} className="block py-4 text-sm font-semibold text-teal">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/info-kami/hubungi-kami" onClick={closeMobile} className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-light">
              Hubungi kami
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
