// SplineScene.js - Wrapper for integrating Spline 3D scenes
// You can create a 3D scene at https://spline.design and export it to get the URL

import { useEffect, useRef } from 'react'

const SplineScene = ({ sceneUrl, title = 'Interactive 3D Scene', height = '600px' }) => {
    const containerRef = useRef(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!sceneUrl) return

        const currentContainer = containerRef.current
        if (!currentContainer) return

        // Create iframe for Spline scene
        const iframe = document.createElement('iframe')
        iframe.src = sceneUrl
        iframe.style.width = '100%'
        iframe.style.height = height
        iframe.style.border = 'none'
        iframe.style.borderRadius = '20px'
        iframe.style.boxShadow = '0 0 50px rgba(0, 168, 232, 0.3)'

        currentContainer.appendChild(iframe)

        return () => {
            if (currentContainer && iframe.parentNode === currentContainer) {
                currentContainer.removeChild(iframe)
            }
        }
    }, [sceneUrl, height])

    // If no URL provided, show setup instructions
    if (!sceneUrl) {
        return (
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.1), rgba(0, 168, 232, 0.1))',
                    border: '2px solid rgba(0, 168, 232, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                    marginTop: '2rem',
                    textAlign: 'center',
                    minHeight: height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                }}
            >
                <div>
                    <h3>🎨 {title}</h3>
                    <p style={{ marginTop: '1rem' }}>
                        Create a 3D scene at{' '}
                        <a href="https://spline.design" target="_blank" rel="noopener noreferrer">
                            spline.design
                        </a>
                        , export it, and pass the embed URL to this component
                    </p>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Example: &lt;SplineScene sceneUrl="your-spline-url-here" /&gt;
                    </p>
                </div>
            </div>
        )
    }

    return <div ref={containerRef} style={{ marginTop: '2rem' }} />
}

export default SplineScene
