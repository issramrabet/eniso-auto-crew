import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Join.css'

// 1. Go to https://formspree.io and sign up with issramrabet@gmail.com
// 2. Click "New Form", then copy its link (looks like https://formspree.io/f/abcdwxyz)
// 3. Paste it below. Every registration will be emailed to you.
const FORM_ENDPOINT = 'https://formspree.io/f/xkjolppj'

export default function Join() {
  const videoRef = useRef(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', filiere: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | invalid | error | config-error

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // autoplay was blocked — browser will just show the first frame
    })
  }, [])

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      filiere: form.filiere.trim(),
    }

    if (!data.firstName || !data.lastName || !data.email || !data.filiere) {
      setStatus('invalid')
      return
    }

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      setStatus('config-error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
      setForm({ firstName: '', lastName: '', email: '', filiere: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="join" className="join video-background-wrapper">
      <video ref={videoRef} className="video-background" autoPlay muted loop playsInline>
        <source src="/images/video2.mp4" type="video/mp4" />
      </video>
      <div className="join__overlay" />

      <div className="container join__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="join__intro"
        >
          <h2 className="section-heading join__title">Take a seat on the grid</h2>
          <p className="join__text">Three fields, one email — that&rsquo;s it.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="join__form"
          onSubmit={handleSubmit}
        >
          <div className="join__row">
            <input
              className="join__input"
              placeholder="First name"
              value={form.firstName}
              onChange={update('firstName')}
            />
            <input
              className="join__input"
              placeholder="Last name"
              value={form.lastName}
              onChange={update('lastName')}
            />
          </div>
          <input
            className="join__input"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={update('email')}
          />
          <input
            className="join__input"
            list="filiere-options"
            placeholder="Filière (e.g. Génie Mécanique)"
            value={form.filiere}
            onChange={update('filiere')}
          />
          <datalist id="filiere-options">
            <option value="Génie Mécanique" />
            <option value="Génie Informatique" />
            <option value="Génie Électrique" />
            <option value="Génie Civil" />
            <option value="Génie Industriel" />
          </datalist>

          <button className="btn btn-primary join__submit" disabled={status === 'sending' || status === 'sent'}>
            {status === 'sending' ? 'Submitting…' : status === 'sent' ? '✓ You’re in!' : 'Join the Crew →'}
          </button>

          {status === 'invalid' && (
            <span className="join__status join__status--error">Fill in all fields to continue.</span>
          )}
          {status === 'error' && (
            <span className="join__status join__status--error">
              Something went wrong. Check your connection and try again.
            </span>
          )}
          {status === 'config-error' && (
            <span className="join__status join__status--error">
              Form isn&rsquo;t connected yet — set FORM_ENDPOINT in Join.jsx (see the comment at the top).
            </span>
          )}
          {status === 'sent' && (
            <span className="join__status join__status--ok">Welcome aboard — check your inbox soon.</span>
          )}
        </motion.form>
      </div>
    </section>
  )
}