import express from "express";
import bcrypt from "bcrypt";
import { MailSender } from "./mailsender.js";
import { UserDataByEmail, addString } from "../Controllers/user.js";


let router=express.Router();

router.post("/mail",async(req,res)=>{
    try {
        let salt=await bcrypt.genSalt(10)
        let text=salt;
        let reciever=await UserDataByEmail(req.body.email);
        if(!reciever){
            return res.status(400).json({message:"Invalid Email"})
        }
        let token=await MailSender(reciever.email,text)
        let addstring=await addString(text,token)

        res.status(200).json({message:"Mail sent Successfully",result:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let forgot=router;
