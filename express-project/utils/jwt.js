import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const ACCESS_TOKEN_EXPIRY = "20m";
  const SECRET = process.env.JWT_SECRET;
  return jwt.sign(user, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (user) => {
  const REFRESH_TOKEN_EXPIRY = "7d";
  const SECRET = process.env.JWT_REFRESH_SECRET;
  return jwt.sign(user, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

const decodeToken = (token) => {
  return jwt.decode(token);
}

export { generateAccessToken, generateRefreshToken, decodeToken };

// Access Token = short lived
// Refresh Token = long-lived
