import  express  from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { user } from '../models/modules.ts';
dotenv.config();
import { generateToke } from "./Login.ts";
import {Md5} from 'ts-md5';
export async function logOut(req: express.Request, res: express.Response) {
    try{

    
    jwt.verify(String(req.body.token), String(process.env.REFRESH_TOKEN),async(err, id)=>{
        if(err){
            res.status(401).send('refresh token not valid')
            console.log("refresh token not valid")
        }else{
            let User = await user.findOne({_id: id}).exec();
            if (User){
                if (User.refreshToken ==Md5.hashStr(req.body.token)){
                    User.refreshToken = null
                    User.save()
                }else{
                    res.status(401).send("gg")
                    console.log("Invalid ref token")
                }
            }

            
            res.status(401).send()
            console.log("user not found")
        }
    })
    }catch{
        res.status(500).send("internal server error")
        console.log(" 500: internal server error")
    }
}
