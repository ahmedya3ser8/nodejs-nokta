import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from '../utils/generateToken.js';

export const signupService = async (body) => {
  const { name, email, password } = body;
  
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError('Email already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  user.password = undefined;

  return user;
}

export const signinService = async (body, res) => {
  const { email, password } = body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new ApiError("Invalid email or password", 401);
  }

  user.password = undefined;

  generateToken(
    {
      id: user._id,
      name: user.name,
      role: user.role
    },
    res
  );

  return user;
}

export const getMeService = async (userId) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
