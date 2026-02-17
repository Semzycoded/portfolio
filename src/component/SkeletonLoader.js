import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLoader = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  count = 1,
}) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 0%'],
    },
  }

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            variants={shimmer}
            animate="animate"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              width,
              height,
              borderRadius,
              background:
                'linear-gradient(90deg, var(--border-color) 0%, var(--card-bg) 50%, var(--border-color) 100%)',
              backgroundSize: '200% 100%',
              marginBottom: i < count - 1 ? '10px' : 0,
            }}
          />
        ))}
    </>
  )
}

// Project Card Skeleton
export const ProjectCardSkeleton = () => (
  <div
    style={{
      padding: '1.5rem',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
    }}
  >
    <SkeletonLoader height="200px" borderRadius="8px" />
    <SkeletonLoader height="24px" count={2} />
    <SkeletonLoader height="16px" count={2} />
    <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
      <SkeletonLoader width="80px" height="24px" borderRadius="20px" />
      <SkeletonLoader width="100px" height="24px" borderRadius="20px" />
    </div>
  </div>
)

// Image Skeleton
export const ImageSkeleton = ({ width = '100%', height = '300px' }) => (
  <motion.div
    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    style={{
      width,
      height,
      borderRadius: '8px',
      background:
        'linear-gradient(90deg, var(--border-color) 0%, var(--card-bg) 50%, var(--border-color) 100%)',
      backgroundSize: '200% 100%',
    }}
  />
)

// Text Skeleton
export const TextSkeleton = ({ lines = 3 }) => (
  <div>
    {Array(lines)
      .fill(0)
      .map((_, i) => (
        <SkeletonLoader
          key={i}
          height="16px"
          width={i === lines - 1 ? '80%' : '100%'}
          count={1}
        />
      ))}
  </div>
)

// Skills Section Skeleton
export const SkillsSkeleton = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    }}
  >
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
        }}
      >
        <SkeletonLoader height="20px" width="150px" />
        <div style={{ marginTop: '1.5rem' }}>
          {[1, 2, 3, 4].map((j) => (
            <div key={j} style={{ marginBottom: '1.5rem' }}>
              <SkeletonLoader height="16px" width="100%" />
              <SkeletonLoader height="8px" width="100%" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default SkeletonLoader
