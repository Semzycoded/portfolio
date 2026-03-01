import { useEffect, useState } from 'react'
import '../styles/SkeletonLoader.css'

// Main Page Loading Skeleton
const SkeletonLoader = ({ isLoading = true }) => {
  const [loadingPhase, setLoadingPhase] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % 3)
    }, 1500)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="skeleton-loader-container">
      {/* Animated holographic background */}
      <div className="skeleton-bg-animation"></div>

      {/* Floating particles */}
      <div className="skeleton-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="skeleton-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content skeleton - mimicking actual website layout */}
      <div className="skeleton-page-layout">
        {/* Header/Navbar Skeleton */}
        <div className="skeleton-navbar">
          <div className="skeleton-box skeleton-logo"></div>
          <div className="skeleton-nav-links">
            <div className="skeleton-box skeleton-nav-item"></div>
            <div className="skeleton-box skeleton-nav-item"></div>
            <div className="skeleton-box skeleton-nav-item"></div>
            <div className="skeleton-box skeleton-nav-item"></div>
          </div>
          <div className="skeleton-box skeleton-nav-button"></div>
        </div>

        {/* Hero Section */}
        <div className="skeleton-hero-section">
          <div className="skeleton-hero-content">
            <div className="skeleton-box skeleton-hero-title"></div>
            <div className="skeleton-box skeleton-hero-subtitle"></div>
            <div className="skeleton-box skeleton-hero-text"></div>
            <div className="skeleton-buttons-group">
              <div className="skeleton-box skeleton-button"></div>
              <div className="skeleton-box skeleton-button"></div>
            </div>
          </div>
          <div className="skeleton-hero-image">
            <div className="skeleton-box skeleton-profile-image"></div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skeleton-section">
          <div className="skeleton-box skeleton-section-heading"></div>
          <div className="skeleton-skill-bars">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-skill-item">
                <div className="skeleton-box skeleton-skill-label"></div>
                <div className="skeleton-box skeleton-skill-bar"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Stats Section */}
        <div className="skeleton-stats-section">
          <div className="skeleton-box skeleton-section-heading"></div>
          <div className="skeleton-stats-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-stat-card">
                <div className="skeleton-box skeleton-stat-number"></div>
                <div className="skeleton-box skeleton-stat-label"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack 3D Section */}
        <div className="skeleton-section">
          <div className="skeleton-box skeleton-section-heading"></div>
          <div className="skeleton-box skeleton-3d-cube"></div>
          <div className="skeleton-box skeleton-3d-text"></div>
        </div>

        {/* Projects Section */}
        <div className="skeleton-section">
          <div className="skeleton-box skeleton-section-heading"></div>
          <div className="skeleton-projects-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-project-card">
                <div className="skeleton-box skeleton-project-image"></div>
                <div className="skeleton-box skeleton-project-title"></div>
                <div className="skeleton-box skeleton-project-description"></div>
                <div className="skeleton-box skeleton-project-tags"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="skeleton-section">
          <div className="skeleton-box skeleton-section-heading"></div>
          <div className="skeleton-timeline">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-timeline-item">
                <div className="skeleton-timeline-dot"></div>
                <div className="skeleton-timeline-content">
                  <div className="skeleton-box skeleton-timeline-title"></div>
                  <div className="skeleton-box skeleton-timeline-subtitle"></div>
                  <div className="skeleton-box skeleton-timeline-description"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="skeleton-footer">
          <div className="skeleton-footer-content">
            <div className="skeleton-box skeleton-footer-text"></div>
            <div className="skeleton-box skeleton-footer-text"></div>
          </div>
        </div>
      </div>

      {/* Status indicator with phases */}
      <div className="skeleton-status">
        <div className="status-text">
          {loadingPhase === 0 && <span>⚡ Initializing System</span>}
          {loadingPhase === 1 && <span>🔄 Loading Assets</span>}
          {loadingPhase === 2 && <span>✨ Optimizing Performance</span>}
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Neon rings animation */}
      <div className="skeleton-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
    </div>
  )
}

// Simple Skeleton for individual elements
export const SimpleSkeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  count = 1,
}) => (
  <>
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="simple-skeleton"
        style={{
          width,
          height,
          borderRadius,
          marginBottom: i < count - 1 ? '10px' : 0,
        }}
      ></div>
    ))}
  </>
)

// Project Card Skeleton
export const ProjectCardSkeleton = () => (
  <div className="skeleton-card-wrapper">
    <SimpleSkeleton height="200px" borderRadius="8px" />
    <SimpleSkeleton height="24px" count={2} />
    <SimpleSkeleton height="16px" count={2} />
    <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
      <SimpleSkeleton width="80px" height="24px" borderRadius="20px" />
      <SimpleSkeleton width="100px" height="24px" borderRadius="20px" />
    </div>
  </div>
)

// Skills Section Skeleton
export const SkillsSkeleton = () => (
  <div className="skeleton-skills-wrapper">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} style={{ marginBottom: '1.5rem' }}>
        <SimpleSkeleton height="16px" width="150px" />
        <SimpleSkeleton height="12px" width="100%" />
      </div>
    ))}
  </div>
)

export default SkeletonLoader
