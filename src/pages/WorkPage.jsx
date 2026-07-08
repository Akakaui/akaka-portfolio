import { useState, useEffect, useRef } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

const projects = [
  { id: 1, title: 'Orbital', category: 'Web Experience', filter: 'web', img: '/images/orbital.jpg', preview: 'A full-stack web app built with modern tech' },
  { id: 2, title: 'Nebula', category: 'Automation', filter: 'automation', img: '/images/nebula.jpg', preview: 'Real-time collaboration platform' },
  { id: 3, title: 'Echoes', category: 'CMS Integration', filter: 'cms', img: '/images/echoes.jpg', preview: 'Workflow automation system' },
  { id: 4, title: 'Luminance', category: 'E-commerce', filter: 'ecommerce', img: '/images/luminance.jpg', preview: 'Interactive data visualization' },
]

export default function WorkPage({ navigate }) {
  const [filter, setFilter] = useState('all')
  const scrollRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let scrollPos = 0
    const speed = 0.4

    const animate = () => {
      scrollPos += speed
      if (scrollPos >= el.scrollWidth - el.clientWidth) {
        scrollPos = 0
      }
      el.scrollLeft = scrollPos
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Experiences' },
    { id: 'interactive', label: 'Interactive' },
    { id: '3d', label: '3D' },
    { id: 'ai', label: 'AI' },
  ]

  const filtered = filter === 'all' ? projects : projects.filter(p => p.filter === filter)

  return (
    <div className="work-section">
      <div className="work-bg">
        <img src="/images/earth-sunrise.png" alt="" className="work-bg-img" />
        <div className="work-bg-overlay"></div>
      </div>
      <div className="eyebrow">My Work</div>
      <h1 className="fade-in">Selected <span className="accent">projects.</span></h1>

      {/* Scrolling project carousel */}
      <div className="work-carousel fade-in">
        <div className="work-carousel-scroll" ref={scrollRef}>
          <div className="work-carousel-track">
            {[...projects, ...projects].map((p, i) => (
              <div 
                key={i} 
                className="work-carousel-item"
                onClick={() => navigate('project', p)}
                style={{ cursor: 'pointer' }}
              >
                <img src={p.img} alt="" />
                <div className="work-carousel-info">
                  <span className="work-carousel-title">{p.title}</span>
                  <span className="work-carousel-category">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-pills">
        {filters.map(f => (
          <button key={f.id} className={`filter-pill ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <div 
            key={p.id} 
            className="project-card fade-in" 
            onClick={() => navigate('project', p)}
            style={{ cursor: 'pointer' }}
          >
            <img src={p.img} alt={p.title} loading="lazy" />
            <div className="project-card-gradient"></div>
            <span className="project-card-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="project-card-content">
              <h3>{p.title}</h3>
              <p className="project-card-preview">{p.preview}</p>
              <div className="project-category">
                {p.category}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn">
        View all projects
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>

      <ScrollIndicator />
    </div>
  )
}
