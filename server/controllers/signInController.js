const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
    res.status(200).json({
      message: "Login successful",
      role: user.role,
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
