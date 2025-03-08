import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }
});

export default mongoose.model("users", UserSchema);