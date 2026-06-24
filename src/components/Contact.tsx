import { useState } from 'react'
import styles from './Contact.module.css'

const LINKEDIN = 'https://www.linkedin.com/in/amoin-prielle-koffi-6163a0391?utm_source=share_via&utm_content=profile&utm_medium=member_android'
const GITHUB   = 'https://github.com/koffiprielle4-design'

const links = [
  { icon:'fas fa-envelope', label:'Email',    val:'koffiprielle4@gmail.com',  href:'mailto:koffiprielle4@gmail.com' },
  { icon:'fab fa-linkedin', label:'LinkedIn', val:'Koffi Amoin Prielle Odelia', href: LINKEDIN },
  { icon:'fab fa-github',   label:'GitHub',   val:'koffiprielle4-design',      href: GITHUB },
  { icon:'fab fa-whatsapp', label:'WhatsApp', val:'+225 07 88 57 49 62',       href:'https://wa.me/2250788574962' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className="reveal-left">
          <span className="section-label">Travaillons ensemble</span>
          <h2 className={`${styles.title} serif`}>Travaillons<br/><em>ensemble</em></h2>
          <p className={styles.desc}>Tu as un projet web ou mobile ? Une idée à concrétiser ? Contacte-moi et discutons-en. Je réponds sous 24h.</p>
          <div className={styles.links}>
            {links.map(l => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer" className={styles.link}>
                <div className={styles.linkIcon}><i className={l.icon} /></div>
                <div>
                  <span className={styles.linkLabel}>{l.label}</span>
                  <span className={styles.linkVal}>{l.val}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="reveal-right delay-2">
          {sent ? (
            <div className={styles.success}>
              <h3 className="serif">Message envoyé !</h3>
              <p>Merci ! Je te réponds sous 24h.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={e => { e.preventDefault(); setSent(true) }}>
              {[['Ton nom','text','Kouassi Jean'],['Ton email','email','jean@exemple.com']].map(([label,type,ph]) => (
                <div key={label} className={styles.field}>
                  <label className={styles.label}>{label}</label>
                  <input type={type} className={styles.input} placeholder={ph} required />
                </div>
              ))}
              <div className={styles.field}>
                <label className={styles.label}>Ton message</label>
                <textarea className={styles.textarea} placeholder="Décris ton projet..." required rows={5} />
              </div>
              <button type="submit" className={`${styles.submit} form-submit`}>Envoyer le message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
