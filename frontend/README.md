# HIKJ Web — landing page baru (React + Vite + TS + Tailwind)

Rebuild dari hikjateng.co.id. Semua URL/slug lama dipetakan ke React Router, fitur
kalkulator syariah dipertahankan, tampilan dirombak total.

## Menjalankan di lokal (VS Code)

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Perintah lain:

```bash
npm run build      # build produksi ke dist/
npm run preview    # jalankan hasil build secara lokal
npx tsc --noEmit   # cek tipe TypeScript
```

## Struktur folder

```
src/
  routes/         (dicadangkan untuk memisah definisi route bila makin besar)
  pages/          Home, ContentPage (template generik), produk/, informasi/, info-kami/
  features/       modul mandiri per kalkulator (baru kalkulator-pembiayaan yang lengkap)
  components/
    layout/       Navbar, Footer, Layout (pembungkus Outlet)
    ui/           Button, Section, PageHeader, RateBanner, GeometricMotif
  data/           navigation.ts, produk.ts, berita.ts — konten statis, siap ganti ke CMS/API
  lib/            format.ts (format rupiah), kalkulasi.ts (logika simulasi)
```

## Yang sudah diimplementasi penuh

- Routing lengkap sesuai peta situs lama (lihat `src/App.tsx`)
- Navbar responsif (desktop dropdown + mobile menu, satu komponen bukan dua seperti WP)
- Footer dengan info LPS, quick links, kontak
- Halaman Home: hero, rate banner deposito, grid produk, kalkulator pembiayaan (live),
  preview berita
- Kalkulator simulasi pembiayaan: form → hasil real-time, rincian angsuran per bulan
- Listing & detail berita (data dummy di `src/data/berita.ts`)

## Yang masih perlu dikerjakan

- 3 kalkulator lain (deposito, tabungan qurban, tabungan hari raya) — polanya sama
  seperti `features/kalkulator-pembiayaan`, foldernya sudah disiapkan kosong
- Halaman konten (Pengurus, Sejarah, Laporan, dll) masih pakai `ContentPage` generik —
  tinggal isi children dengan konten asli atau sambungkan ke CMS
- Sambungkan `data/berita.ts` dan `data/produk.ts` ke sumber data asli (WordPress REST
  API / headless CMS) alih-alih data statis
- Ganti aset placeholder dengan foto asli

## Desain

Token warna & font ada di `src/index.css` (Tailwind v4, `@theme`):
- `--color-teal` (#0e3b31) sebagai warna utama, `--color-gold` (#b8862f) sebagai aksen
- Font judul: Newsreader (serif), font body/UI: Plus Jakarta Sans
