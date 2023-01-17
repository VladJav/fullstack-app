
import {deletePostById, getPostById, getPostsTemplate, savePost, updatePostById} from "../services/postsService.js";

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
    try {
        const { title, content} = req.body;
        const {userId, roles} = req;
        const postId = req.params.postId;
        await updatePostById({userId, roles}, {title, content}, postId)
        res.sendStatus(204)
    }
    catch (e) {
        next(e);
    }
}
export async function createPost(req, res, next){
    try{
        const {title, content} = req.body;
        const creatorId = req.userId;
        const createdPost = await savePost(creatorId, {title, content})

        res.json(createdPost)
    }
    catch (e){
        next(e);
    }

}

export async function deletePost(req, res, next){
    try{
        const {userId, roles} = req;
        const postId = req.params.postId;
        await deletePostById({userId, roles}, postId)
        res.sendStatus(204)
    }
    catch (e){
        next(e);
    }
}
