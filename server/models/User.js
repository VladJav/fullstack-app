import {model, Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [/^.+@(?:[\w-]+\.)+\w+$/],
    },
    password: {
        type: String,
        required: true,
    },
    token: String,
    roles:{
        type: [String],
        required: true,
        default: ['regular']
    }

})
export default model("User", userSchema)