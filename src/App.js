import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './component/home'
import Footer from './component/footer'
import Header from './component/header'
import About from './component/about'
import Contact from './component/Contact'
import Service from './component/service'
import Project from './component/project'
import AdminPage from './component/AdminPage'
import ErrorBoundary from './component/ErrorBoundary'
import ScrollProgressBar from './component/ScrollProgressBar'
import FloatingContactButton from './component/FloatingContactButton'
import BackToTopButton from './component/BackToTopButton'
import VisitorCounter from './component/VisitorCounter'
import AccentColorSwitcher from './component/AccentColorSwitcher'
import SiteSignature from './component/SiteSignature'
import Particles3D from './component/Particles3D'
import SkeletonLoader from './component/SkeletonLoader'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if localhost or dev mode enabled
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    const isDeveloperMode = localStorage.getItem('devMode') === 'true'
    const allowInspection = isLocalhost || isDeveloperMode

    // Disable right-click context menu (unless in dev mode)
    const handleContextMenu = (e) => {
      if (!allowInspection) {
        e.preventDefault()
        return false
      }
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+I (unless in dev mode)
    const handleKeyDown = (e) => {
      // Enable dev mode with Ctrl+Alt+X
      if (e.ctrlKey && e.altKey && e.key === 'x') {
        localStorage.setItem('devMode', 'true')
        alert('Developer Mode Enabled! You can now inspect the website.')
        window.location.reload()
        return
      }

      // Disable dev mode with Ctrl+Alt+Z
      if (e.ctrlKey && e.altKey && e.key === 'z') {
        localStorage.setItem('devMode', 'false')
        alert('Developer Mode Disabled.')
        window.location.reload()
        return
      }

      if (
        !allowInspection &&
        (e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'I'))
      ) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      {isLoading && <SkeletonLoader />}
      <BrowserRouter>
        <ErrorBoundary>
          <Particles3D />
          <ScrollProgressBar />
          <FloatingContactButton />
          <BackToTopButton />
          <VisitorCounter />
          <AccentColorSwitcher />
          <SiteSignature />
          <div className="App">
            <Header />
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="project" element={<Project />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Service />} />
              <Route path="admin" element={<AdminPage />} />
            </Routes>
            {/* <ScrollToTop /> */}
            <Footer />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
