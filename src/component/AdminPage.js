import { useState, useEffect, useCallback } from 'react'
import '../styles/AdminPage.css'
import {
    hashPassword,
    createAdminSession,
    isAdminLoggedIn,
    clearAdminSession,
    logActivity,
    getActivityLogs,
    clearActivityLogs,
} from '../utils/adminUtils'
import { getPortfolioContent, setPortfolioContent, addSkill, updateSkill, deleteSkill, resetToDefaults } from '../utils/portfolioContentManager'
import { getAllProjects, addProject, updateProject, deleteProject, createEmptyProject, resetProjectsToDefaults } from '../utils/projectManager'
import CVManager from './CVManager'

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [visitorCount, setVisitorCount] = useState(0)
    const [activityLogs, setActivityLogs] = useState([])
    const [lastUpdate, setLastUpdate] = useState('')
    const [activeTab, setActiveTab] = useState('overview')
    const [skills, setSkills] = useState([])
    const [newSkill, setNewSkill] = useState({ label: '', value: 50, color: 'bg-primary' })
    const [heroContent, setHeroContent] = useState({})
    const [aboutContent, setAboutContent] = useState({})
    const [projects, setProjects] = useState([])
    const [editingProjectId, setEditingProjectId] = useState(null)
    const [newProject, setNewProject] = useState(createEmptyProject())
    const [techInput, setTechInput] = useState('')

    const updateDashboard = useCallback(() => {
        const count = localStorage.getItem('visitorCount') || 0
        setVisitorCount(parseInt(count))
        setActivityLogs(getActivityLogs())
        setLastUpdate(new Date().toLocaleTimeString())
        setSkills(getPortfolioContent('skills'))
        setHeroContent(getPortfolioContent('hero'))
        setAboutContent(getPortfolioContent('about'))
        setProjects(getAllProjects())
    }, [])

    const checkLoginStatus = useCallback(() => {
        if (isAdminLoggedIn()) {
            setIsLoggedIn(true)
            updateDashboard()
        }
    }, [updateDashboard])

    useEffect(() => {
        checkLoginStatus()
    }, [checkLoginStatus])

    const handleLogin = (e) => {
        e.preventDefault()
        const storedPassword = localStorage.getItem('adminPassword')

        if (!storedPassword) {
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
            const hashedInput = hashPassword(password)
            if (hashedInput === storedPassword) {
                createAdminSession()
                logActivity('ADMIN_LOGIN', 'Admin logged in via /admin page')
                setIsLoggedIn(true)
                setPassword('')
                updateDashboard()
                alert('✅ Logged in successfully!')
            } else {
                alert('❌ Incorrect password')
                logActivity('ADMIN_LOGIN_FAILED', 'Failed login attempt on /admin page')
            }
        }
    }

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            clearAdminSession()
            logActivity('ADMIN_LOGOUT', 'Admin logged out')
            setIsLoggedIn(false)
            setPassword('')
            setShowChangePassword(false)
            alert('✅ Logged out successfully')
        }
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
        setShowChangePassword(false)
        setNewPassword('')
        setConfirmPassword('')
        alert('✅ Password changed successfully!')
    }

    const handleExportData = () => {
        const exportData = {
            visitorCount,
            activityLogs,
            portfolioContent: {
                skills: getPortfolioContent('skills'),
                hero: getPortfolioContent('hero'),
                about: getPortfolioContent('about'),
            },
            exportDate: new Date().toISOString(),
        }

        const dataString = JSON.stringify(exportData, null, 2)
        const blob = new Blob([dataString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `portfolio-admin-data-${Date.now()}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        logActivity('DATA_EXPORTED', 'Admin data exported to JSON')
        alert('✅ Data exported successfully!')
    }

    const handleClearLogs = () => {
        if (window.confirm('⚠️ Clear all activity logs? This cannot be undone!')) {
            clearActivityLogs()
            logActivity('LOGS_CLEARED', 'All activity logs cleared')
            setActivityLogs([])
            alert('✅ Logs cleared')
        }
    }

    const handleUpdateSkill = (index, field, value) => {
        const updatedSkills = [...skills]
        updatedSkills[index][field] = field === 'value' ? parseInt(value) : value
        setSkills(updatedSkills)
        updateSkill(index, updatedSkills[index])
        logActivity('SKILL_UPDATED', `Updated skill: ${updatedSkills[index].label}`)
    }

    const handleAddSkill = () => {
        if (!newSkill.label.trim()) {
            alert('⚠️ Please enter a skill name')
            return
        }
        if (newSkill.value < 0 || newSkill.value > 100) {
            alert('⚠️ Skill value must be between 0-100')
            return
        }
        addSkill(newSkill)
        setSkills([...skills, newSkill])
        logActivity('SKILL_ADDED', `Added new skill: ${newSkill.label}`)
        setNewSkill({ label: '', value: 50, color: 'bg-primary' })
        alert('✅ Skill added successfully!')
    }

    const handleDeleteSkill = (index) => {
        const skillName = skills[index].label
        if (window.confirm(`Delete "${skillName}"?`)) {
            deleteSkill(index)
            const updated = skills.filter((_, i) => i !== index)
            setSkills(updated)
            logActivity('SKILL_DELETED', `Deleted skill: ${skillName}`)
            alert('✅ Skill deleted')
        }
    }

    const handleUpdateHero = (field, value) => {
        const updated = { ...heroContent, [field]: value }
        setHeroContent(updated)
        setPortfolioContent('hero', updated)
        logActivity('HERO_UPDATED', `Updated hero ${field}`)
    }

    const handleUpdateAbout = (field, value) => {
        const updated = { ...aboutContent, [field]: value }
        setAboutContent(updated)
        setPortfolioContent('about', updated)
        logActivity('ABOUT_UPDATED', `Updated about ${field}`)
    }

    const handleResetContent = () => {
        if (window.confirm('⚠️ Reset all portfolio content to defaults? This cannot be undone!')) {
            resetToDefaults()
            updateDashboard()
            logActivity('CONTENT_RESET', 'All portfolio content reset to defaults')
            alert('✅ Content reset to defaults')
        }
    }

    const handleAddProject = () => {
        if (!newProject.title.trim()) {
            alert('⚠️ Please enter a project title')
            return
        }
        if (!newProject.description.trim()) {
            alert('⚠️ Please enter a project description')
            return
        }
        if (newProject.technologies.length === 0) {
            alert('⚠️ Please add at least one technology')
            return
        }

        const addedProject = addProject(newProject)
        if (addedProject) {
            setProjects([...projects, addedProject])
            logActivity('PROJECT_ADDED', `Added project: ${newProject.title}`)
            setNewProject(createEmptyProject())
            setTechInput('')
            alert('✅ Project added successfully!')
        } else {
            alert('❌ Failed to add project')
        }
    }

    const handleUpdateProject = (id) => {
        const updatedProject = {
            ...newProject,
        }
        if (updateProject(id, updatedProject)) {
            setProjects(projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)))
            logActivity('PROJECT_UPDATED', `Updated project: ${newProject.title}`)
            setEditingProjectId(null)
            setNewProject(createEmptyProject())
            setTechInput('')
            alert('✅ Project updated successfully!')
        } else {
            alert('❌ Failed to update project')
        }
    }

    const handleEditProject = (project) => {
        setEditingProjectId(project.id)
        setNewProject(project)
        setTechInput('')
    }

    const handleDeleteProject = (id, title) => {
        if (window.confirm(`Delete "${title}"?`)) {
            if (deleteProject(id)) {
                setProjects(projects.filter((p) => p.id !== id))
                logActivity('PROJECT_DELETED', `Deleted project: ${title}`)
                alert('✅ Project deleted')
            } else {
                alert('❌ Failed to delete project')
            }
        }
    }

    const handleAddTechnology = () => {
        if (techInput.trim() && !newProject.technologies.includes(techInput.trim())) {
            setNewProject({
                ...newProject,
                technologies: [...newProject.technologies, techInput.trim()],
            })
            setTechInput('')
        }
    }

    const handleRemoveTechnology = (tech) => {
        setNewProject({
            ...newProject,
            technologies: newProject.technologies.filter((t) => t !== tech),
        })
    }

    const handleResetProjects = () => {
        if (window.confirm('⚠️ Reset all projects to defaults? This cannot be undone!')) {
            resetProjectsToDefaults()
            setProjects(getAllProjects())
            logActivity('PROJECTS_RESET', 'All projects reset to defaults')
            alert('✅ Projects reset to defaults')
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="admin-page-container">
                <div className="admin-login-box">
                    <div className="admin-lock-icon">🔐</div>
                    <h1>Admin Panel</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="password">Admin Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn-login">
                            🔓 Login
                        </button>
                    </form>
                    <p className="login-hint">💡 First time? Enter any password (min 6 chars) to create your account</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-content">
                <div className="admin-page-header">
                    <div className="admin-page-title">
                        <h1>⚙️ Admin Control Center</h1>
                        <p>Manage your portfolio, content, and settings</p>
                    </div>
                    <div className="admin-page-controls">
                        <button className="btn-control" onClick={() => setShowChangePassword(!showChangePassword)}>
                            🔑 Password
                        </button>
                        <button className="btn-control" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                        onClick={() => setActiveTab('content')}
                    >
                        📝 Content
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        💼 Projects
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'cv' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cv')}
                    >
                        📄 CV
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        📋 Logs
                    </button>
                </div>

                {showChangePassword && (
                    <div className="change-password-section">
                        <h3>Change Password</h3>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                required
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                required
                            />
                            <button type="submit" className="btn-submit">Update Password</button>
                        </form>
                    </div>
                )}

                {activeTab === 'overview' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">👥</div>
                                <div className="stat-label">Visitors</div>
                                <div className="stat-value">{visitorCount}</div>
                                <button className="btn-stat" onClick={handleResetVisitors}>Reset</button>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📋</div>
                                <div className="stat-label">Logs</div>
                                <div className="stat-value">{activityLogs.length}</div>
                                <button className="btn-stat" onClick={handleClearLogs}>Clear</button>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">💾</div>
                                <div className="stat-label">Actions</div>
                                <div className="stat-value">3</div>
                                <button className="btn-stat" onClick={handleExportData}>Export</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="tab-content">
                        <div className="content-section">
                            <h3>🎯 Hero Section</h3>
                            <div className="edit-group">
                                <label>Main Title</label>
                                <input
                                    type="text"
                                    value={heroContent.title || ''}
                                    onChange={(e) => handleUpdateHero('title', e.target.value)}
                                    placeholder="Your main title"
                                />
                            </div>
                            <div className="edit-group">
                                <label>Subtitle</label>
                                <textarea
                                    value={heroContent.subtitle || ''}
                                    onChange={(e) => handleUpdateHero('subtitle', e.target.value)}
                                    placeholder="Your subtitle"
                                />
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>ℹ️ About Section</h3>
                            <div className="edit-group">
                                <label>About Title</label>
                                <input
                                    type="text"
                                    value={aboutContent.title || ''}
                                    onChange={(e) => handleUpdateAbout('title', e.target.value)}
                                    placeholder="About section title"
                                />
                            </div>
                            <div className="edit-group">
                                <label>About Description</label>
                                <textarea
                                    value={aboutContent.description || ''}
                                    onChange={(e) => handleUpdateAbout('description', e.target.value)}
                                    placeholder="Your about description"
                                />
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>🎯 Skills</h3>
                            <div className="skills-list">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="skill-item">
                                        <input
                                            type="text"
                                            value={skill.label}
                                            onChange={(e) => handleUpdateSkill(idx, 'label', e.target.value)}
                                            placeholder="Skill name"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={skill.value}
                                            onChange={(e) => handleUpdateSkill(idx, 'value', e.target.value)}
                                        />
                                        <span className="skill-value">{skill.value}%</span>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteSkill(idx)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="add-skill-form">
                                <h4>Add New Skill</h4>
                                <input
                                    type="text"
                                    value={newSkill.label}
                                    onChange={(e) => setNewSkill({ ...newSkill, label: e.target.value })}
                                    placeholder="Skill name"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={newSkill.value}
                                    onChange={(e) => setNewSkill({ ...newSkill, value: parseInt(e.target.value) })}
                                />
                                <span>{newSkill.value}%</span>
                                <button className="btn-add" onClick={handleAddSkill}>➕ Add Skill</button>
                            </div>

                            <button className="btn-danger" onClick={handleResetContent}>
                                ⚠️ Reset All Content to Defaults
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="tab-content">
                        <div className="projects-section">
                            <h3>💼 Manage Projects</h3>

                            {editingProjectId ? (
                                <div className="project-form-container">
                                    <h4>✏️ Edit Project</h4>
                                </div>
                            ) : (
                                <div className="project-form-container">
                                    <h4>➕ Add New Project</h4>
                                </div>
                            )}

                            <div className="project-form">
                                <div className="form-group">
                                    <label>Project Title *</label>
                                    <input
                                        type="text"
                                        value={newProject.title || ''}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        placeholder="e.g., CoinPay Mobile App"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea
                                        value={newProject.description || ''}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        placeholder="Describe your project..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Project Image URL</label>
                                    <input
                                        type="url"
                                        value={newProject.imageUrl || ''}
                                        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Technologies *</label>
                                    <div className="tech-input-group">
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            placeholder="e.g., React"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                                        />
                                        <button type="button" className="btn-add-tech" onClick={handleAddTechnology}>
                                            Add
                                        </button>
                                    </div>
                                    <div className="tech-tags">
                                        {newProject.technologies && newProject.technologies.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTechnology(tech)}
                                                    className="tech-remove"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>GitHub URL</label>
                                    <input
                                        type="url"
                                        value={newProject.githubUrl || ''}
                                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                                        placeholder="https://github.com/username/repo"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Live Demo URL</label>
                                    <input
                                        type="url"
                                        value={newProject.liveDemoUrl || ''}
                                        onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                                        placeholder="https://project.com"
                                    />
                                </div>

                                <div className="form-actions">
                                    {editingProjectId ? (
                                        <>
                                            <button
                                                className="btn-submit"
                                                onClick={() => handleUpdateProject(editingProjectId)}
                                            >
                                                💾 Update Project
                                            </button>
                                            <button
                                                className="btn-cancel"
                                                onClick={() => {
                                                    setEditingProjectId(null)
                                                    setNewProject(createEmptyProject())
                                                    setTechInput('')
                                                }}
                                            >
                                                ✖️ Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button className="btn-submit" onClick={handleAddProject}>
                                            ➕ Add Project
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="projects-list">
                                <h4>📁 Current Projects ({projects.length})</h4>
                                {projects.length === 0 ? (
                                    <p className="no-projects">No projects yet</p>
                                ) : (
                                    projects.map((project) => (
                                        <div key={project.id} className="project-item">
                                            <div className="project-item-header">
                                                <h5>{project.title}</h5>
                                                <div className="project-actions">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEditProject(project)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleDeleteProject(project.id, project.title)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="project-description">{project.description}</p>
                                            <div className="project-techs">
                                                {project.technologies && project.technologies.map((tech, idx) => (
                                                    <span key={idx} className="tech-badge">{tech}</span>
                                                ))}
                                            </div>
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    🔗 GitHub
                                                </a>
                                            )}
                                            {project.liveDemoUrl && (
                                                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    🌐 Live Demo
                                                </a>
                                            )}
                                        </div>
                                    ))
                                )}
                                <button className="btn-danger" onClick={handleResetProjects}>
                                    ⚠️ Reset Projects to Defaults
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'cv' && (
                    <div className="tab-content">
                        <CVManager onActivityLog={logActivity} />
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="tab-content">
                        <div className="logs-section">
                            <h3>📋 Activity Logs (Last 20)</h3>
                            <div className="logs-list">
                                {activityLogs.length === 0 ? (
                                    <p className="no-logs">No activity logs yet</p>
                                ) : (
                                    activityLogs
                                        .slice(-20)
                                        .reverse()
                                        .map((log, idx) => (
                                            <div key={idx} className="log-item">
                                                <span className="log-time">{log.timestamp}</span>
                                                <span className="log-action">{log.action}</span>
                                                {log.details && <span className="log-details">{log.details}</span>}
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="admin-footer">
                    <small>Last updated: {lastUpdate}</small>
                    <small>Session expires in 10 minutes of inactivity</small>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
