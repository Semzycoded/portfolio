import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Footer from "./component/footer";
import Header from "./component/header";
import About from "./component/about";
import Contact from "./component/Contact";
import Service from "./component/service";
import Project from "./component/project";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
