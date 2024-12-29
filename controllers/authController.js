const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");

//signup controller
exports.register =async (req, res) => {
  
  const { username, password, role } = req.body;
  // check if all fields are filled
  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  // checking if user already exists
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "Username already exists try other username",
    });
  }
  
  try {
    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating the user - not creating any json web token
    const user = await User.create({ username, password: hashedPassword, role });
    
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// login controller
exports.login = async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user =await User.findOne({ username });
    // is user does not register
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isPasswordValid =await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    //creating json web token
    const token =await jwt.sign({
      id:user._id,
      role:user.role,
      username:user.username,
    },process.env.JWT_SECRET,{
      expiresIn:"1d"
    });


    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token:token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
}; // Handle any unexpected errors
