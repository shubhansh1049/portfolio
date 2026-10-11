import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  // Styles
  const containerStyle = {
    minHeight: "80vh",
    padding: "50px 20px",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
    minHeight: "120px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "12px",
    backgroundColor: "#1e3c72",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.3s",
  };

  const sectionTitle = {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={sectionTitle}>Contact Me</h2>

      {submitted && (
        <p style={{ textAlign: "center", color: "green", marginBottom: "20px" }}>
          Thank you! Your message has been sent.
        </p>
      )}

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={textareaStyle}
          required
        ></textarea>
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16325c")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e3c72")
          }
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
