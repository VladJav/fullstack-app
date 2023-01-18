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
    roles:{
        type: [String],
        default: ["regular"]
    },
    token: String
});
export default model("User", userSchema);