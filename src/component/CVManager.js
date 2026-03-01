import { useState, useEffect } from 'react'
import { uploadCV, deleteCV, getCVMetadata } from '../utils/cvManager'

const CVManager = ({ onActivityLog }) => {
    const [cvMetadata, setCVMetadata] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [showUploadForm, setShowUploadForm] = useState(false)

    useEffect(() => {
        loadCVMetadata()
    }, [])

    const loadCVMetadata = () => {
        const metadata = getCVMetadata()
        setCVMetadata(metadata)
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            await uploadCV(file)
            alert('✅ CV uploaded successfully!')
            onActivityLog('CV_UPLOADED', `Uploaded CV: ${file.name}`)
            loadCVMetadata()
            setShowUploadForm(false)
            e.target.value = ''
        } catch (err) {
            alert('❌ Upload failed: ' + err.message)
            onActivityLog('CV_UPLOAD_FAILED', 'Failed to upload CV: ' + err.message)
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteCV = () => {
        if (window.confirm('⚠️ Are you sure you want to delete the current CV?')) {
            if (deleteCV()) {
                alert('✅ CV deleted successfully')
                onActivityLog('CV_DELETED', 'CV file deleted')
                setCVMetadata(null)
            } else {
                alert('❌ Failed to delete CV')
            }
        }
    }

    return (
        <div className="cv-manager-section">
            <h3 className="admin-section-title">📄 CV Management</h3>

            {cvMetadata ? (
                <div className="cv-info">
                    <p><strong>Current CV:</strong> {cvMetadata.fileName}</p>
                    <p className="cv-metadata">
                        <span>📅 Uploaded: {cvMetadata.uploadDate}</span>
                        <span>📦 Size: {cvMetadata.fileSize}</span>
                    </p>
                    <div className="cv-actions">
                        <button
                            className="btn-secondary"
                            onClick={() => setShowUploadForm(!showUploadForm)}
                        >
                            {showUploadForm ? '✖️ Cancel' : '📤 Update CV'}
                        </button>
                        <button
                            className="btn-danger"
                            onClick={handleDeleteCV}
                        >
                            🗑️ Delete CV
                        </button>
                    </div>
                </div>
            ) : (
                <p className="no-cv-message">No CV uploaded yet</p>
            )}

            {showUploadForm && (
                <div className="cv-upload-form">
                    <p className="upload-info">📌 Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="file-input"
                    />
                    {uploading && <p className="uploading-text">⏳ Uploading...</p>}
                </div>
            )}

            {!showUploadForm && !cvMetadata && (
                <button
                    className="btn-primary"
                    onClick={() => setShowUploadForm(true)}
                >
                    📤 Upload CV
                </button>
            )}
        </div>
    )
}

export default CVManager
