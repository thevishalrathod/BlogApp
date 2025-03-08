import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    body:{
        type:String,
        required:[true, "Body is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

export default mongoose.model("posts", PostSchema);