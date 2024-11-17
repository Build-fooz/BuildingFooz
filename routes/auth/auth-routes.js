// BuildingFooz\server\routes\auth\auth-routes.js

const express = require("express");
const {
  signUpUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth, // Add this import
} = require("../../controllers/Auth/auth-controller");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ success: true, message: "You have access to this route!" });
});
router.get("/check-auth", checkAuth); // Add this route

module.exports = router;
