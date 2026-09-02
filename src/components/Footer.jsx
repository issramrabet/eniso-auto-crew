import { socials } from '../data/socials.js'
import { InstagramIcon, FacebookIcon, WhatsAppIcon, EmailIcon } from './SocialIcons.jsx'
import './Footer.css'

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/images/logo.png" alt="ENISo AUTO-Crew logo" className="footer__logo" />
          <span>ENISo AUTO-Crew</span>
        </div>

        <nav className="footer__links">
          <a href="#about">The Club</a>
          <a href="#eniso">ENISo</a>
          <a href="#crew">The Crew</a>
          <a href="#join">Join The Grid</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer__socials">
          {socials.map((s) => {
            const Icon = icons[s.key]
            return (
              <a key={s.key} href={s.url} target={s.key !== 'email' ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.name}>
                <Icon />
              </a>
            )
          })}
        </div>
      </div>

      <div className="footer__legal container">
        © {year} ENISo AUTO-Crew. All rights reserved. Built by the crew, for the crew.
      </div>
    </footer>
  )
}
