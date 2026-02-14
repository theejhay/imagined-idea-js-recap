import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import * as userController from '../controllers/manage_user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const router = express.Router();
const ADMIN = "admin";

router.get("/", authMiddleware, authorize(ADMIN), userController.getUsers);
router.get("/:id", authMiddleware, authorize(ADMIN), userController.getUserById)
router.post("/", authMiddleware, authorize(ADMIN), validateUser, userController.createUser);
router.put("/:id", authMiddleware, authorize(ADMIN), userController.updateUser)
router.patch("/user/:id", authMiddleware, authorize(ADMIN), userController.patchUser)
router.delete("/:id", authMiddleware, authorize(ADMIN), userController.deleteUser)

export default router;
