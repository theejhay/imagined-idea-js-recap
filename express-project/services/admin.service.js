import { v4 as uuidv4 } from "uuid";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import * as blacklistService from "./blacklist.service.js";
import * as userRepository from "../repository/userRepository.js";


async function register(userData) {
  const exists = await userRepository.getByEmail(userData.email);
  if (exists) {
    throw new Error("user already exists");
  }

  const hashedPassword = await hashPassword(userData.password, 10);

  const newUser = {
    uuid: uuidv4(),
    email: userData.email,
    name: userData.name,
    password: hashedPassword,
    role: "admin",
  };

  const createUserData = await userRepository.createUser(newUser);

  if (createUserData) {
      return {
        uuid: createUserData.uuid,
        name: createUserData.name,
        email: createUserData.email,
        role: createUserData.role,
      };
    }
  return null;
}

async function login({ email, password }) {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // login successful
  const successUser = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  //return successUser;
  const accessToken = generateAccessToken(successUser);
  const refreshToken = generateRefreshToken(successUser);

  // update refreshtoken on login 
  await userRepository.updateRefreshToken(user.uuid, refreshToken);

  // We can have in hours (h), seconds (s), minutes (m), days (d)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

async function refreshToken(oldRefreshToken) {
  const user = await userRepository.getByRefreshToken(oldRefreshToken);

  if (!user) throw new Error("Invalid refresh Token");

  return generateAccessToken({
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role
  });
}

async function logout(refreshToken) {
  const decoded = decodeToken(refreshToken);
  console.log(decoded);
  return await blacklistService.addToken(refreshToken, decoded.exp * 1000);
}

export { register, login, refreshToken, logout };
