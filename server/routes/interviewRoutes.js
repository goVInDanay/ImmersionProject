const express = require("express");
const router = express.Router();

const {
  createInterview,
  getUserInterviews,
} = require("../controllers/interviewController");
router.post("/create", createInterview);
router.post("/assigned", getUserInterviews);

module.exports = router;
