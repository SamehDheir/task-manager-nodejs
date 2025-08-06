const User = require("../models/userModel");
const generateToken = require("../utils/genrateToken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Singup
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email already in use", 400));
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      user: { id: user._id, name: user.name, email: user.email },
    },
  });
});

// Signin
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Incorrect email or password", 400));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Incorrect email or password", 400));
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "You have successfully logged in",
    data: {
      user: { id: user._id, name: user.name, email: user.email },
    },
  });
});

// Logout
exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});
