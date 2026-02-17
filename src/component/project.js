import React, { useState, useMemo } from 'react'
import { Card, Button } from 'react-bootstrap'
import LazyImage from './LazyImage'

import foodWebsite from '../assets/images/food-website.png'
import solvexImg from '../assets/images/solvex-app.png'

const projects = [
  {
    title: 'CoinPay Mobile App',
    description:
      'CoinPay is a mobile app for seamless, secure cryptocurrency payments and transfers. Manage, send, and receive crypto instantly with an intuitive interface.',
    technologies: ['React', 'Bootstrap', 'Custom CSS'],
    imageUrl:
      'https://cdn.dribbble.com/userupload/4274903/file/original-1171193ce6dc31fddb0a3c879155978e.jpg?resize=752x',
    githubUrl: 'https://github.com/Semzycoded/Coinpay-Mobile-App',
    liveDemoUrl: 'https://coinpay-mobile-app.vercel.app/',
  },
  {
    title: 'Food Recipe Website',
    description:
      'A dynamic recipe web application that fetches real-time data from a public API, allowing users to explore and filter meals.',
    technologies: ['React', 'Tailwind CSS'],
    imageUrl: foodWebsite,
    githubUrl: 'https://github.com/Semzycoded/food-recipe-website',
    liveDemoUrl: 'https://food-recipe-website-one.vercel.app',
  },
  {
    title: 'Solvex Website',
    description:
      'A platform that connects students and graduates to get academic advice and guidance for passing courses.',
    technologies: ['React', 'Tailwind CSS', 'Firebase'],
    imageUrl: solvexImg,
    githubUrl: 'https://github.com/Semzycoded/solvex1',
    liveDemoUrl: 'https://solvex1.vercel.app',
  },
]

const Project = () => {
  const [selectedTech, setSelectedTech] = useState('All')

  const allTechs = useMemo(() => {
    const techs = new Set(['All'])
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techs.add(tech)
      })
    })
    return Array.from(techs)
  }, [])

  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') {
      return projects
    }
    return projects.filter((project) =>
      project.technologies.includes(selectedTech)
    )
  }, [selectedTech])

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
              <div className="d-flex gap-2">
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
