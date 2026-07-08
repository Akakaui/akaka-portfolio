import { useState, useEffect, useRef } from 'react'

export default function TopBar() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const droneOsc1Ref = useRef(null)
  const droneOsc2Ref = useRef(null)
  const filterNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const lfoRef = useRef(null)
  const chimeIntervalRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      stopSpaceMusic()
      setIsPlaying(false)
    } else {
      startSpaceMusic()
      setIsPlaying(true)
    }
  }

  const startSpaceMusic = () => {
    if (audioCtxRef.current) return

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      // Master volume gain
      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime) // Very soft background level
      gainNodeRef.current = gainNode

      // Lowpass filter for warm space drone
      const filterNode = ctx.createBiquadFilter()
      filterNode.type = 'lowpass'
      filterNode.frequency.setValueAtTime(140, ctx.currentTime)
      filterNode.Q.setValueAtTime(3, ctx.currentTime)
      filterNodeRef.current = filterNode

      // Base oscillator: triangle wave at 55Hz (A1 note)
      const osc1 = ctx.createOscillator()
      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(55, ctx.currentTime)
      droneOsc1Ref.current = osc1

      // Detuned oscillator for thick stereo/chorus feel
      const osc2 = ctx.createOscillator()
      osc2.type = 'sawtooth'
      osc2.frequency.setValueAtTime(55.3, ctx.currentTime)
      droneOsc2Ref.current = osc2

      // LFO to sweep the filter cut-off slowly
      const lfo = ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime) // slow 12s cycle
      lfoRef.current = lfo

      const lfoGain = ctx.createGain()
      lfoGain.gain.setValueAtTime(50, ctx.currentTime) // sweep between 90Hz and 190Hz

      // Connect LFO modulation
      lfo.connect(lfoGain)
      lfoGain.connect(filterNode.frequency)

      // Connect main signal path
      osc1.connect(filterNode)
      osc2.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Start drone
      osc1.start()
      osc2.start()
      lfo.start()

      // Sparkle/twinkle chime scheduler
      chimeIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const freqs = [165, 220, 275, 330, 440, 550, 660, 880] // A major pentatonic/harmonic scale
        const freq = freqs[Math.floor(Math.random() * freqs.length)]

        const chimeOsc = ctx.createOscillator()
        const chimeGain = ctx.createGain()

        chimeOsc.type = 'sine'
        chimeOsc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Exponential decay envelope
        chimeGain.gain.setValueAtTime(0, ctx.currentTime)
        chimeGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 0.1)
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5)

        // Space delay effect
        const delay = ctx.createDelay()
        delay.delayTime.setValueAtTime(0.4, ctx.currentTime)
        const delayGain = ctx.createGain()
        delayGain.gain.setValueAtTime(0.35, ctx.currentTime)

        chimeOsc.connect(chimeGain)
        chimeGain.connect(ctx.destination)

        chimeGain.connect(delay)
        delay.connect(delayGain)
        delayGain.connect(delay)
        delayGain.connect(ctx.destination)

        chimeOsc.start()
        chimeOsc.stop(ctx.currentTime + 3.0)
      }, 3500)

    } catch (e) {
      console.error('Failed to start Web Audio Synth:', e)
    }
  }

  const stopSpaceMusic = () => {
    if (chimeIntervalRef.current) {
      clearInterval(chimeIntervalRef.current)
      chimeIntervalRef.current = null
    }

    if (droneOsc1Ref.current) {
      try { droneOsc1Ref.current.stop() } catch (e) {}
      droneOsc1Ref.current = null
    }
    if (droneOsc2Ref.current) {
      try { droneOsc2Ref.current.stop() } catch (e) {}
      droneOsc2Ref.current = null
    }
    if (lfoRef.current) {
      try { lfoRef.current.stop() } catch (e) {}
      lfoRef.current = null
    }

    if (audioCtxRef.current) {
      try { audioCtxRef.current.close() } catch (e) {}
      audioCtxRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current)
      if (audioCtxRef.current) {
        try {
          droneOsc1Ref.current?.stop()
          droneOsc2Ref.current?.stop()
          lfoRef.current?.stop()
          audioCtxRef.current.close()
        } catch (e) {}
      }
    }
  }, [])

  return (
    <div className="top-bar">
      <button
        className={`now-playing ${isPlaying ? 'active' : ''}`}
        onClick={toggleMusic}
        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
        title={isPlaying ? 'Pause space ambient synth' : 'Play space ambient synth'}
      >
        <span className="now-playing-label">Now Playing:</span>
        <span className="now-playing-track">The Cosmos</span>
        <div className={`waveform ${isPlaying ? 'playing' : ''}`}>
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill={isPlaying ? 'var(--accent)' : 'var(--text-muted)'}
          style={{ transition: 'fill 0.3s ease' }}
        >
          {isPlaying ? (
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          ) : (
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l6 6L21 20L4.27 3zM14 7h4V3h-6v5.18l2 2V7z"/>
          )}
        </svg>
      </button>
    </div>
  )
}

