import { useEffect } from 'react'

export default function AboutPage({ navigate }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const experience = [
    { date: '2023 — Present', role: 'Senior Frontend Developer', company: 'Stellar Labs', desc: 'Leading the development of immersive web experiences using React, Three.js and WebGL.' },
    { date: '2021 — 2023', role: 'Frontend Developer', company: 'Nova Studio', desc: 'Built interactive products and animations for global brands and startups.' },
    { date: '2019 — 2021', role: 'UI Developer', company: 'Pixel Perfect', desc: 'Focused on building responsive interfaces and design systems.' },
  ]

  const techStack = [
    { icon: <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" width="24" height="24" />, label: 'React' },
    { icon: <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="24" height="24" />, label: 'TypeScript' },
    { icon: <img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="Nest js" width="24" height="24" />, label: 'Nest js' },
    { icon: <img src="https://cdn.simpleicons.org/threedotjs/white" alt="Three.js" width="24" height="24" />, label: 'Three.js' },
    { icon: <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" width="24" height="24" />, label: 'Tailwind CSS' },
    { icon: <img src="https://cdn.simpleicons.org/webgl/990000" alt="WebGL" width="24" height="24" />, label: 'WebGL' },
    { icon: <img src="https://cdn.simpleicons.org/greensock/88CE02" alt="GSAP" width="24" height="24" />, label: 'GSAP' },
    { icon: <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" width="24" height="24" />, label: 'Node.js' },
  ]

  return (
    <>
      <div className="about-section fade-in">
        <div className="about-hero">
          <div className="about-hero-content">
            <div className="eyebrow">ABOUT ME</div>
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
          <div className="about-hero-visual">
            <img src="/images/bg-astronaut.png" alt="Astronaut in front of purple ring" className="about-hero-img" />
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
                <div className="timeline-details">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-role">{item.role}</div>
                  <div className="timeline-company">{item.company}</div>
                </div>
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


    </>
  )
}
