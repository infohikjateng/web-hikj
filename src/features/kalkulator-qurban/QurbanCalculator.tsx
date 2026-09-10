import { useMemo, useState } from 'react'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { formatRupiah } from '../../lib/format'

const packages = [
  { id: 'I', label: 'Paket I', monthly: 250_000, fee: 75_000 },
  { id: 'II', label: 'Paket II', monthly: 500_000, fee: 150_000 },
  { id: 'III', label: 'Paket III', monthly: 1_000_000, fee: 200_000 },
  { id: 'IV', label: 'Paket IV', monthly: 1_500_000, fee: 300_000 },
  { id: 'V', label: 'Paket V', monthly: 2_000_000, fee: 500_000 },
] as const

export function QurbanCalculator() {
  const [packageId, setPackageId] = useState('I')
  const [monthly, setMonthly] = useState(250_000)
  const [tenor, setTenor] = useState(12)
  const [showDetail, setShowDetail] = useState(false)
  const selected = packages.find((item) => item.id === packageId)
  const fee = selected?.fee ?? (monthly <= 250_000 ? 75_000 : monthly <= 500_000 ? 150_000 : monthly <= 1_000_000 ? 200_000 : monthly <= 1_500_000 ? 300_000 : 500_000)
  const total = useMemo(() => monthly * tenor, [monthly, tenor])

  const reset = () => { setPackageId('I'); setMonthly(250_000); setTenor(12); setShowDetail(false) }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block text-sm font-medium text-ink sm:col-span-2">Pilih paket qurban
          <select value={packageId} onChange={(event) => { const next = packages.find((item) => item.id === event.target.value); setPackageId(event.target.value); if (next) setMonthly(next.monthly) }} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal">
            {packages.map((item) => <option key={item.id} value={item.id}>{item.label} - {formatRupiah(item.monthly)} / bulan</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">Tenor
          <input type="number" min={1} max={36} value={tenor} onChange={(event) => setTenor(Number(event.target.value) || 0)} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal" />
        </label>
        <label className="block text-sm font-medium text-ink sm:col-span-2">Setoran per bulan
          <input type="number" min={50_000} value={monthly} onChange={(event) => { setPackageId('CUSTOM'); setMonthly(Number(event.target.value) || 0) }} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal" />
        </label>
        <div className="flex items-end"><button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink-soft hover:bg-sand"><RotateCcw size={15} aria-hidden="true" /> Reset</button></div>
      </div>
      <div className="rounded-2xl bg-sand p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div><span className="text-xs text-ink-soft">Total setoran</span><strong className="mt-1 block text-lg text-teal">{formatRupiah(total)}</strong></div>
          <div><span className="text-xs text-ink-soft">Biaya pengurusan</span><strong className="mt-1 block text-lg text-teal">{formatRupiah(fee)}</strong></div>
          <div><span className="text-xs text-ink-soft">Dana siap qurban</span><strong className="mt-1 block text-lg font-bold text-teal">{formatRupiah(total)}</strong></div>
        </div>
        <p className="mt-5 text-xs italic text-ink-soft">*Simulasi setoran tabungan untuk persiapan ibadah qurban.</p>
      </div>
      <div className="lg:col-span-2">
        <button type="button" onClick={() => setShowDetail((current) => !current)} className="flex w-full items-center justify-between rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-white hover:bg-teal-light">Lihat rincian akumulasi <ChevronDown size={17} className={showDetail ? 'rotate-180 transition-transform' : 'transition-transform'} aria-hidden="true" /></button>
        {showDetail && <div className="mt-3 max-h-56 overflow-auto rounded-xl border border-line bg-white"><table className="w-full min-w-[360px] text-left text-xs"><thead className="sticky top-0 bg-sand"><tr><th className="p-3">Bulan</th><th className="p-3">Setoran</th><th className="p-3">Akumulasi</th></tr></thead><tbody>{Array.from({ length: tenor }, (_, index) => <tr key={index} className="border-t border-line"><td className="p-3">{index + 1}</td><td className="p-3">{formatRupiah(monthly)}</td><td className="p-3 font-semibold text-teal">{formatRupiah(monthly * (index + 1))}</td></tr>)}</tbody></table></div>}
      </div>
    </div>
  )
}
