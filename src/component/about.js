import { NavLink } from "react-router-dom";
import img from "../assets/images/ME.png";
import SkillsSection from "./SkillsSection";

const About = () => {
  return (
    <div>
      <section className="about">
        <header className="container">
          <div style={{ marginTop: "5vh", position: "absolute" }}></div>
          <div className="row">
            <div className="col-12 text-center py-4 mb-5">
              <h1>About</h1>
              <hr />
            </div>
          </div>
        </header>

        <main className="container my-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                className="ME about-profile-image"
                src={img}
                alt="Adeoye Semilore"
              />
            </div>
            <div className="col-md-6 my-5">
              <h1 className="display-5 mb-4">Timothy Adeoye</h1>
              <p className="lead mb-5">
                I am a Junior Frontend Developer and engineering student at
                Lagos State University (LASU). I enjoy building clean,
                responsive, and interactive web applications using modern
                frontend technologies. I am passionate about learning, improving
                my skills, and contributing to real-world projects.
              </p>
              <div className="skill-bars">
                {[
                  { label: "HTML/HTML5", value: "95%", color: "bg-success" },
                  { label: "CSS", value: "80%", color: "bg-info" },
                  { label: "JavaScript", value: "80%", color: "bg-warning" },
                  { label: "React", value: "90%", color: "bg-danger" },
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
                    <span className="pro mt-1">{skill.value}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <NavLink to="/Project" className="btn btn-success text-white">
                  My Projects
                </NavLink>
              </div>
            </div>
          </div>
        </main>

        {/* Skills Section */}
        <SkillsSection />
      </section>
    </div>
  );
};

export default About;
