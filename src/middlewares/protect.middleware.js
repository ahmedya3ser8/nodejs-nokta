import jwt from 'jsonwebtoken';

import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';

const protectMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.nokta_token;
  if (!token) return next(new ApiError('Not authenticated, please login', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) return next(new ApiError("User no longer exists", 401));

  req.user = user;

  next();
})

export default protectMiddleware;
