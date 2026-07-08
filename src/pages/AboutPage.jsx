import { useEffect } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

export default function AboutPage({ navigate }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const experience = [
    { date: '2023 — Present', role: 'Full-Stack Developer', company: 'Freelance', desc: 'Building web apps, automation systems and CMS integrations for small businesses and brands.' },
    { date: '2021 — 2023', role: 'Web Developer', company: 'Various Clients', desc: 'Developed responsive websites, landing pages and backend systems using Python and modern frameworks.' },
    { date: '2019 — 2021', role: 'Junior Developer', company: 'Self-taught', desc: 'Learned web development, built personal projects and contributed to open-source communities.' },
  ]

  const techStack = [
    { icon: 'R', label: 'React' },
    { icon: 'TS', label: 'TypeScript' },
    { icon: 'N', label: 'Next.js' },
    { icon: '⚡', label: 'Supabase' },
    { icon: 'PG', label: 'PostgreSQL' },
    { icon: 'Py', label: 'Python' },
    { icon: 'TW', label: 'Tailwind CSS' },
    { icon: 'JS', label: 'Node.js' },
  ]

  return (
    <>
      <div className="about-hero">
        <div className="about-grid">
          <div className="fade-in">
            <div className="eyebrow">About Me</div>
            <h2 className="about-headline">Driven by <span className="accent">curiosity.</span><br />Built for <span className="accent">impact.</span></h2>
            <p className="about-body">I'm a developer who loves turning complex problems into simple, beautiful and intuitive solutions. My journey spans code, automation and system design — constantly exploring new technologies to push what's possible on the web.</p>
            <div className="hero-buttons">
              <button className="btn-secondary">
                Resume
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-primary" onClick={() => navigate('contact')}>
                Let's Connect
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
          <div className="about-visual fade-in">
            <div className="astronaut-ring">
              <img src="/images/astronaut-portal.png" alt="Astronaut" className="astronaut-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="experience-section">
        <div className="experience-card fade-in">
          <h3>Experience</h3>
          <div className="timeline">
            {experience.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-company">{item.company}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tech-section">
        <h3>Tech Stack</h3>
        <div className="tech-grid fade-in">
          {techStack.map((t, i) => (
            <div key={i} className="tech-item">
              <div className="tech-icon">{t.icon}</div>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ScrollIndicator />
    </>
  )
}