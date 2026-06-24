import styles from './Projects.module.css'
import palmsat    from '../assets/palmsat.jpg'
import medprotect from '../assets/medprotect.jpg'
import cureya     from '../assets/cureya.jpg'
import rccar      from '../assets/rccar.jpg'

const GITHUB = 'https://github.com/koffiprielle4-design'

const projects = [
  {
    img: palmsat, tag: 'Design Sprint 2026', name: 'PALMSAT', featured: true,
    desc: "Dashboard de fertilisation de précision — Défi PALMCI. Cartographie NDVI des 44 000 ha via imagerie Sentinel-2.",
    tech: ['React','Leaflet.js','Google Earth Engine','Python','Sentinel-2'],
    link: GITHUB,
  },
  {
    img: medprotect, tag: 'IA · Santé', name: 'MED-PROTECT',
    desc: "Système d'authentification et détection d'anomalies pour établissements de santé — SIADE 2026.",
    tech: ['Python','React','FastAPI','Isolation Forest','ISO 27001'],
    link: GITHUB,
  },
  {
    img: cureya, tag: 'Application Mobile', name: 'Cureya', mobile: true,
    desc: "Application de pharmacie en ligne : livraison de médicaments, conseil médical et gestion d'assurance.",
    tech: ['Android','Firebase','Java'],
    link: GITHUB,
  },
  {
    img: null, tag: 'Application Mobile', name: 'UPB Connect', placeholder: true,
    desc: "Application sociale et académique pour le campus UPB — Hackathon GÉNIE UPB.",
    tech: ['Android','Java','Firebase'],
    link: GITHUB,
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className="section-header reveal">
          <span className="section-label">Ce que j'ai créé</span>
          <h2 className="section-title serif">Mes <em>projets</em></h2>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={p.name} className={`${styles.card} ${p.featured ? styles.featured : ''} reveal delay-${i}`}>
              <div className={`${styles.imgWrap} ${p.mobile ? styles.mobile : ''}`}>
                {p.placeholder ? (
                  <div className={styles.placeholder}>
                    <span className={styles.phEmoji}>🏫</span>
                    <span className={styles.phLabel}>UPB Campus App</span>
                  </div>
                ) : (
                  <img src={p.img!} alt={p.name} />
                )}
                <span className={styles.tag}>{p.tag}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{p.name}</div>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.tech}>
                  {p.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className={styles.link}>Voir le projet →</a>
              </div>
            </div>
          ))}

          {/* RC Car — wide card */}
          <div className={`${styles.card} ${styles.rcCard} reveal delay-4`}>
            <div className={styles.rcLeft}>
              <span className={styles.rcTag}>Android · Bluetooth</span>
              <div className={styles.name}>RC Car Controller</div>
              <p className={styles.desc}>Application Android de télécommande pour voiture RC via Bluetooth Classic SPP. Interface dark/neon, commandes directionnelles mappées vers un Arduino.</p>
              <div className={styles.tech}>
                {['Java','Android Studio','Bluetooth SPP','Arduino'].map(t => <span key={t} className={styles.techTag}>{t}</span>)}
              </div>
              <a href={GITHUB} target="_blank" rel="noreferrer" className={styles.link} style={{marginTop:'1rem',display:'inline-flex'}}>Voir le projet →</a>
            </div>
            <div className={styles.rcRight}>
              <img src={rccar} alt="RC Car Controller App" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
