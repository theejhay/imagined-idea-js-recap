import * as authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res, next) => {
  const user = await authService.register(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const user = await authService.login(req.body);
  res.json({
    success: true,
    data: user,
  });
});

const refresh = asyncHandler(async (req, res, next) => {
  const {refreshToken} = req.body;
  const accessToken = await authService.refreshToken(refreshToken);
  res.json({
    success: true,
    accessToken: accessToken,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  await authService.logout(token);
  res.json({
    success: true,
    message: "Logged out successfully"
  })
})

export { registerUser, login, refresh, logout };
