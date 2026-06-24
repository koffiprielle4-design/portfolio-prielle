import styles from './About.module.css'

const chips = [
  { icon: 'devicon-react-original colored',    label: 'React' },
  { icon: 'devicon-flutter-plain colored',     label: 'Flutter' },
  { icon: 'devicon-firebase-plain colored',    label: 'Firebase' },
  { icon: 'devicon-figma-plain colored',       label: 'Figma' },
  { icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind' },
  { icon: 'devicon-python-plain colored',      label: 'Python' },
  { icon: 'devicon-postgresql-plain colored',  label: 'SQL' },
]

const infos: [string, string][] = [
  ['Formation',    'Licence 2 MIAGE — Université Polytechnique de Bingerville'],
  ['Localisation', "Abidjan, Côte d'Ivoire"],
  ['Langues',      'Français (natif) · Anglais (professionnel)'],
  ['Disponibilité','Missions freelance & Collaborations'],
  ['Email',        'koffiprielle4@gmail.com'],
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="reveal-left">
        <span className="section-label">Qui suis-je ?</span>
        <h2 className={`${styles.title} serif`}>About <em>Me</em></h2>
        <p className={styles.p}>
          Je suis Prielle Odelia, développeuse frontend &amp; mobile basée en Côte d'Ivoire, à Abidjan.
          Passionnée par la création d'expériences numériques qui allient esthétique et performance,
          je mets mon expertise au service de projets à fort impact.
        </p>
        <p className={styles.p}>
          En parallèle de mes études en <strong>Licence 2 MIAGE</strong> à l'Université Polytechnique
          de Bingerville, je travaille avec <strong>VISO STUDIO</strong> — une agence freelance web &amp; design,
          et je suis membre active du <strong>Club Dev UPB</strong>.
        </p>
        <div className={styles.chips}>
          {chips.map(c => (
            <span key={c.label} className={styles.chip}>
              <i className={c.icon} />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <div className="reveal-right delay-2">
        <div className={styles.card}>
          {infos.map(([l, v]) => (
            <div key={l} className={styles.row}>
              <div className={styles.lbl}>{l}</div>
              <div className={styles.val}>{v}</div>
            </div>
          ))}
        </div>
        <div className={styles.viso}>
          <div className={styles.visoIcon}>VS</div>
          <div>
            <div className={styles.visoName}>VISO STUDIO</div>
            <div className={styles.visoRole}>Secrétaire-Trésorière · Cheffe de Projet · CM</div>
          </div>
        </div>
      </div>
    </section>
  )
}
