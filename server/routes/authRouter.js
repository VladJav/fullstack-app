import express from "express";
import {loginUser, registerAdmin, registerUser} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/secret/path/for/admins", registerAdmin);

export {authRouter};