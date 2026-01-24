const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validateUser")
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.post("/", validateUser, userController.createUser);
router.put("/:id", userController.updateUser)
router.patch("/user/:id", userController.patchUser)
router.delete("/:id", userController.deleteUser)

module.exports = router;

