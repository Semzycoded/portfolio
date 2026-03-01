import { useState, useEffect } from 'react'
import '../styles/AdminPanel.css'
import CVManager from './CVManager'
import {
    hashPassword,
    createAdminSession,
    isAdminLoggedIn,
    clearAdminSession,
    logActivity,
    getActivityLogs,
    clearActivityLogs,
} from '../utils/adminUtils'

const AdminPanel = ({ isOpen, onClose }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [visitorCount, setVisitorCount] = useState(0)
    const [activityLogs, setActivityLogs] = useState([])
    const [lastUpdate, setLastUpdate] = useState('')

    useEffect(() => {
        if (isOpen) {
            setIsLoggedIn(isAdminLoggedIn())
            updateDashboard()
        }
    }, [isOpen])

    const updateDashboard = () => {
        const count = localStorage.getItem('visitorCount') || 0
        setVisitorCount(parseInt(count))
        setActivityLogs(getActivityLogs())
        setLastUpdate(new Date().toLocaleTimeString())
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const storedPassword = localStorage.getItem('adminPassword')

        if (!storedPassword) {
            // First time setup
            if (password.length < 6) {
                alert('⚠️ Password must be at least 6 characters')
                return
            }
            const hashedPassword = hashPassword(password)
            localStorage.setItem('adminPassword', hashedPassword)
            createAdminSession()
            logActivity('ADMIN_SETUP', 'Initial admin password set')
            setIsLoggedIn(true)
            setPassword('')
            updateDashboard()
            alert('✅ Admin account created successfully!')
        } else {
            // Existing password verification
            const hashedInput = hashPassword(password)
            if (hashedInput === storedPassword) {
                createAdminSession()
                logActivity('ADMIN_LOGIN', 'Admin logged in')
                setIsLoggedIn(true)
                setPassword('')
                updateDashboard()
            } else {
                alert('❌ Incorrect password')
                logActivity('ADMIN_LOGIN_FAILED', 'Failed login attempt')
            }
        }
    }

    const handleLogout = () => {
        clearAdminSession()
        logActivity('ADMIN_LOGOUT', 'Admin logged out')
        setIsLoggedIn(false)
        setPassword('')
        setShowChangePassword(false)
    }

    const handleResetVisitors = () => {
        if (window.confirm('⚠️ Are you sure you want to reset the visitor count to 0?')) {
            localStorage.setItem('visitorCount', 0)
            logActivity('VISITOR_RESET', 'Visitor count reset to 0')
            updateDashboard()
            alert('✅ Visitor count has been reset')
        }
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            alert('❌ Passwords do not match')
            return
        }
        if (newPassword.length < 6) {
            alert('⚠️ Password must be at least 6 characters')
            return
        }

        const hashedPassword = hashPassword(newPassword)
        localStorage.setItem('adminPassword', hashedPassword)
        logActivity('PASSWORD_CHANGED', 'Admin password changed')
        updateDashboard()
        setShowChangePassword(false)
        setNewPassword('')
        setConfirmPassword('')
        alert('✅ Password changed successfully')
    }

    const handleExportData = () => {
        const data = {
            visitorCount: parseInt(localStorage.getItem('visitorCount') || 0),
            exportDate: new Date().toLocaleString(),
            activityLogs: getActivityLogs(),
        }
        const dataStr = JSON.stringify(data, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `admin-report-${Date.now()}.json`
        link.click()
        logActivity('DATA_EXPORTED', `Exported ${activityLogs.length} logs`)
    }

    const handleClearLogs = () => {
        if (window.confirm('⚠️ Clear all activity logs?')) {
            clearActivityLogs()
            logActivity('LOGS_CLEARED', 'Activity logs cleared')
            updateDashboard()
            alert('✅ Logs cleared')
        }
    }

    if (!isOpen) return null

    return (
        <div className="admin-panel-backdrop" onClick={onClose}>
            <div className="admin-panel-modal" onClick={(e) => e.stopPropagation()}>
                <button className="admin-panel-close" onClick={onClose}>
                    ✕
                </button>

                {!isLoggedIn ? (
                    <div className="admin-login">
                        <h2>🔐 Admin Panel</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Admin Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-submit">
                                Login
                            </button>
                        </form>
                        <p className="login-hint">
                            💡 First time? Enter any password (min 6 chars) to create your account
                        </p>
                    </div>
                ) : (
                    <div className="admin-dashboard">
                        <div className="dashboard-header">
                            <h2>📊 Admin Dashboard</h2>
                            <button className="btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-box">
                                <div className="stat-label">Total Visitors</div>
                                <div className="stat-value">{visitorCount}</div>
                                <button className="btn-action btn-reset" onClick={handleResetVisitors}>
                                    🔄 Reset Count
                                </button>
                            </div>

                            <div className="stat-box">
                                <div className="stat-label">Session Status</div>
                                <div className="stat-value">✅ Active</div>
                                <small>Auto-logout in 10 min of inactivity</small>
                            </div>

                            <div className="stat-box">
                                <div className="stat-label">Activity Logs</div>
                                <div className="stat-value">{activityLogs.length}</div>
                                <button className="btn-action btn-export" onClick={handleExportData}>
                                    📥 Export Data
                                </button>
                            </div>
                        </div>

                        <div className="admin-controls">
                            <button
                                className="btn-control"
                                onClick={() => setShowChangePassword(!showChangePassword)}
                            >
                                🔑 Change Password
                            </button>
                            <button className="btn-control btn-danger" onClick={handleClearLogs}>
                                🗑️ Clear Logs
                            </button>
                        </div>

                        {showChangePassword && (
                            <div className="change-password-form">
                                <h4>Change Admin Password</h4>
                                <form onSubmit={handleChangePassword}>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New password (min 6 chars)"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-submit">
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        )}

                        <CVManager onActivityLog={logActivity} />

                        <div className="activity-section">
                            <h4>📋 Recent Activity</h4>
                            <div className="activity-log">
                                {activityLogs.length === 0 ? (
                                    <p className="no-activity">No activities yet</p>
                                ) : (
                                    activityLogs
                                        .slice(-10)
                                        .reverse()
                                        .map((log, idx) => (
                                            <div key={idx} className="log-entry">
                                                <span className="log-time">{log.timestamp}</span>
                                                <span className="log-action">{log.action}</span>
                                                {log.details && <span className="log-details">{log.details}</span>}
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>

                        <div className="dashboard-footer">
                            <small>Last updated: {lastUpdate}</small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminPanel
