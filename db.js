import { MongoClient } from "mongodb";
import Obj from "mongodb";

let MongoURL="mongodb+srv://rajesh:rajesh145@cluster0.563jw0h.mongodb.net/?retryWrites=true&w=majority";

async function createConnection(){
    let client =new MongoClient(MongoURL);
    await client.connect();
    console.log("Database Connected Successfully")
    return client;
}

export var ObjectId=Obj.ObjectId;
export let client=await createConnection();