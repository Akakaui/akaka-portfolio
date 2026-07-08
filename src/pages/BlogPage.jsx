import { useEffect, useRef } from 'react'
import ScrollIndicator from '../components/ScrollIndicator'

export default function BlogPage({ navigate }) {
  const scrollRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-scroll banner
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let scrollPos = 0
    const speed = 0.5

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

  const posts = [
    {
      id: 1,
      title: 'Building Scalable Automation Systems with Python',
      excerpt: 'How I built a pipeline that processes 10k+ tasks daily for small businesses — and what I learned along the way.',
      date: 'Mar 2024',
      tag: 'Automation',
      readTime: '5 min read',
      img: '/images/nebula.jpg',
      content: 'Full article content would go here...'
    },
    {
      id: 2,
      title: 'Why I Chose Supabase Over Firebase',
      excerpt: 'A real comparison from someone who migrated a production app. PostgreSQL under the hood changes everything.',
      date: 'Feb 2024',
      tag: 'Tech',
      readTime: '7 min read',
      img: '/images/orbital.jpg',
      content: 'Full article content would go here...'
    },
    {
      id: 3,
      title: 'The Stack That Got Me Hired',
      excerpt: 'Full-stack development in 2024: the exact tools, frameworks and projects that opened doors.',
      date: 'Jan 2024',
      tag: 'Career',
      readTime: '4 min read',
      img: '/images/echoes.jpg',
      content: 'Full article content would go here...'
    },
    {
      id: 4,
      title: 'From Idea to MVP in 2 Weeks',
      excerpt: 'A step-by-step breakdown of how I shipped a complete product for a client in 14 days flat.',
      date: 'Dec 2023',
      tag: 'Process',
      readTime: '6 min read',
      img: '/images/luminance.jpg',
      content: 'Full article content would go here...'
    },
  ]

  return (
    <div className="blog-section">
      <div className="eyebrow">Blog</div>
      <h1 className="fade-in">Thoughts, stories and <span className="accent">ideas.</span></h1>
      <p className="blog-sub fade-in">Writing about development, automation and the things I learn building products.</p>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <article 
            key={post.id} 
            className="blog-card fade-in"
            onClick={() => navigate('blog-detail', post)}
            style={{ cursor: 'pointer' }}
          >
            <div className="blog-card-img">
              <img src={post.img} alt={post.title} loading="lazy" />
              <div className="blog-card-overlay"></div>
              <span className="blog-card-tag">{post.tag}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span className="blog-card-dot">·</span>
                <span>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button className="blog-read-more">
                Read more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Scrolling banner for other posts */}
      <div className="blog-banner fade-in">
        <div className="blog-banner-label">More Articles</div>
        <div className="blog-banner-scroll" ref={scrollRef}>
          <div className="blog-banner-track">
            {[...posts, ...posts].map((post, i) => (
              <div 
                key={i} 
                className="blog-banner-item"
                onClick={() => navigate('blog-detail', post)}
                style={{ cursor: 'pointer' }}
              >
                <img src={post.img} alt="" />
                <span>{post.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  )
}
