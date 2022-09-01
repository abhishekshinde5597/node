import mongoose from "mongoose";

const userschema = mongoose.Schema({

    username: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

var usermodel = mongoose.model('User', userschema);


export default usermodel;