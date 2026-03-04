import * as authService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res, _next) => {
  const user = await authService.register(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

const login = asyncHandler(async (req, res, _next) => {
  const user = await authService.login(req.body);
  res.json({
    success: true,
    data: user,
  });
});

const refresh = asyncHandler(async (req, res, _next) => {
  const {refreshToken} = req.body;
  const accessToken = await authService.refreshToken(refreshToken);
  res.json({
    success: true,
    accessToken: accessToken,
  });
});

const logout = asyncHandler(async (req, res, _next) => {
  const { token } = req.body;
  await authService.logout(token);
  res.json({
    success: true,
    message: "Logged out successfully"
  })
})

const getMyProfile = asyncHandler(async (req, res, _next) => {
  const userId = req.user.id; // from JWT (req.user = what's coming from JWT )

  const user = await authService.getMyProfile(userId);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "Not Authenticated"
    })
  }
  return res.json({
    success: true,
    data: user
  })
})

export { registerUser, login, refresh, logout, getMyProfile };
