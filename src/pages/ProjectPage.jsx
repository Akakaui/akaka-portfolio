import React, { useEffect, useState, useRef } from 'react'

const projectDetails = {
  1: {
    title: 'Orbital',
    subtitle: 'A cosmic web experience built with modern tech.',
    roles: ['Developer', 'Designer'],
    tools: ['Three.js', 'WebGL', 'GSAP'],
    desc: 'A deep dive into building scalable and performant digital experiences. Exploring new paradigms of interaction and design.',
    gallery: ['/images/orbital.jpg', '/images/nebula.jpg', '/images/echoes.jpg', '/images/luminance.jpg'],
  },
  2: {
    title: 'Nebula',
    subtitle: 'AI-powered creative tools for the cosmos.',
    roles: ['Developer'],
    tools: ['Python', 'React', 'Supabase'],
    desc: 'An AI-driven platform that generates creative content and automates workflows.',
    gallery: ['/images/nebula.jpg', '/images/orbital.jpg', '/images/luminance.jpg', '/images/echoes.jpg'],
  },
  3: {
    title: 'Echoes',
    subtitle: 'Immersive 3D environments and interactive art.',
    roles: ['Developer', 'Designer'],
    tools: ['Three.js', 'WebGL', 'Blender'],
    desc: 'Interactive 3D experiences that push the boundaries of web-based rendering.',
    gallery: ['/images/echoes.jpg', '/images/luminance.jpg', '/images/orbital.jpg', '/images/nebula.jpg'],
  },
  4: {
    title: 'Luminance',
    subtitle: 'A modern web experience with cinematic visuals.',
    roles: ['Developer'],
    tools: ['React', 'TypeScript', 'Tailwind'],
    desc: 'A visually stunning web application built with modern frameworks and clean architecture.',
    gallery: ['/images/luminance.jpg', '/images/orbital.jpg', '/images/nebula.jpg', '/images/echoes.jpg'],
  },
}

export default function ProjectPage({ navigate, project }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

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
          Back to all projects
        </button>
        <h2>Project not found</h2>
      </div>
    )
  }

  const details = projectDetails[project.id] || projectDetails[1]
  const allImages = [project.img || details.gallery[0], ...details.gallery]

  // Auto-swipe carousel
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % allImages.length)
    }, 3000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [allImages.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % allImages.length)
    }, 3000)
  }

  return (
    <div className="project-section fade-in">
      <button className="back-link" onClick={() => navigate('work')} style={{ marginBottom: 40, marginTop: 20 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to all projects
      </button>

      <div className="project-header">
        <h1 style={{ fontSize: '3rem', margin: '16px 0' }}>{details.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: 600 }}>
          {details.subtitle}
        </p>
      </div>

      {/* Auto-swiping carousel */}
      <div className="project-carousel">
        <div className="project-carousel-track">
          {allImages.map((img, i) => (
            <div 
              key={i} 
              className={`project-carousel-slide ${i === currentSlide ? 'active' : ''}`}
            >
              <img src={img} alt={`${details.title} ${i + 1}`} />
            </div>
          ))}
        </div>
        <div className="project-carousel-dots">
          {allImages.map((_, i) => (
            <button 
              key={i} 
              className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="project-content fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 80 }}>
        <div>
          <h3 style={{ marginBottom: 16, fontSize: '1.5rem' }}>Overview</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
            {details.desc}
          </p>
        </div>
        <div className="project-details" style={{ background: 'var(--bg-glass)', padding: 32, borderRadius: 16, border: '1px solid var(--border)', backdropFilter: 'blur(24px)' }}>
          <h4 style={{ marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>Project Details</h4>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Roles</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {details.roles.map((role, i) => (
                <span key={i} className="built-with-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{role}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Tools</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {details.tools.map((tool, i) => (
                <span key={i} className="built-with-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={() => navigate('work')} style={{ marginBottom: 60 }}>
        Visit Project
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  )
}
