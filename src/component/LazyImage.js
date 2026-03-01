import React, { useState, useEffect } from 'react'

/**
 * LazyImage component for lazy loading images with blur-up effect
 */
const LazyImage = ({ src, alt, className = '', style = {} }) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [imageRef, setImageRef] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (imageRef) {
      observer.observe(imageRef)
    }

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageRef])

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : ''} ${className}`}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.6,
        transition: 'opacity 0.5s ease-in-out',
      }}
      onLoad={() => setIsLoaded(true)}
    />
  )
}

export default LazyImage
