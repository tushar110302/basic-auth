import jwt from "jsonwebtoken";

const verifyJwt = (req,res,next) => {
    try {
        // const token = req.body.token 
        // const token = req.cookies.token 
        const token = req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token Missing"
            })
        }
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            req.user=userData;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Expired Token"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying Token"
        })
    }
}
const isStudent = (req,res,next) => {
    try {
        if(req.user.role !== "Student"){
            return res.status(400).json({
                success: false,
                message: "This protected route is only for Students"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying Student"
        })
    }
}
const isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(400).json({
                success: false,
                message: "This protected route is only for Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying Admin"
        })
    }
}
export {verifyJwt, isStudent, isAdmin};