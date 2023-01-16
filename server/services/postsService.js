import Post from "../models/Post.js";

export async function getPostsTemplate(page = 1, limit = 20, searchQuery = "", sort = ""){

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
export function getPostById(id){
    return Post.findById(id).select("-__v").lean();
}