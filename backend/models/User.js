import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resetToken:String,
    ExpiredDateresetToken:Date,
    role: {
        type: String, // Specify the type here
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    posts : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    
    resetToken: { type: String },
    resetTokenExpiration: { type: Date }
});

const model = mongoose.model("User", schema);
export default model;
