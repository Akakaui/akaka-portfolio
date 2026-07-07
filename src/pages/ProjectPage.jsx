import React, { useEffect } from 'react'

export default function ProjectPage({ navigate, project }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!project) {
    return (
      <div className="project-section">
        <button className="back-link" onClick={() => navigate('work')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Work
        </button>
        <h2>Project not found</h2>
      </div>
    )
  }

  return (
    <div className="project-section fade-in">
      <button className="back-link" onClick={() => navigate('work')} style={{ marginBottom: 40, marginTop: 20 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Work
      </button>

      <div className="project-header">
        <div className="eyebrow">{project.category}</div>
        <h1 style={{ fontSize: '3rem', margin: '16px 0' }}>{project.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: 600 }}>
          {project.desc || 'A deep dive into building scalable and performant digital experiences. Exploring new paradigms of interaction and design.'}
        </p>
      </div>

      <div className="project-hero-image" style={{ marginTop: 40, marginBottom: 60, borderRadius: 16, overflow: 'hidden' }}>
        <img src={project.img || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop"} alt={project.title} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
      </div>

      <div className="project-content fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 80 }}>
        <div>
          <h3 style={{ marginBottom: 16, fontSize: '1.5rem' }}>Overview</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc ullamcorper fringilla. Nullam congue, neque vel hendrerit vehicula, justo mi pellentesque lorem, id pellentesque ligula ex eget lorem.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Phasellus accumsan, mauris mattis varius varius, turpis lorem hendrerit elit, vel bibendum mauris urna at tellus. Suspendisse eleifend neque quis eros vestibulum.
          </p>
        </div>
        <div className="project-details" style={{ background: 'var(--bg-glass)', padding: 32, borderRadius: 16, border: '1px solid var(--border)', backdropFilter: 'blur(24px)' }}>
          <h4 style={{ marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>Project Details</h4>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Role</div>
            <div>Lead Developer</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Timeline</div>
            <div>4 Weeks</div>
          </div>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Technologies</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="built-with-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>React</span>
              <span className="built-with-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>Three.js</span>
              <span className="built-with-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>WebGL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="project-gallery fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 60 }}>
        <h3 style={{ marginBottom: 10 }}>Gallery</h3>
        <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&h=500&fit=crop" alt="Gallery 1" style={{ width: '100%', borderRadius: 16 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <img src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=500&h=400&fit=crop" alt="Gallery 2" style={{ width: '100%', borderRadius: 16, objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=400&fit=crop" alt="Gallery 3" style={{ width: '100%', borderRadius: 16, objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  )
}
