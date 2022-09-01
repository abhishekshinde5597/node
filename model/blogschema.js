import mongoose from "mongoose";

const blogschema = mongoose.Schema({

    title: { type: String },
    Content: { type: String },
    date: { type: String },


}, { timestamps: true });

var blogmodel = mongoose.model('blog', blogschema);

export default blogmodel;