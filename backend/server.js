const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/userSchema"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();


//Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Database Connection
mongoose.connect("mongodb://localhost:27017/ZidioDatabase")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



//Routes
  app.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user" 
      });
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No User found!" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

  
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role 
        }
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  


  
//Server running
app.listen(5000, () => console.log("Server running on port 5000"));