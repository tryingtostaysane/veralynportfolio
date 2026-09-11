import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

// Project cards are the only hoverable target that morphs the cursor
// into a fixed 240x56 pill (Figma "Trailing cursor" 513:2895) - nav
// links keep the plain dot cursor.
const EXPAND_SELECTOR = '.work-card'

// Body copy the user might want to select/copy - the system text cursor
// takes over here instead, and our dot hides so the two don't overlap.
const TEXT_SELECTOR = '.bio, input, textarea, [contenteditable]'

const LERP = 0.09 // half the prior smoothing factor - doubles how far behind the pointer the dot trails

// Muted metallic greys/whites only - keeps the confetti reading as
// "silver" rather than a full rainbow burst.
const CONFETTI_COLORS = ['#c9c9c9', '#e4e4e4', '#b0b0b0', '#f2f2f2', '#9e9e9e']
const CONFETTI_LIFE_MS = 650
const CONFETTI_SPEED_THRESHOLD = 1.2 // min px/frame of dot movement before spawning

export default function CustomCursor() {
  const dotRef = useRef(null)
  const labelRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [mode, setMode] = useState('default')

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFinePointer(mq.matches)
    const onChange = (e) => setIsFinePointer(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const rendered = { ...pointer }
    let rafId
    let hasMoved = false

    const canvas = canvasRef.current
    const ctx = canvas ? canvas.getContext('2d') : null
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resizeCanvas() {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function spawnConfetti(x, y, speed) {
      const count = speed > CONFETTI_SPEED_THRESHOLD * 3 ? 2 : 1
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.3,
          size: 2.5 + Math.random() * 3,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.3,
          color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
          born: performance.now(),
        })
      }
    }

    function onMove(e) {
      pointer.x = e.clientX
      pointer.y = e.clientY

      if (!hasMoved) {
        hasMoved = true
        rendered.x = pointer.x
        rendered.y = pointer.y
        if (dotRef.current) dotRef.current.style.opacity = '1'
      }

      const target = e.target.closest ? e.target.closest(`${EXPAND_SELECTOR}, ${TEXT_SELECTOR}`) : null
      let nextMode = 'default'
      let nextLabel = ''

      if (target) {
        if (target.matches(TEXT_SELECTOR)) {
          nextMode = 'text'
        } else {
          nextMode = 'expanded'
          nextLabel = 'View Project'
        }
      }

      setMode(nextMode)

      if (labelRef.current) {
        labelRef.current.textContent = nextLabel ? `* ${nextLabel} *` : ''
      }
    }

    function loop() {
      const prevX = rendered.x
      const prevY = rendered.y
      rendered.x += (pointer.x - rendered.x) * LERP
      rendered.y += (pointer.y - rendered.y) * LERP
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${rendered.x}px, ${rendered.y}px) translate(-50%, -50%)`
      }

      const dx = rendered.x - prevX
      const dy = rendered.y - prevY
      const speed = Math.hypot(dx, dy)
      if (hasMoved && speed > CONFETTI_SPEED_THRESHOLD) {
        spawnConfetti(rendered.x, rendered.y, speed)
      }

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const now = performance.now()
        particlesRef.current = particlesRef.current.filter((p) => now - p.born < CONFETTI_LIFE_MS)
        for (const p of particlesRef.current) {
          const age = (now - p.born) / CONFETTI_LIFE_MS
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.02 // light gravity drift
          p.vx *= 0.98
          p.vy *= 0.98
          p.rotation += p.spin

          ctx.save()
          ctx.globalAlpha = 1 - age
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          const size = p.size * (1 - age * 0.4)
          ctx.fillStyle = p.color
          ctx.fillRect(-size / 2, -size / 2, size, size)
          ctx.restore()
        }
      }

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(rafId)
      particlesRef.current = []
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <>
      <canvas ref={canvasRef} className="custom-cursor-confetti" aria-hidden="true" />
      <div ref={dotRef} className={`custom-cursor custom-cursor--${mode}`} style={{ opacity: 0 }} aria-hidden="true">
        <span className="custom-cursor-core" />
        <span ref={labelRef} className="custom-cursor-label" />
      </div>
    </>
  )
}
