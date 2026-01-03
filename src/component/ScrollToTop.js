import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            duration: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="scroll-to-top-container"
        >
          <motion.button
            onClick={scrollToTop}
            className="scroll-to-top"
            whileHover={{
              scale: 1.15,
              boxShadow: '0 8px 30px rgba(13, 110, 253, 0.4)',
            }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ display: 'block' }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
