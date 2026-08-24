import asyncHandler from '../utils/asyncHandler.js';
import { getMeService, signinService, signupService } from '../services/auth.service.js';
import { cookieConfig } from '../config/cookie.js';

// @desc    Signup User
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res, next) => {
  const user = await signupService(req.body);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: user
  })
});

// @desc    Signin User
// @route   POST /api/auth/signin
// @access  Public
export const signin = asyncHandler(async (req, res, next) => {
  const user = await signinService(req.body, res);

  res.status(200).json({
    success: true,
    message: "Welcome back! You signed in successfully",
    data: user  
  })
});

// @desc    Logout User
// @route   POST /api/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('nokta_token', cookieConfig);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: null  
  })
});

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user._id);

  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: user
  });
});