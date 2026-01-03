import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const ProjectFilter = ({ projects }) => {
  const [selectedTech, setSelectedTech] = useState('All')

  // Get unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set(['All'])
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techs.add(tech)
      })
    })
    return Array.from(techs)
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') {
      return projects
    }
    return projects.filter((project) =>
      project.technologies.includes(selectedTech)
    )
  }, [selectedTech, projects])

  return (
    <div className="project-filter-container">
      {/* Filter Buttons */}
      <motion.div
        className="filter-buttons"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2rem',
          justifyContent: 'center',
        }}
      >
        {allTechs.map((tech) => (
          <motion.button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.5rem 1rem',
              border:
                selectedTech === tech
                  ? '2px solid var(--accent)'
                  : '2px solid var(--border-color)',
              backgroundColor:
                selectedTech === tech ? 'var(--accent)' : 'transparent',
              color: selectedTech === tech ? 'white' : 'var(--text-primary)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: selectedTech === tech ? '600' : '500',
              transition: 'all 0.3s ease',
            }}
          >
            {tech}
          </motion.button>
        ))}
      </motion.div>

      {/* Results Count */}
      <p
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: 'var(--text-secondary)',
        }}
      >
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      {/* Filtered Projects */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Your project card component here */}
            <div
              style={{
                border: '1px solid var(--border-color)',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', color: 'var(--text-secondary)' }}
        >
          No projects found with this technology.
        </motion.p>
      )}
    </div>
  )
}

export default ProjectFilter
