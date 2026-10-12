
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: String,
  githubLink: String,
  liveLink: String,
  image: String
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

// Routes

// Test API
app.get("/", (req, res) => {
  res.json("API Working Properly");
});

// GET all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();

    // If DB is empty, add default E-Commerce project
    if (projects.length === 0) {
      const defaultProject = new Project({
        title: "E-Commerce Website",
        description: "A full-stack e-commerce website built with React, Node.js, Express, and MongoDB.",
        techStack: "React, Node.js, Express, MongoDB",
        githubLink: "https://github.com/shubhansh1049/E-Commerce-Website",
        liveLink: "https://e-commerce-website-kappa-amber.vercel.app",
        image: "https://user-images.githubusercontent.com/yourusername/ecommerce-image.jpg" // replace with your image URL
      });

      const savedProject = await defaultProject.save();
      return res.json([savedProject]);
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST new project manually
app.post("/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
