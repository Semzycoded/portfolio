import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update localStorage and DOM
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    )
    document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#ffffff'
    document.body.style.color = isDark ? '#ffffff' : '#000000'
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
