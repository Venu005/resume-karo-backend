require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes.js");
const resumeRoutes = require("./routes/resumeRoutes.js");
const connectDB = require("./lib/db.js");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
