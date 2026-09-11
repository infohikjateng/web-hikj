export interface RingkasProduk {
  slug: string
  nama: string
  akad: string
  deskripsi: string
}

export const ringkasanProduk: RingkasProduk[] = [
  {
    slug: 'tabungan',
    nama: 'Tabungan',
    akad: 'Akad mudharabah & wadiah',
    deskripsi:
      'Simpanan harian yang bisa diambil kapan saja, dikelola dengan prinsip bagi hasil yang adil.',
  },
  {
    slug: 'pembiayaan',
    nama: 'Pembiayaan',
    akad: 'Berbagai jenis akad syariah',
    deskripsi:
      'Modal usaha dan kebutuhan lain dengan skema angsuran yang jelas sejak awal, tanpa bunga.',
  },
  {
    slug: 'deposito',
    nama: 'Deposito',
    akad: 'Akad mudharabah berjangka',
    deskripsi:
      'Simpanan berjangka untuk merencanakan masa depan dengan nisbah bagi hasil yang kompetitif.',
  },
]

export interface RateDeposito {
  tenorBulan: number
  setaraPersen: number
}

// Data ini idealnya diambil dari CMS/API agar admin bisa update tiap bulan
// tanpa perlu deploy ulang.
export const rateDepositoBerjalan = {
  periode: 'September 2026',
  rate: [
    { tenorBulan: 3, setaraPersen: 4.57 },
    { tenorBulan: 6, setaraPersen: 5.48 },
    { tenorBulan: 12, setaraPersen: 6.4 },
  ] as RateDeposito[],
}
