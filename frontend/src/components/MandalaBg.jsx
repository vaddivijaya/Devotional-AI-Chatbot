export default function MandalaBg() {
  return (
    <svg className="mandala-bg" viewBox="0 0 500 500" fill="none">
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 250 250)`}>
          <ellipse cx="250" cy="120" rx="20" ry="60" fill="rgba(255,215,0,0.6)" />
          <circle cx="250" cy="80" r="8" fill="rgba(255,107,26,0.8)" />
          <line x1="250" y1="250" x2="250" y2="60" stroke="rgba(255,215,0,0.4)" strokeWidth="1" />
        </g>
      ))}
      {[80, 120, 160, 200].map(r => (
        <circle key={r} cx="250" cy="250" r={r} stroke="rgba(255,215,0,0.3)" strokeWidth="0.5" fill="none" />
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="250" y1="250"
          x2={250 + 200 * Math.cos(i * Math.PI / 4)}
          y2={250 + 200 * Math.sin(i * Math.PI / 4)}
          stroke="rgba(255,107,26,0.2)" strokeWidth="0.5" />
      ))}
    </svg>
  );
}
