import { motion } from 'framer-motion'
import './EnisoIntro.css'

export default function EnisoIntro() {
  return (
    <section id="eniso" className="eniso">
      {/* Background photo of the school — place it at public/images/eniso.jpg */}
      <div className="eniso__bg" style={{ backgroundImage: "url('/images/eniso.jpg')" }} />
      <div className="eniso__overlay" />

      <div className="container eniso__content">
       

        <motion.h2
          className="section-heading eniso__title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hosted at ENISo
        </motion.h2>

        <motion.p
          className="eniso__text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ENISo AUTO-Crew operates out of the national school of engineers of sousse, drawing on its labs, workshops, and engineering community to turn coursework into hands-on, road-tested projects.
           Located in the Sousse Technopole, this prestigious Tunisian institution provides a thriving ecosystem for innovation. It equips students with advanced skills in mechatronics, industrial electronics, and applied computer science.
        </motion.p>
      </div>
    </section>
  )
}
