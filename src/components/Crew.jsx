import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { crew } from '../data/crew.js'
import './Crew.css'

const length = crew.length
const mod = (n) => ((n % length) + length) % length

export default function Crew() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragStartX = useRef(0)
  const dragging = useRef(false)

  // No clamping — index just keeps incrementing/decrementing and mod()
  // wraps it back into range, so the carousel loops forever like a circle.
  function goTo(newIndex) {
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }

  function onPointerDown(e) {
    dragging.current = true
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0
  }

  function onPointerUp(e) {
    if (!dragging.current) return
    dragging.current = false
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const delta = endX - dragStartX.current
    if (delta > 50) goTo(index - 1)
    else if (delta < -50) goTo(index + 1)
  }

  const current = crew[mod(index)]
  const prev = crew[mod(index - 1)]
  const next = crew[mod(index + 1)]

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 90 : -90, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -90 : 90, opacity: 0, scale: 0.92 }),
  }

  return (
    <section id="crew" className="crew carbon-texture">
      <div className="container crew__header">
        <h2 className="crew__title">Meet the Crew</h2>
        <p className="crew__subtitle">Eleven members, one build sheet.</p>
      </div>

      <div className="crew__carousel">
        <button
          className="crew__arrow crew__arrow--left"
          onClick={() => goTo(index - 1)}
          aria-label="Previous member"
        >
          ‹
        </button>

        <div
          className="crew__stage"
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          onMouseLeave={() => (dragging.current = false)}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          <button
            className="crew__peek crew__peek--prev"
            onClick={() => goTo(index - 1)}
            aria-label={`Go to ${prev.name}`}
          >
            <img src={`/images/crew/${prev.img}`} alt="" />
          </button>

          <div className="crew__focus">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={mod(index)}
                className="crew__card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="crew__index">
                  {String(mod(index) + 1).padStart(2, '0')} / {String(length).padStart(2, '0')}
                </span>
                <div className="crew__photo">
                  <img src={`/images/crew/${current.img}`} alt={current.name} />
                </div>
                <div className="crew__info">
                  <span className="crew__name">{current.name}</span>
                  <span className="crew__role">{current.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="crew__peek crew__peek--next"
            onClick={() => goTo(index + 1)}
            aria-label={`Go to ${next.name}`}
          >
            <img src={`/images/crew/${next.img}`} alt="" />
          </button>
        </div>

        <button
          className="crew__arrow crew__arrow--right"
          onClick={() => goTo(index + 1)}
          aria-label="Next member"
        >
          ›
        </button>
      </div>

      <div className="crew__dots">
        {crew.map((m, i) => (
          <button
            key={m.name}
            className={`crew__dot ${i === mod(index) ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${m.name}`}
          />
        ))}
      </div>
    </section>
  )
}
