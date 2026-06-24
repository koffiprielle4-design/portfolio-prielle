import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Hackathons.module.css'

const hacks = [
  {
    num:'01', year:'2026 · Design Sprint Universitaire',
    event:'Université Polytechnique de Bingerville',
    name:'PALMSAT',
    desc:"Prototype de cartographie satellitaire — Défi PALMCI : fertilisation de précision sur 44 000 ha de palmeraies via imagerie Sentinel-2 et analyse NDVI.",
    role:'Développement Frontend',
  },
  {
    num:'02', year:'2026 · Hackathon GÉNIE UPB',
    event:'Université Polytechnique de Bingerville',
    name:'UPB Connect',
    desc:"Application mobile dédiée aux étudiants et au personnel du campus. Gestion académique, sociale et des services universitaires.",
    role:'Développement',
  },
  {
    num:'03', year:'2026 · SIADE',
    event:'Stade Félix Houphouët-Boigny, Abidjan',
    name:'MED-PROTECT',
    desc:"Système Intelligent d'Authentification et Détection d'anomalies pour établissements de santé. Cheffe de projet & architecte IA. Conformité ISO 27001, RGPD, HIPAA.",
    role:'Cheffe de Projet · IA Architecture',
  },
]

export default function Hackathons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true }) }
    catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const W = () => canvas.parentElement?.offsetWidth  || 1200
    const H = () => canvas.parentElement?.offsetHeight || 500
    renderer.setSize(W(), H())
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W()/H(), 0.1, 100)
    camera.position.z = 8
    scene.add(new THREE.AmbientLight(0xC4A882, 0.6))
    const pl = new THREE.PointLight(0xC4A882, 2, 20); pl.position.set(4,3,4); scene.add(pl)
    const objs: { m: THREE.Object3D; sp: number; ph: number }[] = []
    const line = (geo: THREE.BufferGeometry, c: number, op: number) =>
      new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({color:c,transparent:true,opacity:op}))
    ;([
      [line(new THREE.IcosahedronGeometry(2.2,2), 0xC4A882, .15),  6, 0,-4, .003],
      [line(new THREE.OctahedronGeometry(1.8,0),   0xC4A882, .18), -6, 1,-3, .004],
      [line(new THREE.TetrahedronGeometry(.8,0),   0xC4A882, .3),  -3,-2,-2, .007],
      [line(new THREE.BoxGeometry(.5,.5,.5),         0xC4A882, .25),  4, 2.5,-1.5, .005],
      [new THREE.Mesh(new THREE.TorusGeometry(4,.05,16,80), new THREE.MeshStandardMaterial({color:0x8B6347,roughness:.5,metalness:.4,transparent:true,opacity:.12})), 2,-1,-6, .002],
    ] as any[]).forEach(([m,x,y,z,sp]: any) => {
      m.position.set(x,y,z); scene.add(m); objs.push({m,sp,ph:Math.random()*Math.PI*2})
    })
    ;([[-1,3,-1],[2,-3,-2],[-5,-.5,-1]] as [number,number,number][]).forEach(([x,y,z]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(.12,8,8), new THREE.MeshStandardMaterial({color:0xC4A882,roughness:.3,metalness:.5,transparent:true,opacity:.85}))
      s.position.set(x,y,z); scene.add(s); objs.push({m:s,sp:.004,ph:Math.random()*Math.PI*2})
    })
    const onResize = () => { renderer.setSize(W(),H()); camera.aspect=W()/H(); camera.updateProjectionMatrix() }
    window.addEventListener('resize', onResize)
    let t=0, animId: number
    const animate = () => {
      animId=requestAnimationFrame(animate); t+=.008
      objs.forEach((o,i) => { o.m.rotation.x+=o.sp*(i%2?1:-.7); o.m.rotation.y+=o.sp*1.3; o.m.position.y+=Math.sin(t+o.ph)*.004 })
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',onResize); renderer.dispose() }
  }, [])

  return (
    <section id="hackathons" className={styles.section}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.inner}>
        <div className="section-header reveal">
          <span className="section-label">Compétitions &amp; Événements</span>
          <h2 className="section-title serif">Hackathons &amp; <em>Sprints</em></h2>
        </div>
        <div className={styles.grid}>
          {hacks.map((h,i) => (
            <div key={h.num} className={`${styles.card} reveal delay-${i+1}`} data-num={h.num}>
              <div className={styles.year}>{h.year}</div>
              <div className={styles.event}>{h.event}</div>
              <div className={styles.name}>{h.name}</div>
              <p className={styles.desc}>{h.desc}</p>
              <span className={styles.role}>{h.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
