import User from "../models/User.js";
import {compare, hash} from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(userInfo){
    const {email, password} = userInfo;
    const user = await User.findOne({email}).lean();

    const isMatch = await compare(password, user.password || "");

    if(!user || !isMatch){
        const error = new Error("Auth failed");
        error.status = 401;
        throw error;
    }
    return user;
}
export async function registerWithPermissions(userInfo, roles){
    const {email, password} = userInfo;
    if(!email || !password) {
        const error = new Error("User validation failed");
        error.status = 400;
        throw error;
    }
    let user = await User.findOne({ email });
    if (user) {
        const error = new Error("Admin already registered.");
        error.status = 400;
        throw error;
    }

    const cryptPassword = await hash(password, 10);

    user = new User({email, password: cryptPassword, roles});
    user.token = jwt.sign({_id: user._id, roles}, process.env.SECRET_TOKEN);

    await user.save();
    return user;

}