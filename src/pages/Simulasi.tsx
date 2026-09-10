import { Section } from '../components/ui/Section'
import { SyariahCalculator } from '../features/SyariahCalculator'

export function Simulasi() {
  return (
    <Section tone="sand" className="min-h-[calc(100vh-5rem)]">
      <SyariahCalculator />
    </Section>
  )
}
