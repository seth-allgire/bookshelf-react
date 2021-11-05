const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { signup, login } = require("../models/users.models");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (validate(username, password)) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  signup(res, username, password);
});

router.get("/verify", auth, (req, res) => {
  return res.send({
    success: true,
    data: { username: req.user.username },
    error: null,
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  login(res, username, password);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send({
    success: true,
    data: "Successfully signed out",
    error: null,
  });
});

function validate(username, password) {
  return (
    !username ||
    !password ||
    username.length < 4 ||
    username.length > 20 ||
    password.length < 8 ||
    password.length > 20
  );
}

module.exports = router;
