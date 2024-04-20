
import express from 'express';
import Joi from 'joi';
import {Md5} from 'ts-md5';
import jwt from 'jsonwebtoken'
import { error, time } from 'console';
import dotenv from 'dotenv'
import { generateToke } from '../Login.ts';
import { access } from 'fs';
import { user } from '../../models/modules.ts';
dotenv.config();



export async function AuthMidleware(req: express.Request, res: express.Response, next :express.NextFunction):Promise<void>{
    try{
        const authHeader = req.headers['authorization']
        
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token != null){
        jwt.verify(token, String(process.env.ACCESS_TOKEN),(err, _id)=>{
            if(err){

                jwt.verify(String(req.body.token), String(process.env.REFRESH_TOKEN),async(err, _id)=>{
                    if(err){
                        res.status(401).send('refresh token not valid')
                        console.log("refresh token not valid")
                    }else{
                        let User = await user.findOne({email: req.body.email}).exec();
                        if (User?.refreshToken ==req.body.token){
                            const accToken = generateToke(String(_id))
                            res.status(200).json({accessToken : accToken})
                            console.log("Newacc token generated")
                        }else{
                            res.status(401).send("gg")
                            console.log("Invalid ref token")
                        }
                        
                        res.status(401)
                        console.log("Newacc token generated")
                    }
                })
                
            }
            

            req.body.id = _id
            console.log("authmidleware succesfull"+ _id)
            next()

        })
    }
    else{
        res.status(401).send("gg")
        console.log("AuthMidleware 401: no token found")
    }
    }catch{
        res.status(500).send("gg")
        console.log("500: AuthMidleware try catch error")
    }

}