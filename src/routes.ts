import express from "express";

import * as userController from "@/controllers/userController";

const router = express.Router();

router.post("/register", userController.register);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/icon", userController.updateProfileIcon);
router.put("/favorites", userController.updateFavorites);

export default router;
