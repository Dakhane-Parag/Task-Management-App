const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes.js");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// import User from "./models/User.js";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ZidioDatabase").then(() => console.log("✅ MongoDB Connected"));

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
