import User from "../models/User.js";
import Post from "../models/Post.js";
import {checkAdminPermissions} from "../utils/checkAdminPermissions.js";
import mongoose, {Mongoose} from "mongoose";

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
export async function getUserById(id, paginationOptions){
    const {page = 1, limit = 20} = paginationOptions;
    const user = await User.findById(id, "-token -roles -password -__v").lean();
    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    const count = await Post.find({"user._id":user._id+""}, "-__v" )
        .count()
        .lean();
    const posts = await Post.find({"user._id":user._id+""}, "-user")
        .limit(limit)
        .skip((page-1) * limit)
        .lean();
    return {
        user:{
            ...user,
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    };
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