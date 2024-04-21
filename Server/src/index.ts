import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {  login } from './endpoints/Login.js';
import express from 'express';
import { AuthMidleware } from './endpoints/Middleware/AuthMid.js';
import cors from 'cors';

import { register } from './endpoints/Register.js';
import { getToken } from './endpoints/getToken.js';
import { logOut } from './endpoints/logOut.js';
import { addGroup } from './endpoints/addGroup.js';
import { getGroup } from './endpoints/getGroup.js';
import { patchGroup } from './endpoints/patchGroup.js';
dotenv.config();
mongoose.connect(String(process.env.MONGO_URL)).then(async()=>{
    console.log("DB connected");
})
const app = express();
const PORT = 3000;
const AuthRouter: express.Router = express.Router()
app.use(express.json());
app.use(cors());

AuthRouter.use((req,res,next)=>AuthMidleware(req,res,next))


app.get('/alive',(req,res)=>{
    console.log("gg")
    res.status(200).send()
})
app.post('/user',(req,res)=>register(req,res))  
app.post('/login',(req,res)=>login(req,res))
app.post('/token',(req,res)=>getToken(req,res))
app.delete('/login',(req,res)=>logOut(req,res))


AuthRouter.post('/group',(req,res)=>addGroup(req,res))
AuthRouter.get('/group/:groupId',(req,res)=>getGroup(req,res))
AuthRouter.patch('/group/:groupId',(req,res)=>patchGroup(req,res))

app.use(AuthRouter)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
