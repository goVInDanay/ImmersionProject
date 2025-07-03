const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role !== "teacher") {
    return res.status(403).json({ message: "Only teachers can sign up" });
  }

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "Teacher registered", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
