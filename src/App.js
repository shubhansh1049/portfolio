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
  );
}

export default App;
