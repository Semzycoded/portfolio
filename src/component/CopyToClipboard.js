import { useState } from 'react'
import '../styles/CopyToClipboard.css'

const CopyToClipboard = ({ text, label, icon }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <button className="copy-to-clipboard-btn" onClick={handleCopy}>
            <span className="copy-icon">{icon}</span>
            <span className="copy-text">{label}</span>
            {copied && <span className="copy-feedback">✓ Copied!</span>}
        </button>
    )
}

export default CopyToClipboard
