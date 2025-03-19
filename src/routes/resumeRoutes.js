const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const Resume = require("../models/Resume.js");

// Get all resumes for user
router.get("/", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create resume
router.post("/", protect, async (req, res) => {
  const { fullName, email, experience, education, skills } = req.body;

  try {
    const newResume = new Resume({
      user: req.user.id,
      fullName,
      email,
      experience,
      education,
      skills,
    });

    const resume = await newResume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update resume
router.put("/:id", protect, async (req, res) => {
  const { fullName, email, experience, education, skills } = req.body;

  try {
    let resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: { fullName, email, experience, education, skills } },
      { new: true }
    );

    res.json(resume);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete resume
router.delete("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await resume.remove();
    res.json({ msg: "Resume removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
