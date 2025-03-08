import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        mongoose.set("strictQuery", false);        
        const conn = await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log(`Database connected : ${conn.connection.host}:${conn.connection.port}`);
        // console.log(conn.connection);
        
    }catch(error){
        console.log(error);
    }
}

export default connectDB;