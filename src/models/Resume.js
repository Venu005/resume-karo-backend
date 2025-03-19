const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  experience: [{ title: String, company: String, duration: String }],
  education: [{ degree: String, university: String, year: String }],
  skills: [String],
});

module.exports = mongoose.model("Resume", resumeSchema);
