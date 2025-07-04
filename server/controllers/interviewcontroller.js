// interviewController.js
const Interview = require("../models/Interview");
const User = require("../models/User");

exports.createInterview = async (req, res) => {
  const {
    rollNumber,
    topics,
    role,
    experience,
    techStack,
    studentEmails,
  } = req.body;

  try {
    const interview = await Interview.create({
      rollNumber,
      topics,
      role,
      experience,
      techStack,
    });

    for (const email of studentEmails) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        await user.addInterview(interview); // Sequelize relation
      }
    }

    res.status(201).json({ message: "Interview assigned" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
