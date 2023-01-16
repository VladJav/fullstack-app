import Post from "../models/Post.js";
import User from "../models/User.js";
import {getPostById, getPostsTemplate} from "../services/postsService.js";
import {checkAdminPermissions} from "../utils/checkAdminPermissions.js";

export async function getPosts(req, res, next){
    try {
        const {page = 1, limit = 20, searchQuery="", sort=""} = req.query;

        res.json(await getPostsTemplate(page,limit, searchQuery, sort));
    }
    catch (e){
        next(e);
    }

}
export async function getPost(req, res, next){
    try{
        res.json(await getPostById(req.params.postId));
    }
    catch (e) {
        e.message = "User not found";
        e.status = 404;
        next(e);
    }
}
export async function updatePost(req, res, next){

}
export async function createPost(req, res, next){
    try{
        const {title, content} = req.body;

        const user = await User.findById(req.userId);
        const post = new Post({title, content, user});

        await post.save();

        res.json(post)
    }
    catch (e){
        next(e);
    }

}

export async function deletePost(req, res, next){
    try{
        const post =  await getPostById(req.params.postId);

        if(!post){
            const error = new Error('Post not found');
            error.status = 404;
            throw error;
        }

        checkAdminPermissions(req.roles, req.userId, post.user._id.toString())

        await Post.deleteOne({_id:req.params.postId})
        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }
}
