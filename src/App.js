<<<<<<< HEAD
import React from "react";
import Home from "./Frontend/Home";

import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    
   </Routes>
   </BrowserRouter>
=======
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Project from "./Components/Project"; // make sure the filename matches
import Contact from "./Components/Contact";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav style={{ padding: "15px", background: "#1e3c72" }}>
        <Link style={{ color: "white", marginRight: "15px" }} to="/">Home</Link>
        <Link style={{ color: "white", marginRight: "15px" }} to="/projects">Projects</Link>
        <Link style={{ color: "white" }} to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
>>>>>>> f0e93efbe5b19514140b48ecb3b531a1e853f2a3
  );
}

export default App;
