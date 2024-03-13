import mongoose from "mongoose";


const LocalUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
    });

    export const LocalUserModel = mongoose.model('LocalUserModel', LocalUserSchema )
  