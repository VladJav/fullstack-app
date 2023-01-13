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
        minLength: 8,
        maxLength:20
    },

})
export default model("User", userSchema)