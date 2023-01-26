import express from "express";
import { deleteUser, getUser, getUsers, updateUser} from "../controllers/usersController.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users.
 */
router.get("/", getUsers);
router.get("/:userId", getUser);
router.delete("/:userId",authenticateToken, deleteUser);
router.put("/:userId",authenticateToken,updateUser);

export {router as userRouter}

