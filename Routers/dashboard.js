import express from "express";
import { AllUsers } from "../Controllers/user.js";



let router=express.Router();

router.get("/all",async(req,res)=>{
    try {
        let users=req.user;
        if(!users){
            res.status(400).json({message:"No users Available"})
        }
        //Is User Exist
        res.status(200).json({message:"Dashboard Opened Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let dashboard=router;
