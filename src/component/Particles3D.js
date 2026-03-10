import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Particles3D = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const currentContainer = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const width = window.innerWidth
    const height = window.innerHeight

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    currentContainer.appendChild(renderer.domElement)

    // Create particles
    const particleCount = 100
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000
      positions[i + 1] = (Math.random() - 0.5) * 2000
      positions[i + 2] = (Math.random() - 0.5) * 2000

      velocities[i] = (Math.random() - 0.5) * 2
      velocities[i + 1] = (Math.random() - 0.5) * 2
      velocities[i + 2] = (Math.random() - 0.5) * 2
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00a8e8,
      size: 3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionAttribute = particles.getAttribute('position')
      const velocityAttribute = particles.getAttribute('velocity')

      for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i)
        let y = positionAttribute.getY(i)
        let z = positionAttribute.getZ(i)

        let vx = velocityAttribute.getX(i)
        let vy = velocityAttribute.getY(i)
        let vz = velocityAttribute.getZ(i)

        x += vx
        y += vy
        z += vz

        // Bounce off boundaries
        if (Math.abs(x) > 1000) vx *= -1
        if (Math.abs(y) > 1000) vy *= -1
        if (Math.abs(z) > 1000) vz *= -1

        positionAttribute.setXYZ(i, x, y, z)
        velocityAttribute.setXYZ(i, vx, vy, vz)
      }

      positionAttribute.needsUpdate = true
      particleSystem.rotation.x += 0.0001
      particleSystem.rotation.y += 0.0001

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (currentContainer && renderer.domElement.parentNode === currentContainer) {
        currentContainer.removeChild(renderer.domElement)
      }
      particles.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default Particles3D
