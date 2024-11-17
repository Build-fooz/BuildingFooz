const express = require("express");

// Importing controller functions for handling authentication routes
const {
  signUpUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth,
} = require("../../controllers/Auth/auth-controller");

const router = express.Router();
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route, accessible only with authentication middleware
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ success: true, message: "You have access to this route!" });
});

//check user authentication status
router.get("/check-auth", checkAuth);

module.exports = router;
