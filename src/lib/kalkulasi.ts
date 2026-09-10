export interface RincianAngsuran {
  bulanKe: number
  pokok: number
  ujrah: number
  angsuran: number
  sisaPokok: number
}

export interface HasilPembiayaan {
  angsuranPerBulan: number
  totalUjrah: number
  totalPembayaran: number
  rincian: RincianAngsuran[]
}

/**
 * Simulasi pembiayaan dengan skema ujrah flat per bulan.
 * Catatan: ini hanya estimasi, bukan perhitungan resmi bank.
 */
export function hitungPembiayaan(
  plafond: number,
  ujrahPersenPerBulan: number,
  tenorBulan: number,
): HasilPembiayaan {
  if (plafond <= 0 || tenorBulan <= 0) {
    return { angsuranPerBulan: 0, totalUjrah: 0, totalPembayaran: 0, rincian: [] }
  }

  const pokokPerBulan = plafond / tenorBulan
  const ujrahPerBulan = plafond * (ujrahPersenPerBulan / 100)
  const angsuranPerBulan = pokokPerBulan + ujrahPerBulan
  const totalUjrah = ujrahPerBulan * tenorBulan
  const totalPembayaran = plafond + totalUjrah

  const rincian: RincianAngsuran[] = Array.from({ length: tenorBulan }, (_, i) => {
    const bulanKe = i + 1
    const sisaPokok = Math.max(plafond - pokokPerBulan * bulanKe, 0)
    return {
      bulanKe,
      pokok: pokokPerBulan,
      ujrah: ujrahPerBulan,
      angsuran: angsuranPerBulan,
      sisaPokok,
    }
  })

  return { angsuranPerBulan, totalUjrah, totalPembayaran, rincian }
}
