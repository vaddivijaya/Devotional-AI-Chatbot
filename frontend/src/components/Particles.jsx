export default function Particles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
    color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B1A' : '#FF8FAB',
  }));

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: `0 0 ${parseInt(p.size) * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
