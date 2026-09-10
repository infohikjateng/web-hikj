import { useMemo, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { hitungPembiayaan } from '../../lib/kalkulasi'
import { formatRupiah } from '../../lib/format'
import { Button } from '../../components/ui/Button'

const jenisPembiayaan = [
  { value: 'umkm', label: 'Pembiayaan iB UMKM / umum', ujrah: 1.5, min: 10_000_000, max: 200_000_000, tenors: [12, 24, 36, 48] },
  { value: 'guru', label: 'Pembiayaan iB sertifikasi guru', ujrah: 1.58333, min: 20_000_000, max: 150_000_000, tenors: [12, 24, 36, 48, 60] },
  { value: 'pmi', label: 'Pembiayaan iB pekerja migran (PMI)', ujrah: 1.75, min: 10_000_000, max: 120_000_000, tenors: [12, 18, 24, 36, 48, 60] },
  { value: 'pensiunan', label: 'Pembiayaan iB pensiunan', ujrah: 1.4167, min: 10_000_000, max: 100_000_000, tenors: [12, 24, 36, 48, 60, 72] },
] as const

const schema = z.object({
  jenis: z.enum(['umkm', 'guru', 'pmi', 'pensiunan']),
  plafond: z.number().min(1_000_000, 'Minimal Rp 1.000.000'),
  tenor: z.number().min(1).max(72),
})

type FormValues = z.infer<typeof schema>

export function PembiayaanCalculator() {
  const { register, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { jenis: 'umkm', plafond: 20_000_000, tenor: 12 },
    mode: 'onChange',
  })

  const values = watch()
  const produk = jenisPembiayaan.find((item) => item.value === values.jenis) ?? jenisPembiayaan[0]
  const plafond = Number(values.plafond) || 0
  const selectedTenor = Number(values.tenor) || produk.tenors[0]
  const selectedResult = hitungPembiayaan(plafond, produk.ujrah, selectedTenor)

  const comparisonRows = useMemo(() => {
    if (plafond < produk.min || plafond > produk.max) return []
    const rowCount = Math.floor((plafond - produk.min) / 5_000_000) + 1
    return Array.from({ length: rowCount }, (_, index) => {
      const rowPlafond = Math.min(produk.min + index * 5_000_000, plafond)
      return {
        plafond: rowPlafond,
        values: produk.tenors.map((tenor) => ({
          tenor,
          angsuran: hitungPembiayaan(rowPlafond, produk.ujrah, tenor).angsuranPerBulan,
        })),
      }
    })
  }, [plafond, produk])

  const handleJenisChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = jenisPembiayaan.find((item) => item.value === event.target.value) ?? jenisPembiayaan[0]
    setValue('jenis', next.value)
    setValue('tenor', next.tenors[0])
    setValue('plafond', next.min)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink" htmlFor="jenis">Pilih produk pembiayaan</label>
          <select id="jenis" value={values.jenis} onChange={handleJenisChange} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/10">
            {jenisPembiayaan.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="plafond">Plafond pembiayaan</label>
          <input id="plafond" type="number" min={produk.min} max={produk.max} step={5_000_000} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/10" {...register('plafond', { valueAsNumber: true })} />
          <p className="mt-1 text-xs text-ink-soft">Min {formatRupiah(produk.min)} - max {formatRupiah(produk.max)}</p>
          {errors.plafond && <p className="mt-1 text-xs text-red-700">{errors.plafond.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="tenor">Jangka waktu (tenor)</label>
          <select id="tenor" value={selectedTenor} onChange={(event) => setValue('tenor', Number(event.target.value))} className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/10">
            {produk.tenors.map((tenor) => <option key={tenor} value={tenor}>{tenor} Bulan</option>)}
          </select>
        </div>

        <p className="text-xs italic text-ink-soft sm:col-span-2">Estimasi ujrah {produk.ujrah.toFixed(2)}% per bulan (flat). Besaran ujrah dapat berubah sesuai hasil analisa.</p>
        <div className="flex gap-2 sm:col-span-2">
          <Button type="button" variant="primary">Hitung simulasi</Button>
          <Button type="button" variant="outline" onClick={() => reset({ jenis: 'umkm', plafond: 20_000_000, tenor: 12 })}>Reset</Button>
        </div>
      </form>

      <div className="rounded-2xl bg-sand p-5 md:p-6">
        <p className="text-sm text-ink-soft">Estimasi angsuran per bulan ({selectedTenor} bulan)</p>
        <p className="mt-1 text-3xl font-bold text-teal">{formatRupiah(selectedResult.angsuranPerBulan)}</p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between border-b border-line pb-3"><dt className="text-ink-soft">Total ujrah</dt><dd>{formatRupiah(selectedResult.totalUjrah)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink-soft">Total pembayaran</dt><dd>{formatRupiah(selectedResult.totalPembayaran)}</dd></div>
        </dl>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white lg:col-span-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-center text-xs">
            <thead className="bg-teal text-white"><tr><th className="p-3 font-semibold">Plafond</th>{produk.tenors.map((tenor) => <th key={tenor} className="p-3 font-semibold">Angsuran ({tenor} Bulan)</th>)}</tr></thead>
            <tbody>{comparisonRows.length > 0 ? comparisonRows.map((row) => <tr key={row.plafond} className="border-t border-line hover:bg-sand/50"><td className="p-3 font-semibold">{formatRupiah(row.plafond)}</td>{row.values.map((item) => <td key={item.tenor} className="p-3">{formatRupiah(item.angsuran)}</td>)}</tr>) : <tr><td colSpan={produk.tenors.length + 1} className="p-8 text-ink-soft">Masukkan plafond sesuai batas produk untuk melihat perbandingan angsuran.</td></tr>}</tbody>
          </table>
        </div>
        <p className="border-t border-line px-4 py-3 text-xs italic text-ink-soft">Perhitungan hanya simulasi/estimasi, tidak mengikat, dan dapat berubah sewaktu-waktu.</p>
      </div>
    </div>
  )
}
