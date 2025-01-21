const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if email or password is missing
    if (!username || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user
    const user = await User.findOne({ username });
    console.log("user", user);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid details" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log("isMatch", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = jwt.sign(
      { username: user.username, id: user._id,},
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
      },
      message: `User Login Success`,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if username parameter is provided
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username parameter is required'
      });
    }

    // Check if username exists in database
    const existingUser = await User.findOne({ username: username });

    return res.status(200).json({
      success: true,
      available: !existingUser,
      message: existingUser ? 'Username is already taken' : 'Username is available'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking username availability',
      error: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  checkUsername,
};