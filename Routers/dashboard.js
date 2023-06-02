import express from "express";



let router=express.Router();

router.get("/all",async(req,res)=>{
    try {
        //Is User Exist
        res.status(200).json({message:"Dashboard Opened Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let dashboard=router;
