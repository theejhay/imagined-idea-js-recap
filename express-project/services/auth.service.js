import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const DATA_FILE = "./repository/auth_users.json";

async function readData() {
  const data = await fs.readFile(DATA_FILE, "utf8");
  if (!data.trim()) {
    return [];
  }
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function register(userData) {
  const authUsers = await readData();

  const exists = authUsers.find((u) => u.email === userData.email);
  if (exists) {
    throw new Error("user already exists");
  }

  const hashedPassword = await hashPassword(userData.password, 10);

  const newUser = {
    id: uuidv4(),
    email: userData.email,
    name: userData.name,
    password: hashedPassword,
    role: "user",
  };

  authUsers.push(newUser);
  await writeData(authUsers);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
}

async function login({ email, password }) {
  const users = await readData();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // login successful
  const successUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  //return successUser;
  const accessToken = generateAccessToken(successUser);
  const refreshToken = generateRefreshToken(successUser);

  user.refreshToken = refreshToken;
  await writeData(users)

  
  // We can have in hours (h), seconds (s), minutes (m), days (d)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken : accessToken,
    refreshToken: refreshToken
  };
}

async function refreshToken(oldRefreshToken) {
  const users = await readData();
  const user = users.find(u => u.refreshToken === oldRefreshToken);

  if(!user) throw new Error("Invalid refresh Token");

  return generateAccessToken(user);
}

export { register, login, refreshToken };
