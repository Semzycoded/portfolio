import { useEffect, useState } from 'react'
import '../styles/ScrollProgressBar.css'

const ScrollProgressBar = () => {
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (window.scrollY / windowHeight) * 100
            setScroll(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className="scroll-progress-bar"
            style={{
                width: `${scroll}%`,
            }}
        />
    )
}

export default ScrollProgressBar
