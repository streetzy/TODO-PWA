import mongoose from 'mongoose'
import { user } from '../models/modules.js';
import { todo } from '../models/modules.js';
import express from 'express';
import Joi from 'joi';
import {Md5} from 'ts-md5';
import jwt from 'jsonwebtoken'
import { time } from 'console';
import dotenv from 'dotenv'
dotenv.config();

export const Authrouter:express.Router = express.Router();
Authrouter.use(express.json)
export function AuthMidleware(req: express.Request, res: express.Response, next :express.NextFunction):void{
    try{
        const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token != null){
        jwt.verify(token, String(process.env.ACCESS_TOKEN),(err, _id)=>{
            if(err){
                console.log("AuthMidleware 401: incvalid token") 
                return res.status(401)
            } 
            req.body._id = _id
            console.log("authmidleware succesfull"+ _id)
            next()

        })
    }
    else{
        res.status(401)
        console.log("AuthMidleware 401: no token found")
    }
    }catch{
        res.status(500)
        console.log("500: AuthMidleware try catch error")
    }

}

  
Authrouter.post('/register', (req: express.Request, res: express.Response) => {
    try{
        const NewUser = new user
        if(Joi.string().email==req.body.email && req.body.password.length > 8){
            async()=>{
               const User = await user.findOne({email: req.body.email})

                if (User){
                    console.log("/register 400: Email already used")
                    res.status(400)
                    return
                }
                NewUser.email = req.body.email
                NewUser.password = Md5.hashStr(req.body.password)
                await NewUser.save()
                console.log("/register 201: New user added")
                res.status(201)
            }
        }else{
            console.log("/register 400: Invalid data")
            res.status(400)
        }
    }catch{
        console.log("/register 500: Try catch exeption")
        res.status(500)
    }

});
Authrouter.post('/login', async (req: express.Request, res: express.Response) => {
    try{
        const email: string= req.body.email;
        let User = await user.findOne({email: req.body.email}).exec();
        if (User?.password == Md5.hashStr(req.body.password) ){
            const accToken = jwt.sign(User._id,String(process.env.ACCESS_TOKEN),{expiresIn: '1d'})
            res.json({accessToken : accToken})
        }
    }catch{
        console.log("/register 500: Try catch exeption")
        res.status(500)
    }
});
