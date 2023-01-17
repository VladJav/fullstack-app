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
    user:{
        _id: {
            required: true,
            type: Schema.Types.ObjectId
        },
        email: {
            type: String,
            required: true,
            match: [/^.+@(?:[\w-]+\.)+\w+$/],
        },
    }
})

export default model("Post", postSchema)