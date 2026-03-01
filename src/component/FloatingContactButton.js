import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/FloatingContactButton.css'

const FloatingContactButton = () => {
    const navigate = useNavigate()
    const [isVisible] = useState(true)

    const handleClick = () => {
        navigate('/contact')
    }

    return (
        <button
            className={`floating-contact-btn ${isVisible ? 'visible' : ''}`}
            onClick={handleClick}
            title="Contact me"
            aria-label="Scroll to contact section"
        >
            <span>💬</span>
            <span className="tooltip">Get in Touch</span>
        </button>
    )
}

export default FloatingContactButton
