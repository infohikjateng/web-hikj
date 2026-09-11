import { Link } from 'react-router-dom'
import { Link2 } from 'lucide-react'
import type { ReactNode } from 'react'
import logoLembaga from '../../assets/logo-lembaga.png'
import logoWhite from '../../assets/logo-white-hikj.png'
import { footerProdukLinks, footerTentangLinks } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="border-t border-line bg-teal">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 text-canvas sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
        <div className="max-w-sm">
          <img src={logoWhite} alt="BPRS HIK Jawa Tengah" className="h-auto w-64 max-w-full" />
          <p className="mt-8 text-sm font-semibold leading-6 text-canvas/90">
            Simpanan tabungan dan deposito nasabah dijamin oleh{' '}
            <a
              href="https://apps.lps.go.id/bankpesertapenjaminan"
              target="_blank"
              rel="noreferrer"
              className="text-gold-light underline decoration-gold-light/50 underline-offset-4 transition-colors hover:text-white"
            >
              Lembaga Penjamin Simpanan (LPS)
            </a>
            . Maksimum simpanan yang dijamin per nasabah per bank adalah Rp 2 miliar.
          </p>
        </div>

        <FooterLinkGroup title="Produk & layanan" links={footerProdukLinks} />

        <div>
          <FooterLinkGroup title="Tentang kami" links={footerTentangLinks} />
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white">Sosial media kami</h3>
            <div className="mt-4 flex gap-3">
              <SocialLink href="https://www.facebook.com/bprshikjateng/" label="Facebook">
                <span className="text-lg font-black leading-none" aria-hidden="true">f</span>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/bprshikjateng/" label="Instagram">
                <span className="text-xs font-black leading-none" aria-hidden="true">IG</span>
              </SocialLink>
              <SocialLink href="https://hikjateng.co.id/" label="Situs web">
                <Link2 size={18} strokeWidth={2.5} />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 text-xs font-semibold leading-5 sm:px-8 md:grid-cols-[1.25fr_auto_1fr] md:gap-8 lg:px-10">
          <p>
            PT BPRS Harta Insan Karimah Jawa Tengah berizin dan diawasi oleh Otoritas Jasa Keuangan,
            serta merupakan peserta Penjaminan LPS.
          </p>
          <p className="whitespace-nowrap text-center">© {new Date().getFullYear()} PT BPRS HIK Jawa Tengah</p>
          <img src={logoLembaga} alt="Logo regulator dan lembaga terkait" className="h-auto w-full max-w-[27rem] justify-self-center md:justify-self-end" />
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <ul className="mt-4 divide-y divide-white/35 border-y border-white/35 text-sm font-semibold text-canvas/95">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="block py-2 transition-colors hover:text-gold-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-teal transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
    >
      {children}
    </a>
  )
}
