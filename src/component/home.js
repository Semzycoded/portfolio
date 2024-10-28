import { NavLink } from "react-router-dom";
import {useState,useEffect} from "react"
import img from "../assets/images/ME.jpg"
import About from "./about";
import Service from "./service";
import Contact from "./Contact";

const Home = () => {
  const[loopNum, setLoopNum] = useState(0);
  const[isDeleting,setIsDeleting] = useState(false);
  const toRotate = ["Web Developer","Frontend Developer",""];
  const[text, setText] = useState("");
  const[delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2500;

  useEffect(() =>{
    let ticker = setInterval(() =>{
      tick();
    },delta)

    return () => {clearInterval(ticker)};
  },[text]);

  const tick = () =>{
    let i = loopNum & toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText);

    if(isDeleting){
      setDelta(prevDelta => prevDelta /2)
    }
    if(!isDeleting && updatedText === fullText){
      setIsDeleting(true);
      setDelta(period);
    }else if(isDeleting && updatedText === ""){
      setIsDeleting(false);
      setLoopNum(loopNum + 1)
      setDelta(500)
    }
  }
  return (
    <div>
      <section className="container my-5 py-4">
        <div className="row">
          <div className="col-md-5 mt-5">
            <h1 className="display-5 mb-4">
              I'm  Adeoye Semilore <br />
              {text}
            </h1>
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              ullam id quod minima amet repudiandae sint ad esse eligendi eum.
            </p>
            <NavLink
              className="btn btn-outline-primary me-4"
              to="/contact"
              role="button"
            >
              Get Started
            </NavLink>
            <NavLink className="btn btn-primary" to="/about" role="button">
              More About me
            </NavLink>
          </div>
          <div className="col-md-7 d-flex justify-content-center align-items-center">
          <img className="ME" src={img} alt="me" width="300px" height="300px"/>
          </div>
        </div>
      </section>
      <About/>
      <Service/>
      <Contact/>
    </div>
  );
};

export default Home;
