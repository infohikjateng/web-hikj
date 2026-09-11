export interface Berita {
  slug: string
  judul: string
  tanggal: string
  ringkasan: string
  gambar?: string
  gambarAlt?: string
}

export const beritaTerkini: Berita[] = [
  {
    slug: 'ngaji-bareng-ustad-luthfi-hamidi-safinatun-najah-8',
    judul: 'Ngaji bareng Ustad Luthfi Hamidi: Safinatun Najah #8',
    tanggal: '2 September 2026',
    ringkasan:
      'Rutinan mengaji bareng anggota dewan pengawas syariah membahas kitab Safinatun Najah.',
  },
  {
    slug: 'semarak-hari-indonesia-menabung-sdn-1-mersi',
    judul: 'Semarak Hari Indonesia Menabung: edukasi keuangan di SDN 1 Mersi',
    tanggal: '13 Agustus 2026',
    ringkasan:
      'Memperingati Hari Indonesia Menabung, tim edukasi mengenalkan kebiasaan menabung sejak dini.',
  },
  {
    slug: 'divisi-marketing-sosialisasi-ews',
    judul: 'Divisi marketing ikuti sosialisasi Early Warning System',
    tanggal: '3 Agustus 2026',
    ringkasan:
      'Sosialisasi aplikasi Early Warning System (EWS) dan kodifikasi produk bagi tim marketing.',
  },
]
