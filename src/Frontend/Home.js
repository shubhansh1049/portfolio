import React, { useState, useEffect, useRef } from "react";
import Student from "../assets/Student.jpeg";
import "./Home.css";
import axios from "axios";

/* ---------- Config ---------- */
const PROJECTS_URL = "https://adminportfolio-6swc.onrender.com/project";
const CONTACT_URL = "https://portfolio-pzgj.onrender.com/api/contact";
const EMAIL = "Shubhansh1049@gmail.com";
const GITHUB_URL = "https://github.com/shubhansh1049";
const LINKEDIN_URL = "https://www.linkedin.com/in/shubhansh-dubey-19396535b/";
const LEETCODE_URL = "https://leetcode.com/u/shubhansh32/";
const RESUME_URL = "/Shubhansh_Resume_Full_Page.pdf"; // file goes in the public/ folder

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ---------- Content from resume ---------- */
const SKILL_GROUPS = [
  { title: "Languages", items: ["Java", "JavaScript", "HTML", "CSS"] },
  { title: "Frameworks & Backend", items: ["React.js", "Node.js", "Express.js", "REST APIs"] },
  { title: "Databases", items: ["MongoDB", "MySQL", "Firebase"] },
  { title: "Testing", items: ["Playwright", "API Testing"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Android Studio", "IntelliJ IDEA"] },
];

const HOW_I_WORK = [
  "Building features across the frontend and backend",
  "Connecting applications to databases",
  "Designing APIs and debugging them methodically",
  "Improving usability and reliability",
];

const EXPERIENCE = [
  {
    period: "5 months",
    title: "Automation Tester",
    org: "Color Paper Private Limited",
    tag: "Testing role, separate from my full-stack projects",
    points: [
      "Developed and maintained Playwright automation for Search, Newsletter, Support Forms, and Profile workflows.",
      "Performed API testing and validated application behavior across automated test scenarios.",
      "Created reusable test flows and analyzed execution results to identify functional issues.",
    ],
  },
];

const EDUCATION = [
  {
    period: "2024 – 2026",
    title: "MCA (Completed)",
    org: "TIMSCDR, Mumbai – University of Mumbai",
    points: ["CGPI: 7.68"],
  },
  {
    period: "2021 – 2024",
    title: "B.Sc. Information Technology",
    org: "B.K. Shroff College, Mumbai – University of Mumbai",
    points: ["CGPA: 7.85"],
  },
  {
    period: "2021",
    title: "HSC – Science",
    org: "Thakur College of Science & Commerce",
    points: ["67.83%"],
  },
  {
    period: "2019",
    title: "SSC",
    org: "Shri R.J. Makecha High School",
    points: ["74.60%"],
  },
];

const CERTIFICATIONS = [
  "Foundational C# with Microsoft",
  "Google Cloud Computing Foundations (NPTEL)",
  "Java Programming (Great Learning)",
];

const ACHIEVEMENTS = [
  "Head Boy – Shri R.J. Makecha High School",
  "Top 5 Winner – Synapse Competition, TIMSCDR",
  "Member – Avishkar Group, TIMSCDR",
];

/* Case-study details from the resume, matched to API projects by title.
   Anything your API returns for a project takes priority over these. */
const PROJECT_DETAILS = [
  {
    key: "resumeanalyzer",
    category: "Android",
    techStack: ["Node.js", "Express.js", "Android Studio", "Java", "XML"],
    problem: "Helps users analyze the content of their resume.",
    contribution:
      "Built the Android frontend with Java and XML and the Node.js and Express.js backend, and integrated the two.",
    features: [
      "Backend processes resume data and provides analysis",
      "Android app connected to the backend",
    ],
    architecture:
      "An Android app (Java, XML) talks to a Node.js and Express.js backend that processes resume data and returns the analysis.",
  },
  {
    key: "covertocare",
    category: "Full Stack",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Cloudinary"],
    problem:
      "An online store for managing and selling mobile phone covers, with a separate admin workflow.",
    contribution: "Developed the e-commerce platform, its admin workflow and the REST APIs.",
    features: [
      "Product and category management",
      "Image uploads",
      "Pricing, discounts and stock",
      "Variants",
      "Featured products and best-seller flags",
    ],
    architecture:
      "MERN stack: REST APIs built with Node.js and Express.js, MongoDB for data storage and Cloudinary for product images.",
  },
  {
    key: "portfolio",
    category: "Full Stack",
    techStack: ["React.js", "REST APIs", "MongoDB"],
    problem: "A personal site to present my projects and let recruiters get in touch.",
    contribution:
      "Built the React portfolio and a separate admin panel for adding, editing and deleting projects.",
    features: [
      "Projects loaded from an API",
      "Admin panel with image upload, edit and delete",
      "Contact form, with messages viewable in the admin panel",
    ],
    architecture:
      "A React frontend fetches projects from a REST API. A separate React admin app manages projects and contact messages.",
  },
];

const normalize = (s) => (s || "").toLowerCase().replace(/[^a-z]/g, "");

const toList = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim()) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const enrich = (p) => {
  const name = normalize(p.title);
  const d = PROJECT_DETAILS.find((x) => name.includes(x.key)) || {};
  return {
    ...p,
    category: p.category || d.category,
    techStack: p.techStack ?? p.stack ?? p.technologies ?? d.techStack,
    features: p.features || d.features,
    problem: p.problem || d.problem,
    contribution: p.contribution || d.contribution,
    architecture: p.architecture || d.architecture,
    challenges: p.challenges || d.challenges,
  };
};

const Placeholder = ({ text }) => <span className="placeholder">[Add: {text}]</span>;

function Home() {
  const [projects, setProjects] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

  const [formdata, setFormdata] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Fetch projects (same API as before)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(PROJECTS_URL);
        setProjects((res.data?.Projects || []).map(enrich));
        setLoadState("ready");
      } catch (err) {
        console.log("Project Fetch Error:", err);
        setProjects([]);
        setLoadState("error");
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (d) => {
    const e = {};
    if (d.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
    if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = "Enter a valid email address.";
    if (d.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };

  // Contact form submit (same endpoint and payload shape as before)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(formdata);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const response = await axios.post(CONTACT_URL, {
        name: formdata.name.trim(),
        email: formdata.email.trim(),
        message: formdata.message.trim(),
      });
      setStatus({ type: "success", text: response.data?.message || "Message sent. Thank you!" });
      setFormdata({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      setStatus({ type: "error", text: "Failed to send your message. Please try again or email me directly." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* ===== Navigation ===== */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#about" className="logo" aria-label="Shubhansh Dubey, home">
            SD<span>.</span>
          </a>

          <div id="nav-panel" className={`nav-panel ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={() => setMenuOpen(false)}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a href={RESUME_URL} download className="primary-btn btn-sm">Resume</a>
          </div>

          <div className="nav-tools">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              type="button"
              ref={toggleRef}
              className="icon-btn burger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="nav-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="status-pill">
                <span className="dot" aria-hidden="true" />
                Open to entry-level Full Stack Developer roles
              </p>
              <h1>Building practical applications from frontend to backend.</h1>
              <p className="lead">
                I'm Shubhansh Dubey, an aspiring Full Stack Developer who enjoys building
                responsive web applications, developing REST APIs, working with databases,
                and solving real-world problems through code.
              </p>
              <div className="btn-row">
                <a href="#project" className="primary-btn">Explore My Projects</a>
                <a href={RESUME_URL} download className="secondary-btn">Download Resume</a>
              </div>
              <div className="social-row">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={LEETCODE_URL} target="_blank" rel="noreferrer">LeetCode</a>
              </div>
            </div>

            <div className="terminal" aria-label="Developer status panel">
              <div className="terminal-bar" aria-hidden="true">
                <i /><i /><i />
                <span>shubhansh@portfolio ~</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">$</span> whoami</p>
                <p className="out">Shubhansh Dubey</p>
                <p><span className="prompt">$</span> role</p>
                <p className="out">Full Stack Developer (fresher)</p>
                <p><span className="prompt">$</span> stack</p>
                <p className="out">React · Node.js · Express · MongoDB · MySQL</p>
                <p><span className="prompt">$</span> status</p>
                <p className="out">open to entry-level roles<span className="cursor" aria-hidden="true" /></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="about-section">
          <div className="container about-grid">
            <img className="profile-img" src={Student} alt="Shubhansh Dubey" />
            <div className="about-content">
              <h2 className="section-title">About</h2>
              <p>
                I'm an aspiring software developer with an MCA from TIMSCDR, Mumbai
                (University of Mumbai, 2024–2026). I like taking a feature from the
                interface to the API to the database, and understanding how each part
                fits together.
              </p>
              <p>
                My projects use the MERN stack and Android with Java. I also spent five
                months as an Automation Tester at Color Paper Private Limited, writing
                Playwright automation and doing API testing.
              </p>
              <div className="about-highlights">
                {HOW_I_WORK.map((item) => (
                  <div key={item} className="highlight-card">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Skills ===== */}
        <section id="skills" className="skills-section">
          <div className="container">
            <h2 className="section-title">Technical skills</h2>
            <div className="skills-container">
              {SKILL_GROUPS.map((g) => (
                <div key={g.title} className="skills-card">
                  <h3>{g.title}</h3>
                  <ul className="tags">
                    {g.items.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Projects ===== */}
        <section id="project" className="project-section">
          <div className="container">
            <h2 className="section-title">Projects</h2>

            {categories.length > 1 && (
              <div className="filters" role="group" aria-label="Filter projects by category">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`filter-btn ${filter === c ? "active" : ""}`}
                    aria-pressed={filter === c}
                    onClick={() => { setFilter(c); setOpenId(null); }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {loadState === "loading" && <p className="status-text">Loading projects…</p>}
            {loadState === "error" && (
              <p className="status-text">Projects could not be loaded right now. Please try again shortly.</p>
            )}
            {loadState === "ready" && visible.length === 0 && (
              <p className="status-text">No projects to show yet.</p>
            )}

            {visible.length > 0 && (
              <div className="project-list">
                {visible.map((p) => {
                  const id = p._id;
                  const stack = toList(p.techStack);
                  const features = toList(p.features);
                  const open = openId === id;
                  return (
                    <article key={id} className="pro-card">
                      <div className="pro-body">
                        {p.category && <span className="pro-category">{p.category}</span>}
                        <h3>{p.title}</h3>
                        <p className="pro-desc">{p.description}</p>

                        {stack.length > 0 && (
                          <ul className="tags">
                            {stack.map((s) => <li key={s}>{s}</li>)}
                          </ul>
                        )}

                        <div className="pro-links">
                          {p.github && (
                            <a href={p.github} target="_blank" rel="noreferrer" className="secondary-btn btn-sm">GitHub</a>
                          )}
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer" className="primary-btn btn-sm">Live Demo</a>
                          )}
                          <button
                            type="button"
                            className="text-btn"
                            aria-expanded={open}
                            aria-controls={`case-${id}`}
                            onClick={() => setOpenId(open ? null : id)}
                          >
                            {open ? "Hide case study" : "Case study"}
                          </button>
                        </div>

                        {open && (
                          <div id={`case-${id}`} className="case-study">
                            <dl>
                              <dt>Problem</dt>
                              <dd>{p.problem || <Placeholder text="problem it addresses" />}</dd>
                              <dt>My contribution</dt>
                              <dd>{p.contribution || <Placeholder text="what you built" />}</dd>
                              <dt>Key features</dt>
                              <dd>
                                {features.length ? (
                                  <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
                                ) : (
                                  <Placeholder text="implemented features" />
                                )}
                              </dd>
                              <dt>Architecture</dt>
                              <dd>{p.architecture || <Placeholder text="architecture overview" />}</dd>
                              <dt>Challenges</dt>
                              <dd>{p.challenges || <Placeholder text="challenges and solutions" />}</dd>
                            </dl>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ===== Experience & education ===== */}
        <section id="experience" className="experience-section">
          <div className="container">
            <h2 className="section-title">Experience &amp; education</h2>

            <h3 className="sub-title first">Experience</h3>
            <ol className="timeline">
              {EXPERIENCE.map((item) => (
                <li key={item.title} className="tl-item">
                  <p className="tl-period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p className="tl-org">{item.org}</p>
                  {item.tag && <p className="tl-tag">{item.tag}</p>}
                  <ul>
                    {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </li>
              ))}
            </ol>

            <h3 className="sub-title">Education</h3>
            <ol className="timeline">
              {EDUCATION.map((item) => (
                <li key={item.title} className="tl-item">
                  <p className="tl-period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p className="tl-org">{item.org}</p>
                  <ul>
                    {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </li>
              ))}
            </ol>

            <h3 className="sub-title">Certifications &amp; achievements</h3>
            <div className="cert-grid">
              <div className="cert-card">
                <h4>Certifications</h4>
                <ul>
                  {CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="cert-card">
                <h4>Achievements</h4>
                <ul>
                  {ACHIEVEMENTS.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Contact</h2>
              <p>
                I'm looking for an entry-level Full Stack Developer role. If you have an
                opening or want to talk about a project, send me a message.
              </p>
              <ul className="contact-links">
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href={LEETCODE_URL} target="_blank" rel="noreferrer">LeetCode</a></li>
                <li><a href={RESUME_URL} download>Download resume</a></li>
              </ul>
              <p className="contact-location">Mumbai, Maharashtra, India</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="name">Name</label>
              <input
                id="name" name="name" type="text" autoComplete="name"
                value={formdata.name} onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
              />
              {errors.name && <p id="name-err" className="field-error">{errors.name}</p>}

              <label htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                value={formdata.email} onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
              />
              {errors.email && <p id="email-err" className="field-error">{errors.email}</p>}

              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows="5"
                value={formdata.message} onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
              />
              {errors.message && <p id="message-err" className="field-error">{errors.message}</p>}

              <button type="submit" className="primary-btn" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>

              <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                {status.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-brand">Shubhansh Dubey</p>
            <p className="footer-sub">Full Stack Developer (fresher)</p>
          </div>
          <nav aria-label="Footer" className="footer-links">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`}>{l.label}</a>
            ))}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={LEETCODE_URL} target="_blank" rel="noreferrer">LeetCode</a>
          </nav>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Shubhansh Dubey. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;