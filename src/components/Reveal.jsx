import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './Reveal.css'

export default function Reveal() {
  const wrapRef = useRef(null)
  // 0 = cursor far away (car fully shown) → 1 = cursor centered (car fully gone, emblem shown)
  const [proximity, setProximity] = useState(0)

  function handleMouseMove(e) {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = Math.max(rect.width, rect.height) * 0.85
    setProximity(Math.max(0, Math.min(1, 1 - dist / maxDist)))
  }

  function handleMouseLeave() {
    setProximity(0)
  }

  return (
    <section id="reveal" className="reveal carbon-texture">
      <div className="container reveal__header">
     
        <h2 className="reveal__title">Build. Innovate. Accelerate.</h2>
        <p className="reveal__subtitle">Get close. See what we're building.</p>
      </div>

      <motion.div
        className="reveal__stage"
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Club emblem — revealed as the car fades out */}
        <img
          src="/images/crew-logo.png"
          alt="ENISo AUTO-Crew emblem"
          className="reveal__emblem"
          style={{ opacity: proximity }}
        />

        {/* Covered car — fades away completely as the cursor approaches */}
        <img
          src="/images/car.png"
          alt="Covered car, ready to be unveiled"
          className="reveal__car"
          style={{ opacity: 1 - proximity }}
        />
      </motion.div>
    </section>
  )
}
