import Post from "../models/Post.js";
import {checkAdminPermissions} from "../utils/checkAdminPermissions.js";
import User from "../models/User.js";

export async function getPostsTemplate(paginationOptions, searchQuery = "", sort = ""){
    const {page = 1, limit = 20} = paginationOptions;
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
    return {
        posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    }

}
export async function getPostById(id){
    const post = await Post.findById(id).select("-__v").lean();
    if(!post){
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }
    return post;
}
export async function updatePostById(userBody, updateBody, postId){
    const post =  await getPostById(postId);

    if(!post){
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }
    checkAdminPermissions(userBody.roles, userBody.userId, post.user._id.toString())

    return Post.updateOne({_id:postId}, updateBody,{
        new: true,
        runValidators: true,
        omitUndefined: true
    })
}
export async function savePost(creatorId, createBody){
    const {title, content}= createBody
    if(!title || !content){
        const error = new Error("Post validation failed");
        error.status = 400;
        throw error
    }
    const creator = await User.findById(creatorId);
    const post = new Post({title, content, user: creator});

    await post.save();

    return post;
}
export async function deletePostById(userBody, postId){
    const post =  await Post.findById(postId);

    if(!post){
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }
    checkAdminPermissions(userBody.roles, userBody.userId, post.user._id.toString())

    return Post.findByIdAndDelete(postId);

}