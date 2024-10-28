import { useState } from "react"
import backArrow from "../assets/icons/arrowleftblue.svg"
import { NavLink, useNavigate } from "react-router-dom"



const Contact = () =>{
const navigate = useNavigate()
    const[data, setData] = useState({
        name:"",
        email:"",
        msg:""
})

const eventHandler =(event) =>{
    const {name,value} = event.target;
    setData((preVal)=>{
        return{
            ...preVal,
            [name]:value,
        };
    })
}

const submitHandle =(event) =>{
    event.preventDefault();
    alert(`Name: ${data.name}
Email: ${data.email} 
Comments: ${data.msg}`)
}

const navigateHome = () =>{
    return(
        navigate("")
    )
}
    return(
        <div>
            <section className="contact">
                <div className="container">
                    <div style={{marginTop:"5vh",position:"absolute"}}>
                        <NavLink className="nav-link active" id="pills-home-tab" data-toggle="pill" to="/" role="tab" aria-controls="pills-home" aria-selected="true">
                            <img src={backArrow} alt="" />
                            </NavLink>
                    </div>
                    <div className="row">
                        {/* <div onClick={navigateHome} style={{marginTop:"5vh",width:"10%",height:"5%", position:"absolute"}}>
                            <img src={backArrow} alt="" /> Back
                        </div> */}
                        <div className="col-12 text-center py-4 mb-5">
                        <h1>Contact</h1>
                        <hr />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 mb-5">
                            <form onSubmit={submitHandle}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Fullname</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" name="name" onChange={eventHandler} value={data.name} placeholder="Fullname"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={eventHandler} value={data.email} placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput" className="form-label">Comments</label>
                                <textarea type="email" className="form-control" id="exampleFormControlInput1" rows="3" name="msg" onChange={eventHandler} value={data.msg}></textarea>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact