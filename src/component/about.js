import { NavLink } from "react-router-dom";
import img from "../assets/images/ME.jpg";
import backArrow from "../assets/icons/arrowleftblue.svg";

const About = () => {
  return (
    <div>
      <section className="about">
        <header className="container">
          <div style={{ marginTop: "5vh", position: "absolute" }}>
            <NavLink
              className="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              to="/"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <img src={backArrow} alt="Back" />
            </NavLink>
          </div>
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
              <img className="ME" src={img} alt="Adeoye Semilore" width="300px" height="300px" />
            </div>
            <div className="col-md-6 my-5">
              <h1 className="display-5 mb-4">Adeoye Semilore</h1>
              <p className="lead mb-5">
                As a passionate developer, I specialize in creating efficient, user-centered applications with a
                focus on delivering clean and functional designs. With expertise in frontend and backend development,
                I strive to enhance user experiences and bring innovative ideas to life.
              </p>
              <div className="skill-bars">
                {[
                  { label: "HTML/HTML5", value: "95%", color: "bg-success" },
                  { label: "CSS", value: "80%", color: "bg-info" },
                  { label: "JavaScript", value: "80%", color: "bg-warning" },
                  { label: "React", value: "90%", color: "bg-danger" },
                  { label: "Python", value: "50%", color: "bg-primary" },
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
              <div className="text-center mt-4">
                <NavLink to="/Project" className="btn btn-success text-white">
                  My Projects
                </NavLink>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default About;
