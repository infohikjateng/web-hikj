interface GeometricMotifProps {
  className?: string
}

// Motif garis terinspirasi ubin geometris, dipakai sebagai satu momen visual
// di hero — bukan pola berulang di setiap section.
export function GeometricMotif({ className = '' }: GeometricMotifProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="20" y="20" width="200" height="200" transform="rotate(45 120 120)" />
      <rect x="55" y="55" width="130" height="130" transform="rotate(45 120 120)" />
      <circle cx="120" cy="120" r="70" />
      <circle cx="120" cy="120" r="40" />
    </svg>
  )
}
