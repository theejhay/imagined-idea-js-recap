import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import * as userController from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUserById)
router.post("/", authMiddleware, validateUser, userController.createUser);
router.put("/:id", userController.updateUser)
router.patch("/user/:id", userController.patchUser)
router.delete("/:id", userController.deleteUser)

export default router;
