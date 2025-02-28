const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

require("dotenv").config();

const router = express.Router();

// **🔸 Signup Route**
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// **🔸 Login Route**
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  router.get("/me", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

  router.post("/set-template", authMiddleware, async (req, res) => {
    try {
      const { template } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.template = template;
      await user.save();
  
      res.json({ message: "Template updated successfully" });
    } catch (error) {
      console.error("Error saving template:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.post("/update-profile", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from middleware
        const { selected_template, selected_subfield } = req.body;

        if (!selected_template || !selected_subfield) {
            return res.status(400).json({ message: "Template and subfield are required" });
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { selected_template, selected_subfield },
            { new: true }
        );

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

  

module.exports = router;
