import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const ACCESS_TOKEN_EXPIRY = "30s";
  const SECRET = process.env.JWT_SECRET;
  return jwt.sign(user, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (user) => {
  const REFRESH_TOKEN_EXPIRY = "7d";
  const SECRET = process.env.JWT_REFRESH_SECRET;
  return jwt.sign(user, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export { generateAccessToken, generateRefreshToken };

// Access Token = short lived
// Refresh Token = long-lived
