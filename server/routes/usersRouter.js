import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/usersController.js";
const router = express.Router()

router.get("/", getUsers)
router.get("/:userId", getUser)
router.post("/", createUser)
router.delete("/:userId", deleteUser)
router.put("/:userId",updateUser)

export {router as userRouter}

