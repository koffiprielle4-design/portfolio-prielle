import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Hero.module.css'
import photo from '../assets/prielle.jpg'

const LINKEDIN = 'https://www.linkedin.com/in/amoin-prielle-koffi-6163a0391?utm_source=share_via&utm_content=profile&utm_medium=member_android'
const GITHUB   = 'https://github.com/koffiprielle4-design'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }) }
    catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 6

    scene.add(new THREE.AmbientLight(0xFFD700, 0.6))
    const p1 = new THREE.PointLight(0xFFD700, 2.8, 18); p1.position.set(3,3,3); scene.add(p1)
    const p2 = new THREE.PointLight(0xDAA520, 2.0, 18); p2.position.set(-3,-2,2); scene.add(p2)

    const objects: THREE.Object3D[] = []

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, .06, 16, 80),
      new THREE.MeshStandardMaterial({ color:0xFFD700, roughness:.2, metalness:.9, transparent:true, opacity:.38 })
    )
    torus.position.set(3.5,0,-2); torus.rotation.set(.4,.2,0)
    scene.add(torus); objects.push(torus)

    const icoLine = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.1, 1)),
      new THREE.LineBasicMaterial({ color:0xFFD700, transparent:true, opacity:.45 })
    )
    icoLine.position.set(3.8,.5,-1.5); scene.add(icoLine); objects.push(icoLine)

    const octLine = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.OctahedronGeometry(.8, 0)),
      new THREE.LineBasicMaterial({ color:0xDAA520, transparent:true, opacity:.50 })
    )
    octLine.position.set(-4,1,-1); scene.add(octLine); objects.push(octLine)

    const sphereMat = new THREE.MeshStandardMaterial({ color:0xFFD700, roughness:.05, metalness:.98, transparent:true, opacity:.95 })
    const sGeo = new THREE.SphereGeometry(.08, 8, 8)
    const pts: [number,number,number][] = [[1.2,2.5,-2],[-1.5,2,-1.5],[4.5,2,-3],[-3,-.5,-2],[2,-2.5,-1],[-2.5,2.5,-3],[0,3,-2.5],[3.5,-1.5,-2],[-1,-.8,-1],[4,-2,-2.5]]
    pts.forEach(([x,y,z]) => {
      const s = new THREE.Mesh(sGeo, sphereMat)
      s.position.set(x,y,z); s.scale.setScalar(.5 + Math.random())
      scene.add(s); objects.push(s)
    })

    const stMat = new THREE.MeshStandardMaterial({ color:0xFFD700, roughness:.15, metalness:.85, transparent:true, opacity:.72 })
    const stGeo = new THREE.TorusGeometry(.35, .04, 12, 40)
    ;([[-4,-2,-2],[2.5,2.5,-3],[-1.5,-2.5,-2]] as [number,number,number][]).forEach(([x,y,z]) => {
      const t = new THREE.Mesh(stGeo, stMat)
      t.position.set(x,y,z); t.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0)
      scene.add(t); objects.push(t)
    })

    let mouseX = 0, mouseY = 0
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - .5) * 2
      mouseY = (e.clientY / window.innerHeight - .5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      renderer.setSize(w, h); camera.aspect = w/h; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let t = 0, animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate); t += .008
      objects.forEach((o,i) => {
        o.rotation.x += .002 * (i%2===0 ? 1 : -1)
        o.rotation.y += .003 * (i%3===0 ? 1 : -1)
        o.position.y += Math.sin(t+i) * .0008
      })
      camera.position.x += (mouseX*.6 - camera.position.x) * .03
      camera.position.y += (-mouseY*.4 - camera.position.y) * .03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  const goto = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.bgText} aria-hidden="true">PRIELLE</div>

      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.label}>Disponible · Freelance &amp; Missions</div>
          <h1 className={styles.name}>
            KOFFI AMOIN<br /><em>Prielle Odelia</em>
          </h1>
          <span className={styles.script}>Développeuse Frontend &amp; Mobile</span>
          <p className={styles.desc}>
            Étudiante en Licence 2 MIAGE à l'UPB, membre de VISO STUDIO.
            Je crée des interfaces web et mobile modernes — de Figma au déploiement.
            React · Flutter · Firebase · Figma.
          </p>
          <div className={styles.socials}>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className={styles.social} aria-label="LinkedIn">in</a>
            <a href={GITHUB}   target="_blank" rel="noreferrer" className={styles.social} aria-label="GitHub">gh</a>
            <a href="mailto:koffiprielle4@gmail.com" className={styles.social} aria-label="Email">@</a>
          </div>
          <div className={styles.ctas}>
            <a href="#projects" className="btn-primary"  onClick={goto('projects')}>Voir mes projets</a>
            <a href="#contact"  className="btn-outline"  onClick={goto('contact')}>Me contacter</a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.photoWrap}>
            <div className={styles.photoFrame}>
              <img src={photo} alt="Koffi Prielle Odelia" />
            </div>
            <div className={styles.photoDeco} />
            <div className={styles.badge}>
              VISO STUDIO
              <span>Secrétaire · Cheffe de Projet · CM</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}><span>Scroll</span></div>
    </section>
  )
}
