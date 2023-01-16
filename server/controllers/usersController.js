
import {deleteById, getAllUsers, getUserById, updateById} from "../services/usersService.js";

export async function getUsers (req, res, next) {

    try{
        let projection = "-token -roles -password  -__v"
        if(req.roles.includes("admin")) projection = ""
        res.json(await getAllUsers(req.query, projection))
    }
    catch (e){
        next(e);
    }
}
export async function getUser (req, res, next) {
    try{
        res.json(await getUserById(req.params.userId))
    }
    catch (e){
        e.message = "User not found";
        e.status = 404;
        next(e);
    }
}

export async function updateUser(req, res, next) {
    try{
        let id = req.userId;
        const {email, password} = req.body;
        if(req.roles.includes('admin')) id = req.params.userId;
        if(id!==req.params.userId){
            const error = new Error("You do not have enough permissions. Access is denied")
            error.status = 403;
            throw error;
        }
        await updateById(id, {email,password});
        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }

}
export async function deleteUser (req, res, next) {
    try{
        let id = req.userId;

        if(req.roles.includes('admin')) id = req.params.userId;
        if(id!==req.params.userId){
            const error = new Error("You do not have enough permissions. Access is denied")
            error.status = 403;
            throw error
        }
        await deleteById(id);
        res.clearCookie("auth-token");
        res.sendStatus(204);
    }
    catch (e){
        next(e);
    }

}