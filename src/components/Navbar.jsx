import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { href: '#about', label: 'The Club' },
  { href: '#eniso', label: 'ENISo' },
  { href: '#crew', label: 'The Crew' },
  { href: '#join', label: 'Join The Grid' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#top" className="navbar__brand" onClick={() => setOpen(false)}>
          {/* Place your transparent-background logo at public/images/logo.png */}
          <img src="/images/logo.png" alt="ENISo AUTO-Crew logo" className="navbar__logo" />
          <span>ENISo AUTO-Crew</span>
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="navbar__links navbar__links--mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
