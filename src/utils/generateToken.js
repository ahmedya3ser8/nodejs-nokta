import jwt from 'jsonwebtoken';

import { cookieConfig } from "../config/cookie.js";

const generateToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '14d'
  });
  res.cookie('nokta_token', token, cookieConfig);
  return token;
}

export default generateToken;
