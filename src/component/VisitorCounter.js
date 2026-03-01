import { useState, useEffect, useRef } from 'react'
import '../styles/VisitorCounter.css'
import AdminPanel from './AdminPanel'

const VisitorCounter = () => {
    const [count, setCount] = useState(0)
    const [showAdminPanel, setShowAdminPanel] = useState(false)
    const hasCountedRef = useRef(false)

    useEffect(() => {
        // Prevent double counting (especially in React Strict Mode)
        if (hasCountedRef.current) return
        hasCountedRef.current = true

        // Only count visitor
        const storedCount = localStorage.getItem('visitorCount') || 0
        const newCount = parseInt(storedCount) + 1
        localStorage.setItem('visitorCount', newCount)
        setCount(newCount)
    }, [])

    // Listen for the secret keyboard shortcut: Ctrl+Shift+A for admin panel
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault()
                setShowAdminPanel(true)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <>
            <div className="visitor-counter">
                <span className="visitor-label">👥 Visitors:</span>
                <span className="visitor-count">{count}</span>
                <button
                    className="admin-access-btn"
                    onClick={() => setShowAdminPanel(true)}
                    title="Open admin panel (Ctrl+Shift+A)"
                >
                    ⚙️
                </button>
            </div>

            <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
        </>
    )
}

export default VisitorCounter
