import { useState, useEffect } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

export default function HomePage({ navigate }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featuredProjects = [
    { id: 1, title: 'Orbital', desc: 'An interactive 3D experience that visualizes the beauty of space in real-time.', img: '/images/orbital.jpg', num: '01', category: 'WebGL Experience' },
    { id: 2, title: 'Nebula', desc: 'A generative art experiment creating cosmic dust clouds.', img: '/images/nebula.jpg', num: '02', category: 'Generative Art' },
    { id: 3, title: 'Echoes', desc: 'An interactive audio visualizer reacting to sound waves.', img: '/images/echoes.jpg', num: '03', category: 'Audio Visualizer' },
    { id: 4, title: 'Luminance', desc: 'An AI-powered neon ring simulating ambient light glow.', img: '/images/luminance.jpg', num: '04', category: 'AI Experiment' },
  ]

  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const currentProject = featuredProjects[activeSlide]

  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="fade-in">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 12, fontWeight: 500 }}>Hello, I'm</span>
            </div>
            <h1>I craft digital experiences from another <span className="accent">dimension.</span></h1>
            <p className="hero-sub">I'm a developer and creative technologist focused on building immersive, performant and beautiful experiences on the web.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('work')}>
                Explore my work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('contact')}>
                Contact me
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ marginRight: 2 }}><path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z"/></svg>
              </button>
            </div>
          </div>
          <div className="hero-visual fade-in">
            <img src="/images/earth-night.png" alt="Earth from space" className="hero-planet-img" />
            <div className="hero-chip">
              Currently exploring · 3D · WebGL · AI
            </div>
          </div>
        </div>
      </section>

      <div className="hero-cards">
        <div className="card fade-in">
          <div className="card-header">
            <div className="eyebrow">Featured Work</div>
            <div className="card-arrows">
              <button aria-label="Previous" onClick={prevSlide}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button aria-label="Next" onClick={nextSlide}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="featured-project" style={{ transition: 'all 0.5s ease' }}>
            <img src={currentProject.img} alt={currentProject.title} loading="lazy" style={{ transition: 'opacity 0.3s ease' }} />
            <span className="featured-project-num">{currentProject.num}</span>
            <div className="featured-project-overlay">
              <h3>{currentProject.title}</h3>
              <p>{currentProject.desc}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <button className="view-project" onClick={() => navigate('work')}>
              View Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <div className="carousel-dots" style={{ display: 'flex', gap: 6 }}>
              {featuredProjects.map((_, idx) => (
                <span 
                  key={idx} 
                  onClick={() => setActiveSlide(idx)}
                  style={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    backgroundColor: idx === activeSlide ? 'var(--accent)' : 'var(--text-muted)',
                    opacity: idx === activeSlide ? 1 : 0.4,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="card fade-in about-me-card">
          <div className="about-me-card-content">
            <div className="card-header">
              <div className="eyebrow">About Me</div>
            </div>
            <h3 className="about-card-headline">I build at the intersection of design, technology and <span className="accent">imagination.</span></h3>
            <p className="about-card-copy">With a strong focus on performance, usability and detail, I create experiences that not only look beautiful, but feel intuitive.</p>
            <div className="stats-row">
              <div>
                <div className="stat-num">6+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div>
                <div className="stat-num">30+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div>
                <div className="stat-num">12</div>
                <div className="stat-label">Technologies Mastered</div>
              </div>
            </div>
          </div>
          <div className="about-me-card-visual">
            <img src="/images/astronaut-helmet.jpg" alt="Astronaut Helmet" className="about-card-helmet-img" />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </>
  )
}
