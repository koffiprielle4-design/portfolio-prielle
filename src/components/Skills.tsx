import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Skills.module.css'

const cats = [
  {
    title: 'Frontend Web',
    skills: [
      { icon: 'devicon-html5-plain colored',          label: 'HTML5' },
      { icon: 'devicon-css3-plain colored',            label: 'CSS3' },
      { icon: 'devicon-javascript-plain colored',      label: 'JavaScript' },
      { icon: 'devicon-react-original colored',        label: 'React' },
      { icon: 'devicon-tailwindcss-plain colored',     label: 'Tailwind CSS' },
      { icon: 'devicon-vitejs-plain colored',          label: 'Vite' },
      { icon: 'devicon-framermotion-original colored', label: 'Framer Motion' },
    ],
  },
  {
    title: 'Mobile & Backend',
    skills: [
      { icon: 'devicon-flutter-plain colored',    label: 'Flutter' },
      { icon: 'devicon-android-plain colored',    label: 'Android Studio' },
      { icon: 'devicon-firebase-plain colored',   label: 'Firebase' },
      { icon: 'devicon-python-plain colored',     label: 'Python' },
      { icon: 'devicon-postgresql-plain colored', label: 'SQL' },
    ],
  },
  {
    title: 'Design & Outils',
    skills: [
      { icon: 'devicon-figma-plain colored',     label: 'Figma' },
      { icon: 'devicon-canva-original colored',  label: 'Canva' },
      { icon: 'devicon-vscode-plain colored',    label: 'VS Code' },
      { icon: 'devicon-git-plain colored',       label: 'Git' },
    ],
  },
]

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }) }
    catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const W = () => canvas.parentElement?.offsetWidth  || 1200
    const H = () => canvas.parentElement?.offsetHeight || 500
    renderer.setSize(W(), H())
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W()/H(), 0.1, 100)
    camera.position.z = 9
    scene.add(new THREE.AmbientLight(0x8B6347, 0.7))
    const pl = new THREE.PointLight(0x8B6347, 2, 20); pl.position.set(-4,3,4); scene.add(pl)
    const objs: { m: THREE.Object3D; sp: number; ph: number }[] = []
    const line = (geo: THREE.BufferGeometry, c: number, op: number) =>
      new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({color:c,transparent:true,opacity:op}))
    ;([
      [line(new THREE.OctahedronGeometry(1.4,0),  0x8B6347, .2),  7, 1,-3, .004],
      [line(new THREE.IcosahedronGeometry(.9,1),   0xC4A882, .18),-7,-1,-2, .005],
      [line(new THREE.BoxGeometry(.7,.7,.7),        0x8B6347, .2),  6,-2,-2, .006],
      [line(new THREE.TetrahedronGeometry(.6,0),   0xC4A882, .18), 0, 3,-4, .005],
      [new THREE.Mesh(new THREE.TorusGeometry(2.8,.04,12,60), new THREE.MeshStandardMaterial({color:0x8B6347,roughness:.5,metalness:.4,transparent:true,opacity:.1})), -5,2,-5, .002],
    ] as any[]).forEach(([m,x,y,z,sp]: any) => {
      m.position.set(x,y,z); scene.add(m); objs.push({ m, sp, ph: Math.random()*Math.PI*2 })
    })
    ;([[5,3,-1],[-4,-3,-1]] as [number,number,number][]).forEach(([x,y,z]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(.1,8,8), new THREE.MeshStandardMaterial({color:0x8B6347,roughness:.3,metalness:.5,transparent:true,opacity:.7}))
      s.position.set(x,y,z); scene.add(s); objs.push({ m:s, sp:.005, ph:Math.random()*Math.PI*2 })
    })
    const onResize = () => { renderer.setSize(W(),H()); camera.aspect=W()/H(); camera.updateProjectionMatrix() }
    window.addEventListener('resize', onResize)
    let t=0, animId: number
    const animate = () => {
      animId=requestAnimationFrame(animate); t+=.008
      objs.forEach((o,i) => { o.m.rotation.x+=o.sp*(i%2?1:-.7); o.m.rotation.y+=o.sp*1.3; o.m.position.y+=Math.sin(t+o.ph)*.002 })
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',onResize); renderer.dispose() }
  }, [])

  return (
    <section id="skills" className={styles.section}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.inner}>
        <div className="section-header reveal">
          <span className="section-label">Ce que je maîtrise</span>
          <h2 className="section-title serif">Mes <em>compétences</em></h2>
        </div>
        <div className={styles.grid}>
          {cats.map((cat, i) => (
            <div key={cat.title} className={`${styles.cat} reveal delay-${i+1}`}>
              <div className={styles.catTitle}>{cat.title}</div>
              <div className={styles.list}>
                {cat.skills.map(s => (
                  <div key={s.label} className={styles.item}>
                    <i className={s.icon} />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
