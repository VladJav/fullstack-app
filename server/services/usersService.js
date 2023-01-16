import User from "../models/User.js";

export async function deleteById(id){
    const user = await User.findOneAndDelete({_id: id})
    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
}
export async function updateById(id, updateBody){
    const user = await User.findByIdAndUpdate(id, updateBody, {
        new: true,
        runValidators: true,
        omitUndefined: true
    });
    if(!user){
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
}
export function getUserById(id){
    return User.findById(id, "-token -roles -password")
}
export async function getAllUsers(query, projection){
    const {page = 1, limit = 20} = query;
    const users = await User.find({}, projection )
        .limit(limit)
        .skip((page-1) * limit)
        .exec();
    const count = await User.countDocuments();
    return {
        users,
        totalPages: Math.ceil(count/limit),
        currentPage: page
    }
}