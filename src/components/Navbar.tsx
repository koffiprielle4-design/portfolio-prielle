import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'À propos',       href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projets',        href: '#projects' },
  { label: 'Hackathons',     href: '#hackathons' },
  { label: 'Certifications', href: '#certifications' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => { setOpen(false); document.body.style.overflow = '' }
  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const goto = (href: string) => {
    close()
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>K. <span>Prielle</span> Odelia</div>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={e => { e.preventDefault(); goto(l.href) }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.cta}
          onClick={e => { e.preventDefault(); goto('#contact') }}>
          Me contacter
        </a>

        <button
          className={`${styles.hamburger} ${open ? styles.active : ''}`}
          onClick={toggle} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.overlay} ${open ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={close}>✕</button>
        {links.map(l => (
          <a key={l.label} href={l.href}
            onClick={e => { e.preventDefault(); goto(l.href) }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className={styles.overlayContact}
          onClick={e => { e.preventDefault(); goto('#contact') }}>
          Me contacter
        </a>
      </div>
    </>
  )
}
