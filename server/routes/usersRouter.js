import express from "express";
import { deleteUser, getUser, getUsers, updateUser} from "../controllers/usersController.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const router = express.Router()

router.use(authenticateToken);

router.get("/", getUsers)
router.get("/:userId", getUser)
router.delete("/:userId", deleteUser)
router.put("/:userId",updateUser)

export {router as userRouter}

