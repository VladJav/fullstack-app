import User from "../models/User.js";

export async function getUsers (req, res, next) {

    try{
        const {page = 1, limit = 20} = req.query;
        const users = await User.find({}, "email _id")
            .limit(limit)
            .skip((page-1) * limit)
            .exec()
        const count = await User.countDocuments();
        res.json({
            users,
            totalPages: Math.ceil(count/limit),
            currentPage: page
        })
    }
    catch (e){
        next(e)
    }
}
export async function getUser (req, res, next) {
    try{
        res.json(await User.findById(req.params.userId, "email _id"))
    }
    catch (e){
        e.message = "User not found";
        e.status = 404;
        next(e)
    }
}

export async function updateUser(req, res, next) {
    try{
        let id = req.userId;

        if(req.roles.includes('admin')) id = req.params.userId;
        if(id!==req.params.userId){
            const error = new Error("You do not have enough permissions. Access is denied")
            error.status = 403;
            throw error
        }
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true
        });
        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.sendStatus(204)
    }
    catch (e){
        next(e)
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
        const user = await User.findOneAndDelete({_id: id})
        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.clearCookie("auth-token");
        res.sendStatus(204)
    }
    catch (e){
        next(e)
    }

}