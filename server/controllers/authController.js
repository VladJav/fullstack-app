import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {compare, hash} from "bcrypt";

export async function loginUser(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        const isMatch = await compare(password, user.password || "")

        if(!user || !isMatch){
            const error = new Error("Auth failed");
            error.status = 401;
            throw error
        }
        res.cookie("auth-token",user.token,{httpOnly:true});
        res.json(user)
    }
    catch (e){
        next(e)
    }
}
export async function registerUser(req,res,next){
    try{
        const {email, password} = req.body
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error("User already registered.");
            error.status = 400;
            throw error;
        }

        const cryptPassword = await hash(password, 10)

        user = new User({email, password: cryptPassword});
        user.token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);

        await user.save()
        res.cookie("auth-token", user.token, {httpOnly:true})
        res.json(user.toObject({ versionKey: false }))
    }
    catch (e){
        next(e)
    }
}
export async function registerAdmin(req,res,next){
    try{
        const {email, password} = req.body
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error("Admin already registered.");
            error.status = 400;
            throw error;
        }

        const cryptPassword = await hash(password, 10)

        user = new User({email, password: cryptPassword, roles:["admin"]});
        user.token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);

        await user.save()
        res.cookie("auth-token", user.token, {httpOnly:true})
        res.json(user.toObject({ versionKey: false }))
    }
    catch (e){
        next(e)
    }
}