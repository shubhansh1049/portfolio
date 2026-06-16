import React, { useState, useEffect } from "react";
import Student from "../assets/Student.jpeg";
import "./Home.css";
import "./contact.css";
import axios from "axios";

function Home() {
  const [projects, setProjects] = useState([]);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch Projects
  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://adminportfolio-6swc.onrender.com/project"
      );

      console.log(res.data);

      setProjects(res.data?.Projects || []);
    } catch (err) {
      console.log("Project Fetch Error:", err);
      setProjects([]);
    }
  };

  fetchProjects();
}, []);

  // Contact Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://portfolio-pzgj.onrender.com/api/contact",
        formdata
      );

      alert(response.data.message);

      setFormdata({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed To Send Data");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <ul
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          listStyle: "none",
          backgroundColor: "#0f172a",
          color: "white",
          margin: "0",
          padding: "0",
          fontSize: "20px",
        }}
      >
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a href="#project">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
      </ul>

      {/* Profile Image */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={Student}
          alt="profile"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: "30px",
          }}
        />
      </div>

      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Shubhansh Dubey
      </h1>

      {/* About */}
      <section id="about" className="about-section">
        <h1>About Me</h1>

        <div className="about-content">
          <p>
            Hello! I'm <span>Shubhansh Dubey</span>, a passionate Software
            Developer specializing in MERN Stack Web Development and Android
            Application Development.
          </p>

          <p>
            I build responsive web applications using React.js, Node.js,
            Express.js, and MongoDB while also creating Android applications
            with Java and Android Studio.
          </p>

          <p>
            I enjoy solving real-world problems, learning new technologies, and
            developing projects that improve my technical skills and practical
            experience.
          </p>

          <p>
            My goal is to become a versatile developer capable of building
            impactful web and mobile applications that make a difference.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">💻 MERN Stack Developer</div>
          <div className="highlight-card">📱 Android Developer</div>
          <div className="highlight-card">☕ Java Programmer</div>
          <div className="highlight-card">🚀 Continuous Learner</div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <h1>Skills</h1>

        <div className="skills-container">
          <div className="skills-card">HTML</div>
          <div className="skills-card">CSS</div>
          <div className="skills-card">JavaScript</div>
          <div className="skills-card">React.js</div>
          <div className="skills-card">Node.js</div>
          <div className="skills-card">Express.js</div>
          <div className="skills-card">MongoDB</div>
          <div className="skills-card">Android Studio</div>
          <div className="skills-card">Java</div>
          <div className="skills-card">Git & GitHub</div>
        </div>
      </section>

      {/* Projects */}
      <section id="project" className="project-section">
  <h1>Projects</h1>

  {projects.length > 0 ? (
    projects.map((project) => (
      <div
        key={project._id}
        className="pro-card"
        style={{
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <div style={{ marginTop: "10px" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "15px" }}
          >
            GitHub
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        </div>
      </div>
    ))
  ) : (
    <p>Loading Projects...</p>
  )}
</section>

      {/* Footer */}
      <footer className="footer">
        <h3>Shubhansh Dubey</h3>

        <p>MERN Stack Developer | Android Developer</p>

        <div className="footer-links">
          <a
            href="https://github.com/shubhansh32"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <p className="copyright">
          © 2026 Shubhansh Dubey. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;