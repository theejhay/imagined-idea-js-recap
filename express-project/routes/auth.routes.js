import express from 'express';
import * as authUser from '../controllers/admin.controller.js'

const router = express.Router();

// Admin Routes
router.post("/register", authUser.registerUser);
router.post("/login", authUser.login);
router.post("/refresh", authUser.refresh);
router.post("/logout", authUser.logout);

export default router;
