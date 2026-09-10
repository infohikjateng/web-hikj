import { useMemo, useState } from 'react'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { formatPersen, formatRupiah } from '../../lib/format'

const packages = [
  { id: 'I', label: 'Paket I', initial: 300_000, monthly: 300_000, benefit: 75_000, eqr: 2.27 },
  { id: 'II', label: 'Paket II', initial: 500_000, monthly: 500_000, benefit: 100_000, eqr: 1.82 },
  { id: 'III', label: 'Paket III', initial: 1_000_000, monthly: 1_000_000, benefit: 175_000, eqr: 1.59 },
  { id: 'IV', label: 'Paket IV', initial: 5_000_000, monthly: 5_000_000, benefit: 250_000, eqr: 0.45 },
  { id: 'V', label: 'Paket V', initial: 10_000_000, monthly: 10_000_000, benefit: 350_000, eqr: 0.32 },
] as const

export function ThrCalculator() {
  const [packageId, setPackageId] = useState('I')
  const [initial, setInitial] = useState(300_000)
  const [monthly, setMonthly] = useState(300_000)
  const [tenor, setTenor] = useState(10)
  const [showDetail, setShowDetail] = useState(false)
  const selected = packages.find((item) => item.id === packageId)
  const benefit = selected?.benefit ?? 75_000
  const total = useMemo(() => initial + monthly * tenor, [initial, monthly, tenor])
  const eqr = selected?.eqr ?? (total ? (benefit / total) * 100 : 0)
  const reset = () => { setPackageId('I'); setInitial(300_000); setMonthly(300_000); setTenor(10); setShowDetail(false) }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink sm:col-span-2">Pilih paket THR
          <select value={packageId} onChange={(event) => { const next = packages.find((item) => item.id === event.target.value); setPackageId(event.target.value); if (next) { setInitial(next.initial); setMonthly(next.monthly) } }} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal">
            {packages.map((item) => <option key={item.id} value={item.id}>{item.label} - {formatRupiah(item.monthly)} / bulan</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">Setoran awal
          <input type="number" value={initial} onChange={(event) => { setPackageId('CUSTOM'); setInitial(Number(event.target.value) || 0) }} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal" />
        </label>
        <label className="block text-sm font-medium text-ink">Setoran per bulan
          <input type="number" value={monthly} onChange={(event) => { setPackageId('CUSTOM'); setMonthly(Number(event.target.value) || 0) }} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal" />
        </label>
        <label className="block text-sm font-medium text-ink">Tenor
          <input type="number" min={1} max={24} value={tenor} onChange={(event) => setTenor(Number(event.target.value) || 0)} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal" />
        </label>
        <div className="flex items-end"><button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink-soft hover:bg-sand"><RotateCcw size={15} aria-hidden="true" /> Reset</button></div>
      </div>
      <div className="rounded-2xl bg-sand p-5 md:p-6">
        <div className="grid grid-cols-3 gap-3"><div><span className="text-xs text-ink-soft">Dana terhimpun</span><strong className="mt-1 block text-base text-teal">{formatRupiah(total)}</strong></div><div><span className="text-xs text-ink-soft">Paket sembako</span><strong className="mt-1 block text-base text-teal">{formatRupiah(benefit)}</strong></div><div><span className="text-xs text-ink-soft">Setara EQR</span><strong className="mt-1 block text-base text-teal">{formatPersen(eqr)}</strong></div></div>
        <p className="mt-5 text-xs italic text-ink-soft">*Bagi hasil tabungan diberikan dalam bentuk paket sembako menjelang Hari Raya.</p>
      </div>
      <div className="lg:col-span-2">
        <button type="button" onClick={() => setShowDetail((current) => !current)} className="flex w-full items-center justify-between rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-white hover:bg-teal-light">Lihat rincian akumulasi <ChevronDown size={17} className={showDetail ? 'rotate-180 transition-transform' : 'transition-transform'} aria-hidden="true" /></button>
        {showDetail && <div className="mt-3 max-h-56 overflow-auto rounded-xl border border-line bg-white"><table className="w-full min-w-[360px] text-left text-xs"><thead className="sticky top-0 bg-sand"><tr><th className="p-3">Bulan</th><th className="p-3">Setoran</th><th className="p-3">Akumulasi</th></tr></thead><tbody><tr className="border-t border-line"><td className="p-3">Awal</td><td className="p-3">{formatRupiah(initial)}</td><td className="p-3 font-semibold text-teal">{formatRupiah(initial)}</td></tr>{Array.from({ length: tenor }, (_, index) => <tr key={index} className="border-t border-line"><td className="p-3">{index + 1}</td><td className="p-3">{formatRupiah(monthly)}</td><td className="p-3 font-semibold text-teal">{formatRupiah(initial + monthly * (index + 1))}</td></tr>)}</tbody></table></div>}
      </div>
    </div>
  )
}
