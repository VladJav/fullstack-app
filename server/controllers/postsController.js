import Post from "../models/Post.js";
import User from "../models/User.js";
import {deleteById} from "../services/usersService.js";

export async function getPosts(req, res, next){
    try {
        const {page = 1, limit = 20, searchQuery="", sort=""} = req.query;
        const posts = await Post.find({title:{
                $regex: searchQuery.replaceAll(" ", "|")
            }}, "-__v" )
            .limit(limit)
            .skip((page-1) * limit)
            .lean()
            .sort(sort.replaceAll(","," "));

        const count = await Post.find({title:{
                $regex: searchQuery.replaceAll(" ", "|")
            }}, "-__v" )
            .count()
            .lean();
        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }
    catch (e){
        next(e)
    }


}
export async function getPost(req, res, next){
    res.json(await Post.findById(req.params.postId))
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
        let id = req.postId;

        if(req.roles.includes('admin')) id = req.params.userId;
        if(id!==req.params.userId){
            const error = new Error("You do not have enough permissions. Access is denied")
            error.status = 403;
            throw error
        }
        const user = await User.findOneAndDelete({_id: id})
        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }
}
