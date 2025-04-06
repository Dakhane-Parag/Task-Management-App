const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/userSchema"); 
const taskModel = require("./models/taskSchema");
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

  app.get("/me", async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.userId).select("-password"); // exclude password
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error("Auth verification failed", error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  });
  
  app.post("/tasks", async (req,res) => {
    const {task,description,assignedTo,createdBy} = req.body;
    try{
      const newTask = await taskModel.create({
        task,
      description,
      status: "Pending",
      createdBy,
      assignedTo,
      });
    
      res.status(201).json({message:"Task created successfully",task:newTask})

    }catch(error){
      console.error("Task creation error:",error);
      res.status(500).json({message:"Server error"})
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await userModel.find({}, "_id username email");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/tasks" , async(req,res) =>{
    try{
      const tasks = await taskModel.find({},"task status assignedTo").populate("assignedTo","username")
        res.status(200).json(tasks)
      
    }catch(err){
      console.log(err);
      res.status(500).json({message:"failed to fetch tasks!"})
    }
  })
  
  


  
//Server running
app.listen(5000, () => console.log("Server running on port 5000"));