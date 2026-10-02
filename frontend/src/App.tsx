import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { ContentPage } from './pages/ContentPage'
import { ProdukDetail } from './pages/produk/ProdukDetail'
import { BeritaList } from './pages/informasi/BeritaList'
import { BeritaDetail } from './pages/informasi/BeritaDetail'
import { HubungiKami } from './pages/info-kami/HubungiKami'
import { Simulasi } from './pages/Simulasi'
import { ReleaseNotes } from './pages/ReleaseNotes'
import { PengaduanNasabah } from './pages/info-kami/PengaduanNasabah'

const InternalLogin = lazy(() =>
  import('./pages/internal/InternalLogin').then(({ InternalLogin: page }) => ({ default: page })),
)
const InternalDashboard = lazy(() =>
  import('./pages/internal/InternalDashboard').then(({ InternalDashboard: page }) => ({ default: page })),
)

function App() {
  return (
    <Routes>
      <Route
        path="internal/login"
        element={(
          <Suspense fallback={<main className="grid min-h-screen place-items-center bg-sand px-5 text-sm text-ink-soft">Memuat halaman login...</main>}>
            <InternalLogin />
          </Suspense>
        )}
      />
      <Route
        path="internal/dashboard"
        element={(
          <Suspense fallback={<main className="grid min-h-screen place-items-center bg-sand px-5 text-sm text-ink-soft">Memuat dashboard...</main>}>
            <InternalDashboard />
          </Suspense>
        )}
      />
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        {/* Tentang kami */}
        <Route
          path="tentang-kami/pengurus"
          element={<ContentPage title="Pengurus" description="Susunan direksi, dewan komisaris, dan dewan pengawas syariah." />}
        />
        <Route
          path="tentang-kami/sejarah-perusahaan"
          element={<ContentPage title="Sejarah perusahaan" description="Perjalanan PT BPRS Harta Insan Karimah Jawa Tengah." />}
        />
        <Route
          path="tentang-kami/visi-misi"
          element={<ContentPage title="Visi & misi" />}
        />

        {/* Produk */}
        <Route path="produk/:slug" element={<ProdukDetail />} />

        {/* Informasi */}
        <Route path="release-notes" element={<ReleaseNotes />} />
        <Route
          path="informasi/laporan-publikasi"
          element={<ContentPage title="Laporan publikasi" />}
        />
        <Route path="informasi/piagam-audit" element={<ContentPage title="Piagam audit" />} />
        <Route path="informasi/nisbah" element={<ContentPage title="Nisbah" />} />
        <Route
          path="informasi/laporan-tahunan"
          element={<ContentPage title="Laporan tahunan" />}
        />
        <Route
          path="informasi/laporan-tata-kelola"
          element={<ContentPage title="Laporan tata kelola" />}
        />
        <Route
          path="informasi/laporan-keberlanjutan"
          element={<ContentPage title="Laporan keberlanjutan" />}
        />
        <Route path="informasi/berita" element={<BeritaList />} />
        <Route path="informasi/berita/:slug" element={<BeritaDetail />} />

        {/* Kalkulator */}
        <Route path="simulasi" element={<Simulasi />} />

        {/* Karir */}
        <Route
          path="karir"
          element={<ContentPage title="Karir" description="Bergabung bersama PT BPRS HIK Jawa Tengah." />}
        />

        {/* Info kami */}
        <Route path="info-kami/hubungi-kami" element={<HubungiKami />} />
        <Route path="info-kami/pengaduan-nasabah" element={<PengaduanNasabah />} />

        <Route path="*" element={<ContentPage title="Halaman tidak ditemukan" />} />
      </Route>
    </Routes>
  )
}

export default App
