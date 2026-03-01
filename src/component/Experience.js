import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: 'Freelance',
      role: 'Web Developer',
      duration: '2021 - 2022',
      description: 'Developed and maintained web applications with HTML, CSS, and JavaScript.'
    },
    {
      id: 2,
      company: 'Freelance',
      role: 'Frontend Developer',
      duration: '2022 - 2023',
      description: 'Worked on developing responsive web applications using React and modern JavaScript.'
    },
    
    {
      id: 3,
      company: 'Freelance',
      role: 'Next.js Developer',
      duration: '2023 - 2026',
      description: 'Developed and maintained web applications with react.'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="experience-section py-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2>Experience</h2>
            <hr style={{ width: '100px', margin: '20px auto' }} />
          </div>
        </div>
        <div className="row">
          {experiences.map((exp) => (
            <div key={exp.id} className="col-md-6 mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-4 experience-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid rgba(100, 200, 255, 0.3)',
                  borderLeft: '4px solid #0099ff',
                  cursor: 'pointer'
                }}
              >
                <h4 style={{ color: 'var(--accent)' }}>{exp.role}</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  {exp.company}
                </p>
                <small style={{ color: 'var(--text-secondary)' }}>{exp.duration}</small>
                <p className="mt-3" style={{ color: 'var(--text-primary)' }}>
                  {exp.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Experience
