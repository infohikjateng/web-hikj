import { useMemo, useState } from 'react'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { formatRupiah } from '../../lib/format'

const rates = {
  1: { nasabah: 20, bank: 80, setara: 3.66 },
  3: { nasabah: 25, bank: 75, setara: 4.57 },
  6: { nasabah: 30, bank: 70, setara: 5.48 },
  12: { nasabah: 35, bank: 65, setara: 6.4 },
} as const

type Tenor = keyof typeof rates

export function DepositoCalculator() {
  const [nominal, setNominal] = useState(10_000_000)
  const [tenor, setTenor] = useState<Tenor>(12)
  const [showDetail, setShowDetail] = useState(false)

  const result = useMemo(() => {
    const rate = rates[tenor].setara / 100
    const grossMonthly = (nominal * rate) / 12
    const tax = nominal > 7_500_000 ? grossMonthly * 0.2 : 0
    const netMonthly = grossMonthly - tax
    return { grossMonthly, tax, netMonthly, total: netMonthly * tenor }
  }, [nominal, tenor])

  const reset = () => {
    setNominal(10_000_000)
    setTenor(12)
    setShowDetail(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Nominal deposito
          <input
            type="number"
            min={1_000_000}
            max={1_000_000_000}
            value={nominal}
            onChange={(event) => setNominal(Number(event.target.value) || 0)}
            className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/10"
          />
          <span className="mt-1 block text-xs text-ink-soft">Rp1 juta sampai Rp1 miliar</span>
        </label>
        <label className="block text-sm font-medium text-ink">
          Jangka waktu (tenor)
          <select
            value={tenor}
            onChange={(event) => setTenor(Number(event.target.value) as Tenor)}
            className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/10"
          >
            {Object.keys(rates).map((value) => (
              <option key={value} value={value}>{value} Bulan</option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-ink-soft">Rate indikatif {rates[tenor].setara.toFixed(2)}% p.a.</span>
        </label>
        <div className="flex items-end gap-2 sm:col-span-2">
          <button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink-soft hover:bg-sand">
            <RotateCcw size={15} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-sand p-5 md:p-6">
        <p className="text-sm text-ink-soft">Estimasi bagi hasil bersih / bulan</p>
        <p className="mt-1 text-3xl font-bold text-teal">{formatRupiah(result.netMonthly)}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/70 p-3"><span className="block text-xs text-ink-soft">Nisbah nasabah</span><strong className="text-teal">{rates[tenor].nasabah}%</strong></div>
          <div className="rounded-xl bg-white/70 p-3"><span className="block text-xs text-ink-soft">Total bagi hasil</span><strong className="text-teal">{formatRupiah(result.total)}</strong></div>
        </div>
        <p className="mt-4 text-xs italic text-ink-soft">*Pajak 20% berlaku untuk nominal di atas Rp7.500.000.</p>
      </div>
      <div className="lg:col-span-2">
        <button type="button" onClick={() => setShowDetail((current) => !current)} className="flex w-full items-center justify-between rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-white hover:bg-teal-light">
          Lihat rincian bagi hasil <ChevronDown size={17} className={showDetail ? 'rotate-180 transition-transform' : 'transition-transform'} aria-hidden="true" />
        </button>
        {showDetail && (
          <div className="mt-3 max-h-56 overflow-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[430px] text-left text-xs"><thead className="sticky top-0 bg-sand"><tr><th className="p-3">Bulan</th><th className="p-3">Bagi hasil kotor</th><th className="p-3">Bagi hasil bersih</th></tr></thead><tbody>{Array.from({ length: tenor }, (_, index) => <tr key={index} className="border-t border-line"><td className="p-3">{index + 1}</td><td className="p-3">{formatRupiah(result.grossMonthly)}</td><td className="p-3 font-semibold text-teal">{formatRupiah(result.netMonthly)}</td></tr>)}</tbody></table>
          </div>
        )}
      </div>
    </div>
  )
}
