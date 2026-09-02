import { motion } from 'framer-motion'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about carbon-texture">
      <div className="container about__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-heading about__title">
ENISo AUTO-crew : Engineered for the Apex.
          </h2>
          <p className="about__text">
            Founded in 2026, ENISo AUTO-Crew is a student technical club that bridges
            automotive engineering theory and practice. It develops members&rsquo;
            technical skills through training and workshops while pursuing a long-term
            automotive project for future generations.
          </p>
          <a href="#crew" className="about__link">
            Meet the crew behind it →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
