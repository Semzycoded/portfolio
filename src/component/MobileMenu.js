import React from 'react'
import { motion } from 'framer-motion'

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
      transition={{ duration: 0.3 }}
      className="mobile-menu"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '80%',
        height: '100vh',
        backgroundColor: 'var(--card-bg)',
        zIndex: 1000,
        padding: '2rem',
        boxShadow: isOpen ? '-5px 0 15px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          float: 'right',
          color: 'var(--text-primary)',
        }}
        aria-label="Close menu"
      >
        ✕
      </button>
      <nav style={{ clear: 'both', marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1.5rem' }}>
            <a
              href="#home"
              onClick={onClose}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Home
            </a>
          </li>
          <li style={{ marginBottom: '1.5rem' }}>
            <a
              href="#about"
              onClick={onClose}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              About
            </a>
          </li>
          <li style={{ marginBottom: '1.5rem' }}>
            <a
              href="#services"
              onClick={onClose}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Services
            </a>
          </li>
          <li style={{ marginBottom: '1.5rem' }}>
            <a
              href="#projects"
              onClick={onClose}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={onClose}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </motion.div>
  )
}

export default MobileMenu
