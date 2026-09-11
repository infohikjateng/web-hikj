import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import type { ReactNode } from 'react'
import logoLembaga from '../../assets/logo-lembaga.png'
import logoWhite from '../../assets/logo-white-hikj.png'
import { footerProdukLinks, footerTentangLinks } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="border-t border-line bg-teal">
      <div className="mx-auto max-w-7xl px-6 py-14 text-canvas sm:px-8 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
          <div className="flex max-w-sm flex-col gap-6">
            <Link to="/" aria-label="BPRS HIK Jawa Tengah">
              <img src={logoWhite} alt="BPRS HIK Jawa Tengah" className="h-auto w-64 max-w-full" />
            </Link>
            <p className="text-sm font-semibold leading-6 text-canvas/90">
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
            <div className="flex items-center gap-3">
              <SocialLink href="https://www.facebook.com/bprshikjateng/" label="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="lg" aria-hidden="true" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/bprshikjateng/" label="Instagram">
                <FontAwesomeIcon icon={faInstagram} size="lg" aria-hidden="true" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/" label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} size="lg" aria-hidden="true" />
              </SocialLink>
              <SocialLink href="https://hikjateng.co.id/" label="Situs web">
                <ExternalLink size={18} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          <div className="grid flex-1 gap-10 sm:grid-cols-3 lg:max-w-3xl lg:gap-16">
            <FooterLinkGroup title="Produk & layanan" links={footerProdukLinks} />
            <FooterLinkGroup title="Tentang kami" links={footerTentangLinks} />
            <FooterLinkGroup
              title="Bantuan"
              links={[
                { label: 'Hubungi kami', href: '/info-kami/hubungi-kami' },
                { label: 'Pengaduan nasabah', href: '/info-kami/pengaduan-nasabah' },
                { label: 'Karir', href: '/karir' },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-8">
          <div className="flex flex-col gap-6 text-xs font-semibold leading-5 text-canvas/85 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="max-w-xl">
              PT BPRS Harta Insan Karimah Jawa Tengah berizin dan diawasi oleh Otoritas Jasa Keuangan,
              serta merupakan peserta Penjaminan LPS.
            </p>
            <p className="whitespace-nowrap md:text-right">© {new Date().getFullYear()} PT BPRS HIK Jawa Tengah</p>
          </div>
          <img
            src={logoLembaga}
            alt="Logo regulator dan lembaga terkait"
            className="mt-6 h-auto w-full max-w-[27rem] md:ml-auto"
          />
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm font-semibold text-canvas/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="transition-colors hover:text-gold-light">
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
