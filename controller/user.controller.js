import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not Exists. Please signup"
            })
        }
        const check = await bcrypt.compare(password, user.password);
        if(!check){
            return res.status(401).json({
                success: false,
                message: "Incorrect password."
            })
        }
        else{
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"2m"
                }
            );
            const options = {
                httpOnly: true,
                secure: true
            }

            const userData = {
                ...user.toObject(),
                token,
            };
            delete userData.password;
            // console.log(userData)

            return res.cookie("token",token, options).status(200).json({
                success: true,
                token,
                data: userData,
                message: "User logged in Successfully"
            })

        }

    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "Could not Login. Please try again!!"
            })
    }
}
const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role
        });
        return res.status(200).json({
            success: true,
            data: newUser,
            message: "User Created" 
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: "User Not created" 
        })
    }
}
const testRoute = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Successfull AUTH", 
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: "Error in Test Route" 
        })
    }
}
const studentRoute = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Successfull Student ROLE AUTH", 
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: "Error in Student Route" 
        })
    }
}
const adminRoute = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Successfull Admin ROLE AUTH", 
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: "Error in Admin Route" 
        })
    }
}

export {login, register, testRoute, studentRoute, adminRoute};