import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Stats.module.css'

const stats = [
  { num: 5,  label: 'Projets réalisés' },
  { num: 12, label: 'Technologies maîtrisées' },
  { num: 3,  label: 'Hackathons' },
  { num: 10, label: 'Certifications' },
]

export default function Stats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }) }
    catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const W = () => canvas.parentElement?.offsetWidth  || 800
    const H = () => canvas.parentElement?.offsetHeight || 200
    renderer.setSize(W(), H())
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W()/H(), 0.1, 100)
    camera.position.z = 8
    scene.add(new THREE.AmbientLight(0xC4A882, 0.7))
    const pl = new THREE.PointLight(0xC4A882, 2, 20); pl.position.set(4,3,4); scene.add(pl)
    const objs: { m: THREE.Object3D; sp: number; fa: number; ph: number }[] = []
    const line = (geo: THREE.BufferGeometry, color: number, op: number) =>
      new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color, transparent:true, opacity:op }))
    const mesh = (geo: THREE.BufferGeometry, color: number, op: number) =>
      new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness:.5, metalness:.4, transparent:true, opacity:op }))
    const shapes = [
      { m: mesh(new THREE.TorusGeometry(3.5,.04,16,80), 0xC4A882, .35), x:5, y:0, z:-3, rx:.3, ry:.5, sp:.003 },
      { m: line(new THREE.IcosahedronGeometry(1.2,1), 0xC4A882, .25), x:-5, y:.5, z:-2, sp:.004 },
      { m: mesh(new THREE.TorusGeometry(1.8,.04,12,50), 0x8B6347, .2), x:0, y:2, z:-4, rx:1.2, sp:.006 },
      { m: line(new THREE.TetrahedronGeometry(.5,0), 0xC4A882, .3), x:4, y:-1.5, z:-2, sp:.007 },
    ] as any[]
    ;([[-3,-1,-1],[3,1.5,-1],[1,-2,-2],[-1,2,-1.5]] as [number,number,number][]).forEach(([x,y,z]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(.1,8,8), new THREE.MeshStandardMaterial({ color:0xC4A882, roughness:.3, metalness:.5, transparent:true, opacity:.85 }))
      s.position.set(x,y,z); scene.add(s); objs.push({ m:s, sp:.004, fa:.005, ph:Math.random()*Math.PI*2 })
    })
    shapes.forEach((s: any) => {
      s.m.position.set(s.x||0, s.y||0, s.z||-1)
      if (s.rx) s.m.rotation.x = s.rx
      if (s.ry) s.m.rotation.y = s.ry
      scene.add(s.m); objs.push({ m:s.m, sp:s.sp, fa:.002, ph:Math.random()*Math.PI*2 })
    })
    const onResize = () => { renderer.setSize(W(),H()); camera.aspect=W()/H(); camera.updateProjectionMatrix() }
    window.addEventListener('resize', onResize)
    let t=0, animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate); t+=.008
      objs.forEach((o,i) => { o.m.rotation.x+=o.sp*(i%2?1:-.7); o.m.rotation.y+=o.sp*1.3; o.m.position.y+=Math.sin(t+o.ph)*o.fa })
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose() }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        sectionRef.current?.querySelectorAll<HTMLElement>('[data-target]').forEach(el => {
          const target = +(el.dataset.target || 0)
          let c = 0; const step = Math.ceil(target/40)
          const t = setInterval(() => { c=Math.min(c+step,target); el.textContent=c+(target>8?'+':''); if(c>=target)clearInterval(t) }, 38)
        })
      }
    }, { threshold:.4 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="stats" className={styles.section} ref={sectionRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {stats.map((s,i) => (
        <div key={s.label} className={`${styles.item} reveal delay-${i}`}>
          <div className={styles.num} data-target={s.num}>0</div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </section>
  )
}
