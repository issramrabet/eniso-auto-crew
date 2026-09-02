import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const title = 'ENISo AUTO-Crew'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // autoplay was blocked — browser will just show first frame
    })
  }, [])

  return (
    <section id="top" className="hero carbon-texture video-background-wrapper">
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/video.mp4" type="video/mp4" />
      </video>

      <div className="hero__glow" />
      <div className="container hero__inner">
        <div className="hero__copy">
        

          <h1 className="hero__title" aria-label={title}>
            {title.split(' ').map((word, wi) => (
              <span key={wi} className="hero__word">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="hero__char"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.25 + (wi * word.length + ci) * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wi === 0 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

         

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="hero__cta"
          >
            <a href="#join" className="btn btn-primary">
              Join The Grid
            </a>
            <a href="#crew" className="btn btn-outline btn-outline--crew">
              Meet The Crew
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}