import { useEffect, useRef } from 'react'
import '../styles/CursorTrail.css'

const CursorTrail = () => {
    const canvasRef = useRef(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const particles = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set canvas size
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        // Mouse move handler
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            // Create particles - increased from 3 to 8 for faster feel
            for (let i = 0; i < 8; i++) {
                particles.current.push({
                    x: mousePos.current.x,
                    y: mousePos.current.y,
                    vx: (Math.random() - 0.5) * 8, // Faster velocity
                    vy: (Math.random() - 0.5) * 8,
                    life: 1,
                    size: Math.random() * 4 + 1.5,
                    hue: Math.random() * 30 + 180, // Cyan to blue range
                })
            }
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i]

                // Update position
                p.x += p.vx
                p.y += p.vy
                p.life -= 0.04 // Fade out faster
                p.vy += 0.15 // gravity

                if (p.life <= 0) {
                    particles.current.splice(i, 1)
                    continue
                }

                // Draw particle with gradient effect
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
                gradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${p.life})`)
                gradient.addColorStop(1, `hsla(${p.hue}, 100%, 40%, ${p.life * 0.3})`)
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                // Add bright glow
                ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, ${p.life * 0.6})`
                ctx.shadowBlur = 15
            }

            // Draw futuristic cursor
            const time = Date.now() * 0.001

            // Outer pulsing ring
            ctx.strokeStyle = `hsla(180, 100%, 50%, ${0.8 + Math.sin(time * 3) * 0.3})`
            ctx.lineWidth = 2.5
            ctx.beginPath()
            ctx.arc(mousePos.current.x, mousePos.current.y, 20 + Math.sin(time * 2) * 3, 0, Math.PI * 2)
            ctx.stroke()

            // Middle ring
            ctx.strokeStyle = `hsla(280, 100%, 60%, 0.5)`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.arc(mousePos.current.x, mousePos.current.y, 12, 0, Math.PI * 2)
            ctx.stroke()

            // Center dot
            ctx.fillStyle = `hsla(180, 100%, 70%, 0.9)`
            ctx.beginPath()
            ctx.arc(mousePos.current.x, mousePos.current.y, 4, 0, Math.PI * 2)
            ctx.fill()

            // Center glow
            ctx.shadowColor = `hsla(180, 100%, 50%, 0.8)`
            ctx.shadowBlur = 10
            ctx.fillStyle = `hsla(180, 100%, 70%, 0.6)`
            ctx.beginPath()
            ctx.arc(mousePos.current.x, mousePos.current.y, 3, 0, Math.PI * 2)
            ctx.fill()

            // Reset shadow
            ctx.shadowBlur = 0

            requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="cursor-trail-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    )
}

export default CursorTrail
