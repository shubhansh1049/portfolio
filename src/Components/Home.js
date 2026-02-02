import { useNavigate } from "react-router-dom";
import { useState } from "react";
import owner from "../images/owner.jpeg";

function Home() {
  const navigate = useNavigate();

  const goToProjects = () => {
    navigate("/project"); // navigate to Projects page
  };

  // Contact form state
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form data:", contact);
    setSubmitted(true);
    setContact({ name: "", email: "", message: "" });
  };

  // Styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const heroSection = {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "60px",
  };

  const imageStyle = {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "4px solid white",
  };

  const headingStyle = { fontSize: "42px", marginBottom: "10px" };
  const subTextStyle = { fontSize: "18px", maxWidth: "600px", lineHeight: 1.6, marginBottom: "25px" };
  const buttonStyle = {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "#1e3c72",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  };

  const sectionTitle = { textAlign: "center", fontSize: "28px", marginBottom: "20px" };
  const skillsContainer = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginBottom: "60px" };
  const skillBox = { backgroundColor: "white", color: "#1e3c72", padding: "10px 20px", borderRadius: "20px", fontWeight: "bold", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" };
  const aboutText = { maxWidth: "800px", margin: "0 auto 40px auto", textAlign: "center", lineHeight: 1.8, fontSize: "17px" };

  const contactContainer = { maxWidth: "600px", margin: "0 auto 60px auto", padding: "20px", backgroundColor: "#f4f6f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
  const inputStyle = { padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px", width: "100%" };
  const textareaStyle = { ...inputStyle, minHeight: "100px", resize: "vertical" };
  const submitBtnStyle = { ...buttonStyle, backgroundColor: "#1e3c72", color: "white", width: "100%" };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroSection}>
        <img src={owner} alt="Shubhansh Dubey" style={imageStyle} />
        <h1 style={headingStyle}>Hi, I'm Shubhansh 👋</h1>
        <p style={subTextStyle}>
          MERN Stack Developer passionate about building modern, scalable, and full-stack web applications.
        </p>
        <button
          style={buttonStyle}
          onClick={goToProjects}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          View My Projects
        </button>
      </div>

      {/* Skills Section */}
      <h2 style={sectionTitle}>My Skills</h2>
      <div style={skillsContainer}>
        {["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "HTML", "CSS", "Git & GitHub", "App Development"].map((skill, idx) => (
          <div key={idx} style={skillBox}>{skill}</div>
        ))}
      </div>

      {/* About Section */}
      <h2 style={sectionTitle}>About Me</h2>
      <p style={aboutText}>
        I am a dedicated and enthusiastic MERN Stack Developer focused on creating responsive, user-friendly, and efficient web applications.
        I enjoy solving real-world problems using technology and continuously improving my development skills. My goal is to become a professional full-stack developer and contribute to impactful projects.
      </p>

      {/* Contact Section */}
      <h2 style={sectionTitle}>Contact Me</h2>
      <div style={contactContainer}>
        {submitted && <p style={{ textAlign: "center", color: "green" }}>Thank you! Your message has been sent.</p>}
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contact.name}
            onChange={handleContactChange}
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={handleContactChange}
            style={inputStyle}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={contact.message}
            onChange={handleContactChange}
            style={textareaStyle}
            required
          />
          <button type="submit" style={submitBtnStyle}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
