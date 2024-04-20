import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {  login } from './endpoints/Login.ts';
import express from 'express';
import { AuthMidleware } from './endpoints/Middleware/AuthMid.ts';
import cors from 'cors';

import { user } from './models/modules.ts';
import { Console, log } from 'console';
import { register } from './endpoints/Register.ts';
dotenv.config();
mongoose.connect(String(process.env.MONGO_URL)).then(async()=>{
    console.log("DB connected");
})
const app = express();
const PORT = 3000;
const AuthRouter: express.Router = express.Router()
app.use(express.json());
app.use(cors());




app.get('/alive',(req,res)=>{
    console.log("gg")
    res.status(200).send()
})
app.post('/user',(req,res)=>register(req,res))  
app.post('/login',(req,res)=>login(req,res))
AuthRouter.use((req,res,next)=>AuthMidleware(req,res,next))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(AuthRouter)