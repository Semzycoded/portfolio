import { NavLink } from "react-router-dom";
import img from "../assets/images/ME.jpg";
import backArrow from "../assets/icons/arrowleftblue.svg"

const About = () => {
  return (
    <div>
      <section className="about">
        <div className="container">
        <div style={{marginTop:"5vh",position:"absolute"}}>
                        <NavLink className="nav-link active" id="pills-home-tab" data-toggle="pill" to="/" role="tab" aria-controls="pills-home" aria-selected="true">
                            <img src={backArrow} alt="" />
                        </NavLink>
                    </div>
          <div className="row">
            <div className="col-12 text-center py-4 mb-5">
              <h1>About</h1>
              <hr />
            </div>
          </div>
        </div>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <img className="ME" src={img} alt="me" width="300px" height="300px" />
            </div>
            <div className="col-md-6 my-5">
              <h1 className="display-5 mb-4">Adeoye Semilore</h1>
              <p className="lead mb-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Inventore natus omnis doloremque culpa ad alias aliquam at.
                Ratione labore temporibus dolorem? Assumenda explicabo quidem
                quo! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, debitis. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Laborum fugit perspiciatis impedit, minima
                fugiat quidem cupiditate nesciunt aspernatur, numquam obcaecati
                dolorem facilis vero, beatae dignissimos?
                <div className="progress my-4">
                  <div
                    className="progress-bar bg-success"
                    style={{width:"95%"}}
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >HTML/HTML5</div>
                  <span className="pro">95%</span>
                </div>
                <div className="progress my-4">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{width:"80%"}}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >CSS</div>
                <span className="pro">80%</span>
                </div>
                <div className="progress my-4">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{width:"80%"}}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >JavaScript</div>
                <span className="pro">80%</span>

                </div>
                <div className="progress my-4">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{width:"90%"}}
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >React</div>
                <span className="pro">90%</span>

                </div>
                <div className="progress my-4">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{width:"50%"}}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >Python</div>
                <span className="pro">50%</span>

                </div>
                <NavLink to="/Project" className="btn btn-success text-white ">
                My Projects
              </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
