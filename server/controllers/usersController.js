
import {deleteById, getAllUsers, getUserById, updateById} from "../services/usersService.js";

export async function getUsers (req, res, next) {

    try{
        let projection = "-token -roles -password  -__v";
        const {page, title, sort} = req.query;
        if(req.roles.includes("admin")) projection = "";
        res.json(await getAllUsers({page, title}, projection, sort));
    }
    catch (e){
        next(e);
    }
}
export async function getUser (req, res, next) {
    try{
        res.json(await getUserById(req.params.userId));
    }
    catch (e){
        next(e);
    }
}

export async function updateUser(req, res, next) {
    try{
        let id = req.params.userId;
        const {email, password} = req.body;

        await updateById({roles: req.roles, userId:req.userId}, {email,password}, id);
        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }

}
export async function deleteUser (req, res, next) {
    try{
        let id = req.userId;

        await deleteById(id, {userId:req.userId, roles :req.roles});

        if(req.roles.includes("regular")) res.clearCookie("auth-token");

        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }

}