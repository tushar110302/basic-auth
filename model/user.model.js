import mongoose from "mongoose";
import bcyrpt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ["Admin", "Student", "Visiter"]
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcyrpt.hash(this.password, 10);
    next()
})

export const User = mongoose.model("User",userSchema);