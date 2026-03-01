// Simple hash function for password hashing (for obfuscation in localStorage)
// Note: Not cryptographically secure for real production use, but sufficient for client-side storage
export const hashPassword = (password) => {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
}

// Session management
export const createAdminSession = () => {
    const sessionToken = Math.random().toString(36).substring(7)
    const timestamp = Date.now()
    localStorage.setItem('adminSession', JSON.stringify({ token: sessionToken, timestamp }))
    return sessionToken
}

export const getAdminSession = () => {
    const session = localStorage.getItem('adminSession')
    if (!session) return null

    try {
        const parsed = JSON.parse(session)
        const now = Date.now()
        const tenMinutes = 10 * 60 * 1000

        // Check if session is still valid (10 minutes timeout)
        if (now - parsed.timestamp > tenMinutes) {
            clearAdminSession()
            return null
        }

        return parsed
    } catch (e) {
        return null
    }
}

export const clearAdminSession = () => {
    localStorage.removeItem('adminSession')
}

export const isAdminLoggedIn = () => {
    return getAdminSession() !== null
}

// Activity logging
export const logActivity = (action, details = '') => {
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]')
    logs.push({
        timestamp: new Date().toLocaleString(),
        action,
        details,
    })
    // Keep only last 50 logs
    if (logs.length > 50) logs.shift()
    localStorage.setItem('adminLogs', JSON.stringify(logs))
}

export const getActivityLogs = () => {
    return JSON.parse(localStorage.getItem('adminLogs') || '[]')
}

export const clearActivityLogs = () => {
    localStorage.removeItem('adminLogs')
}
