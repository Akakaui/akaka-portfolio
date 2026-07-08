import { useEffect, useRef, useState } from 'react'


export default function PlaygroundPage({ navigate }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [count, setCount] = useState(800)
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1.2)
  const [color, setColor] = useState('#8B5CF6')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const container = canvas.parentElement

    function resize() {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let particles = []
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.45

    function createParticles() {
      particles = []
      const armsCount = 2
      const spiralFactor = 2.0 // winding coefficient
      
      for (let i = 0; i < count; i++) {
        const armIndex = i % armsCount
        // denser distribution towards core using Math.pow
        const distance = Math.pow(Math.random(), 2.2) * maxRadius
        const armAngle = (armIndex * Math.PI * 2) / armsCount
        const angle = armAngle + (distance / maxRadius) * Math.PI * spiralFactor
        
        // spread particles out from exact arm lines
        const spread = (1 - (distance / maxRadius) * 0.5) * 26
        const offsetX = (Math.random() - 0.5) * spread
        const offsetY = (Math.random() - 0.5) * spread

        particles.push({
          r: distance,
          angle: angle + (Math.random() - 0.5) * 0.15,
          offsetX,
          offsetY,
          size: Math.random() * size + 0.4,
          colorFactor: distance / maxRadius, // 0 = core, 1 = edge
          alpha: Math.random() * 0.6 + 0.4,
        })
      }
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let currentCenterX = canvas.width / 2
    let currentCenterY = canvas.height / 2
    let isHovering = false

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isHovering = true
    }

    const handleMouseLeave = () => {
      mouseX = canvas.width / 2
      mouseY = canvas.height / 2
      isHovering = false
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    function draw() {
      // solid black clear but with trails
      ctx.fillStyle = 'rgba(10, 10, 18, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spring-based interpolation for galaxy core coordinates
      currentCenterX += (mouseX - currentCenterX) * 0.08
      currentCenterY += (mouseY - currentCenterY) * 0.08

      // Additive screen blending for gorgeous overlays
      ctx.globalCompositeOperation = 'screen'

      particles.forEach(p => {
        // Differential rotation - core rotates faster
        const rotationSpeed = 0.005 * speed * (1 / (p.r / 45 + 1))
        p.angle += rotationSpeed

        const x = currentCenterX + Math.cos(p.angle) * p.r + p.offsetX
        const y = currentCenterY + Math.sin(p.angle) * p.r + p.offsetY

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)

        // Core blends to bright cyan/white, outer arms to the user-selected color
        let fillStyle
        if (p.colorFactor < 0.2) {
          fillStyle = `rgba(224, 242, 254, ${p.alpha * 0.85})` // Core white/cyan glow
        } else {
          // Parse hex and inject alpha
          const opacity = Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
          fillStyle = `${color}${opacity}`
        }

        ctx.fillStyle = fillStyle
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'
      animRef.current = requestAnimationFrame(draw)
    }

    createParticles()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [count, size, speed, color])

  const randomize = () => {
    setCount(Math.floor(Math.random() * 1200) + 400)
    setSize(+(Math.random() * 4 + 1).toFixed(1))
    setSpeed(+(Math.random() * 2.5 + 0.4).toFixed(1))
    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4']
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }

  return (
    <div className="playground-section">
      <button className="back-link" onClick={() => navigate('home')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Playground/Experiments
      </button>

      <h1 className="fade-in">Code. Experiment. <span className="accent" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Create.</span></h1>
      <p className="playground-sub fade-in">A sandbox for creativity. Explore small experiments, creative coding and interactive ideas that push the boundaries of the web.</p>

      <div className="experiment-card fade-in">
        <div className="experiment-canvas">
          <canvas ref={canvasRef} />
        </div>
        <div className="experiment-info">
          <h3>Particles</h3>
          <p>Interactive particle system.</p>
        </div>
        <div className="experiment-controls">
          <div className="control-group">
            <label>Count</label>
            <input type="number" value={count} onChange={e => setCount(+e.target.value)} min={50} max={3000} />
          </div>
          <div className="control-group">
            <label>Size</label>
            <input type="number" value={size} onChange={e => setSize(+e.target.value)} min={0.5} max={10} step={0.5} />
          </div>
          <div className="control-group">
            <label>Speed</label>
            <input type="number" value={speed} onChange={e => setSpeed(+e.target.value)} min={0.1} max={5} step={0.1} />
          </div>
          <div className="control-group">
            <label>Color</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="color" 
                value={color} 
                onChange={e => setColor(e.target.value)} 
                id="color-picker-input" 
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
              />
              <button 
                onClick={() => document.getElementById('color-picker-input').click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 13,
                  transition: 'all 0.3s ease'
                }}
                className="color-picker-button"
              >
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, backgroundColor: color }}></span>
                <span>{color.toUpperCase()}</span>
              </button>
            </div>
          </div>
          <button className="randomize-btn" onClick={randomize}>Randomize</button>
        </div>
        <div className="built-with">
          <span className="built-with-label">Built with</span>
          <span className="built-with-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" style={{ marginRight: 4 }} fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12l3 3 7-7"/></svg>
            Canvas 2D
          </span>
          <span className="built-with-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" style={{ marginRight: 4 }} fill="#61DAFB"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            React
          </span>
          <span className="built-with-tag">
            <span style={{ color: '#3178c6', fontWeight: 'bold', fontSize: 10, marginRight: 4 }}>TS</span>
            TypeScript
          </span>
        </div>
      </div>


    </div>
  )
}
