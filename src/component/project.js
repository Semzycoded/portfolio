import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import LazyImage from './LazyImage'
import { getAllProjects } from '../utils/projectManager'

const Project = () => {
  const [projects, setProjects] = useState([])
  const [selectedTech, setSelectedTech] = useState('All')

  useEffect(() => {
    // Load projects from localStorage or use defaults
    const loadedProjects = getAllProjects()
    setProjects(loadedProjects)
  }, [])

  const allTechs = useMemo(() => {
    const techs = new Set(['All'])
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techs.add(tech)
      })
    })
    return Array.from(techs)
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') {
      return projects
    }
    return projects.filter((project) =>
      project.technologies.includes(selectedTech)
    )
  }, [selectedTech, projects])

  return (
    <div style={{ padding: '2rem 1rem' }}>
      {/* Filter Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            style={{
              padding: '0.5rem 1rem',
              border: selectedTech === tech ? '2px solid var(--accent)' : '2px solid var(--border-color)',
              backgroundColor: selectedTech === tech ? 'var(--accent)' : 'transparent',
              color: selectedTech === tech ? 'white' : 'var(--text-primary)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: selectedTech === tech ? '600' : '500',
              transition: 'all 0.3s ease',
            }}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <Card key={index}>
            <LazyImage
              src={project.imageUrl}
              alt={project.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                padding: '20px',
              }}
            />
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <div className="mb-3">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="badge bg-secondary me-2 mb-2">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="d-flex gap-2 project-buttons">
                <Button
                  variant="primary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                >
                  GitHub
                </Button>
                {project.liveDemoUrl && (
                  <Button
                    variant="success"
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
          No projects found with this technology.
        </p>
      )}
    </div>
  )
}

export default Project
