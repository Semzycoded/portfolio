import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const Three3DCube = () => {
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const cameraRef = useRef(null)
    const rendererRef = useRef(null)
    const cubeRef = useRef(null)
    const wireframeRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
    const autoRotateRef = useRef(true)

    useEffect(() => {
        if (!containerRef.current) return

        // Detect theme and get background color
        const theme = localStorage.getItem('theme') || 'light'
        const bgColor = theme === 'dark' ? '#1a1a1a' : '#ffffff'
        const bgColorNum = theme === 'dark' ? 0x1a1a1a : 0xffffff

        // Scene setup with transparent background
        const scene = new THREE.Scene()
        sceneRef.current = scene
        scene.background = new THREE.Color(bgColorNum)
        scene.fog = new THREE.Fog(bgColorNum, 2000, 3500)

        // Camera setup
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 3
        cameraRef.current = camera

        // Renderer setup with alpha for transparency
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Create 3D Cube with tech stack
        const textTextures = []

        const techs = ['React', 'JavaScript', 'CSS3', 'HTML5', 'Three.js', 'Node.js']
        const colors = ['#0d6efd', '#f0db4f', '#e34c26', '#1572b6', '#000000', '#68a063']

        techs.forEach((tech, index) => {
            const canvas = document.createElement('canvas')
            canvas.width = 512
            canvas.height = 512
            const ctx = canvas.getContext('2d')

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 512, 512)
            gradient.addColorStop(0, colors[index])
            gradient.addColorStop(1, `${colors[index]}dd`)
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 512, 512)

            // Add text
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 80px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(tech, 256, 256)

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas)
            textTextures.push(texture)
        })

        // Create cube with 6 textures
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const cubeMaterials = textTextures.map(
            texture => new THREE.MeshPhongMaterial({ map: texture })
        )

        const cube = new THREE.Mesh(geometry, cubeMaterials)
        scene.add(cube)
        cubeRef.current = cube

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x00a8e8, 1)
        pointLight.position.set(5, 5, 5)
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0xff006e, 0.5)
        pointLight2.position.set(-5, -5, 5)
        scene.add(pointLight2)

        // Glow effect (wireframe)
        const wireframeGeometry = new THREE.BoxGeometry(2.05, 2.05, 2.05)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00a8e8,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        })
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
        scene.add(wireframe)
        wireframeRef.current = wireframe

        // Handle window resize
        const handleResize = () => {
            const newWidth = containerRef.current?.clientWidth || width
            const newHeight = containerRef.current?.clientHeight || height
            camera.aspect = newWidth / newHeight
            camera.updateProjectionMatrix()
            renderer.setSize(newWidth, newHeight)
        }

        window.addEventListener('resize', handleResize)

        // Animation loop
        let animationId
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            // Smooth mouse-based rotation
            mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.1)
            mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.1)

            // Auto-rotate when not moving mouse
            if (autoRotateRef.current) {
                cube.rotation.x += 0.003
                cube.rotation.y += 0.005
                cube.rotation.z += 0.002
            }

            // Apply mouse-controlled rotation
            cube.rotation.x += mouseRef.current.y * 0.01
            cube.rotation.y += mouseRef.current.x * 0.01

            // Rotate wireframe in opposite direction
            wireframe.rotation.x = -cube.rotation.x * 0.5
            wireframe.rotation.y = -cube.rotation.y * 0.5

            renderer.render(scene, camera)
        }

        animate()

        // Mouse move effect - ENHANCED SENSITIVITY
        const handleMouseMove = (e) => {
            if (!cube) return

            // Get position relative to container
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return

            const containerX = e.clientX - rect.left
            const containerY = e.clientY - rect.top

            // Normalize to -1 to 1
            const x = (containerX / rect.width) * 2 - 1
            const y = -(containerY / rect.height) * 2 + 1

            // Set target rotation with increased sensitivity
            mouseRef.current.targetX = x * 2 // Increased sensitivity
            mouseRef.current.targetY = y * 2 // Increased sensitivity

            // Pause auto-rotation while user is controlling
            if (Math.abs(x) > 0.05 || Math.abs(y) > 0.05) {
                autoRotateRef.current = false
            }
        }

        // Mouse leave - resume auto-rotation
        const handleMouseLeave = () => {
            autoRotateRef.current = true
            mouseRef.current.targetX = 0
            mouseRef.current.targetY = 0
        }

        if (containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove)
            containerRef.current.addEventListener('mouseleave', handleMouseLeave)
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove)
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
            }
            cancelAnimationFrame(animationId)
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
            geometry.dispose()
            cubeMaterials.forEach(m => m.dispose())
            wireframeGeometry.dispose()
            wireframeMaterial.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '500px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 0 50px rgba(0, 168, 232, 0.4), 0 0 100px rgba(255, 0, 110, 0.2)',
                background: 'linear-grad ient(135deg, rgba(13, 110, 253, 0.1), rgba(0, 168, 232, 0.1))',
                border: '2px solid rgba(0, 168, 232, 0.3)',
                marginTop: '2rem',
                cursor: 'grab',
                position: 'relative',
            }}
        />
    )
}

export default Three3DCube
