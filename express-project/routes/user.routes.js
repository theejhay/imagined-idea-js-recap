import express from 'express';
import * as authUser from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin Routes

router.get("/profile", authMiddleware, authUser.getMyProfile);
router.post("/register", authUser.registerUser);
router.post("/login", authUser.login);
router.post("/refresh", authUser.refresh);
router.post("/logout", authUser.logout);

export default router;
