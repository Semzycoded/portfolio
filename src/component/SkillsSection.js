import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SkillsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'CSS/Bootstrap', level: 88 },
        { name: 'Framer Motion', level: 80 },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Firebase', level: 78 },
        { name: 'Next.js', level: 75 },
        { name: 'SEO', level: 80 },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      className="skills-section"
      style={{
        padding: '4rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        marginBottom: '3rem',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, var(--accent) 0%, #00a8e8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Technical Skills
      </motion.h2>

      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            className="skill-category"
            variants={itemVariants}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              {category.category}
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {category.skills.map((skill, i) => (
                <motion.div key={i} className="skill-item">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{skill.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--border-color)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Animated Progress Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                        delay: i * 0.1,
                      }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, var(--accent) 0%, #00a8e8 100%)`,
                        borderRadius: '4px',
                        boxShadow: '0 0 10px rgba(0, 168, 232, 0.5)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default SkillsSection
