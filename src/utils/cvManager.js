// CV Manager - Handles CV upload, storage, and retrieval

export const uploadCV = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file selected'))
            return
        }

        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (!allowedTypes.includes(file.type)) {
            reject(new Error('Only PDF and Word documents are allowed'))
            return
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            reject(new Error('File size must be less than 5MB'))
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const cvData = {
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                    uploadDate: new Date().toISOString(),
                    base64Data: e.target.result,
                }
                localStorage.setItem('portfolioCV', JSON.stringify(cvData))
                resolve(cvData)
            } catch (err) {
                reject(new Error('Failed to store CV: ' + err.message))
            }
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
    })
}

export const getCV = () => {
    try {
        const cvData = localStorage.getItem('portfolioCV')
        return cvData ? JSON.parse(cvData) : null
    } catch (err) {
        return null
    }
}

export const deleteCV = () => {
    try {
        localStorage.removeItem('portfolioCV')
        return true
    } catch (err) {
        return false
    }
}

export const downloadCV = () => {
    const cvData = getCV()
    if (!cvData) {
        alert('❌ No CV found')
        return
    }

    try {
        const link = document.createElement('a')
        link.href = cvData.base64Data
        link.download = cvData.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } catch (err) {
        alert('Failed to download CV: ' + err.message)
    }
}

export const getCVMetadata = () => {
    const cvData = getCV()
    if (!cvData) return null

    return {
        fileName: cvData.fileName,
        uploadDate: new Date(cvData.uploadDate).toLocaleDateString(),
        fileSize: (cvData.fileSize / 1024).toFixed(2) + ' KB',
    }
}
