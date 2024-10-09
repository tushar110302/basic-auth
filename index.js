import express from "express";
import dotenv from "dotenv/config"
import { connectDB } from "./db/index.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("ALL OK")
})

app.use("/api/v1", userRouter)

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`Server Running on Port ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
    console.log(`Error Starting Server`)
})
