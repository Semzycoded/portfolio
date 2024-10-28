import React from "react"
import { NavLink } from "react-router-dom"
import whatsapp from "../assets/images/whatsapp.png"
import facebook from "../assets/images/facebook.svg"
import insta from "../assets/images/insta.svg"

const Header = () =>{
    return(
        <div className="d-flex navbar navbar-expand-lg navbar-dark bg-primary">
    <div>
    <NavLink className="navbar-brand mx-5" to="">Portfolio</NavLink>
    </div>
    <span className="navbar-text ms-auto md-lg-0">
      <div className="social-icon">
        <a href=""><img style={{borderRadius:"50%", position:"static"}} src={whatsapp} alt="" /></a>
        <a href=""><img style={{borderRadius:"50%", position:"static"}} src={facebook} alt="" /></a>
        <a href=""><img style={{borderRadius:"50%", position:"static"}} src={insta} alt="" /></a>
      </div>
      </span>
   <ul className="nav nav-pills ms-auto mb-2 md-lg-0" id="pills-tab" role="tablist">
  <li className="nav-item">
    <NavLink className="nav-link active" id="pills-home-tab" data-toggle="pill" to="" role="tab" aria-controls="pills-home" aria-selected="true">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link active" id="pills-profile-tab" data-toggle="pill" to="/about" role="tab" aria-controls="pills-profile" aria-selected="false">About</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link active" id="pills-contact-tab" data-toggle="pill" to="/services" role="tab" aria-controls="pills-contact" aria-selected="false">Services</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link active" id="pills-contact-tab" data-toggle="pill" to="/contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</NavLink>
  </li>
</ul>
        </div>
    )
}

export default Header