import User from "../models/User.js";


export async function getUsers (req, res, next) {
    try{
        const {page = 1, limit = 20} = req.query;
        const users = await User.find()
            .select('-__v')
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
        res.json(await User.findById(req.params.userId).select('-__v'))
    }
    catch (e){
        e.message = "User not found";
        e.status = 404;
        next(e)
    }
}
export async function createUser(req, res, next) {
    try{
        const {email, password} = req.body
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error("User already registered.");
            error.status = 400;
            throw error;
        }
        user = new User({email, password});
        await user.save()
        res.json(user.toObject({ versionKey: false }))
    }
    catch (e){
        next(e)
    }
}
export async function updateUser(req, res, next) {
    try{
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true
        });
        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.json(user)
    }
    catch (e){
        next(e)
    }

}
export async function deleteUser (req, res, next) {
    try{
        const user = await User.findOneAndDelete({_id: req.params.userId});
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