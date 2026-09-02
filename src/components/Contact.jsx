import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from './Particles.jsx'
import { InstagramIcon, FacebookIcon, WhatsAppIcon, EmailIcon } from './SocialIcons.jsx'
import { socials } from '../data/socials.js'
import './Contact.css'

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
}

// 150px-wide cards, overlapping fan — tune per breakpoint if you add more/fewer socials
const fanPositions = [
  { rotate: -18, x: -195, y: 30 },
  { rotate: -6, x: -65, y: 0 },
  { rotate: 6, x: 65, y: 0 },
  { rotate: 18, x: 195, y: 30 },
]

export default function Contact() {
  const [hoveredId, setHoveredId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sendState, setSendState] = useState('idle')

  function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSendState('error')
      return
    }
    setSendState('sending')
    // NOTE: front-end only mock — wire to a real form endpoint (see README.md)
    setTimeout(() => {
      setSendState('sent')
      setName('')
      setEmail('')
      setMessage('')
    }, 1400)
  }

  return (
    <section id="contact" className="contact">
      <Particles />

      <div className="container contact__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="contact__fan"
        >
          {socials.map((s, i) => {
            const pos = fanPositions[i]
            const isHovered = hoveredId === s.name
            const Icon = icons[s.key]
            return (
              <motion.a
                key={s.name}
                href={s.url}
                target={s.key !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(s.name)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
                animate={{
                  x: isHovered ? pos.x * 1.07 : pos.x,
                  y: isHovered ? pos.y - 45 : pos.y,
                  rotate: isHovered ? pos.rotate * 0.25 : pos.rotate,
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="contact__card"
                style={{
                  background: s.bg,
                  borderColor: s.border,
                  zIndex: isHovered ? 30 : i,
                  boxShadow: isHovered ? `0 30px 70px ${s.border}` : '0 10px 36px rgba(0,0,0,0.5)',
                }}
              >
                <Icon />
                <span className="contact__card-name">{s.name}</span>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="contact__card-label"
                    >
                      {s.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-heading contact__title"
        >
          Find <span className="contact__title-accent">us on</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="contact__blurb"
        >
          Curious about the club, a partnership, or joining a team? Reach out — we
          reply from the paddock, not a call center.
        </motion.p>

        
           
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="contact__location"
        >
          Sousse, Tunisia
        </motion.div>
      </div>
    </section>
  )
}

function statusText(s) {
  if (s === 'error') return '⚠ Please fill all fields.'
  if (s === 'sending') return 'Sending…'
  if (s === 'sent') return '✅ Message delivered!'
  return ''
}
