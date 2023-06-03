import nodemailer from "nodemailer";
import { generateJwtToken } from "../Controllers/user.js";


export async function MailSender(reciever,text){
    //Create a Sender
let sender=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"rajeshkumarlogu145@gmail.com",
        pass:"txxtnrsbuqlqwvly"
    }
});

//generate a token for reset password
let token=generateJwtToken(reciever)

//Connect Sender and reciever
let recieve={
    from:"rajeshkumarlogu145@gmail.com",
    to:reciever,
    subject:"Reset Your Password",
    text:`Your Password reset code is given below, click the link https://password-reset-backend-zztf.vercel.app//reset/resets/${token}
            ${text} `
};

//Send a Mail
sender.sendMail(recieve,function(error,info){
    if(error){
        console.log("error",error);
    }
});

return token
}
