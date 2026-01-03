// import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import img from '../assets/images/ME.jpg'
import Project from './project'
import { motion } from 'framer-motion'

const Home = () => {
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const toRotate = useMemo(() => ['Web Developer', 'Frontend Developer'], [])
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(80 - Math.random() * 40)
  const period = 1000
  const tickerRef = useRef(null)

  const stateRef = useRef({ text: '', loopNum: 0, isDeleting: false })

  const tick = useCallback(() => {
    const {
      text: currentText,
      loopNum: currentLoop,
      isDeleting: currentDeleting,
    } = stateRef.current
    let i = currentLoop % toRotate.length
    let fullText = toRotate[i]
    let updatedText = currentDeleting
      ? fullText.substring(0, currentText.length - 1)
      : fullText.substring(0, currentText.length + 1)

    setText(updatedText)
    stateRef.current.text = updatedText

    if (currentDeleting) {
      setDelta(35)
    }

    if (!currentDeleting && updatedText === fullText) {
      setIsDeleting(true)
      stateRef.current.isDeleting = true
      setDelta(period)
    } else if (currentDeleting && updatedText === '') {
      setIsDeleting(false)
      setLoopNum(currentLoop + 1)
      stateRef.current.isDeleting = false
      stateRef.current.loopNum = currentLoop + 1
      setDelta(100)
    }
  }, [toRotate, period])

  useEffect(() => {
    stateRef.current = { text, loopNum, isDeleting }
  }, [text, loopNum, isDeleting])

  useEffect(() => {
    tickerRef.current = setInterval(tick, delta)

    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current)
    }
  }, [delta, tick])

  const handleProjectsScroll = () => {
    const projectsSection = document.getElementById('projects-section')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCVDownload = () => {
    // Correct path for public folder assets in React
    const cvPath = '/CV_Adeoye_Timothy.pdf'
    const link = document.createElement('a')
    link.href = cvPath
    link.download = 'Adeoye_Timothy_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="homePage">
      <section className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mt-2 fade-in-up">
            <motion.h1
              className="display-4 fw-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I'm Timothy —{' '}
              <span style={{ color: '#0d6efd', whiteSpace: 'nowrap' }}>
                {text}
              </span>
            </motion.h1>
            <motion.p
              className="subtitle mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I build responsive, user-friendly web applications using React and
              JavaScript.
            </motion.p>
            <motion.div
              className="cta-buttons mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="btn btn-primary btn-lg me-3 mb-3"
                onClick={handleProjectsScroll}
              >
                View Projects
              </button>
              <button
                className="btn btn-outline-primary btn-lg mb-3"
                onClick={handleCVDownload}
              >
                Download CV
              </button>
            </motion.div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {/* Animated background glow */}
            <motion.div
              className="image-glow"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Animated rotating border */}
            <motion.div
              className="image-border-ring"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />

            {/* Main image with bounce and rotation */}
            <motion.div
              className="image-container"
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -45,
                y: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                className="ME profile-image"
                src={img}
                alt="Adeoye Timothy"
                width="300px"
                height="300px"
                initial={{ filter: 'blur(10px)' }}
                animate={{ filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </motion.div>

            {/* Floating particles around image */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-particle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 display-5">Skills</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="skill-bars">
              {[
                { label: 'HTML/HTML5', value: '95%', color: 'bg-success' },
                { label: 'CSS', value: '85%', color: 'bg-info' },
                { label: 'JavaScript', value: '80%', color: 'bg-warning' },
                { label: 'React', value: '90%', color: 'bg-danger' },
                { label: 'Bootstrap', value: '85%', color: 'bg-primary' },
                { label: 'Git', value: '75%', color: 'bg-secondary' },
              ].map((skill, idx) => (
                <div key={idx} className="progress my-4">
                  <div
                    className={`progress-bar ${skill.color}`}
                    role="progressbar"
                    style={{ width: skill.value }}
                    aria-valuenow={parseInt(skill.value)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {skill.label}
                  </div>
                  <span className="pro">{skill.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 display-5">Testimonials</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4 p-4 shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  "Adeoye is a dedicated and talented frontend developer. His
                  attention to detail and passion for clean, responsive design
                  is impressive. Highly recommended for any web project!"
                </p>
                <h6 className="card-subtitle text-muted mt-3">
                  — Recruiter, Tech Company
                </h6>
              </div>
            </div>
            <div className="card mb-4 p-4 shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  "Working with Adeoye was a pleasure. He communicates well,
                  delivers on time, and always strives for the best user
                  experience."
                </p>
                <h6 className="card-subtitle text-muted mt-3">
                  — Project Manager, Startup
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <motion.div
        id="projects-section"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <section className="projects-section py-5">
          <div className="container">
            <h2 className="text-center mb-5 display-5">My Projects</h2>
            <div className="row">
              <div className="col-12">
                <Project />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default Home
