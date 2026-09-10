import { useState } from 'react'
import { Calculator, Coins, Gift, Landmark } from 'lucide-react'
import { DepositoCalculator } from './kalkulator-deposito/DepositoCalculator'
import { PembiayaanCalculator } from './kalkulator-pembiayaan/PembiayaanCalculator'
import { QurbanCalculator } from './kalkulator-qurban/QurbanCalculator'
import { ThrCalculator } from './kalkulator-thr/ThrCalculator'

const calculators = [
  { id: 'pembiayaan', label: 'Simulasi Pembiayaan', icon: Landmark },
  { id: 'deposito', label: 'Simulasi Deposito', icon: Coins },
  { id: 'qurban', label: 'Simulasi Tabungan Qurban', icon: Gift },
  { id: 'thr', label: 'Simulasi Tabungan Hari Raya', icon: Calculator },
] as const

type CalculatorId = (typeof calculators)[number]['id']

export function SyariahCalculator() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>('pembiayaan')
  const ActiveIcon = calculators.find((item) => item.id === activeCalculator)?.icon ?? Calculator

  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-xl shadow-teal/5 sm:p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-teal md:text-4xl">Kalkulator Perhitungan Syariah</h2>
        </div>
        <div className="hidden rounded-2xl bg-sand p-3 text-teal sm:block"><ActiveIcon size={24} aria-hidden="true" /></div>
      </div>

      <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Jenis kalkulator syariah">
        {calculators.map((calculator) => {
          const Icon = calculator.icon
          const isActive = activeCalculator === calculator.id
          return (
            <button
              key={calculator.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCalculator(calculator.id)}
              className={`flex min-h-16 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${isActive ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'bg-sand/50 text-ink-soft hover:bg-sand hover:text-teal'}`}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{calculator.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8" role="tabpanel">
        {activeCalculator === 'pembiayaan' && <PembiayaanCalculator />}
        {activeCalculator === 'deposito' && <DepositoCalculator />}
        {activeCalculator === 'qurban' && <QurbanCalculator />}
        {activeCalculator === 'thr' && <ThrCalculator />}
      </div>
    </div>
  )
}
