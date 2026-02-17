import React, { useEffect } from 'react'
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
import ScrollToTop from './component/ScrollToTop'
import ErrorBoundary from './component/ErrorBoundary'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppContent() {
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
    <BrowserRouter>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="project" element={<Project />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Service />} />
          </Routes>
          <ScrollToTop />
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
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
