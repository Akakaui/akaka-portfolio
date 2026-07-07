import { useEffect } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" style={{ width: '100%', height: '100%' }}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1.2" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
)

const TSIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <rect width="100%" height="100%" fill="#3178c6" rx="8"/>
    <text x="82" y="82" fill="#fff" fontSize="34" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="end">TS</text>
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 180 180" style={{ width: '100%', height: '100%' }}>
    <circle cx="90" cy="90" r="90" fill="#000"/>
    <path d="M140 140 L76.8 59.2 M76.8 50 L76.8 130" stroke="#fff" strokeWidth="14" strokeLinecap="round"/>
    <path d="M110 95 L140 135" stroke="#fff" strokeWidth="14" strokeLinecap="round"/>
  </svg>
)

const ThreeIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <polygon points="50 15, 85 35, 85 75, 50 95, 15 75, 15 35" fill="none" stroke="#fff" strokeWidth="4"/>
    <line x1="50" y1="15" x2="50" y2="95" stroke="#fff" strokeWidth="2"/>
    <line x1="15" y1="35" x2="85" y2="75" stroke="#fff" strokeWidth="2"/>
    <line x1="85" y1="35" x2="15" y2="75" stroke="#fff" strokeWidth="2"/>
  </svg>
)

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
    <path fill="#38bdf8" d="M12 6.036c-2.278 0-3.799.737-4.559 2.21 1.52-.368 2.658.074 3.418 1.326.456.75 1.053 1.732 2.273 1.732 2.278 0 3.799-.737 4.559-2.21-.76.184-1.672.073-2.428-.847-.456-.75-1.053-1.731-2.263-1.731-.004 0-.004 0 0 0zm-4.56 5.302c-2.278 0-3.798.737-4.558 2.21 1.52-.368 2.658.073 3.418 1.325.455.75 1.053 1.733 2.273 1.733 2.278 0 3.799-.737 4.559-2.21-.76.184-1.672.074-2.428-.847-.456-.75-1.053-1.732-2.263-1.732-.004 0-.004 0 0 0z"/>
  </svg>
)

const WebGLIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <polygon points="50 15, 90 80, 10 80" fill="none" stroke="#fff" strokeWidth="6"/>
    <circle cx="50" cy="55" r="14" fill="#8b5cf6" opacity="0.4"/>
    <path d="M38 72 L50 44 L62 72" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="50" y="94" fill="#999" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">WebGL</text>
  </svg>
)

const GSAPIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <rect width="100%" height="100%" fill="#111" rx="8" stroke="#333" strokeWidth="2"/>
    <text x="50" y="58" fill="#88ce02" fontSize="22" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle">GSAP</text>
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
    <path fill="#339933" d="M12 2a.75.75 0 0 0-.376.1L4.12 6.4a.75.75 0 0 0-.374.65v8.9a.75.75 0 0 0 .374.65l7.504 4.3a.75.75 0 0 0 .752 0l7.504-4.3a.75.75 0 0 0 .374-.65V7.05a.75.75 0 0 0-.374-.65L12.376 2.1A.75.75 0 0 0 12 2zm-6.5 5.25L11 4.38v5.74L5.5 13.3V7.25zm13 0v6.05L13 10.12V4.38l5.5 2.87zM12 11.27l5.5 3.18-5.5 3.18-5.5-3.18 5.5-3.18z"/>
  </svg>
)

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
    { icon: <ReactIcon />, label: 'React' },
    { icon: <TSIcon />, label: 'TypeScript' },
    { icon: <NextIcon />, label: 'Nest js' },
    { icon: <ThreeIcon />, label: 'Three.js' },
    { icon: <TailwindIcon />, label: 'Tailwind CSS' },
    { icon: <WebGLIcon />, label: 'WebGL' },
    { icon: <GSAPIcon />, label: 'GSAP' },
    { icon: <NodeIcon />, label: 'Node.js' },
  ]

  return (
    <>
      <div className="about-hero">
        <div className="about-grid">
          <div className="fade-in">
            <div className="eyebrow">About Me</div>
            <h2 className="about-headline">Driven by <span className="accent">curiosity.</span><br />Built for <span className="accent">impact.</span></h2>
            <p className="about-body">I'm a developer and designer who loves turning complex problems into simple, beautiful and intuitive solutions. My journey spans code, design, motion, and film - constantly exploring new technologies to push what's possible on the web.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => window.open('#', '_blank')}>
                Resume
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('contact')}>
                Let's Connect
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ marginLeft: 6, color: 'var(--accent)' }}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
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

      <ScrollIndicator />
    </>
  )
}
