export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Tentang kami',
    children: [
      { label: 'Pengurus', href: '/tentang-kami/pengurus' },
      { label: 'Sejarah perusahaan', href: '/tentang-kami/sejarah-perusahaan' },
      { label: 'Visi misi', href: '/tentang-kami/visi-misi' },
    ],
  },
  {
    label: 'Produk',
    children: [
      { label: 'Simpanan', href: '/produk/tabungan' },
      { label: 'Pembiayaan', href: '/produk/pembiayaan' },
      { label: 'Deposito', href: '/produk/deposito' },
      { label: 'RIPLAY produk', href: '/produk/riplay-produk' },
    ],
  },
  {
    label: 'Informasi',
    children: [
      { label: 'Laporan publikasi', href: '/informasi/laporan-publikasi' },
      { label: 'Piagam audit', href: '/informasi/piagam-audit' },
      { label: 'Nisbah', href: '/informasi/nisbah' },
      { label: 'Laporan tahunan', href: '/informasi/laporan-tahunan' },
      { label: 'Laporan tata kelola', href: '/informasi/laporan-tata-kelola' },
      { label: 'Laporan keberlanjutan', href: '/informasi/laporan-keberlanjutan' },
      { label: 'Berita terkini', href: '/informasi/berita' },
    ],
  },
  { label: 'Karir', href: '/karir' },
  {
    label: 'Info kami',
    children: [
      { label: 'Hubungi kami', href: '/info-kami/hubungi-kami' },
      { label: 'Pengaduan nasabah', href: '/info-kami/pengaduan-nasabah' },
    ],
  },
]

export const footerProdukLinks: NavChild[] = [
  { label: 'Tabungan', href: '/produk/tabungan' },
  { label: 'Pembiayaan', href: '/produk/pembiayaan' },
  { label: 'Deposito', href: '/produk/deposito' },
  { label: 'Simulasi', href: '/simulasi' },
]

export const footerTentangLinks: NavChild[] = [
  { label: 'Sebaran lokasi kantor', href: '/info-kami/hubungi-kami' },
  { label: 'Berita terkini', href: '/informasi/berita' },
  { label: 'Sejarah perusahaan', href: '/tentang-kami/sejarah-perusahaan' },
]
