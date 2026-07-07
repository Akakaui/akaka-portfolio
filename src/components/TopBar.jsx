export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="availability-pill">
        <span className="green-dot"></span>
        Available for new opportunities.
      </div>
      <div className="now-playing">
        <span className="now-playing-label">Now Playing:</span>
        <span className="now-playing-track">The Cosmos</span>
        <div className="waveform">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="var(--accent)" strokeWidth="2"/></svg>
      </div>
    </div>
  )
}
