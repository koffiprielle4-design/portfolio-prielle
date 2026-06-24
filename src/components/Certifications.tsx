import styles from './Certifications.module.css'

const coursera = [
  { name:'Innovation Managériale',        desc:"Techniques d'innovation, design thinking et conduite du changement en contexte organisationnel." },
  { name:'Storytelling & Influence',      desc:"Communiquer pour convaincre — art narratif, rhétorique et techniques de persuasion." },
  { name:'Gestion de Projet',             desc:"Pilotage de projets : planification, suivi, gestion des risques et des parties prenantes." },
  { name:'Management Opérationnel',       desc:"Pilotage des opérations, organisation des équipes et optimisation des processus." },
  { name:'Leadership & Collaboration',    desc:"Travail d'équipe, créativité, leadership situationnel et dynamiques de groupe." },
  { name:'Parcours Professionnel Complet',desc:"Certification globale du parcours leadership féminin — 5 modules complétés." },
]

const microsoft = [
  {
    name:'Preparing Data for Analysis with Microsoft Excel',
    desc:"Nettoyage, transformation et préparation de données pour l'analyse dans Excel — cours officiel Microsoft. Juin 2026.",
    link:'https://coursera.org/verify/FUWPGAYBNZL4',
  },
]

const cisco = [
  { name:'Introduction to Cybersecurity', desc:"Fondamentaux de la cybersécurité : menaces, vulnérabilités, protection des données et bonnes pratiques." },
  { name:'Networking Basics',             desc:"Architecture réseau, protocoles TCP/IP, adressage IP, configuration des équipements Cisco." },
  { name:'Python Essentials',             desc:"Bases de la programmation Python : syntaxe, structures de données, fonctions, POO et automatisation." },
]

export default function Certifications() {
  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.inner}>
        <div className="section-header reveal">
          <span className="section-label" style={{color:'var(--light)'}}>Formations &amp; Certifications</span>
          <h2 className="section-title serif" style={{color:'var(--white)'}}>Mes <em style={{color:'var(--light)'}}>certifications</em></h2>
        </div>

        <p className={styles.sub}>Coursera · MTN Skills Academy × DigiFemme CI</p>
        <div className={styles.grid}>
          {coursera.map((c,i) => (
            <div key={c.name} className={`${styles.card} reveal delay-${(i%3)+1}`}>
              <div className={styles.provider}>Coursera</div>
              <div className={styles.name}>{c.name}</div>
              <p className={styles.desc}>{c.desc}</p>
            </div>
          ))}
        </div>

        <p className={styles.sub} style={{marginTop:'3rem',color:'#5ba85d'}}>Microsoft × Coursera</p>
        <div className={styles.grid} style={{gridTemplateColumns:'repeat(2,1fr)'}}>
          {microsoft.map(c => (
            <div key={c.name} className={`${styles.card} ${styles.msCard} reveal delay-1`}>
              <div className={styles.provider} style={{color:'#5ba85d'}}>Microsoft</div>
              <div className={styles.name}>{c.name}</div>
              <p className={styles.desc}>{c.desc}{' '}
                <a href={c.link} target="_blank" rel="noreferrer" style={{color:'var(--light)',opacity:.7,textDecoration:'none'}}>Vérifier ↗</a>
              </p>
            </div>
          ))}
        </div>

        <p className={styles.sub} style={{marginTop:'3rem',color:'#4aa3e0'}}>Cisco NetAcad · Camp d'été</p>
        <div className={styles.grid}>
          {cisco.map((c,i) => (
            <div key={c.name} className={`${styles.card} ${styles.ciscoCard} reveal delay-${i+1}`}>
              <div className={styles.provider} style={{color:'#4aa3e0'}}>Cisco NetAcad</div>
              <div className={styles.name}>{c.name}</div>
              <p className={styles.desc}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.banner} reveal delay-2`}>
          <div className={styles.badge}>1ère Cohorte</div>
          <p className={styles.bannerText}>
            Certifications obtenues dans le cadre de la <strong>1ère cohorte MTN Skills Academy × DigiFemme CI</strong> — programme de formation dédié à l'autonomisation des femmes en leadership, communication et gestion de projets en Afrique de l'Ouest.
          </p>
        </div>
      </div>
    </section>
  )
}
