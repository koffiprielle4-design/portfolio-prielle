import styles from './Footer.module.css'

const LINKEDIN = 'https://www.linkedin.com/in/amoin-prielle-koffi-6163a0391?utm_source=share_via&utm_content=profile&utm_medium=member_android'
const GITHUB   = 'https://github.com/koffiprielle4-design'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
        K. <span>Prielle</span> Odelia
      </div>
      <p className={styles.copy}>© 2026 — Tous droits réservés</p>
      <div className={styles.links}>
        {[['LinkedIn', LINKEDIN],['GitHub', GITHUB],['Email','mailto:koffiprielle4@gmail.com']].map(([l,h]) => (
          <a key={l} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noreferrer" className={styles.link}>{l}</a>
        ))}
      </div>
    </footer>
  )
}
