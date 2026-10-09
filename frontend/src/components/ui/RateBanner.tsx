import { rateDepositoBerjalan } from '../../data/produk'

export function RateBanner() {
  const rateItems = rateDepositoBerjalan.rate.map((r) => (
    <div key={r.tenorBulan} className="flex shrink-0 items-baseline gap-2">
      <span className="text-2xl font-bold text-lime">{r.setaraPersen.toFixed(2)}%</span>
      <span className="text-sm text-white/80">setara {r.tenorBulan} bulan</span>
    </div>
  ))

  return (
    <div className="overflow-hidden border-y border-forest bg-forest" aria-label="Informasi bagi hasil deposito">
      <div className="flex min-h-14 items-center overflow-hidden py-3">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap px-6 md:gap-14 md:px-10">
          <p className="shrink-0 text-sm font-medium text-white">
            Estimasi bagi hasil deposito <span className="mx-2 text-aqua">&middot;</span> periode {rateDepositoBerjalan.periode}
          </p>
          {rateItems}
          <span className="text-white/30" aria-hidden="true">|</span>
          <p className="shrink-0 text-sm font-medium text-white">
            Estimasi bagi hasil deposito <span className="mx-2 text-aqua">&middot;</span> periode {rateDepositoBerjalan.periode}
          </p>
          {rateDepositoBerjalan.rate.map((r) => (
            <div key={`duplicate-${r.tenorBulan}`} className="flex shrink-0 items-baseline gap-2">
              <span className="text-2xl font-bold text-lime">{r.setaraPersen.toFixed(2)}%</span>
              <span className="text-sm text-white/80">setara {r.tenorBulan} bulan</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
