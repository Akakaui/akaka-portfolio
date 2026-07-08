import { useEffect } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

export default function HomePage({ navigate }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
            <img src="/images/earth-sunrise.png" alt="Earth from space" className="hero-planet-img" />
            <div className="hero-chip">
              <span className="chip-dot"></span>
              Currently exploring · Supabase · Python · Automation
            </div>
          </div>
        </div>
      </section>

      <div className="hero-cards">
        <div className="card fade-in">
          <div className="card-header">
            <div className="eyebrow">Featured Work</div>
            <div className="card-arrows">
              <button aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="featured-project">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop" alt="Project" loading="lazy" />
            <span className="featured-project-num">01</span>
            <div className="featured-project-overlay">
              <h3>Project One</h3>
              <p>A full-stack web app built with modern tech</p>
            </div>
          </div>
          <button className="view-project" onClick={() => navigate('work')}>
            View Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
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