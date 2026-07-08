import { useEffect } from 'react'

export default function ContactPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="contact-section">
      <div className="eyebrow">Contact</div>
      <h1 className="fade-in">Let's build something <span className="accent">extraordinary.</span></h1>
      <p className="contact-copy fade-in">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

      <div className="contact-grid">
        <div className="contact-left fade-in">
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-value">hello.akakafavour@gmail.com</div>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div className="contact-detail-label">Location</div>
              <div className="contact-detail-value">Earth (Remote)</div>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div className="contact-detail-label">Availability</div>
              <div className="contact-detail-value">Open for new opportunities</div>
            </div>
          </div>

          <div className="socials-section">
            <div className="socials-label">Socials</div>
            <div className="socials-row">
              <a href="https://github.com/Akakaui" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://x.com/akakadev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-card fade-in">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows={5} placeholder="Tell me about your project..."></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </div>
      </div>

      <div className="contact-earth fade-in">
        <img src="/images/earth-night.png" alt="Earth at night" />
        <div className="contact-earth-gradient"></div>
      </div>
    </div>
  )
}
