// Import necessary modules
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating and verifying JSON Web Tokens
const User = require("../../models/User"); // User model for database operations

// Register a new user
const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body; // Destructure user details from request body

  // Validate input fields
  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (userName, email, password).",
    });
  }

  try {
    // Check if a user already exists with the provided email
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again.",
      });
    }

    // Hash the user's password for secure storage
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user document
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    // Save the user in the database
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error(e); 
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Destructure login credentials from request body

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    // Check if the user exists in the database
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    // Verify the password
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    // Generate a JWT for the user
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Replace with a secure environment variable in production
      { expiresIn: "60m" } // Token validity duration
    );

    // Send token in a secure cookie and respond with user details
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

// Log out the user by clearing the token
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Middleware to authenticate user requests using JWT
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Retrieve token from cookies
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    // Verify the token and decode user details
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

// Endpoint to verify user authentication status
const checkAuth = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  // Verify the provided token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded user info to request
    res.json({ success: true, user: req.user }); // Respond with user details
  });
};


module.exports = { signUpUser, loginUser, logoutUser, authMiddleware, checkAuth };
