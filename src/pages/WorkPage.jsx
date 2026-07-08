import { useState, useEffect } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

export default function WorkPage({ navigate }) {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const projects = [
    { id: 1, title: 'Project One', category: 'Web Experience', filter: 'web', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
    { id: 2, title: 'Project Two', category: 'Automation', filter: 'automation', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop' },
    { id: 3, title: 'Project Three', category: 'CMS Integration', filter: 'cms', img: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=600&fit=crop' },
    { id: 4, title: 'Project Four', category: 'E-commerce', filter: 'ecommerce', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop' },
  ]

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

      <div className="filter-pills">
        {filters.map(f => (
          <button key={f.id} className={`filter-pill ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <div key={p.id} className="project-card fade-in">
            <img src={p.img} alt={p.title} loading="lazy" />
            <div className="project-card-gradient"></div>
            <span className="project-card-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="project-card-content">
              <h3>{p.title}</h3>
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