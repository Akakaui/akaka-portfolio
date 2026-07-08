import { useEffect, useRef, useState } from 'react'

const experiments = [
  {
    id: 'particles',
    name: 'Particles',
    desc: 'Interactive spiral galaxy particle system.',
    tech: ['Canvas 2D', 'React'],
  },
  {
    id: 'wave',
    name: 'Wave',
    desc: 'Audio-reactive sine wave visualization.',
    tech: ['Web Audio API', 'Canvas 2D'],
  },
  {
    id: 'matrix',
    name: 'Matrix Rain',
    desc: 'Classic falling code rain effect.',
    tech: ['Canvas 2D', 'TypeScript'],
  },
  {
    id: 'gravity',
    name: 'Gravity',
    desc: 'N-body gravitational simulation.',
    tech: ['Canvas 2D', 'Physics'],
  },
]

function ParticleCanvas({ count, size, speed, color }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

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
      const spiralFactor = 2.0

      for (let i = 0; i < count; i++) {
        const armIndex = i % armsCount
        const distance = Math.pow(Math.random(), 2.2) * maxRadius
        const armAngle = (armIndex * Math.PI * 2) / armsCount
        const angle = armAngle + (distance / maxRadius) * Math.PI * spiralFactor

        const spread = (1 - (distance / maxRadius) * 0.5) * 26
        const offsetX = (Math.random() - 0.5) * spread
        const offsetY = (Math.random() - 0.5) * spread

        particles.push({
          r: distance,
          angle: angle + (Math.random() - 0.5) * 0.15,
          offsetX, offsetY,
          size: Math.random() * size + 0.4,
          colorFactor: distance / maxRadius,
          alpha: Math.random() * 0.6 + 0.4,
        })
      }
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let currentCenterX = canvas.width / 2
    let currentCenterY = canvas.height / 2

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 18, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      currentCenterX += (mouseX - currentCenterX) * 0.08
      currentCenterY += (mouseY - currentCenterY) * 0.08

      ctx.globalCompositeOperation = 'screen'

      particles.forEach(p => {
        const rotationSpeed = 0.005 * speed * (1 / (p.r / 45 + 1))
        p.angle += rotationSpeed
        const x = currentCenterX + Math.cos(p.angle) * p.r + p.offsetX
        const y = currentCenterY + Math.sin(p.angle) * p.r + p.offsetY

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)

        let fillStyle
        if (p.colorFactor < 0.2) {
          fillStyle = `rgba(224, 242, 254, ${p.alpha * 0.85})`
        } else {
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
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [count, size, speed, color])

  return <canvas ref={canvasRef} />
}

function WaveCanvas({ speed, color }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const timeRef = useRef(0)

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

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 18, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += 0.02 * speed

      for (let w = 0; w < 5; w++) {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.globalAlpha = 0.6 - w * 0.1
        ctx.lineWidth = 2

        for (let x = 0; x < canvas.width; x += 2) {
          const normalizedX = x / canvas.width
          const mouseInfluence = Math.exp(-Math.pow((x - mouseX) / 200, 2)) * 80
          const y = canvas.height / 2
            + Math.sin(normalizedX * 6 + timeRef.current + w * 0.5) * (40 + w * 15)
            + Math.sin(normalizedX * 2.5 + timeRef.current * 0.7) * 20
            - mouseInfluence

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [speed, color])

  return <canvas ref={canvasRef} />
}

function MatrixCanvas({ speed }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

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

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 18, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#8B5CF6'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.globalAlpha = 0.8
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += speed * 0.3
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [speed])

  return <canvas ref={canvasRef} />
}

function GravityCanvas({ speed }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

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

    const bodies = []
    const G = 0.5
    const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']

    for (let i = 0; i < 8; i++) {
      bodies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        mass: Math.random() * 30 + 10,
        color: colors[i % colors.length],
      })
    }

    let trailCanvas = document.createElement('canvas')
    trailCanvas.width = canvas.width
    trailCanvas.height = canvas.height

    function draw() {
      const trailCtx = trailCanvas.getContext('2d')
      trailCtx.fillStyle = 'rgba(10, 10, 18, 0.06)'
      trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height)

      bodies.forEach(body => {
        let ax = 0, ay = 0
        bodies.forEach(other => {
          if (other === body) return
          const dx = other.x - body.x
          const dy = other.y - body.y
          const dist = Math.sqrt(dx * dx + dy * dy) + 5
          const force = G * other.mass / (dist * dist)
          ax += force * dx / dist
          ay += force * dy / dist
        })

        body.vx += ax * speed * 0.1
        body.vy += ay * speed * 0.1
        body.x += body.vx
        body.y += body.vy

        if (body.x < 0 || body.x > canvas.width) body.vx *= -0.8
        if (body.y < 0 || body.y > canvas.height) body.vy *= -0.8
        body.x = Math.max(0, Math.min(canvas.width, body.x))
        body.y = Math.max(0, Math.min(canvas.height, body.y))

        trailCtx.beginPath()
        trailCtx.arc(body.x, body.y, body.mass * 0.15, 0, Math.PI * 2)
        trailCtx.fillStyle = body.color
        trailCtx.globalAlpha = 0.8
        trailCtx.fill()
      })

      trailCtx.globalAlpha = 1

      ctx.drawImage(trailCanvas, 0, 0)

      bodies.forEach(body => {
        ctx.beginPath()
        ctx.arc(body.x, body.y, Math.sqrt(body.mass) * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = body.color
        ctx.shadowColor = body.color
        ctx.shadowBlur = 20
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [speed])

  return <canvas ref={canvasRef} />
}

export default function PlaygroundPage({ navigate }) {
  const [activeExperiment, setActiveExperiment] = useState('particles')
  const [count, setCount] = useState(800)
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1.2)
  const [color, setColor] = useState('#8B5CF6')

  const randomize = () => {
    setCount(Math.floor(Math.random() * 1200) + 400)
    setSize(+(Math.random() * 4 + 1).toFixed(1))
    setSpeed(+(Math.random() * 2.5 + 0.4).toFixed(1))
    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4']
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }

  const currentExp = experiments.find(e => e.id === activeExperiment)

  return (
    <div className="playground-section">
      <button className="back-link" onClick={() => navigate('home')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Playground/Experiments
      </button>

      <h1 className="fade-in">Code. Experiment. <span className="accent" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Create.</span></h1>
      <p className="playground-sub fade-in">A sandbox for creativity. Explore small experiments, creative coding and interactive ideas that push the boundaries of the web.</p>

      <div className="experiment-tabs fade-in">
        {experiments.map(exp => (
          <button
            key={exp.id}
            className={`experiment-tab ${activeExperiment === exp.id ? 'active' : ''}`}
            onClick={() => setActiveExperiment(exp.id)}
          >
            {exp.name}
          </button>
        ))}
      </div>

      <div className="experiment-card fade-in">
        <div className="experiment-canvas">
          {activeExperiment === 'particles' && <ParticleCanvas count={count} size={size} speed={speed} color={color} />}
          {activeExperiment === 'wave' && <WaveCanvas speed={speed} color={color} />}
          {activeExperiment === 'matrix' && <MatrixCanvas speed={speed} />}
          {activeExperiment === 'gravity' && <GravityCanvas speed={speed} />}
        </div>
        <div className="experiment-info">
          <h3>{currentExp?.name}</h3>
          <p>{currentExp?.desc}</p>
        </div>
        <div className="experiment-controls">
          {activeExperiment === 'particles' && (
            <>
              <div className="control-group">
                <label>Count</label>
                <input type="number" value={count} onChange={e => setCount(+e.target.value)} min={50} max={3000} />
              </div>
              <div className="control-group">
                <label>Size</label>
                <input type="number" value={size} onChange={e => setSize(+e.target.value)} min={0.5} max={10} step={0.5} />
              </div>
            </>
          )}
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
          {currentExp?.tech.map((t, i) => (
            <span key={i} className="built-with-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
