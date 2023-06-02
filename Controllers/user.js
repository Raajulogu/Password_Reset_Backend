import { ObjectId } from "bson";
import { client } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
let Key=process.env.SECRET_KEY;

export let generateJwtToken=(id)=>{
return jwt.sign({id},Key,{expiresIn:"1d"})
}

//Get All users
export function AllUsers(){
    return client.db("password_reset").collection("User")
    .find().toArray()
}

//Getuser by Email
export function UserDataByEmail(email){
    return client.db("password_reset").collection("User")
    .findOne({email:email})
}

//Get user by Id
export function UserDataById(id){
    return client.db("password_reset").collection("User")
    .findOne({_id:new ObjectId(id)})
}

//SignUp
export function Signup(newuser){
    return client.db("password_reset").collection("User")
    .insertOne(newuser);
}

//Reset Password
export function NewPassword(email,updatedData){
    return client.db("password_reset").collection("User")
    .findOneAndUpdate({"email":email},{$set:updatedData});
}

export function addString(text,token){
    return client.db("password_reset").collection("Strings")
    .insertOne({text,token})
}

export function getToken(token){
    return client.db("password_reset").collection("Strings")
    .findOne({"token":token})
}
export function getString(string){
    return client.db("password_reset").collection("Strings")
    .findOne({"text":string})
}

export function deleteString(token){
    return client.db("password_reset").collection("Strings")
    .findOneAndDelete({"token":token})
}