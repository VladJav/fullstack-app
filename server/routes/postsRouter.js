import express from "express";
import {createPost, deletePost, getPost, getPosts, updatePost} from "../controllers/postsController.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:postId", getPost);
postsRouter.post("/", createPost);
postsRouter.put("/:postId", updatePost)
postsRouter.delete("/:postId", deletePost);

export {postsRouter}