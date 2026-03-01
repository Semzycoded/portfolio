import { useState, useEffect } from 'react'
import '../styles/BackToTopButton.css'

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            className={`back-to-top-btn ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Scroll to top"
        >
            <span>⬆️</span>
        </button>
    )
}

export default BackToTopButton
