import { Link } from 'react-router-dom'
import { footerProdukLinks, footerTentangLinks } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="border-t border-line bg-teal text-canvas">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <p className="max-w-2xl text-sm text-canvas/80">
          Simpanan tabungan dan deposito nasabah dijamin oleh{' '}
          <a
            href="https://apps.lps.go.id/bankpesertapenjaminan"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gold underline-offset-4 hover:text-gold-light"
          >
            Lembaga Penjamin Simpanan (LPS)
          </a>
          . Maksimum simpanan yang dijamin per nasabah per bank adalah Rp 2 miliar.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg text-gold-light">Produk & layanan</h3>
            <ul className="mt-4 space-y-2 text-sm text-canvas/80">
              {footerProdukLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-gold-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-gold-light">Tentang kami</h3>
            <ul className="mt-4 space-y-2 text-sm text-canvas/80">
              {footerTentangLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-gold-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-gold-light">Hubungi kami</h3>
            <ul className="mt-4 space-y-2 text-sm text-canvas/80">
              <li>Whatsapp center: 0811-2901-9111</li>
              <li>Telepon: (0281) 6843115</li>
              <li>Email: cs@hikjateng.co.id</li>
              <li className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/bprshikjateng/" target="_blank" rel="noreferrer" className="hover:text-gold-light">
                  Facebook
                </a>
                <a href="https://www.instagram.com/bprshikjateng/" target="_blank" rel="noreferrer" className="hover:text-gold-light">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-canvas/20 pt-6 text-xs text-canvas/60">
          <p>
            PT BPRS Harta Insan Karimah Jawa Tengah berizin dan diawasi oleh Otoritas Jasa Keuangan,
            serta merupakan peserta penjaminan LPS.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} PT BPRS Harta Insan Karimah Jawa Tengah</p>
        </div>
      </div>
    </footer>
  )
}
