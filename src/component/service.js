import DATA from "../services.json";
import backArrow from "../assets/icons/arrowleftblue.svg"
import { NavLink } from "react-router-dom";


const Service = () =>{
    const card = (props) =>{
       return(
        <div className="col-md-4 mb-5 pb-5">
        <div className="card text-center py-5" key={props.id} style={{width:"21rem"}}>
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
        <div>
            <div className="container">
            <div style={{marginTop:"5vh",position:"absolute"}}>
                        <NavLink className="nav-link active" id="pills-home-tab" data-toggle="pill" to="/" role="tab" aria-controls="pills-home" aria-selected="true">
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
                    {DATA.map(card)}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Service;