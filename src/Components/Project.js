import cart from "../images/cart.png";
import Blog from "../images/Blog.jpeg";

function Project() {
  const projects = [
    {
      title: "E-Commerce Website",
      description:
        "A full-stack e-commerce website built with React, Node.js, Express, and MongoDB.",
      techStack: "React, Node.js, Express, MongoDB",
      githubLink: "https://github.com/shubhansh1049/E-Commerce-Website",
      liveLink: "https://e-commerce-website-kappa-amber.vercel.app",
      image: cart,
    },
    {
      title: "Blog-App",
      description:
        "A full-stack blog application built with React, Node.js, Express, and MongoDB.",
      techStack: "React, Node.js, Express, MongoDB",
      githubLink: "https://github.com/shubhansh1049/blog-hello",
      image: Blog,
    },
  ];

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    flexDirection: "column",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    backgroundColor: "#ddd",
  };

  const contentStyle = {
    padding: "15px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const buttonStyle = {
    display: "inline-block",
    marginRight: "10px",
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#1e3c72",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#16325c",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        My Projects
      </h1>

      <div style={gridStyle}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
          >
            <img src={project.image} alt={project.title} style={imageStyle} />
            <div style={contentStyle}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>
                  <b>Tech:</b> {project.techStack}
                </p>
              </div>

              <div>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    style={buttonStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        buttonHoverStyle.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        buttonStyle.backgroundColor)
                    }
                  >
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    style={buttonStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        buttonHoverStyle.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        buttonStyle.backgroundColor)
                    }
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
