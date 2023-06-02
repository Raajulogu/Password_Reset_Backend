import express from "express";
import { Signup, UserDataByEmail, generateJwtToken } from "../Controllers/user.js";
import bcrypt from "bcrypt";


let router=express.Router();

router.post("/signup",async(req,res)=>{
    try {
        //Is user already exist
        let user=await UserDataByEmail(req.body.email);
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }
        //generate hashed password
        let salt=await bcrypt.genSalt(15)
        let hashedpassword=await bcrypt.hash(req.body.password,salt);
        
        //new password Updation
        let newuser={
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:hashedpassword
        }
        
        await Signup(newuser)
        let token=generateJwtToken(newuser._id);

        return res.status(201).json({message:"Signed Up Successfully",token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    try {
        //Is User Exist
        let user=await UserDataByEmail(req.body.email);
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        //Validate Password
        let validatePassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validatePassword){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        //Generate Token
        let token=generateJwtToken(user._id);
        res.status(200).json({message:"Logged In Successfully",token:token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let Password_reset=router;