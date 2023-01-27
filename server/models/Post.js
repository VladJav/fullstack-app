import {model, Schema} from "mongoose";

const postSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    created:{
        type: Date, default: Date.now
    },
    user:{
        _id: {
            required: true,
            type: String
        },
        email: {
            type: String,
            required: true,
            match: [/^.+@(?:[\w-]+\.)+\w+$/],
        },
    }
});

export default model("Post", postSchema);