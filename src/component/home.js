// import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import img from "../assets/images/ME.png";
import Project from "./project";
import Experience from "./Experience";
import PortfolioStats from "./PortfolioStats";
import Three3DCube from "./Three3DCube";
import { getPortfolioContent } from "../utils/portfolioContentManager";
import { motion } from "framer-motion";

const Home = () => {
  console.log("🏠 HOME component is rendering!");
  const toRotate = useMemo(() => ["Web Developer", "Frontend Developer"], []);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(80 - Math.random() * 40);
  const [heroContent, setHeroContent] = useState({});
  const [skills, setSkills] = useState([]);
  const period = 1000;
  const tickerRef = useRef(null);

  const stateRef = useRef({
    text: "",
    loopNum: 0,
    isDeleting: false,
    delta: 80 - Math.random() * 40,
  });

  const tick = useCallback(() => {
    const state = stateRef.current;
    let i = state.loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = state.text;
    let newIsDeleting = state.isDeleting;
    let newLoopNum = state.loopNum;
    let newDelta = state.delta;

    if (!state.isDeleting && state.text.length < fullText.length) {
      // Typing: add next character
      updatedText = fullText.substring(0, state.text.length + 1);
      newDelta = 80 - Math.random() * 40;
    } else if (state.isDeleting && state.text.length > 1) {
      // Deleting: remove one character (keep at least 1)
      updatedText = state.text.substring(0, state.text.length - 1);
      newDelta = 35;
    } else if (state.isDeleting && state.text.length === 1) {
      // Last character - replace it with first of next word
      const nextIndex = (state.loopNum + 1) % toRotate.length;
      const nextWord = toRotate[nextIndex];
      updatedText = nextWord.charAt(0);

      // Switch to next word and start typing
      newLoopNum = state.loopNum + 1;
      newIsDeleting = false;
      newDelta = 80 - Math.random() * 40;
    } else if (!state.isDeleting && state.text === fullText) {
      // Finished typing current word, pause then start deleting
      newIsDeleting = true;
      newDelta = period;
      updatedText = state.text;
    }

    // Update ref immediately
    stateRef.current = {
      text: updatedText,
      loopNum: newLoopNum,
      isDeleting: newIsDeleting,
      delta: newDelta,
    };

    // Update state for rendering
    setText(updatedText);
    setDelta(newDelta);
  }, [toRotate, period]);

  useEffect(() => {
    tickerRef.current = setInterval(tick, delta);

    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, [delta, tick]);

  useEffect(() => {
    // Load editable content from localStorage
    const hero = getPortfolioContent("hero");
    const portfolioSkills = getPortfolioContent("skills");
    setHeroContent(hero);
    setSkills(portfolioSkills);
  }, []);

  const handleProjectsScroll = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCVDownload = () => {
    // Correct path for public folder assets in React
    const cvPath = "/CV_Adeoye_Timothy.pdf";
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Adeoye_Timothy_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="homePage" id="home-page-debug">
      {/* <div style={{backgroundColor: 'yellow', padding: '20px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '20px'}}>
        🔵 HOME PAGE LOADED - If you see this yellow box, the page is updated
      </div> */}
      <section className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mt-2 fade-in-up">
            <motion.h1
              className="display-4 fw-bold mb-3 hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-block",
                color: "var(--text-primary)",
              }}
            >
              {heroContent.title || "Hi, I'm Timothy"} — <br />{" "}
              <span className="hero-typed-text" style={{ color: "#0d6efd" }}>
                {text}
              </span>
            </motion.h1>
            <motion.p
              className="subtitle mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heroContent.subtitle ||
                "I build responsive, user-friendly web applications using React and JavaScript."}
            </motion.p>
            <motion.div
              className="cta-buttons mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="btn btn-primary me-3"
                onClick={handleProjectsScroll}
              >
                View Projects
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleCVDownload}
              >
                Download CV
              </button>
            </motion.div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <motion.img
              src={img}
              alt="Adeoye Timothy"
              className="profile-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 display-5">Skills</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="skill-bars">
              {skills.map((skill, idx) => (
                <div key={idx} className="progress my-4">
                  <div
                    className={`progress-bar ${skill.color}`}
                    role="progressbar"
                    style={{ width: `${skill.value}%` }}
                    aria-valuenow={skill.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {skill.label}
                  </div>
                  <span className="pro">{skill.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Stats Section */}
      <PortfolioStats />

      {/* 3D Cube - Tech Stack */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 display-5">My Tech Stack</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Three3DCube />
            <p
              className="text-center mt-4"
              style={{ color: "var(--text-secondary)" }}
            >
              ✨ Interactive 3D cube • Rotate with your mouse • Hover for
              details
            </p>
          </div>
        </div>
      </section>

      {/* Spline Scene (Optional - uncomment when you have a Spline URL) */}
      {/* <section className="container my-5 py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <SplineScene 
              title="Interactive 3D Design" 
              sceneUrl="your-spline-embed-url-here"
            />
          </div>
        </div>
      </section> */}

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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
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

      {/* Experience Timeline - Home page only */}
      <Experience />
    </div>
  );
};

export default Home;
