import {verify} from "jsonwebtoken";

export async function authenticateToken(req,res,next){
    try{
        const token = req.cookies["auth-token"];
        const encoded = await verify(token, process.env.SECRET_TOKEN);
        req.userId = encoded._id;
        req.roles = encoded.roles;
        next();
    }
    catch (e){
        e.status = 401;
        e.message = "Unauthorized"
        next(e);
    }
}