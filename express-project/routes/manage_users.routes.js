import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import * as userController from '../controllers/manage_user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUserById)
router.post("/", authMiddleware, validateUser, userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser)
router.patch("/user/:id", authMiddleware, userController.patchUser)
router.delete("/:id", authMiddleware, userController.deleteUser)

export default router;
