import { useEffect, useState, useRef, useCallback } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

const projects = [
  { id: 1, title: 'Orbital', category: 'Interactive', filter: 'interactive', img: '/images/orbital.jpg', desc: 'A full-stack web app built with modern tech' },
  { id: 2, title: 'Nebula', category: 'Full Stack', filter: 'fullstack', img: '/images/nebula.jpg', desc: 'Real-time collaboration platform' },
  { id: 3, title: 'Echoes', category: 'Automation', filter: 'automation', img: '/images/echoes.jpg', desc: 'Workflow automation system' },
  { id: 4, title: 'Luminance', category: 'Interactive', filter: 'interactive', img: '/images/luminance.jpg', desc: 'Interactive data visualization' },
]

export default function HomePage({ navigate }) {
  const [currentProject, setCurrentProject] = useState(0)
  const intervalRef = useRef(null)
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-cycle featured projects
  const startAutoCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % projects.length)
    }, 4000)
  }, [])

  useEffect(() => {
    startAutoCycle()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startAutoCycle])

  const goToProject = (index) => {
    setCurrentProject(index)
    startAutoCycle()
  }

  const nextProject = () => {
    setCurrentProject(prev => (prev + 1) % projects.length)
    startAutoCycle()
  }

  const prevProject = () => {
    setCurrentProject(prev => (prev - 1 + projects.length) % projects.length)
    startAutoCycle()
  }

  // Playground canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const createParticles = () => {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 220,
      }))
    }
    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1
        
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.x -= dx * 0.02
          p.y -= dy * 0.02
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.8)`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(240, 60%, 60%, ${0.3 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouse)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      canvas.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  const project = projects[currentProject]

  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="fade-in">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 12, fontWeight: 500 }}>Hello, I'm</span>
            </div>
            <h1>I build simple solutions to complex <span className="accent">problems.</span></h1>
            <p className="hero-sub">I'm a full-stack developer focused on building fast, reliable web apps and automation systems for small businesses and growing brands.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('work')}>
                Explore my work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('contact')}>
                Contact me
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
          <div className="hero-visual fade-in">
            <img src="/images/earth-night.png" alt="Earth from space" className="hero-planet-img" />
          </div>
        </div>
      </section>

      <div className="hero-cards">
        <div className="card fade-in">
          <div className="card-header">
            <div className="eyebrow">Featured Work</div>
            <div className="card-arrows">
              <button aria-label="Previous" onClick={prevProject}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button aria-label="Next" onClick={nextProject}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="featured-project" onClick={() => navigate('project', project)} style={{ cursor: 'pointer' }}>
            <img src={project.img} alt={project.title} loading="lazy" />
            <span className="featured-project-num">{String(currentProject + 1).padStart(2, '0')}</span>
            <div className="featured-project-overlay">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          </div>
          <div className="featured-dots">
            {projects.map((_, i) => (
              <button 
                key={i} 
                className={`dot ${i === currentProject ? 'active' : ''}`}
                onClick={() => goToProject(i)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
          <button className="view-project" onClick={() => navigate('work')}>
            View Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <div className="eyebrow">Playground Preview</div>
          </div>
          <canvas ref={canvasRef} className="playground-canvas-preview" />
          <div className="playground-canvas-info">
            <h4>Particle Network</h4>
            <p>Interactive canvas experiment</p>
          </div>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <div className="eyebrow">About Me</div>
          </div>
          <h3 className="about-card-headline">I build at the intersection of reliability, speed and <span className="accent">clean code.</span></h3>
          <p className="about-card-copy">With a strong focus on performance, usability and detail, I create systems that not only work flawlessly, but scale effortlessly.</p>
          <div className="stats-row">
            <div>
              <div className="stat-num">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-num">15+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div>
              <div className="stat-num">8+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </>
  )
}
