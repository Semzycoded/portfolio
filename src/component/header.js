import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import linkedin from '../assets/images/linkedin.svg'
import github from '../assets/images/github.svg'
import insta from '../assets/images/insta.svg'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [showMetrics, setShowMetrics] = useState(false)
  const [metrics, setMetrics] = React.useState({
    loadTime: 0,
    memoryUsage: 0,
  })

  React.useEffect(() => {
    if (window.performance) {
      const perfData = window.performance.timing
      const loadTime = perfData.loadEventEnd - perfData.navigationStart
      setMetrics((prev) => ({ ...prev, loadTime }))
    }

    if (performance.memory) {
      const memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576)
      setMetrics((prev) => ({ ...prev, memoryUsage: memUsage }))
    }
  }, [])

  const handleContactClick = () => {
    navigate('/contact')
  }

  return (
    <div className="d-flex navbar navbar-expand-lg navbar-dark bg-primary">
      {/* Theme Toggle Button - Floating Orb Animation */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 1.15 }}
        className="theme-toggle-btn"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        data-tooltip={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? (
          <span className="theme-icon">☀️</span>
        ) : (
          <span className="theme-icon">🌙</span>
        )}
      </motion.button>

      <div>
        <NavLink className="navbar-brand mx-5" to="">
          Portfolio
        </NavLink>
      </div>
      <span className="navbar-text ms-auto md-lg-0">
        <div
          className="social-icon"
          style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
        >
          <a
            href="https://www.linkedin.com/in/adeoye-semilore-343b89350/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <img
              style={{ borderRadius: '50%', position: 'static' }}
              src={linkedin}
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/Semzycoded"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <img
              style={{ borderRadius: '50%', position: 'static' }}
              src={github}
              alt="GitHub"
            />
          </a>
          <a
            href="https://www.instagram.com/semzy2007/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <img
              style={{ borderRadius: '50%', position: 'static' }}
              src={insta}
              alt=""
            />
          </a>
        </div>
      </span>
      <ul
        className="nav nav-pills ms-auto mb-2 md-lg-0 nav-links-desktop"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            to=""
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-profile-tab"
            data-toggle="pill"
            to="/about"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-contact-tab"
            data-toggle="pill"
            to="/services"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Services
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-contact-tab"
            data-toggle="pill"
            to="/contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Contact
          </NavLink>
        </li>
        <li className="nav-item">
          <motion.button
            onClick={() => setShowMetrics(!showMetrics)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-link active metrics-navbar-toggle"
            title="Show performance metrics"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              fontSize: '14px',
            }}
          >
            ⚡ Performance
          </motion.button>
          {showMetrics && (
            <div className="metrics-navbar-popup">
              <div className="metric-item-navbar">
                <span className="metric-label-navbar">Load Time:</span>
                <span className="metric-value-navbar">{metrics.loadTime}ms</span>
              </div>
              <div className="metric-item-navbar">
                <span className="metric-label-navbar">Memory:</span>
                <span className="metric-value-navbar">{metrics.memoryUsage}MB</span>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
