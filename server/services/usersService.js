import User from "../models/User.js";
import Post from "../models/Post.js";
import {checkAdminPermissions} from "../utils/checkAdminPermissions.js";

export async function deleteById(id, userBody){

    const user =  await User.findById(id);

    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    checkAdminPermissions(userBody.roles, userBody.userId, id)
    await Post.deleteMany({"user._id":id})
    return User.findByIdAndDelete(id);
}
export async function updateById(userBody, updateBody, id){
    const user =  await User.findById(id);

    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    checkAdminPermissions(userBody.roles, userBody.userId, id);

    return User.updateOne({_id:id}, updateBody,{
        new: true,
        runValidators: true,
        omitUndefined: true
    });
}
export async function getUserById(id){
    const user =  User.findById(id, "-token -roles -password -__v").lean();

    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    return user;
}
export async function getAllUsers(paginationOptions, projection, sort=""){
    const {page = 1, limit = 20} = paginationOptions;
    const users = await User.find({}, projection )
        .limit(limit)
        .skip((page-1) * limit)
        .lean()
        .sort(sort.replaceAll(","," "));
    const count = await User.countDocuments();
    return {
        users,
        totalPages: Math.ceil(count/limit),
        currentPage: page
    };
}