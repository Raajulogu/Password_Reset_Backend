import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserDataByEmail, UserDataById } from "./user.js";

dotenv.config();

let Key=process.env.SECRET_KEY

async function isAuthenticated(req,res,next){
    if(req.headers){
        try {
            let token=await req.headers["x-auth"]
            if(!token){
                return res.status(400).json({message:"Invalid Authorization"})
            }
            let decode=jwt.verify(token,Key)
            console.log(decode)
            req.user=await UserDataById(decode.id)
            if(!req.user){
                 return res.status(400).json({message:"Invalid Authorization"})
            }
            next()
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
    return res.status(400).json({message:"Access Denied"})
    
}

export {isAuthenticated}