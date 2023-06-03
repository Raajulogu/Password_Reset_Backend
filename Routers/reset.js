import express from "express";
import { deleteString, getString, getToken } from "../Controllers/user.js";


let router=express.Router();

router.get("/resets",async(req,res)=>{
    if(!req.headers){
        return res.status(400).json({message:"Inavlid Authorization"})
    }
    try {
        let token=req.headers["x-auth"]
        let tokens=await getToken(token)
        if(!tokens){
            return res.status(400).json({message:"Inavlid Authorization"})
        }
        let getstring=req.body.string;
        let string=await getString(getstring)
        if(!string){
            return res.status(400).json({message:"Inavlid String"})
        }
        await deleteString(token)
        res.status(200).json({message:"Valid String"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let resetPassword=router;