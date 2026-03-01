import { useState, useEffect } from 'react'
import { getCVMetadata, downloadCV } from '../utils/cvManager'
import '../styles/CVDownloadButton.css'

const CVDownloadButton = () => {
    const [cvMetadata, setCVMetadata] = useState(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const metadata = getCVMetadata()
        setCVMetadata(metadata)

        // Check for CV updates periodically
        const interval = setInterval(() => {
            const updatedMetadata = getCVMetadata()
            setCVMetadata(updatedMetadata)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (!cvMetadata) {
        return null
    }

    return (
        <div
            className="cv-download-button"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <button
                className="cv-btn"
                onClick={downloadCV}
                title={`Download ${cvMetadata.fileName}`}
            >
                📄
            </button>
            {isHovering && (
                <div className="cv-tooltip">
                    <p className="cv-name">{cvMetadata.fileName}</p>
                    <p className="cv-date">Updated: {cvMetadata.uploadDate}</p>
                    <p className="cv-click">Click to download</p>
                </div>
            )}
        </div>
    )
}

export default CVDownloadButton
