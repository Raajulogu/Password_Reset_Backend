import express from "express";
import bcrypt from "bcrypt";
import { NewPassword, UserDataByEmail} from "../Controllers/user.js";


let router=express.Router();

router.put("/reset",async(req,res)=>{
    if(!req.body.password){
        return res.status(400).json({message:"Please Enter a Password"})
    }
    try {

        let newPassword=req.body.password;
        let email=req.body.email;
        //generate hashed password
        let salt=await bcrypt.genSalt(15)
        let hashedpassword=await bcrypt.hash(newPassword,salt);

        let Data=await UserDataByEmail(email)
        let UpdatedData={
            ...Data,password:hashedpassword
        }
        let reset=await NewPassword(email,UpdatedData)
        if(!reset){
            return res.status(400).json({message:"Invalid Email"})
        }
        res.status(200).json({message:"Password Updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let ResetPassword=router;