
import {login, registerWithPermissions} from "../services/authService.js";

export async function loginUser(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await login({email,password});
        res.cookie("auth-token",user.token,{httpOnly:true});
        res.json(user);
    }
    catch (e){
        next(e);
    }
}
export async function registerUser(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await registerWithPermissions({email, password}, ["regular"]);
        res.cookie("auth-token", user.token, {httpOnly:true});
        res.status(201).json(user.toObject({ versionKey: false }));
    }
    catch (e){
        next(e);
    }
}
export async function registerAdmin(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await registerWithPermissions({email, password}, ["admin"]);
        res.cookie("auth-token", user.token, {httpOnly:true});
        res.status(201).json(user.toObject({ versionKey: false }));
    }
    catch (e){
        next(e);
    }
}