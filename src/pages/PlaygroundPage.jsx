import { useEffect, useRef, useState } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

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
    function createParticles() {
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * size + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / 100) * 0.15
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    createParticles()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [count, size, speed, color])

  const randomize = () => {
    setCount(Math.floor(Math.random() * 2000) + 200)
    setSize(+(Math.random() * 6 + 1).toFixed(1))
    setSpeed(+(Math.random() * 4 + 0.5).toFixed(1))
    const hue = Math.floor(Math.random() * 60) + 250
    setColor(`hsl(${hue}, 70%, 60%)`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="playground-section">
      <button className="back-link" onClick={() => navigate('home')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Playground/Experiments
      </button>

      <h1 className="fade-in">Code. Experiment. <span className="accent" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Create.</span></h1>
      <p className="playground-sub fade-in">A sandbox for creativity. Explore small experiments, creative coding and interactive ideas that push the boundaries of the web.</p>

      <div className="playground-hero fade-in">
        <img src="/images/starburst.png" alt="Creative experiment" className="playground-hero-img" />
      </div>

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
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
          </div>
          <button className="randomize-btn" onClick={randomize}>Randomize</button>
        </div>
        <div className="built-with">
          <span className="built-with-label">Built with</span>
          <span className="built-with-tag">Canvas API</span>
          <span className="built-with-tag">React</span>
          <span className="built-with-tag">TypeScript</span>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  )
}
