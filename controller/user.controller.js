import { User } from "../model/user.model.js";

const login = async (req, res) => {
    try {
        

        res.json({
            message: "Hello Login" 
        })
    } catch (error) {
        console.log(error)
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

export {login, register};