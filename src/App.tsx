import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const ringRef  = useRef<HTMLDivElement>(null)
  const ringPos  = useRef({ x: -100, y: -100 })
  const rafRef   = useRef<number>(0)
  const curPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      curPosRef.current = { x: e.clientX, y: e.clientY }
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)

    const animRing = () => {
      ringPos.current.x += (curPosRef.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (curPosRef.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animRing)
    }
    rafRef.current = requestAnimationFrame(animRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const btn = document.getElementById('backTop')
      if (btn) btn.classList.toggle('visible', window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div id="cursor-ring" ref={ringRef} />

      <button id="backTop" className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Hackathons />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
