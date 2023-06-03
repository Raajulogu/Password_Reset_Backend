import express from "express";
import { Password_reset } from "./Routers/user.js";
import dotenv from "dotenv";
import { dashboard } from "./Routers/dashboard.js";
import { isAuthenticated } from "./Controllers/auth.js";
import { forgot } from "./Routers/forgot.js";
import { resetPassword } from "./Routers/reset.js";
import { ResetPassword } from "./Routers/newpassword.js";
import cors from "cors";

dotenv.config()

let app=express();

app.use(express.json())
app.use(cors())

let PORT=process.env.PORT;

app.use("/Password_reset",Password_reset)

app.use("/dashboard",isAuthenticated,dashboard)

app.use("/forgot",forgot)

app.use("/reset",resetPassword)
app.use("/new_password",ResetPassword)


app.listen(PORT,()=>console.log(`Server running in localhost:${PORT}`))