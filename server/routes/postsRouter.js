import express from "express";
import {createPost, deletePost, getPost, getPosts, updatePost} from "../controllers/postsController.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:postId", getPost);
postsRouter.post("/", authenticateToken, createPost);
postsRouter.put("/:postId", updatePost)
postsRouter.delete("/:postId",authenticateToken, deletePost);

export {postsRouter}