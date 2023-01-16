import {model, Schema} from "mongoose";

const postSchema = new Schema({
    title: String,
    content: String,
    votes: {
        type: Number,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})
export default model("Post", postSchema)