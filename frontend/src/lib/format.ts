export function formatRupiah(value: number): string {
  if (!Number.isFinite(value)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPersen(value: number): string {
  return `${value.toFixed(2)}%`
}
