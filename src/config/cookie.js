export const cookieConfig = {
  maxAge: 14 * 24 * 60 * 60 * 1000,  // 14 days
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};
