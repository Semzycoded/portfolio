import backArrow from "../assets/icons/arrowleftblue.svg"
import { NavLink } from "react-router-dom";

const Data = [
    {
      id: 0,
      IMG: "https://shethink.in/wp-content/uploads/2021/07/react.js-img-1536x864.png",
      title: "Frontend Developer",
      desc: "It is a long established fact that a reader will be distracted by the readable content of the page when looking at its layout."
    },
    {
      id: 1,
      IMG: "https://cdn.worldvectorlogo.com/logos/webdev-1.svg",
      title: "Web Developer",
      desc: "It is a long established fact that a reader will be distracted by the readable content of the page when looking at its layout."
    },
  ];
const Service = () =>{
    const card = (props) =>{
       return(
        <div className="col-md-4 mb-5 pb-5">
        <div className="card text-center py-5" key={props.id} style={{width:"23rem"}}>
        <img className="card-img-top mx-auto" src={props.IMG} alt={props.title}/>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
        </div>
        </div>
    </div>
       )
    }
    return(
        <div className="servicePage py-2">

            <div className="container">
            <div style={{marginTop:"5vh",position:"absolute"}}>
                        <NavLink className="nav-link active" id="pills-home-tab" Data-toggle="pill" to="/" role="tab" aria-controls="pills-home" aria-selected="true">
                            <img src={backArrow} alt="" />
                            </NavLink>
                    </div>
                <div className="row">
                    <div className="col-12 text-center py-4 mb-5">
                    <h1>Services</h1>
                    <hr />
                    </div>
                </div>
                <div>
                   <div className="row">
                    {Data.map(card)}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Service;